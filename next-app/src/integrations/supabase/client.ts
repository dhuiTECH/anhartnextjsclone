'use client';
import { createBrowserClient } from '@supabase/ssr';
import type { Database } from './types';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Debug logging (only in development)
if (process.env.NODE_ENV === 'development') {
  console.log('Supabase Client Config:', {
    hasUrl: !!SUPABASE_URL,
    hasKey: !!SUPABASE_ANON_KEY,
    url: SUPABASE_URL || 'MISSING',
    keyPrefix: SUPABASE_ANON_KEY ? `${SUPABASE_ANON_KEY.substring(0, 10)}...` : 'MISSING',
  });
}

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

// Validate URL format to catch stale/malformed env vars
if (SUPABASE_URL && !SUPABASE_URL.startsWith('http')) {
  console.error('Invalid Supabase URL format. This might indicate stale cached code.');
  console.error('Expected URL to start with http/https, got:', SUPABASE_URL.substring(0, 20));
}

// Validate API key format (Supabase anon keys typically start with 'eyJ')
if (SUPABASE_ANON_KEY && !SUPABASE_ANON_KEY.startsWith('eyJ')) {
  console.warn('Supabase anon key format looks unusual. This might indicate stale cached code.');
}

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

// createBrowserClient from @supabase/ssr - explicitly configure to ensure API key is sent
export const supabase = createBrowserClient<Database>(
  SUPABASE_URL,
  SUPABASE_ANON_KEY,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  }
);

// Add a helper function to validate the client can connect
export async function validateSupabaseConnection(): Promise<boolean> {
  try {
    // Try a simple query to validate the connection
    const { error } = await supabase.from('portfolio').select('id').limit(1);
    if (error) {
      console.error('Supabase connection validation failed:', error);
      return false;
    }
    return true;
  } catch (err) {
    console.error('Supabase connection validation error:', err);
    return false;
  }
}