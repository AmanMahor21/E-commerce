import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const currentPath = request.nextUrl.pathname;

  // Skip static files
  if (currentPath.startsWith('/_next') || currentPath.includes('.')) {
    return NextResponse.next();
  }

  const AccessToken = request.cookies.get('_Tt');
  const RefreshToken = request.cookies.get('_Trt');

  // console.log(AccessToken, RefreshToken, 'vvvvvvv');
  const noToken = !AccessToken || !RefreshToken;
  if (noToken && currentPath !== '/login' && currentPath !== '/otp') {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // ✅ If tokens exist and user tries to access login, redirect to homepage
  if (currentPath === '/login' && !noToken) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (
    currentPath.startsWith('/otp') &&
    !request.headers.get('referer')?.includes('/login') &&
    AccessToken &&
    RefreshToken
  ) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  if (currentPath === '/profile' && !request.headers.get('referer')?.includes('/otp') && noToken) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  //   return NextResponse.next();
  // }

  // Protected routes - redirect to login if no tokens
  // if (!AccessToken || !RefreshToken) {
  //   return NextResponse.redirect(new URL('/login', request.url));
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ['/profile/:path*', '/cart/:path*', '/login/:path*', '/otp'],
};

// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';

// export function middleware(request: NextRequest) {
//   const currentPath = request.nextUrl.pathname;

//   // Skip static files
//   if (currentPath.startsWith('/_next') || currentPath.includes('.')) {
//     return NextResponse.next();
//   }

//   const AccessToken = request.cookies.get('_Tt');
//   const RefreshToken = request.cookies.get('_Trt');

//   // Public routes that don't need auth
//   if (
//     currentPath.startsWith('/login') ||
//     currentPath.startsWith('/otp') ||
//     currentPath.startsWith('/Profile')
//   ) {
//     if (AccessToken && RefreshToken && currentPath.startsWith('/login')) {
//       return NextResponse.redirect(new URL('/', request.url));
//     }

//     if (currentPath.startsWith('/otp') && !request.headers.get('referer')?.includes('/login')) {
//       return NextResponse.redirect(new URL('/login', request.url));
//     }
//     if (currentPath === '/Profile' && !request.headers.get('referer')?.includes('/otp')) {
//       return NextResponse.redirect(new URL('/', request.url));
//     }
//     return NextResponse.next();
//   }

//   // Protected routes - redirect to login if no tokens
//   if (!AccessToken || !RefreshToken) {
//     return NextResponse.redirect(new URL('/login', request.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ['/api/:path*', '/:path*'],
// };
