import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || '';
  
  // Redirect www.anhart.ca to anhart.ca with 301 (Permanent Redirect)
  if (hostname === 'www.anhart.ca' || hostname.startsWith('www.anhart.ca:')) {
    const url = request.nextUrl.clone();
    url.hostname = 'anhart.ca';
    // Preserve protocol, path, and query parameters
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
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};

