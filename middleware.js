// middleware.js
import { NextResponse } from 'next/server';

const protectedRoutes = ['/'];

export function middleware(request) {
  // 关键：开发环境直接跳过登录校验，全部放行
  if (process.env.NODE_ENV === 'development') {
    return NextResponse.next(); // 开发模式不拦截，无需登录
  }

  // 以下为生产环境的正常登录校验逻辑（与之前一致）
  const token = request.cookies.get('authToken')?.value;
  const isAccessingProtectedRoute = protectedRoutes.some(route => {
    if (route.endsWith('*')) {
      const baseRoute = route.slice(0, -1);
      return request.nextUrl.pathname.startsWith(baseRoute);
    }
    return request.nextUrl.pathname === route;
  });

  if (isAccessingProtectedRoute && !token) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
    '/api/user/:path*',
    "/"
  ],
};