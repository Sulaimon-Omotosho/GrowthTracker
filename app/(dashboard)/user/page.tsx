import Announcement from '@/components/dashboard/Announcement'
import BigCalendar from '@/components/dashboard/BigCalendar'
import EventCalendar from '@/components/dashboard/EventCalendar'
import React from 'react'

const MembersDashboardPage = async () => {
  return (
    <div className='p-4 flex gap-4 flex-col md:flex-row max-h-[calc(100vh-64px)] min-h-[calc(100vh-64px)] overflow-hidden remove-scrollbar'>
      {/* LEFT SIDE  */}
      <div className='w-full lg:w-2/3 flex flex-col gap-8 max-h-[calc(100vh-64px)] min-h-[calc(100vh-64px)] overflow-scroll remove-scrollbar pb-8'>
        <BigCalendar />
      </div>
      {/* RIGHT SIDE  */}
      <div className='w-full lg:w-1/3 flex flex-col gap-8max-h-screen min-h-screen overflow-scroll remove-scrollbar pb-28'>
        <EventCalendar />
        <Announcement />
      </div>
    </div>
  )
}

export default MembersDashboardPage
