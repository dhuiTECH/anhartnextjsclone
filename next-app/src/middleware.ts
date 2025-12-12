import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const hostname = request.headers.get("host") || "";
  
  // Security: Force HTTPS in production
  if (process.env.NODE_ENV === 'production') {
    const protocol = request.headers.get('x-forwarded-proto') || request.nextUrl.protocol;
    if (protocol !== 'https:') {
      const url = request.nextUrl.clone();
      url.protocol = 'https:';
      return NextResponse.redirect(url, 301);
    }
  }
  
  // Remove port if present for comparison
  const hostnameWithoutPort = hostname.split(":")[0];

  // Redirect www.anhart.ca to anhart.ca (301 permanent redirect for SEO)
  // Only redirect if we're actually on www, to prevent redirect loops
  if (hostnameWithoutPort === "www.anhart.ca") {
    const url = request.nextUrl.clone();
    url.host = "anhart.ca";
    url.protocol = "https:";
    
    return NextResponse.redirect(url, 301);
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
