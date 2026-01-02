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

      // Build URL-encoded body exactly as Google Apps Script expects
      const body = new URLSearchParams();
      body.append("name", formData.name);
      body.append("email", formData.email);
      body.append("message", formData.message);
      body.append("form_type", formData.form_type);
      if (formData.phone) body.append("phone", formData.phone);
      if (formData.organization) body.append("organization", formData.organization);
      if (formData.subject) body.append("subject", formData.subject);
      if (formData.investment_amount) body.append("investment_amount", formData.investment_amount);
      if (formData.turnstile_token) body.append("turnstile_token", formData.turnstile_token);
      body.append("timestamp", new Date().toISOString());
      body.append("userAgent", navigator.userAgent);
      body.append("referrer", document.referrer);

      if (!GOOGLE_SCRIPT_URL) {
        throw new Error("Form submission service is not configured");
      }

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

      // --- Enhanced HTTP Error Handling ---
      if (!response.ok) {
        // Log the full response status for debugging
        logger.error("HTTP Error during submission", new Error(`Status: ${response.status} ${response.statusText}`), {
          status: response.status,
          statusText: response.statusText,
        });

        // Try to get more info from the response body if it's text
        let errorBodyText = `Status: ${response.status} ${response.statusText}`;
        try {
          // Clone the response so we can read the body without affecting later calls
          const clonedResponse = response.clone();
          errorBodyText += `. Body: ${await clonedResponse.text()}`;
        } catch (e) {
          // Ignore if reading the body fails
        }

        // Throw an error with the status for the catch block
        throw new Error(`Script responded with status ${response.status}.`);
      }
      // ------------------------------------

      const result = await response.json();

      if (result.success) {
        toast({
          title: "Message Sent Successfully! ",
          description: "Thank you! Check your email for confirmation. We'll connect with you as soon as possible.",
        });
        return true;
      } else {
        // Log the specific error from the Google Apps Script response
        logger.error("Google Script Error", new Error(result.error || "No specific error message provided"));

        // Display the specific error from the script, if available
        const description = result.error || "The server rejected your submission. Please try again.";
        toast({
          title: "Submission Failed ",
          description: description,
          variant: "destructive",
        });
        return false;
      }
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
