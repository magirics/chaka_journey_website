import { NextResponse, NextRequest } from 'next/server';
import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';
import path from 'path';

const allowedOrigins = [
  'https://ominous-potato-p57p564r9q4299qv-3000.app.github.dev',
  'http://localhost:3000',
  'https://localhost:3000'
];

// export function middleware(request: NextRequest) {
//   const origin = request.headers.get('origin');
//   const forwardedHost = request.headers.get('x-forwarded-host');

//   // Si hay conflicto entre origin y x-forwarded-host
//   if (origin && forwardedHost && origin !== forwardedHost) {
//     if (!allowedOrigins.includes(origin)) {
//       return new NextResponse('Origin not| allowed', { status: 403 });
//     }
//   }

//   return NextResponse.next();
// }




const locales = ['de', 'en', 'es', 'fr']
const defaultLocale = 'en'

function getHeaderLocale(request: NextRequest) {
  const headers = { 'accept-language': request.headers.get('accept-language') || undefined }
  const languages = new Negotiator({ headers }).languages()
  const locale = match(languages, locales, defaultLocale)
  return locale
}

function getPathnameLocale(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  const locale = locales.find(locale => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`))
  return locale
}

export function middleware(request: NextRequest) {
  // Check if there is any supported locale in the pathname
  const { pathname } = request.nextUrl
  const headerLocale = getHeaderLocale(request)
  const pathnameLocale = getPathnameLocale(request)

  const isOnlyLocale = pathname === `/${pathnameLocale}`
  const isPublicFile = pathname.includes('.')

  if (pathnameLocale) {
    if (isOnlyLocale) {
      request.nextUrl.pathname = `${pathname}/home`
      return NextResponse.redirect(request.nextUrl)

    } else if (isPublicFile) {
      request.nextUrl.pathname = pathname.replace(/\/.*?\//, '')
      return NextResponse.rewrite(request.nextUrl)

    } else return

  } else {
    request.nextUrl.pathname = `/${headerLocale}${pathname}`
    return NextResponse.redirect(request.nextUrl)
  }
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next).*)',
    // Optional: only run on root (/) URL
    // '/'
  ],
}