import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const AUTH_TOKEN = process.env.ADMIN_AUTH_TOKEN || 'dailyido-admin-token-2025'

export function middleware(request: NextRequest) {
  // Only protect /admin routes (except /admin/login and /admin/api)
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Skip login page and API routes
    if (
      request.nextUrl.pathname === '/admin/login' ||
      request.nextUrl.pathname.startsWith('/admin/api')
    ) {
      return NextResponse.next()
    }

    // Check for auth cookie
    const authCookie = request.cookies.get('admin_auth')

    if (!authCookie || authCookie.value !== AUTH_TOKEN) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/admin/:path*',
}
