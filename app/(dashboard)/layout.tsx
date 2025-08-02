import Navbar from '@/components/dashboard/Navbar'
import Sidebar from '@/components/dashboard/Sidebar'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

// interface PageProps {
//   params: {
//     pageName: string
//   }
// }
interface LayoutProps {
  children: React.ReactNode
  params: {
    pageName: string
  }
}

const DashboardLayout = ({ children, params }: LayoutProps) => {
  // }: Readonly<{ children: React.ReactNode; params: PageProps }>) => {
  return (
    <div className='max-h-screen min-h-screen remove-scrollbar flex'>
      {/* LEFT  */}
      <div className='w-[14%] md:w-[8%] lg:w-[16%] xl:w-[14%] p-4 '>
        <Link
          href='/'
          className='flex items-center justify-center lg:justify-start gap-2 h-16'
        >
          <Image
            src='/images/logo-hicc.jpeg'
            height={500}
            width={500}
            alt='logo'
            className='h-10 w-fit rounded-full ring-1 ring-black'
          />
          <span className='hidden lg:block font-bold'>Growth Tracker</span>
        </Link>
        <Sidebar params={params} />
      </div>

      {/* RIGHT  */}
      <div className='w-[86%] md:w-[92%] lg:w-[84%] xl:w-[86%] bg-[#F7F8FA] overflow-scroll remove-scrollbar flex flex-col'>
        <Navbar />
        {children}
      </div>
    </div>
  )
}

export default DashboardLayout
