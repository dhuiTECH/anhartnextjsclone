'use client';

import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { logger } from "@/utils/logger";

// ... (Interface FormData and validateFormData/isValidEmail are unchanged)

interface FormData {
  name: string;
  email: string;
  message: string;
  form_type: string;
  phone?: string;
  organization?: string;
  subject?: string;
  investment_amount?: string;
  turnstile_token?: string;
}

// Client-side validation function (assuming it's defined elsewhere or will be kept here)
const isValidEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validateFormData = (data: FormData) => {
  const errors: string[] = [];

  // Required fields
  if (!data.name || data.name.trim().length < 2) {
    errors.push("Name must be at least 2 characters");
  }

  if (!data.email || !isValidEmail(data.email)) {
    errors.push("Valid email address is required");
  }

  if (!data.message || data.message.trim().length < 10) {
    errors.push("Message must be at least 10 characters");
  }

  // Check for suspicious content
  const suspiciousPatterns = [
    /<script/i,
    /javascript:/i,
    /on\w+\s*=/i,
    /href\s*=\s*["']javascript:/i,
    /<iframe/i,
    /<object/i,
    /<embed/i,
  ];

  const allText = `${data.name} ${data.email} ${data.message}`.toLowerCase();

  for (const pattern of suspiciousPatterns) {
    if (pattern.test(allText)) {
      errors.push("Suspicious content detected");
      break;
    }
  }

  // Check message length
  if (data.message && data.message.length > 5000) {
    errors.push("Message is too long");
  }

  return errors;
};
// ---------------------------------------------------------------------

export const useFormSubmission = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  // Security: Google Apps Script URL from environment variable
  const GOOGLE_SCRIPT_URL = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;
  
  if (!GOOGLE_SCRIPT_URL) {
    logger.error("Google Script URL not configured", new Error("NEXT_PUBLIC_GOOGLE_SCRIPT_URL is not set"));
  }

  const submitForm = async (formData: FormData) => {
    setIsSubmitting(true);

    try {
      // Client-side validation
      const validationErrors = validateFormData(formData);
      if (validationErrors.length > 0) {
        toast({
          title: "Validation Error",
          description: validationErrors.join(", "),
          variant: "destructive",
        });
        logger.error("Client-side validation errors", { validationErrors });
        return false;
      }

      // Build JSON body for Google Apps Script
      const jsonData = {
        name: formData.name,
        email: formData.email,
        message: formData.message,
        form_type: formData.form_type,
        phone: formData.phone || '',
        organization: formData.organization || '',
        subject: formData.subject || '',
        investment_amount: formData.investment_amount || '',
        turnstile_token: formData.turnstile_token || '',
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        referrer: document.referrer,
      };

      if (!GOOGLE_SCRIPT_URL) {
        throw new Error("Form submission service is not configured");
      }

      console.log('Submitting form to:', GOOGLE_SCRIPT_URL);
      console.log('Form data:', { ...jsonData, email: '***' }); // Log without exposing email

      let submissionSuccess = false;

      // Convert to URL-encoded format to avoid CORS preflight
      // Using application/x-www-form-urlencoded is a "simple request" that doesn't trigger preflight
      const body = new URLSearchParams();
      body.append("name", jsonData.name);
      body.append("email", jsonData.email);
      body.append("message", jsonData.message);
      body.append("form_type", jsonData.form_type);
      body.append("phone", jsonData.phone);
      body.append("organization", jsonData.organization);
      body.append("subject", jsonData.subject);
      body.append("investment_amount", jsonData.investment_amount);
      body.append("turnstile_token", jsonData.turnstile_token);
      body.append("timestamp", jsonData.timestamp);
      body.append("userAgent", jsonData.userAgent);
      body.append("referrer", jsonData.referrer);

      try {
        const response = await fetch(GOOGLE_SCRIPT_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Cache-Control": "no-cache, no-store, must-revalidate",
            "Pragma": "no-cache",
          },
          cache: "no-store",
          body: body.toString(),
        });

        console.log('Response status:', response.status);

        if (response.ok) {
          console.log('✅ Form submitted successfully');
          submissionSuccess = true;
        } else {
          // Try to read error response
          try {
            const text = await response.text();
            console.log('Response text:', text);
            const result = JSON.parse(text);
            if (result.error) {
              toast({
                title: "Submission Failed",
                description: result.error,
                variant: "destructive",
              });
              return false;
            }
          } catch {
            // If we can't parse response but status is not OK
            throw new Error(`Server returned status ${response.status}`);
          }
        }
      } catch (fetchError: any) {
        console.error('❌ Form submission failed:', fetchError.message);
        throw new Error('Failed to submit form. Please try again.');
      }

      if (submissionSuccess) {
        toast({
          title: "Message Sent Successfully!",
          description: "Thank you! Check your email for confirmation. We'll connect with you as soon as possible.",
        });
        return true;
      }

      return false;
    } catch (error) {
      // --- Enhanced Unexpected Error Handling ---
      logger.error("Unexpected error during form submission", error);

      // Determine the error message to display
      let errorMessage = "An unexpected error occurred. Please try again.";
      if (error instanceof Error) {
        errorMessage = error.message;

        // Check if it's an HTTP status error thrown above
        const match = errorMessage.match(/Script responded with status (\d+)/);
        if (match) {
          const statusCode = match[1];
          // User-friendly message for HTTP errors
          errorMessage = `Submission failed. Server responded with HTTP status **${statusCode}**.`;
        }
      }

      toast({
        title: "System Error ",
        description: errorMessage,
        variant: "destructive",
      });
      // -----------------------------------------
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return { submitForm, isSubmitting };
};
