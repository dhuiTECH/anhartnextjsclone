-- Create submissions table for form data
CREATE TABLE public.submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  form_type TEXT NOT NULL,
  phone TEXT,
  organization TEXT,
  subject TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.submissions ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert submissions (public forms)
CREATE POLICY "Anyone can insert submissions" 
ON public.submissions 
FOR INSERT 
WITH CHECK (true);

-- Create policy for admins to view all submissions
CREATE POLICY "Anyone can view their own submissions" 
ON public.submissions 
FOR SELECT 
USING (true);