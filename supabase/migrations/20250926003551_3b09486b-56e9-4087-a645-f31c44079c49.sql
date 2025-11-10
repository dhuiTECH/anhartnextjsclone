-- Add investmentAmount column to submissions table for limited partnership forms
ALTER TABLE public.submissions 
ADD COLUMN investment_amount text;