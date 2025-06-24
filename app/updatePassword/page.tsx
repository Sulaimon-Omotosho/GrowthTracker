'use client'

import CustomFormField, { FormFieldType } from '@/components/CustomFormField'
import SubmitButton from '@/components/SubmitButton'
import { UserFormValidation } from '@/lib/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form } from '@/components/ui/form'
import { updatePassword } from '@/lib/actions/auth'
import { useRouter, useSearchParams } from 'next/navigation'
import { signIn } from 'next-auth/react'

const PasswordUpdate = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const emailParam = searchParams.get('email') || ''

  const [message, setMessage] = useState('')
  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      password: '',
      email: emailParam,
    },
  })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    const res = await updatePassword(formData)

    if (res?.success) {
      signIn('google', { callbackUrl: '/admin' })
    } else {
      alert('Failed to update password. Try again.')
    }
  }

  return (
    <div className='flex h-screen justify-center items-center'>
      <div className='flex gap-2 flex-col'>
        <h1 className='font-bold text-center text-xl lg:text-3xl'>
          Password Required
        </h1>
        <h1 className='font-bold text-center text-xl lg:text-3xl'></h1>
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
                placeholder={emailParam}
                iconSrc='/icons/email.svg'
                iconAlt='email'
              />
              {/* {error && (
                <p className='text-red-500 text-center absolute pl-10'>
                  {getErrorMessage(error)}
                </p>
              )} */}
            </div>
            <CustomFormField
              fieldType={FormFieldType.PASSWORD}
              control={form.control}
              name='password'
              placeholder='New Password'
              iconSrc='/icons/user.svg'
              iconAlt='user'
            />
            <SubmitButton>Update Password</SubmitButton>
          </form>
        </Form>
        {message && (
          <p className='text-sm text-center text-red-500'>{message}</p>
        )}
      </div>
    </div>
  )
}

export default PasswordUpdate
