import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const allowedOrigins = [
  'https://ominous-potato-p57p564r9q4299qv-3000.app.github.dev',
  'http://localhost:3000',
  'https://localhost:3000'
];

export function middleware(request: NextRequest) {
  const origin = request.headers.get('origin');
  const forwardedHost = request.headers.get('x-forwarded-host');

  // Si hay conflicto entre origin y x-forwarded-host
  if (origin && forwardedHost && origin !== forwardedHost) {
    if (!allowedOrigins.includes(origin)) {
      return new NextResponse('Origin not allowed', { status: 403 });
    }
  }

  return NextResponse.next();
}
