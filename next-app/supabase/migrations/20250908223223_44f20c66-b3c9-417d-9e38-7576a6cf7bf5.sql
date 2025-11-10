-- Fix RLS policies for submissions table to allow form submissions
-- Drop existing policies
DROP POLICY IF EXISTS "Anyone can insert submissions" ON public.submissions;
DROP POLICY IF EXISTS "No public access to submissions" ON public.submissions;

-- Create new policy that explicitly allows all public inserts
CREATE POLICY "Allow public form submissions" 
ON public.submissions 
FOR INSERT 
TO public 
WITH CHECK (true);

-- Keep submissions private for reading (only service role can read)
CREATE POLICY "Service role can read submissions" 
ON public.submissions 
FOR SELECT 
TO service_role
USING (true);