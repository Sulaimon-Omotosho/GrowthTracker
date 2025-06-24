import { menuItems } from '@/constants'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import LogoutButton from '../LogoutButton'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

const Sidebar = async () => {
  const session = await getServerSession(authOptions)

  return (
    <div className='max-h-[90%] overflow-scroll remove-scrollbar'>
      {menuItems.map((i) => (
        <div className='flex flex-col gap-2 ' key={i.title}>
          <span className='hidden lg:block text-gray-600 dark:text-gray-300 font-light my-4'>
            {i.title}
          </span>
          {i.items.map((item) => {
            if (item.visible.includes(session?.user.role!)) {
              return (
                <Link
                  href={item.href}
                  key={item.label}
                  className='flex items-center justify-center lg:justify-start gap-4 text-gray-600 dark:text-gray-300 dark:hover:text-gray-600 py-2 md:px-2 rounded-md hover:bg-blue-400 dark:hover:bg-purple-400'
                >
                  <Image src={item.icon} alt='icon' width={20} height={20} />
                  <span className='hidden lg:block'>{item.label}</span>
                </Link>
              )
            }
          })}
        </div>
      ))}
      <div className='py-5 px-2'>
        <LogoutButton />
      </div>
    </div>
  )
}

export default Sidebar
