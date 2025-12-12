# Security Fixes Summary

This document summarizes all the security fixes applied to the codebase.

## Changes Made

### 1. ✅ Google Maps API Key
- **File**: `next-app/src/components/shared/GoogleMaps.tsx`
- **Change**: Moved hardcoded API key to environment variable `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`
- **Impact**: Prevents API key exposure in client-side code

### 2. ✅ Supabase Credentials
- **Files**: 
  - `next-app/scripts/publish-all-blogs.mjs`
  - `next-app/supabase/functions/submit-form/index.ts`
  - `next-app/src/app/layout.tsx`
- **Change**: Removed hardcoded Supabase URL and anon key, now using environment variables
- **Impact**: Prevents credential exposure in source code

### 3. ✅ Admin Email
- **File**: `next-app/src/app/admin/login/page.tsx`
- **Change**: Removed hardcoded admin email from login form
- **Impact**: Prevents revealing admin identity

### 4. ✅ CORS Configuration
- **Files**:
  - `next-app/supabase/functions/submit-form/index.ts`
  - `next-app/supabase/functions/newsletter-subscribe/index.ts`
  - `next-app/supabase/functions/export-csv/index.ts`
- **Change**: Replaced wildcard CORS (`*`) with configurable allowed origins via `ALLOWED_ORIGINS` environment variable
- **Impact**: Reduces risk of CSRF attacks and unauthorized access

### 5. ✅ Email Addresses
- **Files**:
  - `next-app/supabase/functions/newsletter-subscribe/index.ts`
  - `next-app/supabase/functions/submit-form/index.ts`
- **Change**: Moved personal email addresses to environment variables (`ADMIN_EMAIL`, `NOTIFICATION_EMAIL`)
- **Impact**: Protects personal information from being exposed in code

### 6. ✅ Console Logging
- **Files**:
  - `next-app/supabase/functions/submit-form/index.ts`
  - `next-app/supabase/functions/newsletter-subscribe/index.ts`
- **Change**: Sanitized console logs to avoid exposing sensitive user data (emails, names, etc.)
- **Impact**: Reduces risk of data leakage through logs

## Required Environment Variables

Create a `.env.local` file (or set these in your deployment platform) with the following variables:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
VITE_SUPABASE_URL=https://your-project.supabase.co

# Google Maps API Key
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your-google-maps-api-key-here

# Resend API Key (for email functionality)
RESEND_API_KEY=your-resend-api-key-here

# Email Addresses
ADMIN_EMAIL=admin@example.com
NOTIFICATION_EMAIL=notifications@example.com

# Allowed Origins for CORS (comma-separated)
ALLOWED_ORIGINS=https://anhart.ca,https://www.anhart.ca
```

## Notes

1. **For Supabase Edge Functions**: Set environment variables in your Supabase dashboard under Project Settings → Edge Functions → Secrets

2. **CORS Configuration**: The `ALLOWED_ORIGINS` variable should contain your production domain(s). If not set, it defaults to `*` (not recommended for production).

3. **Google Maps API Key**: 
   - Restrict the API key in Google Cloud Console to specific domains
   - Monitor usage for any abuse
   - Consider using API key restrictions (HTTP referrers, IP addresses)

4. **Static Headers File**: The `public/_headers` file still has `Access-Control-Allow-Origin: *` for `/api/*` routes. This is for static file hosting and is less critical, but you may want to restrict it if your hosting platform supports dynamic headers.

## Next Steps

1. Set all environment variables in your deployment platform (Vercel, Netlify, etc.)
2. Set environment variables in Supabase dashboard for edge functions
3. Rotate any exposed API keys (Google Maps, Supabase)
4. Review and restrict Google Maps API key in Google Cloud Console
5. Test all functionality to ensure environment variables are working correctly

