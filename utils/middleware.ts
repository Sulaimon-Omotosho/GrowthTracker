import withAuth, { NextRequestWithAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  function middleware(req: NextRequestWithAuth) {
    const token = req.nextauth.token
    const { pathname } = req.nextUrl

    if (token && pathname === '/') {
      const redirectUrl = new URL('/redirect', req.url)
      return NextResponse.redirect(redirectUrl)
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const pathname = req.nextUrl.pathname

        if (!token) return false

        if (pathname.startsWith('/admin')) {
          return token?.role === 'ADMIN'
        }
        return true
      },
    },
  }
)

export const config = {
  matcher: ['/admin/:path*', '/dashboard/:path*', '/profile/:path*'],
}
