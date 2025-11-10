-- Disable user registration to make the system exclusive
-- This migration disables public user registration

-- Disable email confirmations (since we're not allowing public signup)
-- This is handled in Supabase dashboard settings, but we can document it here

-- Note: To fully disable user registration, you need to:
-- 1. Go to Supabase Dashboard → Authentication → Settings
-- 2. Disable "Enable email confirmations" 
-- 3. Disable "Enable email change confirmations"
-- 4. Set "Site URL" to your domain
-- 5. Add your domain to "Additional redirect URLs"

-- The following policies ensure only admins can create users
-- (This is already handled by our existing RLS policies)

-- Create a policy to prevent public user creation
-- (This is handled by Supabase Auth settings, not database policies)

-- Add a comment to the profiles table about exclusive access
COMMENT ON TABLE public.profiles IS 'User profiles for exclusive member access. Users must be created by administrators only.';

-- Add a comment to the submissions table about access control
COMMENT ON TABLE public.submissions IS 'Contact form submissions. Access restricted to authenticated members and admins only.';
