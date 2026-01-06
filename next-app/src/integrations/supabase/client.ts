'use client';
import { createBrowserClient } from '@supabase/ssr';
import type { Database } from './types';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error('Missing Supabase environment variables:', {
    hasUrl: !!SUPABASE_URL,
    hasKey: !!SUPABASE_ANON_KEY,
    url: SUPABASE_URL ? '***' : 'missing',
  });
  throw new Error(
    'Missing Supabase environment variables. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your environment.'
  );
}

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

// createBrowserClient from @supabase/ssr automatically includes the API key
// The anon key is used as both the API key and default auth token
export const supabase = createBrowserClient<Database>(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);