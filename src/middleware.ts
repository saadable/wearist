import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/**
 * Middleware for SEO optimizations
 * Runs on the Edge for better performance
 */
export function middleware(request: NextRequest) {
  // Add canonical URL header for SEO (redirects are handled by Vercel)
  const response = NextResponse.next()
  const url = request.nextUrl.clone()
  url.hostname = 'www.wearist.store'
  url.protocol = 'https'
  
  // Set Link header with canonical URL for better SEO
  response.headers.set('Link', `<${url.href}>; rel="canonical"`)
  
  return response
}

// Configure which routes to run middleware on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
}
