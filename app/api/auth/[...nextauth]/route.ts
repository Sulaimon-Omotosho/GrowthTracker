import NextAuth, { Session, User } from 'next-auth'
import { JWT } from 'next-auth/jwt'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import { NextRequest } from 'next/server'

function getAuthOptions(req: NextRequest) {
  let providers = [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'email@example.com',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        if (!credentials || !credentials.email || !credentials.password) {
          return null
        }

        const res = await fetch('http://localhost:3000/api/login', {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: { 'Content-Type': 'application/json' },
        })

        const user = await res.json()

        if (res.ok && user) return user
        return null
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ]

  const isSigninPage =
    req.method === 'GET' && req.nextUrl.pathname.includes('/api/auth/signin')

  if (isSigninPage) {
    providers = providers.filter((p) => p.name !== 'Google')
  }

  return {
    providers,
    // pages: {
    //   signIn: '/custom-signin',
    // },
    session: {
      strategy: 'jwt',
    },
    callbacks: {
      async jwt({ token, user }: { token: JWT; user?: User }) {
        if (user) token.user = user
        return token
      },
      async session({ session, token }: { token: JWT; session?: Session }) {
        session!.user = token.user as Session['user']
        return session
      },
    },
  }
}

const handler = async (req: NextRequest, ctx: any) => {
  return NextAuth(getAuthOptions(req) as any)(req, ctx)
}

export const GET = handler
export const POST = handler
