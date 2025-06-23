import db from '@/prisma/db'
import NextAuth, { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { saltAndHashPassword } from '@/utils/helper'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db) as any,

  providers: [
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

        const email = credentials.email as string
        const hash = await saltAndHashPassword(credentials.password)

        let user = (await db.user.findUnique({ where: { email } })) as any

        if (!user) {
          const newUser = await db.user.create({
            data: {
              email,
              hashedPassword: hash as any,
              role: 'USER',
            },
          })

          return { newUser }
        } else {
          const bcrypt = require('bcrypt')

          const isMatch = await bcrypt.compare(
            credentials.password as string,
            user?.hashedPassword as string
          )
          if (!isMatch) {
            throw new Error('Incorrect Password')
          }
        }

        // if (!user.hashedPassword) {
        //   throw new Error('User account not set up for password login.')
        // }

        return {
          ...user,
          role: user.role ?? 'USER',
        }
        // return user
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          role: 'USER',
          address: null,
        }
      },
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,

  session: {
    strategy: 'jwt',
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = (user as any).role
        // token.address = (user as any).address
      }
      return token
    },
    async session({ session, token }) {
      session.user!.id = token.id
      session.user!.role = token.role
      return session
    },
  },
}

// export default NextAuth(authOptions)
const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
