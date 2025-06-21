'use client'

import React from 'react'
import { Button } from './ui/button'
import { useFormStatus } from 'react-dom'
import { Loader2Icon } from 'lucide-react'

interface ButtonProps {
  isLoading?: boolean
  className?: string
  children?: React.ReactNode
}

const SubmitButton = ({ isLoading, className, children }: ButtonProps) => {
  const { pending } = useFormStatus()
  return (
    <Button
      type='submit'
      disabled={pending || isLoading}
      className={
        className ??
        'bg-green-600 text-white w-full hover:bg-green-300 hover:cursor-pointer'
      }
    >
      {pending || isLoading ? (
        <div className='flex items-center gap-4'>
          <Loader2Icon className='animate-spin' />
          Please wait
        </div>
      ) : (
        children
      )}
    </Button>
  )
}

export default SubmitButton
