'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form } from '@/components/ui/form'
import { UserFormValidation } from '@/lib/validation'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import CustomFormField from '../CustomFormField'
import SubmitButton from '../SubmitButton'
import { signIn } from 'next-auth/react'
import { getUserByEmail, signUpWithEmail } from '@/lib/actions/auth'

export enum FormFieldType {
  INPUT = 'input',
  TEXTAREA = 'textarea',
  PHONE_INPUT = 'phoneInput',
  CHECKBOX = 'checkbox',
  DATE_PICKER = 'datePicker',
  TIME_PICKER = 'timePicker',
  SELECT = 'select',
  SKELETON = 'skeleton',
  PASSWORD = 'input',
}

const LoginInForm = () => {
  const router = useRouter()
  const [error, setError] = useState('')
  const [signUp, setSignUp] = useState(false)

  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      password: '',
      email: '',
    },
  })

  // USER SIGN UP
  const signUpUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    const res = await signUpWithEmail(formData)

    if (res?.error) {
      setError(res.error)
      return
    }

    const userId = res?.user?.id

    const signInRes = await signIn('credentials', {
      redirect: false,
      email,
      password,
      callbackUrl: `/register`,
    })

    if (signInRes?.error) {
      setError(signInRes.error)
    } else {
      router.push(signInRes?.url || '/')
    }
  }

  // USER LOG IN
  const loginUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    const existingUser = await getUserByEmail(email)
    if (!existingUser) {
      setError('User not found')
      return
    }

    const role = existingUser.role?.toLowerCase()

    const res = await signIn('credentials', {
      redirect: false,
      email,
      password,
      callbackUrl: `/${role}`,
    })

    if (res?.error) {
      setError(res.error)
    } else {
      router.push(res?.url || '/')
    }
  }

  const handleSubmit = signUp ? signUpUser : loginUser

  const getErrorMessage = (error: string | null) => {
    switch (error) {
      case 'CredentialsSignin':
        return 'Invalid email or password'
      case 'Incorrect Password':
        return 'Wrong password — please try again'
      case 'User not found':
        return 'No account found for that email'
      case 'User already exists':
        return 'An account already exists with that email'
      default:
        return 'Something went wrong. Please try again.'
    }
  }

  return (
    <div className=''>
      <h1 className='font-bold text-center text-xl lg:text-3xl'>
        {signUp ? 'Sign Up' : 'Log In'}
      </h1>
      <Form {...form}>
        <form
          onSubmit={handleSubmit}
          className='space-y-6 flex-1 bg-transparent'
        >
          <div className='relative'>
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name='email'
              label='Email'
              placeholder='JohnDoe@email.com'
              iconSrc='/icons/email.svg'
              iconAlt='email'
            />
            {error && (
              <p className='text-red-500 text-center absolute pl-10'>
                {getErrorMessage(error)}
              </p>
            )}
          </div>

          <CustomFormField
            fieldType={FormFieldType.PASSWORD}
            control={form.control}
            name='password'
            label='Password'
            placeholder='Password'
            iconSrc='/icons/user.svg'
            iconAlt='user'
          />

          {signUp ? (
            <div className=''>
              <SubmitButton>Sign Up</SubmitButton>
              <p className='text-sm pt-2'>
                Have An Account?{' '}
                <span
                  onClick={() => {
                    setSignUp(!signUp)
                  }}
                  className='underline text-blue-500 hover:text-blue-800 pl-2 cursor-pointer'
                >
                  Login
                </span>
              </p>
            </div>
          ) : (
            <div className=''>
              <SubmitButton>Log In</SubmitButton>
              <p className='text-sm pt-2'>
                No Account?{' '}
                <span
                  onClick={() => {
                    setSignUp(!signUp)
                  }}
                  className='underline text-blue-500 hover:text-blue-800 pl-2 cursor-pointer'
                >
                  Sign Up
                </span>
              </p>
            </div>
          )}
        </form>
      </Form>
    </div>
  )
}

export default LoginInForm
