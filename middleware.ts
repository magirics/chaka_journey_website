import createMiddleware from 'next-intl/middleware'
import { NextRequest, NextResponse } from 'next/server'
import { routing } from './i18n/routing'

const intlMiddleware = createMiddleware(routing)

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Public files must bypass next-intl or they get rewritten under /{locale}.
  if (/\.[^/]+$/.test(pathname)) {
    return NextResponse.next()
  }

  // Payload admin and API routes must remain unlocalized.
  if (
    pathname.startsWith('/admin') ||
    pathname.match(/^\/[a-z]{2}\/admin/) ||
    pathname.startsWith('/api') ||
    pathname.match(/^\/[a-z]{2}\/api/) ||
    pathname.startsWith('/_next')
  ) {
    return NextResponse.next()
  }

  return intlMiddleware(request)
}

export const config = {
  matcher: ['/((?!_next|favicon.ico|.*\\..*).*)'],
}
