'use server'

import db from '@/prisma/db'
import { saltAndHashPassword } from '@/utils/helper'
import AuthError from 'next-auth'
import { signIn } from 'next-auth/react'
import { revalidatePath } from 'next/cache'

// GET USER BY EMAIL
export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        email,
      },
    })
    return user
  } catch (error) {
    console.error(error)
    return null
  }
}

// SIGN UP WITH EMAIL
export const signUpWithEmail = async (formData: FormData) => {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const existingUser = await getUserByEmail(email)
  if (existingUser) {
    return { error: 'User already exists' }
  }
  console.log('form data', formData)

  try {
    const hash = await saltAndHashPassword(password)
    const newUser = await db.user.create({
      data: {
        email,
        hashedPassword: hash as string,
        role: 'USER',
      },
    })

    return {
      success: true,
      user: { id: newUser.id },
    }
  } catch (error: any) {
    if (error instanceof AuthError) {
      return { error: 'Something went wrong during signup' }
    }
    throw error
  }
}

// LOGIN WITH EMAIL
export const loginWithEmail = async (formData: FormData) => {
  const email = formData.get('email') as string
  const password = formData.get('password')

  const existingUser = await getUserByEmail(email)
  if (!existingUser) {
    return { error: 'User not found' }
  }

  const loginData = {
    email,
    password,
    role: existingUser.role,
    redirectTo: '/redirect',
  }

  try {
    await signIn('credentials', loginData)
  } catch (error: any) {
    if (error instanceof AuthError) {
      switch (error) {
        case 'CredentialsSignin':
          return { error: 'Invalid Credentials' }
        default:
          return { error: 'Wrong Password' }
      }
    }
    throw error
  }
  revalidatePath('/redirect')
}
