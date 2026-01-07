import { NextRequest, NextResponse } from 'next/server';

/**
 * Server-side Cloudflare Turnstile verification
 * Verifies the Turnstile token before allowing sensitive operations
 */
export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json();

    if (!token) {
      return NextResponse.json(
        { error: 'Turnstile token is required' },
        { status: 400 }
      );
    }

    const secretKey = process.env.TURNSTILE_SECRET_KEY;
    const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
    
    if (!secretKey) {
      console.error('TURNSTILE_SECRET_KEY is not configured');
      console.error('Available env vars:', {
        hasSecretKey: !!process.env.TURNSTILE_SECRET_KEY,
        hasSiteKey: !!siteKey,
        siteKeyValue: siteKey ? siteKey.substring(0, 10) + '...' : 'undefined',
        nodeEnv: process.env.NODE_ENV,
      });
      return NextResponse.json(
        { 
          error: 'Security verification service is not configured. Please contact support.',
          code: 'CONFIG_MISSING'
        },
        { status: 500 }
      );
    }

    // Validate secret key format (Turnstile secret keys are typically long alphanumeric strings)
    if (secretKey.length < 20) {
      console.error('TURNSTILE_SECRET_KEY appears to be invalid (too short)');
      console.error('Secret key length:', secretKey.length);
      console.error('Secret key value (first 10 chars):', secretKey.substring(0, 10));
      return NextResponse.json(
        { 
          error: 'Server configuration error. Please contact support.',
          code: 'CONFIG_INVALID'
        },
        { status: 500 }
      );
    }
    
    // Log configuration status (without exposing full keys)
    console.log('Turnstile configuration check:', {
      hasSecretKey: !!secretKey,
      secretKeyLength: secretKey.length,
      hasSiteKey: !!siteKey,
      siteKeyLength: siteKey?.length || 0,
      secretKeyPrefix: secretKey.substring(0, 10) + '...',
      siteKeyPrefix: siteKey ? siteKey.substring(0, 10) + '...' : 'undefined',
    });

    // Verify token with Cloudflare
    const verifyUrl = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
    
    try {
      const response = await fetch(verifyUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'Anhart-Website/1.0',
        },
        body: JSON.stringify({
          secret: secretKey,
          response: token,
          // Get client IP from headers (Cloudflare provides this)
          remoteip: request.headers.get('cf-connecting-ip') || 
                   request.headers.get('x-forwarded-for')?.split(',')[0] ||
                   request.headers.get('x-real-ip') ||
                   'unknown',
        }),
      });

      // Handle Cloudflare PAT (Private Access Token) challenges
      if (response.status === 401) {
        console.warn('Cloudflare PAT challenge received. This is a Cloudflare security feature and may require additional configuration.');
        console.warn('PAT challenge details:', {
          status: response.status,
          statusText: response.statusText,
          headers: Object.fromEntries(response.headers.entries()),
        });
        // Return a more user-friendly error
        return NextResponse.json(
          { 
            error: 'Security verification temporarily unavailable. Please try again in a moment.',
            code: 'CLOUDFLARE_CHALLENGE'
          },
          { status: 503 }
        );
      }

      if (!response.ok) {
        const errorText = await response.text().catch(() => 'Unable to read error response');
        console.error('Turnstile API returned non-OK status:', {
          status: response.status,
          statusText: response.statusText,
          errorBody: errorText.substring(0, 200), // First 200 chars
        });
        return NextResponse.json(
          { 
            error: 'Security verification service error. Please try again.',
            code: 'SERVICE_ERROR',
            details: `HTTP ${response.status}: ${response.statusText}`
          },
          { status: 503 }
        );
      }

      const data = await response.json();

      if (!data.success) {
        console.warn('Turnstile verification failed:', {
          success: data.success,
          errorCodes: data['error-codes'],
          challengeTs: data['challenge_ts'],
        });
        
        // Provide more specific error messages
        const errorCodes = data['error-codes'] || [];
        let errorMessage = 'Security verification failed';
        let errorCode = 'VERIFICATION_FAILED';
        
        if (errorCodes.includes('invalid-input-response')) {
          errorMessage = 'Invalid verification token. Please refresh the page and try again.';
          errorCode = 'INVALID_TOKEN';
        } else if (errorCodes.includes('timeout-or-duplicate')) {
          errorMessage = 'Verification token expired. Please refresh the page and try again.';
          errorCode = 'TOKEN_EXPIRED';
        } else if (errorCodes.includes('invalid-input-secret')) {
          errorMessage = 'Server configuration error. The security service is not properly configured. Please contact support.';
          errorCode = 'CONFIG_INVALID';
          console.error('TURNSTILE_SECRET_KEY is invalid or rejected by Cloudflare');
          console.error('Error codes:', errorCodes);
          console.error('Secret key length:', secretKey.length);
          console.error('Secret key prefix:', secretKey.substring(0, 10) + '...');
          console.error('Site key prefix:', siteKey ? siteKey.substring(0, 10) + '...' : 'undefined');
          console.error('Possible causes:');
          console.error('  1. TURNSTILE_SECRET_KEY does not match NEXT_PUBLIC_TURNSTILE_SITE_KEY');
          console.error('  2. Keys are from different Turnstile widgets/domains');
          console.error('  3. Secret key has been regenerated or revoked');
        } else if (errorCodes.includes('internal-error')) {
          errorMessage = 'Security verification service temporarily unavailable. Please try again in a moment.';
          errorCode = 'SERVICE_UNAVAILABLE';
        } else if (errorCodes.includes('invalid-input-sitekey')) {
          errorMessage = 'Server configuration error. Please contact support.';
          errorCode = 'SITEKEY_INVALID';
          console.error('NEXT_PUBLIC_TURNSTILE_SITE_KEY is invalid or does not match the secret key');
          console.error('Site key value:', process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.substring(0, 10) + '...');
          console.error('Secret key prefix:', secretKey.substring(0, 10) + '...');
          console.error('Possible causes:');
          console.error('  1. NEXT_PUBLIC_TURNSTILE_SITE_KEY does not match TURNSTILE_SECRET_KEY');
          console.error('  2. Site key is from a different Turnstile widget than the secret key');
          console.error('  3. Site key has been regenerated or revoked');
        }
        
        return NextResponse.json(
          { error: errorMessage, code: errorCode, details: errorCodes },
          { status: 403 }
        );
      }

      return NextResponse.json({ success: true });
    } catch (fetchError: any) {
      // Handle network errors or Cloudflare challenges
      if (fetchError.message?.includes('401') || fetchError.status === 401) {
        console.warn('Cloudflare challenge detected during Turnstile verification');
        return NextResponse.json(
          { 
            error: 'Security verification temporarily unavailable. Please try again in a moment.',
            code: 'CLOUDFLARE_CHALLENGE'
          },
          { status: 503 }
        );
      }
      throw fetchError; // Re-throw to be caught by outer catch
    }
  } catch (error: any) {
    console.error('Turnstile verification error:', error);
    
    // Provide more specific error messages
    if (error.message?.includes('fetch')) {
      return NextResponse.json(
        { 
          error: 'Unable to reach security verification service. Please check your connection and try again.',
          code: 'NETWORK_ERROR'
        },
        { status: 503 }
      );
    }
    
    return NextResponse.json(
      { 
        error: 'Failed to verify security token. Please try again.',
        code: 'VERIFICATION_ERROR'
      },
      { status: 500 }
    );
  }
}

