-- Fix security vulnerability: Remove public access to submissions table
-- Contact form submissions should not be publicly readable

-- Drop the existing overly permissive SELECT policy
DROP POLICY IF EXISTS "Anyone can view their own submissions" ON public.submissions;

-- Create a new restrictive policy that only allows authenticated admins to view submissions
-- For now, we'll disable SELECT access entirely since this is a contact form
-- Submissions should only be accessible through admin interface or email notifications
CREATE POLICY "No public access to submissions" 
ON public.submissions 
FOR SELECT 
USING (false);

-- Keep the INSERT policy as is, since users need to submit contact forms
-- The INSERT policy "Anyone can insert submissions" remains unchanged