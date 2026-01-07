import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { checkRateLimit, getClientIP } from "@/lib/rate-limit";

export function middleware(request: NextRequest) {
  const hostname = request.headers.get("host") || "";
  const url = request.nextUrl;
  
  // Security: Force HTTPS in production
  // Only redirect if we're NOT already on HTTPS to prevent loops
  if (process.env.NODE_ENV === 'production') {
    const protocol = request.headers.get('x-forwarded-proto') || url.protocol;
    // Check if already HTTPS or if we're being redirected (avoid loops)
    if (protocol !== 'https:' && url.protocol !== 'https:') {
      const httpsUrl = url.clone();
      httpsUrl.protocol = 'https:';
      // Only redirect if the URL actually changed
      if (httpsUrl.toString() !== url.toString()) {
        return NextResponse.redirect(httpsUrl, 301);
      }
    }
  }
  
  // Remove port if present for comparison
  const hostnameWithoutPort = hostname.split(":")[0];

  // Redirect www.anhart.ca to anhart.ca (301 permanent redirect for SEO)
  // Only redirect if we're actually on www, to prevent redirect loops
  // Also check that we're not already redirecting to avoid loops
  if (hostnameWithoutPort === "www.anhart.ca" && !url.pathname.startsWith('/_next')) {
    const nonWwwUrl = url.clone();
    nonWwwUrl.host = "anhart.ca";
    nonWwwUrl.protocol = "https:";
    
    // Only redirect if the URL actually changed
    if (nonWwwUrl.toString() !== url.toString()) {
      return NextResponse.redirect(nonWwwUrl, 301);
    }
  }

  // Redirect /merritt (lowercase) to /Merritt (uppercase)
  // Case-sensitive check to prevent redirect loops
  // Only redirect if pathname is exactly '/merritt' (lowercase)
  if (url.pathname === '/merritt' && !url.pathname.startsWith('/_next')) {
    const merrittUrl = url.clone();
    merrittUrl.pathname = '/Merritt';
    
    // Only redirect if the URL actually changed
    if (merrittUrl.toString() !== url.toString()) {
      return NextResponse.redirect(merrittUrl, 301);
    }
  }

  // Rate limiting for admin routes
  if (url.pathname.startsWith('/admin')) {
    const clientIP = getClientIP(request);
    
    // Stricter rate limiting for admin login
    if (url.pathname === '/admin/login') {
      const rateLimit = checkRateLimit(`admin-login:${clientIP}`, 5, 15 * 60 * 1000); // 5 attempts per 15 minutes
      
      if (!rateLimit.allowed) {
        const response = NextResponse.json(
          { 
            error: 'Too many login attempts. Please try again later.',
            retryAfter: Math.ceil((rateLimit.resetTime - Date.now()) / 1000)
          },
          { status: 429 }
        );
        
        // Add rate limit headers
        response.headers.set('X-RateLimit-Limit', '5');
        response.headers.set('X-RateLimit-Remaining', '0');
        response.headers.set('X-RateLimit-Reset', rateLimit.resetTime.toString());
        response.headers.set('Retry-After', Math.ceil((rateLimit.resetTime - Date.now()) / 1000).toString());
        
        return response;
      }
    }
    
    // General rate limiting for admin routes
    const rateLimit = checkRateLimit(`admin:${clientIP}`, 100, 60 * 1000); // 100 requests per minute
    
    if (!rateLimit.allowed) {
      const response = NextResponse.json(
        { 
          error: 'Rate limit exceeded. Please slow down.',
          retryAfter: Math.ceil((rateLimit.resetTime - Date.now()) / 1000)
        },
        { status: 429 }
      );
      
      response.headers.set('X-RateLimit-Limit', '100');
      response.headers.set('X-RateLimit-Remaining', '0');
      response.headers.set('X-RateLimit-Reset', rateLimit.resetTime.toString());
      response.headers.set('Retry-After', Math.ceil((rateLimit.resetTime - Date.now()) / 1000).toString());
      
      return response;
    }
    
    // Add rate limit headers to successful responses
    const response = NextResponse.next();
    response.headers.set('X-RateLimit-Limit', '100');
    response.headers.set('X-RateLimit-Remaining', rateLimit.remaining.toString());
    response.headers.set('X-RateLimit-Reset', rateLimit.resetTime.toString());
    
    // Enhanced security headers for admin routes
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('X-Frame-Options', 'DENY');
    response.headers.set('X-XSS-Protection', '1; mode=block');
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
    response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
    
    // Additional CSP for admin routes (stricter)
    // Explicitly set script-src to avoid CSP warnings and allow Turnstile
    response.headers.set(
      'Content-Security-Policy',
      "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' blob: https://www.googletagmanager.com https://challenges.cloudflare.com https://challenges.cloudflare.com/turnstile/v0/api.js; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' data: https://fonts.gstatic.com; img-src 'self' data: blob: https:; connect-src 'self' https://www.googletagmanager.com https://*.supabase.co https://supabase.co https://challenges.cloudflare.com; frame-src 'self' https://www.googletagmanager.com https://www.googletagmanager.com/ns.html https://challenges.cloudflare.com; base-uri 'self'; form-action 'self';"
    );
    
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - robots.txt (robots file)
     * - sitemap (sitemap files: sitemap.xml, sitemap-*.xml)
     */
    "/((?!api|_next/static|_next/image|favicon\\.ico|robots\\.txt|sitemap).*)",
  ],
};
