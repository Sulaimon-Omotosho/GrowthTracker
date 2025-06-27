import Announcement from '@/components/dashboard/Announcement'
import { AttendanceChart } from '@/components/dashboard/AttendanceChart'
import BigCalendar from '@/components/dashboard/BigCalendar'
import { CountChart } from '@/components/dashboard/CountChart'
import EventCalendar from '@/components/dashboard/EventCalendar'
import { FollowUpChart } from '@/components/dashboard/FollowUpChart'
import { ChartConfig } from '@/components/ui/chart'

import React from 'react'

const countChartData = [
  { attribute: 'Male', desktop: 4, fill: '#C3EBFA' },
  { attribute: 'Female', desktop: 7, fill: '#CFCEFF' },
  { attribute: 'Children', desktop: 4, fill: '#FAE27C' },
]
const data = {
  title: 'Members',
  total: 15,
}
const chartConfig = {
  male: {
    label: 'Male',
    color: '#C3EBFA',
  },
  female: {
    label: 'Female',
    color: '#CFCEFF',
  },
  children: {
    label: 'Children',
    color: '#FAE27C',
  },
}

const CellLeadersDashboardPage = async () => {
  return (
    <div className='p-4 flex gap-4 flex-col md:flex-row max-h-[calc(100vh-64px)] min-h-[calc(100vh-64px)] overflow-hidden remove-scrollbar'>
      {/* LEFT SIDE  */}
      <div className='w-full lg:w-2/3 flex flex-col gap-8 max-h-[calc(100vh-64px)] min-h-[calc(100vh-64px)] overflow-scroll remove-scrollbar pb-8'>
        {/* TOP CHARTS  */}
        <div className='flex gap-4 flex-col lg:flex-row'>
          {/* COUNT CHART  */}
          <div className='w-full lg:w-1/3 h-[450px]'>
            <CountChart
              desktopData={countChartData}
              data={data}
              chartConfig={chartConfig}
            />
          </div>
          {/* ATTENDANCE CHART  */}
          <div className='w-full lg:w-2/3 h-[450px]'>
            <AttendanceChart />
          </div>
        </div>
        {/* BOTTOM CHARTS  */}
        <div className='w-full'>
          {/* <FollowUpChart /> */}
          <BigCalendar />
        </div>
      </div>
      {/* RIGHT SIDE  */}
      <div className='w-full lg:w-1/3 flex flex-col gap-8max-h-screen min-h-screen overflow-scroll remove-scrollbar pb-28'>
        <EventCalendar />
        <Announcement />
      </div>
    </div>
  )
}

export default CellLeadersDashboardPage
