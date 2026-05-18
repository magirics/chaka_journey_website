import createMiddleware from 'next-intl/middleware'
import { NextRequest, NextResponse } from 'next/server'
import { routing } from './i18n/routing'

const intlMiddleware = createMiddleware(routing)

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // 🔥 1. Dejar que Payload maneje TODO lo de admin (con o sin locale)
  if (
    pathname.startsWith('/admin') ||
    pathname.match(/^\/[a-z]{2}\/admin/)
  ) {
    return NextResponse.next()

    // Keep Payload login unlocalized. Otherwise next-intl redirects
    // /admin/login -> /{locale}/admin/login, which redirects back again.
    return NextResponse.next();
  }

  // 🔥 2. Dejar pasar API también (muy importante)
  if (
    pathname.startsWith('/api') ||
    pathname.match(/^\/[a-z]{2}\/api/)
  ) {
    return NextResponse.next()
  }

  // 🔥 3. Archivos internos de Next
  if (pathname.startsWith('/_next')) {
    return NextResponse.next()
  }

  // 🔥 4. Todo lo demás → next-intl
  return intlMiddleware(request)
}

export const config = {
  matcher: ['/((?!_next|favicon.ico).*)'],
}