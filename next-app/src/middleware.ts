import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

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
