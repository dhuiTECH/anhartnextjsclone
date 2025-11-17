'use client';

import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';

export const useNewsletterSubscription = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

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
      console.log('Subscribing email to newsletter via Supabase:', email);
      
      // Insert email into the newsletter table
      const { data, error } = await supabase
        .from('newsletter')
        .insert([
          { 
            email: email.trim().toLowerCase(),
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
        toast({
          title: "Successfully Subscribed!",
          description: "Thank you for subscribing! Check your email for confirmation.",
        });
        return true;
      } else {
        throw new Error("No data returned from subscription");
      }
    } catch (error: any) {
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