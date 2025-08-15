import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;

  const { pathname } = request.nextUrl;

  // Allow requests to public routes like /signin or static files
  if (pathname.startsWith('/signin') || pathname.startsWith('/_next') || pathname.startsWith('/favicon.ico')) {
    return NextResponse.next();
  }

  // If no token → redirect to /signin
  if (!token) {
    return NextResponse.redirect(new URL('/signin', request.url));
  }

  // Otherwise → allow
  return NextResponse.next();
}

// Apply middleware to all routes except static files
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
