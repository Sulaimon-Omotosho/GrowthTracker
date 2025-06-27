import Announcement from '@/components/dashboard/Announcement'
import BigCalendar from '@/components/dashboard/BigCalendar'
import { PerformanceChart } from '@/components/dashboard/PerformanceChart'
import { db } from '@/lib/db'
import { User } from '@prisma/client'
import { UserIcon, VenusAndMars } from 'lucide-react'
import { getServerSession } from 'next-auth'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import React from 'react'

const SingleMemberPage = async (props: { params: { id: string } }) => {
  const id = await props.params.id
  const session = getServerSession()

  const user = await db.user.findUnique({
    where: { id },
    include: {
      cell: {
        include: {
          zone: {
            include: {
              community: true,
            },
          },
        },
      },
      department: {
        include: {
          team: true,
        },
      },
    },
  })
  if (!user) {
    return notFound()
  }

  return (
    <div className='flex-1 p-4 flex flex-col xl:flex-row gap-4'>
      {/* LEFT  */}
      <div className='w-full xl:w-2/3'>
        {/* TOP  */}
        <div className='flex flex-col lg:flex-row gap-4'>
          {/* USER INFO CARD  */}
          <div className='bg-[#C3EBFA] py-6 px-4 rounded-md flex-1 flex gap-4'>
            {user.image ? (
              <div className='w-1/3'>
                <Image
                  src={user.image}
                  alt='teacher'
                  width={144}
                  height={144}
                  className='w-36 h-36 rounded-full object-cover'
                />
              </div>
            ) : (
              <UserIcon className='w-36 h-36 p-5 bg-[#C3EBFA] rounded-full ring-1 ring-gray-300 shadow-md text-gray-500' />
            )}
            <div className='w-2/3 flex flex-col justify-between gap-4'>
              <h1 className='text-xl font-semibold'>{user.name}</h1>
              <p className='text-sm text-gray-800'>{user.notes}</p>
              <div className='flex items-center justify-between gap-2 flex-col text-xs font-medium'>
                <div className='flex justify-between w-full'>
                  <div className='w-1/2 flex items-center gap-2'>
                    <VenusAndMars className='w-5 h-5' />
                    <span>{user.gender}</span>
                  </div>
                  <div className='w-1/2 flex items-center gap-2'>
                    <Image
                      src='/icons/date.png'
                      alt='icon'
                      width={14}
                      height={14}
                    />
                    <span>
                      {user.birthDate
                        ? new Intl.DateTimeFormat('en-US').format(
                            new Date(user.birthDate)
                          )
                        : 'N/A'}
                    </span>
                  </div>
                </div>

                <div className='w-full flex items-center gap-2'>
                  <Image
                    src='/icons/mail.png'
                    alt='icon'
                    width={14}
                    height={14}
                  />
                  <span>{user.email}</span>
                </div>
                <div className='flex justify-between w-full'>
                  <div className='w-full flex items-center gap-2'>
                    <Image
                      src='/icons/phone.png'
                      alt='icon'
                      width={14}
                      height={14}
                    />
                    <span>{user.phone}</span>
                  </div>
                  <div className='w-full flex items-center gap-2'>
                    <Image
                      src='/icons/worker.png'
                      alt='icon'
                      width={14}
                      height={14}
                    />
                    <span>{user.maritalStatus}</span>
                  </div>
                </div>
                <div className='w-full flex items-center gap-2'>
                  <Image
                    src='/icons/home.png'
                    alt='icon'
                    width={14}
                    height={14}
                  />
                  <span>{user.address}</span>
                </div>
              </div>
            </div>
          </div>
          {/* SMALL CARDS  */}
          <div className='flex-1 flex gap-4 justify-between flex-wrap'>
            {/* CARD  */}
            <div className='w-full bg-white p-4 rounded-md flex gap-4 md:w-[48%] xl:w-[45%] 2xl:w-[48%]'>
              <Image
                src='/icons/singleAttendance.png'
                alt='icon'
                width={24}
                height={24}
                className='w-6 h-6'
              />
              <div className=''>
                <h1 className='text-xl font-semibold'>90%</h1>
                <span className=' text-sm text-gray-800'>Attendance</span>
              </div>
            </div>
            {/* CARD  */}
            <div className='w-full bg-white p-4 rounded-md flex gap-4 md:w-[48%] xl:w-[45%] 2xl:w-[48%]'>
              <Image
                src='/icons/singleBranch.png'
                alt='icon'
                width={24}
                height={24}
                className='w-6 h-6'
              />
              <div className=''>
                <h1 className='text-xl font-semibold'>
                  {user.department?.name}
                </h1>
                <span className=' text-sm text-gray-800'>
                  {user.department?.team?.name}
                </span>
              </div>
            </div>
            {/* CARD  */}
            <div className='w-full bg-white p-4 rounded-md flex gap-4 md:w-[48%] xl:w-[45%] 2xl:w-[48%]'>
              <Image
                src='/icons/singleLesson.png'
                alt='icon'
                width={24}
                height={24}
                className='w-6 h-6'
              />
              <div className=''>
                <h1 className='text-xl font-semibold'>{user.cell?.name}</h1>
                <span className=' text-sm text-gray-800'>
                  {user.cell?.zone.community.name}
                </span>
              </div>
            </div>
            {/* CARD  */}
            <div className='w-full flex-col bg-white p-2 rounded-md flex gap-2 md:w-[48%] xl:w-[45%] 2xl:w-[48%]'>
              <h1 className='text-sm font-bold'>Completed Courses</h1>
              <div className='flex flex-col gap-1'>
                <p className=' text-sm text-gray-800'>Growth Track</p>
                <p className=' text-sm text-gray-800'>Foundation Course</p>
                <p className=' text-sm text-gray-800'>
                  Basic Leadership Course
                </p>
                <p className=' text-md text-gray-800'>...</p>
              </div>
            </div>
          </div>
        </div>
        {/* BOTTOM  */}
        <div className='mt-4 bg-white dark:bg-black rounded-md p-4 h-[800px]'>
          <h1 className=''>Member&apos;s Schedule</h1>
          <BigCalendar />
        </div>
      </div>
      {/* RIGHT  */}
      <div className='w-full xl:w-1/3 flex flex-col gap-4'>
        <div className='bg-white dark:bg-black rounded-md p-4'>
          <h1 className='text-xl font-semibold'>Certificates</h1>
          <div className='mt-4 flex gap-4 flex-wrap text-xs text-gray-800'>
            <Link href='/' className='p-3 rounded-md bg-[#EDF9FD]'>
              Growth Track
            </Link>
            <Link href='/' className='p-3 rounded-md bg-[#F1F0FF]'>
              Foundation Course
            </Link>
            <Link href='/' className='p-3 rounded-md bg-pink-50'>
              Basic Leadership Course
            </Link>
            <Link href='/' className='p-3 rounded-md bg-[#EDF9FD]'>
              Advanced Leadership Course
            </Link>
            <Link href='/' className='p-3 rounded-md bg-[#FEFCE8]'>
              Pastoral Leadership Course
            </Link>
          </div>
        </div>
        <PerformanceChart />
        <Announcement />
      </div>
    </div>
  )
}

export default SingleMemberPage
