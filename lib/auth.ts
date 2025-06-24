import { PrismaAdapter } from '@auth/prisma-adapter'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import type { NextAuthOptions } from 'next-auth'
import db from '@/prisma/db'
import { saltAndHashPassword } from '@/utils/helper'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db) as any,
  session: {
    strategy: 'jwt',
  },
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
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null

        const email = credentials.email
        const password = credentials.password
        const hash = await saltAndHashPassword(password)

        let user = await db.user.findUnique({ where: { email } })

        if (!user) {
          user = await db.user.create({
            data: { email, hashedPassword: hash, role: 'USER' },
          })
        } else {
          const bcrypt = require('bcrypt')

          const isMatch = await bcrypt.compare(password, user.hashedPassword!)
          if (!isMatch) throw new Error('Incorrect Password')
        }

        return {
          ...user,
          role: user.role ?? 'USER',
        }
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

  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (account?.provider === 'google') {
        const prismaUser = await db.user.findUnique({
          where: { email: user.email! },
          select: { hashedPassword: true },
        })

        if (prismaUser && !prismaUser.hashedPassword) {
          return `/updatePassword?email=${user.email}`
        }
      }
      return true
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = user.role
      }
      return token
    },

    async session({ session, token }) {
      if (session.user && token) {
        session.user.id = token.id
        session.user.role = token.role
      }
      return session
    },
  },
}
