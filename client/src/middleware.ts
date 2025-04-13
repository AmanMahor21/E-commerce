// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';

// export function middleware(request: NextRequest) {
//   const currentPath = request.nextUrl.pathname;

//   // Skip static files
//   if (currentPath.startsWith('/_next') || currentPath.includes('.')) {
//     return NextResponse.next();
//   }
//   console.log('Request URL:', request.url);
//   console.log('Request URL my :', request);
//   console.log('Request headers:', Object.fromEntries(request.headers.entries()));
//   console.log('Cookies present:', {
//     _Tt: request.cookies.get('_Tt')?.value,
//     _Trt: request.cookies.get('_Trt')?.value,
//   });
//   console.log('Visible cookies:', request.cookies.getAll());

//   const AccessToken = request.cookies.get('_Tt');
//   const RefreshToken = request.cookies.get('_Trt');

//   console.log(AccessToken, 'AccessToken tokekn');
//   console.log(RefreshToken, 'RefreshToken tokekn');

//   // console.log(AccessToken, RefreshToken, 'vvvvvvv');
//   const noToken = !AccessToken || !RefreshToken;
//   console.log(noToken, 'noToken no tokekn');
//   if (noToken && currentPath !== '/login' && currentPath !== '/otp') {
//     console.log('noToken && currentPath !== && currentPath !==');
//     return NextResponse.redirect(new URL('/login', request.url));
//   }

//   // ✅ If tokens exist and user tries to access login, redirect to homepage
//   if (currentPath === '/login' && !noToken) {
//     return NextResponse.redirect(new URL('/', request.url));
//   }

//   if (
//     currentPath.startsWith('/otp') &&
//     !request.headers.get('referer')?.includes('/login') &&
//     AccessToken &&
//     RefreshToken
//   ) {
//     return NextResponse.redirect(new URL('/', request.url));
//   }
//   if (currentPath === '/profile' && !request.headers.get('referer')?.includes('/otp') && noToken) {
//     return NextResponse.redirect(new URL('/', request.url));
//   }
//   //   return NextResponse.next();
//   // }

//   // Protected routes - redirect to login if no tokens
//   // if (!AccessToken || !RefreshToken) {
//   //   return NextResponse.redirect(new URL('/login', request.url));
//   // }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ['/profile/:path*', '/login/:path*'],
//   // matcher: ['/profile/:path*', '/login/:path*', '/otp'],
//   // matcher: ['/profile/:path*', '/cart/:path*', '/login/:path*', '/otp'],
// };

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

  console.log('Request URL:', request.url);
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
  matcher: ['/profile/:path*', '/login/:path*'],
};
