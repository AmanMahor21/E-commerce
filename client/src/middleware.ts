import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const currentPath = request.nextUrl.pathname;

  // Skip static files
  if (currentPath.startsWith('/_next') || currentPath.includes('.')) {
    const res = NextResponse.next();
    res.headers.set('x-middleware-cache', 'no-cache');
    return res;
  }

  console.log('Request URL:', request.cookies);
  console.log('Request headers:', Object.fromEntries(request.headers.entries()));
  console.log('Cookies present:', {
    _Tt: request.cookies.get('_Tt')?.value,
    _Trt: request.cookies.get('_Trt')?.value,
  });

  const AccessToken = request.cookies.get('_Tt');
  const RefreshToken = request.cookies.get('_Trt');
  const noToken = !AccessToken || !RefreshToken;

  // If no token and not already on login or otp
  if (noToken && currentPath !== '/login' && currentPath !== '/otp') {
    const res = NextResponse.redirect(new URL('/login', request.url));
    res.headers.set('x-middleware-cache', 'no-cache');
    return res;
  }

  // If tokens exist and user tries to access login
  if (currentPath === '/login' && !noToken) {
    const res = NextResponse.redirect(new URL('/', request.url));
    res.headers.set('x-middleware-cache', 'no-cache');
    return res;
  }

  // If user tries to access /otp directly with tokens or from non-login pages
  if (
    currentPath.startsWith('/otp') &&
    !request.headers.get('referer')?.includes('/login') &&
    AccessToken &&
    RefreshToken
  ) {
    const res = NextResponse.redirect(new URL('/', request.url));
    res.headers.set('x-middleware-cache', 'no-cache');
    return res;
  }

  // If user tries to access /profile without token and not coming from /otp
  if (currentPath === '/profile' && !request.headers.get('referer')?.includes('/otp') && noToken) {
    const res = NextResponse.redirect(new URL('/', request.url));
    res.headers.set('x-middleware-cache', 'no-cache');
    return res;
  }

  // Default pass-through response
  const res = NextResponse.next();
  res.headers.set('x-middleware-cache', 'no-cache');
  return res;
}

export const config = {
  // matcher: ['/login/:path*'],
  matcher: ['/profile/:path*', '/login/:path*', '/otp/:path*'],
};
