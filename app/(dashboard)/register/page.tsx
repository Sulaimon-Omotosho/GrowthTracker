import RegisterForm from '@/components/forms/RegisterForm'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import React from 'react'

const Register = async ({ params: { userId } }: any) => {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    redirect('/')
  }

  return (
    <div className='flex h-screen max-h-screen'>
      <section className='remove-scrollbar relative flex-1 overflow-y-auto px-[5%] '>
        <div className='mx-auto flex size-full flex-col py-10 max-w-[860px] flex-1'>
          <div className='flex gap-4 items-center mb-12'>
            <Image
              src='/images/logo-hicc.jpeg'
              height={1000}
              width={1000}
              alt='logo'
              className='h-14 w-fit rounded-full ring-1 ring-black'
            />
            <h1 className=' text-lg font-bold'>Growth Tracker</h1>
          </div>

          <RegisterForm userId={userId} session={session} />

          <p className='text-[14px] justify-items-end text-center text-gray-600 xl:text-left py-12'>
            © 2024 Growth Tracker
          </p>
        </div>
      </section>

      <Image
        src='/images/Growthtrack-img1.jpg'
        height={1000}
        width={1000}
        alt='Patient'
        className='hidden h-full object-cover md:max-w-[300px] md:block lg:max-w-[390px] h-[calc(100vh - 16px)]'
      />
    </div>
  )
}

export default Register
