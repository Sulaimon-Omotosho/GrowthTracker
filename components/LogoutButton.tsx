'use client'

import { signOut } from 'next-auth/react'
import Image from 'next/image'

const LogoutButton = () => {
  const handleLogout = async () => {
    await signOut({ callbackUrl: '/' })
  }
  return (
    <>
      <div
        onClick={handleLogout}
        className='flex items-center justify-center bg-gray-300 gap-4 text-gray-800 py-2 md:px-2 rounded-md hover:bg-gray-200 hover:shadow-md transition duration-300 cursor-pointer'
      >
        <Image src='/icons/logout.png' alt='icon' width={20} height={20} />
        <span className=' lg:block'>Logout</span>
      </div>
    </>
  )
}

export default LogoutButton
