import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

// Security: Rate limiting storage (in-memory, resets on function restart)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const RATE_LIMIT_MAX_REQUESTS = 3; // Max 3 subscriptions per window per IP/email

function checkRateLimit(identifier: string): { allowed: boolean; remaining: number; resetTime: number } {
  const now = Date.now();
  const record = rateLimitStore.get(identifier);
  
  if (!record || record.resetTime < now) {
    rateLimitStore.set(identifier, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return { allowed: true, remaining: RATE_LIMIT_MAX_REQUESTS - 1, resetTime: now + RATE_LIMIT_WINDOW_MS };
  }
  
  if (record.count >= RATE_LIMIT_MAX_REQUESTS) {
    return { allowed: false, remaining: 0, resetTime: record.resetTime };
  }
  
  record.count += 1;
  return { allowed: true, remaining: RATE_LIMIT_MAX_REQUESTS - record.count, resetTime: record.resetTime };
}

// Get allowed origins from environment variable (comma-separated)
// Default to allowing all origins in development, but restrict in production
const getAllowedOrigins = (): string[] => {
  const allowedOrigins = Deno.env.get("ALLOWED_ORIGINS");
  if (allowedOrigins) {
    return allowedOrigins.split(',').map(origin => origin.trim());
  }
  // In development, allow all origins (not recommended for production)
  return ['*'];
};

const getCorsHeaders = (origin: string | null) => {
  const allowedOrigins = getAllowedOrigins();
  const allowOrigin = allowedOrigins.includes('*') 
    ? '*' 
    : (origin && allowedOrigins.includes(origin) ? origin : allowedOrigins[0] || '*');
  
  return {
    "Access-Control-Allow-Origin": allowOrigin,
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  };
};

interface NewsletterRequest {
  email: string;
}

const handler = async (req: Request): Promise<Response> => {
  const origin = req.headers.get("origin");
  const corsHeaders = getCorsHeaders(origin);
  
  console.log("Newsletter subscription request received");

  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ error: "Method not allowed" }),
      { status: 405, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }

  try {
    // Security: Rate limiting
    const clientIp = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || 
                     req.headers.get("x-real-ip") || 
                     "unknown";
    
    const ipRateLimit = checkRateLimit(`ip:${clientIp}`);
    if (!ipRateLimit.allowed) {
      const resetMinutes = Math.ceil((ipRateLimit.resetTime - Date.now()) / 60000);
      return new Response(
        JSON.stringify({ 
          error: "Rate limit exceeded",
          message: `Too many requests. Please try again in ${resetMinutes} minute(s).`
        }),
        { 
          status: 429, 
          headers: { 
            "Content-Type": "application/json",
            "Retry-After": String(Math.ceil((ipRateLimit.resetTime - Date.now()) / 1000)),
            ...corsHeaders 
          } 
        }
      );
    }
    
    const { email }: NewsletterRequest = await req.json();
    
    // Security: Server-side input validation
    if (!email || typeof email !== 'string') {
      return new Response(
        JSON.stringify({ error: "Valid email address is required" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ error: "Valid email address is required" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }
    
    // Validate email length
    if (email.length > 255) {
      return new Response(
        JSON.stringify({ error: "Email address is too long" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }
    
    // Sanitize email: trim and lowercase
    const sanitizedEmail = email.trim().toLowerCase();
    
    // Security: Additional rate limiting by email
    const emailRateLimit = checkRateLimit(`email:${sanitizedEmail}`);
    if (!emailRateLimit.allowed) {
      const resetMinutes = Math.ceil((emailRateLimit.resetTime - Date.now()) / 60000);
      return new Response(
        JSON.stringify({ 
          error: "Rate limit exceeded",
          message: `Too many subscription attempts from this email. Please try again in ${resetMinutes} minute(s).`
        }),
        { 
          status: 429, 
          headers: { 
            "Content-Type": "application/json",
            "Retry-After": String(Math.ceil((emailRateLimit.resetTime - Date.now()) / 1000)),
            ...corsHeaders 
          } 
        }
      );
    }
    
    // Log subscription (only domain for privacy)
    console.log("Processing subscription for email domain:", sanitizedEmail.split('@')[1] || 'unknown');

    // Send confirmation email to subscriber (using sanitized email)
    const subscriberResponse = await resend.emails.send({
      from: "Anhart Housing <info@anhart.ca>",
      to: [sanitizedEmail],
      subject: "Welcome to Anhart Housing Newsletter!",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #333; font-size: 24px; margin-bottom: 20px;">Welcome to Anhart Housing!</h1>
          <p style="color: #666; font-size: 16px; line-height: 1.5; margin-bottom: 20px;">
            Thank you for subscribing to our newsletter. You'll now receive the latest updates on:
          </p>
          <ul style="color: #666; font-size: 16px; line-height: 1.5; margin-bottom: 20px;">
            <li>Affordable housing news and developments</li>
            <li>New project announcements</li>
            <li>Community impact stories</li>
            <li>Partnership opportunities</li>
          </ul>
          <p style="color: #666; font-size: 16px; line-height: 1.5; margin-bottom: 20px;">
            We're committed to building communities through affordable housing solutions across Canada.
          </p>
          <p style="color: #666; font-size: 14px; line-height: 1.5;">
            If you didn't subscribe to this newsletter, you can safely ignore this email or 
            <a href="#" style="color: #2563eb;">unsubscribe here</a>.
          </p>
        </div>
      `,
    });

    console.log("Subscriber confirmation email sent successfully");

    // Send notification to Anhart team
    const adminEmail = Deno.env.get("ADMIN_EMAIL") || "info@anhart.ca";
    const teamNotification = await resend.emails.send({
      from: "Anhart Newsletter <info@anhart.ca>",
      to: [adminEmail],
      subject: "New Newsletter Subscription",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #333;">New Newsletter Subscription</h2>
          <p style="color: #666; font-size: 16px;">
            A new user has subscribed to the Anhart Housing newsletter:
          </p>
          <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <strong>Email:</strong> ${sanitizedEmail.replace(/[&<>"']/g, (m) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[m] || m))}<br>
            <strong>Subscribed at:</strong> ${new Date().toLocaleString()}
          </div>
        </div>
      `,
    });

    console.log("Team notification email sent successfully");

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Successfully subscribed to newsletter" 
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );

  } catch (error: any) {
    console.error("Error in newsletter subscription:", error);
    return new Response(
      JSON.stringify({ 
        error: "Failed to process subscription", 
        details: error.message 
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);