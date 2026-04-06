import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/**
 * Middleware for handling redirects and SEO optimizations
 * Runs on the Edge for better performance
 */
export function middleware(request: NextRequest) {
  const host = request.headers.get('host')
  
  // Redirect non-www to www domain
  if (host === 'wearist.store') {
    return NextResponse.redirect(
      `https://www.wearist.store${request.nextUrl.pathname}${request.nextUrl.search}`,
      { status: 301 }
    )
  }

  // Add canonical URL header for SEO
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
