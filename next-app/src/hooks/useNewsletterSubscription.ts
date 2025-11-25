'use client';

import { useState, useRef } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';

// Rate limiting: Store last submission time per email
const lastSubmissionTime = new Map<string, number>();
const RATE_LIMIT_MS = 60000; // 1 minute between submissions from same email

interface AttemptInfo {
  count: number;
  resetTime: number;
}

export const useNewsletterSubscription = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const submissionAttempts = useRef<Map<string, AttemptInfo>>(new Map());
  const MAX_ATTEMPTS = 5; // Max attempts per 10 minutes
  const ATTEMPT_WINDOW_MS = 600000; // 10 minutes

  const subscribe = async (email: string, turnstileToken: string | null) => {
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return false;
    }

    // Validate Turnstile token
    if (!turnstileToken) {
      toast({
        title: "Verification Required",
        description: "Please complete the verification challenge.",
        variant: "destructive",
      });
      return false;
    }

    const normalizedEmail = email.trim().toLowerCase();
    const now = Date.now();

    // Rate limiting: Check if same email submitted recently
    const lastSubmission = lastSubmissionTime.get(normalizedEmail);
    if (lastSubmission && (now - lastSubmission) < RATE_LIMIT_MS) {
      const remainingSeconds = Math.ceil((RATE_LIMIT_MS - (now - lastSubmission)) / 1000);
      toast({
        title: "Please Wait",
        description: `You can only submit once per minute. Please try again in ${remainingSeconds} second${remainingSeconds !== 1 ? 's' : ''}.`,
        variant: "default",
      });
      return false;
    }

    // Check submission attempts (prevent brute force)
    const attempts = submissionAttempts.current.get(normalizedEmail) || { count: 0, resetTime: now + ATTEMPT_WINDOW_MS };
    if (attempts.resetTime < now) {
      // Reset attempts after window expires
      attempts.count = 0;
      attempts.resetTime = now + ATTEMPT_WINDOW_MS;
    }
    
    if (attempts.count >= MAX_ATTEMPTS) {
      toast({
        title: "Too Many Attempts",
        description: "Please wait a few minutes before trying again.",
        variant: "destructive",
      });
      return false;
    }

    setIsSubmitting(true);
    
    try {
      console.log('Subscribing email to newsletter via Supabase:', normalizedEmail);
      
      // TODO: Verify Turnstile token server-side for production
      // For now, we rely on client-side validation
      // You should verify the token in a Supabase Edge Function or API route
      
      // Insert email into the newsletter table
      const { data, error } = await supabase
        .from('newsletter')
        .insert([
          { 
            email: normalizedEmail,
            created_at: new Date().toISOString()
          }
        ])
        .select();

      if (error) {
        // Check if it's a duplicate email error
        if (error.code === '23505' || error.message.includes('duplicate') || error.message.includes('unique')) {
          toast({
            title: "Already Subscribed",
            description: "This email is already subscribed to our newsletter.",
            variant: "default",
          });
          return false;
        }
        
        console.error("Supabase Error:", error);
        throw error;
      }

      if (data && data.length > 0) {
        // Update rate limiting
        lastSubmissionTime.set(normalizedEmail, now);
        submissionAttempts.current.set(normalizedEmail, { count: 0, resetTime: now + ATTEMPT_WINDOW_MS });
        
        toast({
          title: "Successfully Subscribed!",
          description: "Thank you for subscribing! Check your email for confirmation.",
        });
        return true;
      } else {
        throw new Error("No data returned from subscription");
      }
    } catch (error: any) {
      // Increment attempt counter on error
      const attempts = submissionAttempts.current.get(normalizedEmail) || { count: 0, resetTime: now + ATTEMPT_WINDOW_MS };
      attempts.count += 1;
      submissionAttempts.current.set(normalizedEmail, attempts);
      
      console.error('Unexpected error:', error);
      toast({
        title: "Subscription Error",
        description: error?.message || "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return { subscribe, isSubmitting };
};