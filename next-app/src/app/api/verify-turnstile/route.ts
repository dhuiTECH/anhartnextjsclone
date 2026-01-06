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
    if (!secretKey) {
      console.error('TURNSTILE_SECRET_KEY is not configured');
      return NextResponse.json(
        { error: 'Security verification service is not configured' },
        { status: 500 }
      );
    }

    // Verify token with Cloudflare
    const verifyUrl = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
    const response = await fetch(verifyUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
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

    const data = await response.json();

    if (!data.success) {
      console.warn('Turnstile verification failed:', data);
      return NextResponse.json(
        { error: 'Security verification failed', details: data['error-codes'] },
        { status: 403 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Turnstile verification error:', error);
    return NextResponse.json(
      { error: 'Failed to verify security token' },
      { status: 500 }
    );
  }
}

