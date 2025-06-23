// SALT AND HASH PASSWORD

export async function saltAndHashPassword(password: string): Promise<string> {
  const bcrypt = require('bcrypt')
  const saltRounds = 8
  const hash = await bcrypt.hash(password, saltRounds)
  return hash
}

// function getAuthOptions(req: NextRequest) {
//   let providers = [
//     CredentialsProvider({
//       name: 'Credentials',
//       credentials: {
//         email: {
//           label: 'Email',
//           type: 'email',
//           placeholder: 'email@example.com',
//         },
//         password: { label: 'Password', type: 'password' },
//       },
//       async authorize(credentials, req) {
//         if (!credentials || !credentials.email || !credentials.password) {
//           return null
//         }

//         const email = credentials.email as string
//         const hash = saltAndHashPassword(credentials.password)

//         let user = await db.user.findUnique({ where: { email } })

//         const bcrypt = require('bcrypt')

//         const isMatch = bcrypt.compareSync(
//           credentials.password as string,
//           user?.hashedPassword as string
//         )
//         if (!isMatch) throw new Error('Incorrect Password')
//         return user
//       },
//     }),

//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID!,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//     }),
//   ]

//   const isSigninPage =
//     req.method === 'GET' && req.nextUrl.pathname.includes('/api/auth/signin')

//   if (isSigninPage) {
//     providers = providers.filter((p) => p.name !== 'Google')
//   }

//   return {
//     providers,
//     // pages: {
//     //   signIn: '/custom-signin',
//     // },
//     session: {
//       strategy: 'jwt',
//     },
//     callbacks: {
//       async jwt({ token, user }: { token: JWT; user?: User }) {
//         if (user) token.user = user
//         return token
//       },
//       async session({ session, token }: { token: JWT; session?: Session }) {
//         session!.user = token.user as Session['user']
//         return session
//       },
//     },
//   }
// }

// const handler = async (req: NextRequest, ctx: any) => {
//   return NextAuth(getAuthOptions(req) as any)(req, ctx)
// }

// export const GET = handler
// export const POST = handler
