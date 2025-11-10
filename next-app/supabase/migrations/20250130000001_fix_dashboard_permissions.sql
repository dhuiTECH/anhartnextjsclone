-- Fix member dashboard permissions
-- This migration fixes the RLS policies to allow proper access to submissions

-- First, drop all existing conflicting policies
DROP POLICY IF EXISTS "Only admins can read submissions" ON public.submissions;
DROP POLICY IF EXISTS "Members can read own or assigned submissions" ON public.submissions;
DROP POLICY IF EXISTS "Admins can read all submissions" ON public.submissions;
DROP POLICY IF EXISTS "Service role can read submissions" ON public.submissions;
DROP POLICY IF EXISTS "No public access to submissions" ON public.submissions;

-- Create a comprehensive policy that allows:
-- 1. Admins to read all submissions
-- 2. Members to read all submissions (for dashboard functionality)
-- 3. Service role to read all submissions (for edge functions)
CREATE POLICY "Authenticated users can read submissions" 
ON public.submissions 
FOR SELECT 
USING (
  auth.role() = 'service_role' OR 
  auth.uid() IS NOT NULL
);

-- Ensure the insert policy is still in place for form submissions
DROP POLICY IF EXISTS "Allow public form submissions" ON public.submissions;
DROP POLICY IF EXISTS "Authenticated can insert submissions" ON public.submissions;

CREATE POLICY "Allow form submissions" 
ON public.submissions 
FOR INSERT 
WITH CHECK (true);

-- Update the profiles table to ensure proper role handling
-- Make sure the role check function works correctly
CREATE OR REPLACE FUNCTION public.get_current_user_role()
RETURNS TEXT AS $$
  SELECT COALESCE(role, 'member') FROM public.profiles WHERE id = auth.uid();
$$ LANGUAGE SQL SECURITY DEFINER STABLE SET search_path = public;

-- Update the admin check function
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
  SELECT public.get_current_user_role() = 'admin';
$$ LANGUAGE SQL SECURITY DEFINER STABLE SET search_path = public;

-- Ensure the trigger for new user creation works properly
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'name', NEW.email),
    COALESCE(NEW.raw_user_meta_data->>'role', 'member')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger if it doesn't exist
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
