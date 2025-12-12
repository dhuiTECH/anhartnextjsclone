import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";
import { Resend } from "https://esm.sh/resend@2.0.0";
import { generateAnhartEmailHtml } from './_templates/anhart-email.tsx';

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

const supabaseUrl = Deno.env.get("SUPABASE_URL");
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error("Missing required environment variables: SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY");
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

// Security: Rate limiting storage (in-memory, resets on function restart)
// For production, consider using Redis or Supabase database for persistent rate limiting
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const RATE_LIMIT_MAX_REQUESTS = 5; // Max 5 submissions per window per IP/email

function checkRateLimit(identifier: string): { allowed: boolean; remaining: number; resetTime: number } {
  const now = Date.now();
  const record = rateLimitStore.get(identifier);
  
  if (!record || record.resetTime < now) {
    // Create new record or reset expired one
    rateLimitStore.set(identifier, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return { allowed: true, remaining: RATE_LIMIT_MAX_REQUESTS - 1, resetTime: now + RATE_LIMIT_WINDOW_MS };
  }
  
  if (record.count >= RATE_LIMIT_MAX_REQUESTS) {
    return { allowed: false, remaining: 0, resetTime: record.resetTime };
  }
  
  record.count += 1;
  return { allowed: true, remaining: RATE_LIMIT_MAX_REQUESTS - record.count, resetTime: record.resetTime };
}

interface FormSubmission {
  name: string;
  email: string;
  message: string;
  form_type: string;
  phone?: string;
  organization?: string;
  subject?: string;
  investment_amount?: string;
}

const handler = async (req: Request): Promise<Response> => {
  const origin = req.headers.get("origin");
  const corsHeaders = getCorsHeaders(origin);
  
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Security: Rate limiting - use IP address and email as identifier
    const clientIp = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || 
                     req.headers.get("x-real-ip") || 
                     "unknown";
    
    // We'll check rate limit after we get the email from formData
    // For now, check by IP
    const ipRateLimit = checkRateLimit(`ip:${clientIp}`);
    if (!ipRateLimit.allowed) {
      const resetMinutes = Math.ceil((ipRateLimit.resetTime - Date.now()) / 60000);
      return new Response(
        JSON.stringify({ 
          success: false,
          error: "Rate limit exceeded",
          message: `Too many requests. Please try again in ${resetMinutes} minute(s).`
        }),
        {
          status: 429,
          headers: { 
            "Content-Type": "application/json",
            "Retry-After": String(Math.ceil((ipRateLimit.resetTime - Date.now()) / 1000)),
            ...corsHeaders 
          },
        }
      );
    }
    
    const formData: FormSubmission = await req.json();
    
    // Security: Additional rate limiting by email (after validation)
    if (formData.email) {
      const emailRateLimit = checkRateLimit(`email:${formData.email.toLowerCase().trim()}`);
      if (!emailRateLimit.allowed) {
        const resetMinutes = Math.ceil((emailRateLimit.resetTime - Date.now()) / 60000);
        return new Response(
          JSON.stringify({ 
            success: false,
            error: "Rate limit exceeded",
            message: `Too many submissions from this email. Please try again in ${resetMinutes} minute(s).`
          }),
          {
            status: 429,
            headers: { 
              "Content-Type": "application/json",
              "Retry-After": String(Math.ceil((emailRateLimit.resetTime - Date.now()) / 1000)),
              ...corsHeaders 
            },
          }
        );
      }
    }
    
    // Security: Server-side input validation
    const validationErrors: string[] = [];
    
    // Validate required fields
    if (!formData.name || formData.name.trim().length < 2) {
      validationErrors.push("Name must be at least 2 characters");
    }
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      validationErrors.push("Valid email address is required");
    }
    if (!formData.message || formData.message.trim().length < 10) {
      validationErrors.push("Message must be at least 10 characters");
    }
    if (!formData.form_type) {
      validationErrors.push("Form type is required");
    }
    
    // Validate field lengths to prevent DoS
    if (formData.name && formData.name.length > 200) {
      validationErrors.push("Name is too long");
    }
    if (formData.email && formData.email.length > 255) {
      validationErrors.push("Email is too long");
    }
    if (formData.message && formData.message.length > 5000) {
      validationErrors.push("Message is too long");
    }
    if (formData.phone && formData.phone.length > 50) {
      validationErrors.push("Phone is too long");
    }
    if (formData.organization && formData.organization.length > 200) {
      validationErrors.push("Organization name is too long");
    }
    if (formData.subject && formData.subject.length > 200) {
      validationErrors.push("Subject is too long");
    }
    
    // Check for suspicious patterns (XSS attempts)
    const suspiciousPatterns = [
      /<script/i,
      /javascript:/i,
      /on\w+\s*=/i,
      /href\s*=\s*["']javascript:/i,
      /<iframe/i,
      /<object/i,
      /<embed/i,
    ];
    
    const allText = `${formData.name} ${formData.email} ${formData.message} ${formData.phone || ''} ${formData.organization || ''} ${formData.subject || ''}`.toLowerCase();
    for (const pattern of suspiciousPatterns) {
      if (pattern.test(allText)) {
        validationErrors.push("Suspicious content detected");
        break;
      }
    }
    
    if (validationErrors.length > 0) {
      return new Response(
        JSON.stringify({ 
          success: false,
          error: "Validation failed",
          details: validationErrors
        }),
        {
          status: 400,
          headers: { 
            "Content-Type": "application/json", 
            ...corsHeaders 
          },
        }
      );
    }
    
    // Sanitize input: trim whitespace and normalize
    const sanitizedData: FormSubmission = {
      name: formData.name.trim(),
      email: formData.email.trim().toLowerCase(),
      message: formData.message.trim(),
      form_type: formData.form_type.trim(),
      phone: formData.phone?.trim() || undefined,
      organization: formData.organization?.trim() || undefined,
      subject: formData.subject?.trim() || undefined,
      investment_amount: formData.investment_amount?.trim() || undefined,
    };
    
    // Log form submission (without sensitive data)
    console.log("Received form submission:", { 
      form_type: sanitizedData.form_type,
      name: sanitizedData.name?.substring(0, 3) + '***', // Partially mask name
      email_domain: sanitizedData.email?.split('@')[1] // Only log domain
    });

    // Save to database (using sanitized data)
    const { data: submission, error: dbError } = await supabase
      .from('submissions')
      .insert([sanitizedData])
      .select()
      .single();

    if (dbError) {
      console.error("Database error:", dbError.message);
      throw new Error(`Database error: ${dbError.message}`);
    }

    // Log successful save (without sensitive data)
    console.log("Saved to database successfully, submission ID:", submission?.id);

    // Generate confirmation email HTML
    console.log('Generating confirmation email...');
    
    const confirmationEmailHtml = generateAnhartEmailHtml({
      name: sanitizedData.name,
      email: sanitizedData.email,
      message: sanitizedData.message,
      phone: sanitizedData.phone,
      organization: sanitizedData.organization,
      subject: sanitizedData.subject,
      investment_amount: sanitizedData.investment_amount,
      form_type: sanitizedData.form_type,
    });

    console.log('Email HTML generated successfully');

    const confirmationResponse = await resend.emails.send({
      from: "Anhart <info@anhart.ca>",
      to: [sanitizedData.email],
      subject: "Thank You for Your Submission",
      html: confirmationEmailHtml,
    });

    if (confirmationResponse.error) {
      console.error("Error sending confirmation email:", confirmationResponse.error.message);
    } else {
      console.log("Confirmation email sent successfully");
    }

    // Security: HTML escape function to prevent XSS attacks
    const escapeHtml = (text: string | null | undefined): string => {
      if (!text) return '';
      return String(text)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
    };

    const escapeHtmlWithLineBreaks = (text: string | null | undefined): string => {
      if (!text) return '';
      return escapeHtml(text).replace(/\n/g, '<br>');
    };

    // Security: Escape all user input to prevent XSS
    const safeName = escapeHtml(formData.name);
    const safeEmail = escapeHtml(formData.email);
    const safePhone = formData.phone ? escapeHtml(formData.phone) : null;
    const safeOrganization = formData.organization ? escapeHtml(formData.organization) : null;
    const safeSubject = formData.subject ? escapeHtml(formData.subject) : null;
    const safeMessage = escapeHtmlWithLineBreaks(formData.message);
    const safeFormType = escapeHtml(formData.form_type);

    // Send notification email to admin (using simple HTML for internal use)
    const notificationEmailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Form Submission</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; margin: 0; padding: 0; background-color: #f8f9fa;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
            <div style="background: linear-gradient(135deg, #D32F2F 0%, #B71C1C 100%); padding: 20px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 24px;">New ${safeFormType} Submission</h1>
            </div>
            
            <div style="padding: 30px;">
              <div style="background-color: #f8f9fa; padding: 20px; border-radius: 6px; margin-bottom: 20px;">
                <h3 style="color: #D32F2F; margin: 0 0 15px 0;">Contact Information</h3>
                <p style="margin: 5px 0;"><strong>Name:</strong> ${safeName}</p>
                <p style="margin: 5px 0;"><strong>Email:</strong> ${safeEmail}</p>
                ${safePhone ? `<p style="margin: 5px 0;"><strong>Phone:</strong> ${safePhone}</p>` : ''}
                ${safeOrganization ? `<p style="margin: 5px 0;"><strong>Organization:</strong> ${safeOrganization}</p>` : ''}
                ${safeSubject ? `<p style="margin: 5px 0;"><strong>Subject:</strong> ${safeSubject}</p>` : ''}
              </div>
              
              <div style="background-color: #f8f9fa; padding: 20px; border-radius: 6px;">
                <h3 style="color: #D32F2F; margin: 0 0 15px 0;">Message</h3>
                <p style="color: #333333; white-space: pre-wrap; margin: 0;">${safeMessage}</p>
              </div>
              
              <p style="color: #666666; margin: 20px 0 0 0; font-size: 14px;">
                Submission received on ${escapeHtml(new Date().toLocaleString())}
              </p>
            </div>
          </div>
        </body>
      </html>
    `;

    const notificationResponse = await resend.emails.send({
      from: "Anhart Website <info@anhart.ca>",
      to: [Deno.env.get("NOTIFICATION_EMAIL") || "info@anhart.ca"],
      subject: `New Submission: ${sanitizedData.form_type}`,
      html: notificationEmailHtml,
    });

    if (notificationResponse.error) {
      console.error("Error sending notification email:", notificationResponse.error.message);
    } else {
      console.log("Notification email sent successfully");
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Form submitted successfully",
        submissionId: submission.id 
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );

  } catch (error: any) {
    console.error("Error in submit-form function:", error);
    return new Response(
      JSON.stringify({ 
        success: false,
        error: error.message || "An unexpected error occurred" 
      }),
      {
        status: 500,
        headers: { 
          "Content-Type": "application/json", 
          ...corsHeaders 
        },
      }
    );
  }
};

function getFormTypeDescription(formType: string): string {
  switch (formType) {
    case 'contact':
      return 'inquiry';
    case 'partner':
      return 'partnership request';
    case 'limited_partnership':
      return 'limited partnership inquiry';
    case 'home':
      return 'contact request';
    default:
      return 'submission';
  }
}

serve(handler);