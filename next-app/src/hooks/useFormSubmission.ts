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

      // First attempt: Try with CORS to read the response
      try {
        const response = await fetch(GOOGLE_SCRIPT_URL, {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-cache, no-store, must-revalidate",
            "Pragma": "no-cache",
          },
          cache: "no-store",
          body: JSON.stringify(jsonData),
        });

        console.log('Response status:', response.status);

        // Try to read the response
        const text = await response.text();
        console.log('Response text:', text);

        try {
          const result = JSON.parse(text);
          if (result.success) {
            console.log('✅ Form submitted successfully');
            submissionSuccess = true;
          } else {
            console.error('❌ Form submission failed:', result.error);
            toast({
              title: "Submission Failed",
              description: result.error || "The server rejected your submission.",
              variant: "destructive",
            });
            return false;
          }
        } catch (parseError) {
          // If response is not JSON, check if status is ok
          if (response.ok || response.status === 200) {
            console.log('✅ Request completed with OK status');
            submissionSuccess = true;
          } else {
            throw new Error(`Server returned status ${response.status}`);
          }
        }
      } catch (corsError: any) {
        // CORS failed, try with no-cors mode
        console.warn('⚠️ CORS request failed, trying no-cors mode:', corsError.message);

        try {
          await fetch(GOOGLE_SCRIPT_URL, {
            method: "POST",
            mode: "no-cors",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(jsonData),
          });

          // With no-cors, we can't read the response, but the request was sent
          console.log('✅ Form submitted via no-cors mode (cannot verify response)');
          submissionSuccess = true;
        } catch (noCorsError: any) {
          console.error('❌ Both CORS and no-cors requests failed:', noCorsError.message);
          throw new Error('Failed to submit form. Please try again.');
        }
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
