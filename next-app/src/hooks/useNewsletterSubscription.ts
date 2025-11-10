'use client';

import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';

export const useNewsletterSubscription = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  // Google Apps Script URL for newsletter subscriptions
  const GOOGLE_SCRIPT_URL = 
    "https://script.google.com/macros/s/AKfycbzfMQYjHKQSR5lOwodWizxUoY4NgB1y03O3tAbHSBCV4ZgpgDbu-4xNbkUTl18lTZzw/exec";

  const subscribe = async (email: string) => {
    if (!email || !email.includes('@')) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return false;
    }

    setIsSubmitting(true);
    
    try {
      console.log('Subscribing email to newsletter via Google Apps Script:', email);
      
      // Build URL-encoded body for Google Apps Script
      const body = new URLSearchParams();
      body.append("email", email);
      body.append("form_type", "newsletter");
      body.append("timestamp", new Date().toISOString());
      body.append("userAgent", navigator.userAgent);
      body.append("referrer", document.referrer);

      console.log("Newsletter request body:", body.toString());

      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: body.toString(),
      });

      console.log("Newsletter response status:", response.status, response.statusText);

      if (!response.ok) {
        console.error("HTTP Error during newsletter subscription:", response.status, response.statusText);
        throw new Error(`Script responded with status ${response.status}.`);
      }

      const result = await response.json();

      if (result.success) {
        toast({
          title: "Successfully Subscribed!",
          description: "Thank you for subscribing! Check your email for confirmation.",
        });
        return true;
      } else {
        console.error("Google Script Error:", result.error || "No specific error message provided.");
        toast({
          title: "Subscription Failed",
          description: result.error || "Failed to subscribe to newsletter. Please try again.",
          variant: "destructive",
        });
        return false;
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      toast({
        title: "Subscription Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return { subscribe, isSubmitting };
};