import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

/**
 * Admin Login API Route
 * 
 * Security features:
 * - Turnstile verification before allowing login
 * - Failed login attempt tracking with account lockout
 * - IP-based rate limiting (handled by middleware)
 * - Secure error messages that don't leak info
 */

// In-memory store for login attempts (use Redis in production)
interface LoginAttemptStore {
  [email: string]: {
    failedAttempts: number;
    lastAttempt: number;
    lockedUntil: number | null;
  };
}

const loginAttempts: LoginAttemptStore = {};

// Constants for security
const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_DURATION_MS = 30 * 60 * 1000; // 30 minutes
const ATTEMPT_RESET_MS = 15 * 60 * 1000; // Reset failed attempts after 15 minutes of no attempts

// Clean up old entries periodically
setInterval(() => {
  const now = Date.now();
  Object.keys(loginAttempts).forEach((email) => {
    const entry = loginAttempts[email];
    // Remove entries that have been unlocked and had no recent attempts
    if (
      (!entry.lockedUntil || entry.lockedUntil < now) &&
      entry.lastAttempt < now - ATTEMPT_RESET_MS
    ) {
      delete loginAttempts[email];
    }
  });
}, 60000); // Clean up every minute

/**
 * Get client IP from request
 */
function getClientIP(request: NextRequest): string {
  const cfIP = request.headers.get('cf-connecting-ip');
  if (cfIP) return cfIP;

  const xForwardedFor = request.headers.get('x-forwarded-for');
  if (xForwardedFor) return xForwardedFor.split(',')[0].trim();

  const xRealIP = request.headers.get('x-real-ip');
  if (xRealIP) return xRealIP;

  return 'unknown';
}

/**
 * Verify Turnstile token
 */
async function verifyTurnstile(token: string, clientIP: string): Promise<{ success: boolean; error?: string }> {
  const secretKey = process.env.TURNSTILE_SECRET_KEY;

  if (!secretKey) {
    console.error('[Admin Login] TURNSTILE_SECRET_KEY is not configured');
    return { success: false, error: 'Security service not configured' };
  }

  try {
    const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        secret: secretKey,
        response: token,
        remoteip: clientIP,
      }),
    });

    if (!response.ok) {
      console.error('[Admin Login] Turnstile API error:', response.status);
      return { success: false, error: 'Security verification service unavailable' };
    }

    const data = await response.json();
    
    if (!data.success) {
      console.warn('[Admin Login] Turnstile verification failed:', data['error-codes']);
      return { success: false, error: 'Security verification failed' };
    }

    return { success: true };
  } catch (error) {
    console.error('[Admin Login] Turnstile verification error:', error);
    return { success: false, error: 'Unable to verify security token' };
  }
}

/**
 * Check if account is locked
 */
function isAccountLocked(email: string): { locked: boolean; remainingMs?: number } {
  const entry = loginAttempts[email];
  if (!entry || !entry.lockedUntil) return { locked: false };

  const now = Date.now();
  if (entry.lockedUntil > now) {
    return { locked: true, remainingMs: entry.lockedUntil - now };
  }

  // Unlock if lockout period has passed
  entry.lockedUntil = null;
  return { locked: false };
}

/**
 * Record a failed login attempt
 */
function recordFailedAttempt(email: string): { locked: boolean; attemptsRemaining: number } {
  const now = Date.now();
  
  if (!loginAttempts[email]) {
    loginAttempts[email] = {
      failedAttempts: 0,
      lastAttempt: now,
      lockedUntil: null,
    };
  }

  const entry = loginAttempts[email];
  
  // Reset count if last attempt was too long ago
  if (entry.lastAttempt < now - ATTEMPT_RESET_MS) {
    entry.failedAttempts = 0;
  }

  entry.failedAttempts += 1;
  entry.lastAttempt = now;

  const attemptsRemaining = MAX_FAILED_ATTEMPTS - entry.failedAttempts;

  // Lock account if max attempts reached
  if (entry.failedAttempts >= MAX_FAILED_ATTEMPTS) {
    entry.lockedUntil = now + LOCKOUT_DURATION_MS;
    console.warn(`[Admin Login] Account locked for email: ${email.substring(0, 3)}***`);
    return { locked: true, attemptsRemaining: 0 };
  }

  return { locked: false, attemptsRemaining };
}

