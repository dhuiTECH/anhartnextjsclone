import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";
import { Resend } from "https://esm.sh/resend@2.0.0";
import { generateAnhartEmailHtml } from './_templates/anhart-email.tsx';

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const supabase = createClient(
  Deno.env.get("SUPABASE_URL") || "https://hxqbbyglhubcgfkbqltu.supabase.co",
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
);

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

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
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const formData: FormSubmission = await req.json();
    
    console.log("Received form submission:", formData);

    // Save to database
    const { data: submission, error: dbError } = await supabase
      .from('submissions')
      .insert([formData])
      .select()
      .single();

    if (dbError) {
      console.error("Database error:", dbError);
      throw new Error(`Database error: ${dbError.message}`);
    }

    console.log("Saved to database:", submission);

    // Generate confirmation email HTML
    console.log('Generating confirmation email for:', formData.name);
    
    const confirmationEmailHtml = generateAnhartEmailHtml({
      name: formData.name,
      email: formData.email,
      message: formData.message,
      phone: formData.phone,
      organization: formData.organization,
      subject: formData.subject,
      investment_amount: formData.investment_amount,
      form_type: formData.form_type,
    });

    console.log('Email HTML generated successfully');

    const confirmationResponse = await resend.emails.send({
      from: "Anhart <info@anhart.ca>",
      to: [formData.email],
      subject: "Thank You for Your Submission",
      html: confirmationEmailHtml,
    });

    if (confirmationResponse.error) {
      console.error("Error sending confirmation email:", confirmationResponse.error);
    } else {
      console.log("Confirmation email sent:", confirmationResponse.data);
    }

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
              <h1 style="color: #ffffff; margin: 0; font-size: 24px;">New ${formData.form_type} Submission</h1>
            </div>
            
            <div style="padding: 30px;">
              <div style="background-color: #f8f9fa; padding: 20px; border-radius: 6px; margin-bottom: 20px;">
                <h3 style="color: #D32F2F; margin: 0 0 15px 0;">Contact Information</h3>
                <p style="margin: 5px 0;"><strong>Name:</strong> ${formData.name}</p>
                <p style="margin: 5px 0;"><strong>Email:</strong> ${formData.email}</p>
                ${formData.phone ? `<p style="margin: 5px 0;"><strong>Phone:</strong> ${formData.phone}</p>` : ''}
                ${formData.organization ? `<p style="margin: 5px 0;"><strong>Organization:</strong> ${formData.organization}</p>` : ''}
                ${formData.subject ? `<p style="margin: 5px 0;"><strong>Subject:</strong> ${formData.subject}</p>` : ''}
              </div>
              
              <div style="background-color: #f8f9fa; padding: 20px; border-radius: 6px;">
                <h3 style="color: #D32F2F; margin: 0 0 15px 0;">Message</h3>
                <p style="color: #333333; white-space: pre-wrap; margin: 0;">${formData.message}</p>
              </div>
              
              <p style="color: #666666; margin: 20px 0 0 0; font-size: 14px;">
                Submission received on ${new Date().toLocaleString()}
              </p>
            </div>
          </div>
        </body>
      </html>
    `;

    const notificationResponse = await resend.emails.send({
      from: "Anhart Website <info@anhart.ca>",
      to: ["info@anhart.ca"],
      subject: `New Submission: ${formData.form_type}`,
      html: notificationEmailHtml,
    });

    if (notificationResponse.error) {
      console.error("Error sending notification email:", notificationResponse.error);
    } else {
      console.log("Notification email sent:", notificationResponse.data);
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