import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { checkRateLimit, getClientIP } from "@/lib/rate-limit";

const unifiedCsp = "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' blob: https://www.googletagmanager.com https://www.google-analytics.com https://maps.googleapis.com https://googleads.g.doubleclick.net https://googleads.googleapis.com https://pagead2.googlesyndication.com https://www.googleadservices.com https://challenges.cloudflare.com https://cdn.cloudflare.com; script-src-elem 'self' 'unsafe-inline' blob: https://www.googletagmanager.com https://www.google-analytics.com https://maps.googleapis.com https://googleads.g.doubleclick.net https://googleads.googleapis.com https://pagead2.googlesyndication.com https://www.googleadservices.com https://challenges.cloudflare.com https://cdn.cloudflare.com; worker-src 'self' blob:; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; style-src-elem 'self' 'unsafe-inline' https://fonts.googleapis.com https://googleads.g.doubleclick.net; font-src 'self' data: https://fonts.gstatic.com; img-src 'self' data: blob: https: https://maps.gstatic.com https://www.google.com https://googleads.g.doubleclick.net https://www.googleadservices.com https://pagead2.googlesyndication.com; connect-src 'self' https://www.googletagmanager.com https://www.google-analytics.com https://stats.g.doubleclick.net https://maps.googleapis.com https://script.google.com https://*.googleusercontent.com https://*.googleapis.com https://www.google.com https://googleads.g.doubleclick.net https://googleads.googleapis.com https://pagead2.googlesyndication.com https://www.googleadservices.com https://challenges.cloudflare.com https://cdn.cloudflare.com https://api.indexnow.org https://www.bing.com https://yandex.com https://*.supabase.co https://supabase.co; frame-src 'self' https://www.googletagmanager.com https://www.googletagmanager.com/ns.html https://www.youtube.com https://www.youtube-nocookie.com https://challenges.cloudflare.com https://cdn.cloudflare.com https://www.google.com https://maps.google.com https://tpc.googlesyndication.com https://pagead2.googlesyndication.com https://googleads.g.doubleclick.net https://td.doubleclick.net; base-uri 'self'; form-action 'self' https://www.googleadservices.com https://googleads.g.doubleclick.net;";

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
    
    // Stricter rate limiting for admin login page (GET requests - page loads)
    if (url.pathname === '/admin/login') {
      // Allow more GET requests (page loads) but still limit them
      const rateLimit = checkRateLimit(`admin-login-page:${clientIP}`, 30, 15 * 60 * 1000); // 30 page loads per 15 minutes
      
      if (!rateLimit.allowed) {
        const response = NextResponse.json(
          { 
            error: 'Too many requests. Please try again later.',
            retryAfter: Math.ceil((rateLimit.resetTime - Date.now()) / 1000)
          },
          { status: 429 }
        );
        
        // Add rate limit headers
        response.headers.set('X-RateLimit-Limit', '30');
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
    
    response.headers.set(
      'Content-Security-Policy',
      unifiedCsp
    );
    
    return response;
  }

  const response = NextResponse.next();
  
  response.headers.set(
    'Content-Security-Policy',
    unifiedCsp
  );
  
  return response;
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
