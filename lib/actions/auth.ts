'use server'

import { saltAndHashPassword } from '@/utils/helper'
import AuthError from 'next-auth'

// SIGN UP WITH EMAIL
export const signUpWithEmail = async (formData: FormData) => {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  // const existingUser = await

  try {
    const hash = saltAndHashPassword(password)
    // const newUser = await db.user.create({
    //   data: {
    //     email,
    //     hashedPassword: hash,
    //     role: 'USER',
    //   },
    // })

    return {
      success: true,
      // user: {id: newUser.id}
    }
  } catch (error: any) {
    if (error instanceof AuthError) {
      return { error: 'Something went wrong during signup' }
    }
    throw error
  }
}
