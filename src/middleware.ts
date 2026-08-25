import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Protect /officer and /superadmin routes
  if (
    (pathname.startsWith('/officer') || pathname.startsWith('/superadmin')) && 
    !pathname.startsWith('/officer/login')
  ) {
    const token = request.cookies.get('officer_auth_token');
    
    if (!token) {
      const url = new URL('/officer/login', request.url);
      url.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/officer/:path*', '/superadmin/:path*'],
};
