import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === '/admin/login' || pathname.startsWith('/admin/login/')) {
    const hasAuthCookie =
      Boolean(request.cookies.get('chaka-token')?.value) ||
      Boolean(request.cookies.get('payload-token')?.value);

    if (hasAuthCookie) {
      const url = request.nextUrl.clone();
      url.pathname = '/admin';
      return NextResponse.redirect(url);
    }
  }

  // Backward compatibility for outdated plural routes.
  if (pathname.startsWith('/admin/collections/footers')) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.replace('/admin/collections/footers', '/admin/collections/footer');
    return NextResponse.redirect(url);
  }

  if (pathname.startsWith('/api/footers')) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.replace('/api/footers', '/api/footer');
    return NextResponse.redirect(url);
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: [
    '/admin/login',
    '/admin/login/:path*',
    '/admin/collections/footers/:path*',
    '/api/footers/:path*',
    '/((?!api|stripe|typeform|admin|trpc|_next|_vercel|.*\\..*).*)',
  ],
}
