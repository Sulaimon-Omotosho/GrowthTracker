import React from 'react'
import { Button } from './ui/button'
import Image from 'next/image'

const LoginGoogle = () => {
  return (
    <Button
      // onClick={handleLogin}
      className='flex gap-4 p-4 ring-1 ring-orange-400 dark:ring-orange-200 rounded-md w-full hover:cursor-pointer'
    >
      <Image
        src='/images/google.png'
        alt=''
        width={20}
        height={20}
        className='object-contain'
      />
      <span>Use Google</span>
    </Button>
  )
}

export default LoginGoogle
