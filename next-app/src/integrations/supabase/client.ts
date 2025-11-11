'use client';
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://hxqbbyglhubcgfkbqltu.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh4cWJieWdsaHViY2dma2JxbHR1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcyNzYzMDMsImV4cCI6MjA3Mjg1MjMwM30.xP7GYGbjKOUI5OcvUWwOwX0EYlVeqP44rnpbssvbty4";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  }
});