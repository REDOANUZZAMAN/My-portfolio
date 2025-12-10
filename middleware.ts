import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname;

  // Block /admin route - redirect to home
  if (path === '/admin' || path.startsWith('/admin/')) {
    const homeUrl = new URL('/', request.url);
    return NextResponse.redirect(homeUrl, { status: 308 });
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/admin',
    '/admin/:path*'
  ],
};
