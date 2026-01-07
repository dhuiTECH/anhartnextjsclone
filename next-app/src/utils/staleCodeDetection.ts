/**
 * Utility functions to detect and handle stale cached code
 * 
 * This helps identify when users are running old JavaScript bundles
 * that might have stale environment variables or outdated logic.
 */

/**
 * Checks if environment variables look valid
 * Returns true if they appear to be properly set, false if they might be stale
 */
export function validateEnvVars(): {
  isValid: boolean;
  issues: string[];
} {
  const issues: string[] = [];
  
  // Check Supabase URL
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!supabaseUrl) {
    issues.push('NEXT_PUBLIC_SUPABASE_URL is missing');
  } else if (!supabaseUrl.startsWith('http')) {
    issues.push('NEXT_PUBLIC_SUPABASE_URL has invalid format (might be stale)');
  }
  
  // Check Supabase Anon Key
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!supabaseKey) {
    issues.push('NEXT_PUBLIC_SUPABASE_ANON_KEY is missing');
  } else if (!supabaseKey.startsWith('eyJ')) {
    // Supabase keys typically start with 'eyJ' (JWT header)
    issues.push('NEXT_PUBLIC_SUPABASE_ANON_KEY format looks unusual (might be stale)');
  }
  
  // Check Turnstile Site Key
  const turnstileKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  if (turnstileKey && !turnstileKey.match(/^0x[0-9A-Fa-f]+$|^[A-Za-z0-9_-]+$/)) {
    issues.push('NEXT_PUBLIC_TURNSTILE_SITE_KEY format looks unusual (might be stale)');
  }
  
  // Check Google Script URL
  const googleScriptUrl = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;
  if (googleScriptUrl && !googleScriptUrl.includes('script.google.com')) {
    issues.push('NEXT_PUBLIC_GOOGLE_SCRIPT_URL format looks unusual (might be stale)');
  }
  
  return {
    isValid: issues.length === 0,
    issues,
  };
}

/**
 * Suggests a page reload if stale code is detected
 */
export function suggestPageReload(reason: string): void {
  console.warn(`Stale code detected: ${reason}. Suggesting page reload.`);
  
  // Store the reason in sessionStorage so we can show it to the user
  if (typeof window !== 'undefined') {
    sessionStorage.setItem('stale_code_reason', reason);
    sessionStorage.setItem('stale_code_timestamp', Date.now().toString());
  }
}

/**
 * Checks if we should suggest a page reload based on sessionStorage
 */
export function shouldSuggestReload(): boolean {
  if (typeof window === 'undefined') return false;
  
  const reason = sessionStorage.getItem('stale_code_reason');
  const timestamp = sessionStorage.getItem('stale_code_timestamp');
  
  if (!reason || !timestamp) return false;
  
  // Only suggest reload if it happened recently (within last 5 minutes)
  const timeSinceDetection = Date.now() - parseInt(timestamp, 10);
  return timeSinceDetection < 5 * 60 * 1000;
}

/**
 * Gets the stale code reason if one exists
 */
export function getStaleCodeReason(): string | null {
  if (typeof window === 'undefined') return null;
  return sessionStorage.getItem('stale_code_reason');
}

/**
 * Clears stale code detection flags
 */
export function clearStaleCodeFlags(): void {
  if (typeof window !== 'undefined') {
    sessionStorage.removeItem('stale_code_reason');
    sessionStorage.removeItem('stale_code_timestamp');
  }
}

