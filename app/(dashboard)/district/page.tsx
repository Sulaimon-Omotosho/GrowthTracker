import Announcement from '@/components/dashboard/Announcement'
import { AttendanceChart } from '@/components/dashboard/AttendanceChart'
import BigCalendar from '@/components/dashboard/BigCalendar'
import { CountChart } from '@/components/dashboard/CountChart'
import EventCalendar from '@/components/dashboard/EventCalendar'
import { FollowUpChart } from '@/components/dashboard/FollowUpChart'
import { ChartConfig } from '@/components/ui/chart'

import React from 'react'

const countChartData = [
  { attribute: 'Comm1', desktop: 243, fill: '#C3EBFA' },
  { attribute: 'Comm2', desktop: 210, fill: '#CFCEFF' },
  { attribute: 'Comm3', desktop: 224, fill: '#FAE27C' },
  { attribute: 'Comm4', desktop: 143, fill: '#CFCEFF' },
  // { attribute: 'Zone5', desktop: 48, fill: '#FAE27C' },
]
const data = {
  title: 'Alpha District',
  total: 820,
}
const chartConfig = {
  comm1: {
    label: 'Gbagada',
    color: '#C3EBFA',
  },
  comm2: {
    label: 'Iyana Oworo',
    color: '#CFCEFF',
  },
  comm3: {
    label: 'Ogudu/Alapere',
    color: '#FAE27C',
  },
  comm4: {
    label: 'Ifako',
    color: '#CFCEFF',
  },
  // community5: {
  //   label: 'Ifako',
  //   color: '#FAE27C',
  // },
}

const DistrictPastorsDashboardPage = async () => {
  return (
    <div className='px-4 flex gap-4 flex-col md:flex-row max-h-[calc(100vh-64px)] min-h-[calc(100vh-64px)] overflow-hidden remove-scrollbar'>
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
      <div className='w-full lg:w-1/3 flex flex-col gap-8 max-h-screen min-h-screen overflow-scroll remove-scrollbar pb-28'>
        <EventCalendar />
        <Announcement />
      </div>
    </div>
  )
}

export default DistrictPastorsDashboardPage
