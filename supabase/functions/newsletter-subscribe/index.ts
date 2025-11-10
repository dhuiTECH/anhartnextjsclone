import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface NewsletterRequest {
  email: string;
}

const handler = async (req: Request): Promise<Response> => {
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
    const { email }: NewsletterRequest = await req.json();
    console.log("Processing subscription for email:", email);

    if (!email || !email.includes("@")) {
      return new Response(
        JSON.stringify({ error: "Valid email address is required" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Send confirmation email to subscriber
    const subscriberResponse = await resend.emails.send({
      from: "Anhart Housing <info@anhart.ca>",
      to: [email],
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

    console.log("Subscriber confirmation sent:", subscriberResponse);

    // Send notification to Anhart team
    const teamNotification = await resend.emails.send({
      from: "Anhart Newsletter <info@anhart.ca>",
      to: ["damon.hui@anhart.ca"],
      subject: "New Newsletter Subscription",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #333;">New Newsletter Subscription</h2>
          <p style="color: #666; font-size: 16px;">
            A new user has subscribed to the Anhart Housing newsletter:
          </p>
          <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <strong>Email:</strong> ${email}<br>
            <strong>Subscribed at:</strong> ${new Date().toLocaleString()}
          </div>
        </div>
      `,
    });

    console.log("Team notification sent:", teamNotification);

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