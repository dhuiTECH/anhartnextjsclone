'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
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

/**
 * Validates Google Apps Script URL format
 */
const isValidGoogleScriptUrl = (url: string | undefined): boolean => {
  if (!url) return false;
  
  // Google Apps Script URLs should match this pattern:
  // https://script.google.com/macros/s/[SCRIPT_ID]/exec
  const googleScriptPattern = /^https:\/\/script\.google\.com\/macros\/s\/[A-Za-z0-9_-]+\/exec$/;
  return googleScriptPattern.test(url);
};

export const useFormSubmission = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  // Security: Google Apps Script URL from environment variable
  const GOOGLE_SCRIPT_URL = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;
  
  // Sanity check: Validate the URL is set and has correct format
  if (!GOOGLE_SCRIPT_URL) {
    logger.error("Google Script URL not configured", new Error("NEXT_PUBLIC_GOOGLE_SCRIPT_URL is not set"));
  } else if (!isValidGoogleScriptUrl(GOOGLE_SCRIPT_URL)) {
    logger.error(
      "Invalid Google Script URL format", 
      new Error(`NEXT_PUBLIC_GOOGLE_SCRIPT_URL has invalid format: ${GOOGLE_SCRIPT_URL.substring(0, 50)}...`),
      { url: GOOGLE_SCRIPT_URL }
    );
  }

  const submitForm = async (formData: FormData, retryCount = 0) => {
    const MAX_RETRIES = 3;
    const RETRY_DELAYS = [1000, 2000, 4000]; // Exponential backoff

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
        setIsSubmitting(false);
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

      // Sanity check before submission
      if (!GOOGLE_SCRIPT_URL) {
        // If URL is missing and we haven't retried, suggest page reload
        if (retryCount === 0) {
          console.warn('GOOGLE_SCRIPT_URL is missing, this might be stale cached code. Suggesting page reload.');
          toast({
            title: "Configuration Error",
            description: "Form submission service is not configured. Please refresh the page (Ctrl+Shift+R) and try again.",
            variant: "destructive",
          });
        } else {
          throw new Error("Form submission service is not configured. NEXT_PUBLIC_GOOGLE_SCRIPT_URL is missing.");
        }
        setIsSubmitting(false);
        return false;
      }

      if (!isValidGoogleScriptUrl(GOOGLE_SCRIPT_URL)) {
        // If URL format is invalid and we haven't retried, suggest page reload
        if (retryCount === 0) {
          console.warn('GOOGLE_SCRIPT_URL format is invalid, this might be stale cached code. Suggesting page reload.');
          toast({
            title: "Configuration Error",
            description: "Invalid form configuration. Please refresh the page (Ctrl+Shift+R) and try again.",
            variant: "destructive",
          });
        } else {
          throw new Error(`Invalid Google Script URL format. Expected: https://script.google.com/macros/s/[ID]/exec`);
        }
        setIsSubmitting(false);
        return false;
      }

      // Convert to URL-encoded format (GAS expects application/x-www-form-urlencoded)
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

      // Submit via same-origin API route so we can read GAS response (no no-cors)
      const apiUrl = "/api/submit-contact";

      try {
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Cache-Control": "no-cache, no-store, must-revalidate",
            "Pragma": "no-cache",
          },
          cache: "no-store",
          body: body.toString(),
        });

        const data = (await response.json()) as { success?: boolean; error?: string; message?: string };

        if (!response.ok) {
          throw new Error(data?.error ?? `Submission failed (${response.status})`);
        }

        if (data.success === false) {
          throw new Error(data.error ?? "Submission was not accepted.");
        }

        // Thank-you page loads the Google Ads conversion event snippet (single fire, no duplicate with gtag here).
        router.replace("/thank-you");
        return true;
      } catch (fetchError: unknown) {
        const message = fetchError instanceof Error ? fetchError.message : "Failed to submit form.";
        console.error("Form submission failed:", message);

        // Retry on network errors only
        if (retryCount < MAX_RETRIES && (
          message.includes("Failed to fetch") ||
          message.includes("NetworkError") ||
          message.includes("network")
        )) {
          const delay = RETRY_DELAYS[retryCount] ?? 4000;
          await new Promise((resolve) => setTimeout(resolve, delay));
          return submitForm(formData, retryCount + 1);
        }

        toast({
          title: "Submission Failed",
          description: message,
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
