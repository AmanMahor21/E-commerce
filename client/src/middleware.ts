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

  const noToken = !AccessToken || !RefreshToken;
  // Public routes that don't need auth
  // if (
  //   currentPath.startsWith('/login') ||
  //   currentPath.startsWith('/otp') ||
  //   currentPath.startsWith('/Profile')
  // ) {
  //   if (AccessToken && RefreshToken && currentPath.startsWith('/login')) {
  //     return NextResponse.redirect(new URL('/', request.url));
  //   }
  console.log(currentPath, 'aaaasd');
  if (request.method !== 'GET') {
    console.log('Non-GET request detected');
  }
  if (!AccessToken || !RefreshToken) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (
    currentPath.startsWith('/otp') &&
    !request.headers.get('referer')?.includes('/login') &&
    !noToken
  ) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  if (currentPath === '/Profile' && !request.headers.get('referer')?.includes('/otp') && noToken) {
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
  matcher: ['/Profile/:path*', '/cart/:path*'],
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
