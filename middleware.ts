import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export const middleware = createMiddleware(routing);

export const config = {
  matcher: '/((?!api|stripe|admin|trpc|_next|_vercel|.*\\..*).*)' //añadí excepción a stripe 
}