/**
 * Record a successful login (reset failed attempts)
 */
function recordSuccessfulLogin(email: string): void {
  delete loginAttempts[email];
}

export async function POST(request: NextRequest) {
  const clientIP = getClientIP(request);
  const timestamp = new Date().toISOString();

  try {
    const { email, password, turnstileToken } = await request.json();

    // Validate required fields
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Validate Turnstile token is provided
    if (!turnstileToken) {
      console.warn(`[Admin Login] Missing Turnstile token - IP: ${clientIP}, Time: ${timestamp}`);
      return NextResponse.json(
        { error: 'Security verification is required. Please complete the captcha.' },
        { status: 400 }
      );
    }

    // Check if account is locked FIRST
    const lockStatus = isAccountLocked(email.toLowerCase());
    if (lockStatus.locked) {
      const remainingMinutes = Math.ceil((lockStatus.remainingMs || 0) / 60000);
      console.warn(`[Admin Login] Locked account attempt - Email: ${email.substring(0, 3)}***, IP: ${clientIP}`);
      return NextResponse.json(
        { 
          error: `Account temporarily locked due to too many failed attempts. Please try again in ${remainingMinutes} minutes.`,
          locked: true,
          retryAfter: Math.ceil((lockStatus.remainingMs || 0) / 1000)
        },
        { status: 423 } // 423 Locked
      );
    }

    // Verify Turnstile token
    const turnstileResult = await verifyTurnstile(turnstileToken, clientIP);
    if (!turnstileResult.success) {
      console.warn(`[Admin Login] Turnstile failed - IP: ${clientIP}, Error: ${turnstileResult.error}`);
      return NextResponse.json(
        { error: turnstileResult.error || 'Security verification failed. Please try again.' },
        { status: 403 }
      );
    }

    // Create Supabase client for server-side auth
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      console.error('[Admin Login] Supabase configuration missing');
      return NextResponse.json(
        { error: 'Authentication service not configured' },
        { status: 500 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    // Attempt login
    const { data, error: loginError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (loginError) {
      // Record failed attempt
      const attemptResult = recordFailedAttempt(email.toLowerCase());
      
      console.warn(
        `[Admin Login] Failed login - Email: ${email.substring(0, 3)}***, IP: ${clientIP}, ` +
        `Reason: ${loginError.message}, Attempts remaining: ${attemptResult.attemptsRemaining}`
      );

      // Generic error message to prevent email enumeration
      const errorMessage = attemptResult.locked
        ? `Account locked due to too many failed attempts. Please try again in 30 minutes.`
        : attemptResult.attemptsRemaining <= 2
        ? `Invalid credentials. ${attemptResult.attemptsRemaining} attempt${attemptResult.attemptsRemaining === 1 ? '' : 's'} remaining before lockout.`
        : 'Invalid email or password.';

      return NextResponse.json(
        { 
          error: errorMessage,
          locked: attemptResult.locked,
          attemptsRemaining: attemptResult.attemptsRemaining
        },
        { status: 401 }
      );
    }

    // Successful login
    recordSuccessfulLogin(email.toLowerCase());
    console.log(`[Admin Login] Successful login - Email: ${email.substring(0, 3)}***, IP: ${clientIP}`);

    // Return the session for the client to use
    return NextResponse.json({
      success: true,
      session: data.session,
      user: {
        id: data.user?.id,
        email: data.user?.email,
      }
    });

  } catch (error: any) {
    console.error(`[Admin Login] Error - IP: ${clientIP}, Error:`, error);
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    );
  }
}
