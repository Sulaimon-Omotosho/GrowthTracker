import Announcement from '@/components/dashboard/Announcement'
import { AttendanceChart } from '@/components/dashboard/AttendanceChart'
import BigCalendar from '@/components/dashboard/BigCalendar'
import { CountChart } from '@/components/dashboard/CountChart'
import EventCalendar from '@/components/dashboard/EventCalendar'
import { FollowUpChart } from '@/components/dashboard/FollowUpChart'
import { ChartConfig } from '@/components/ui/chart'

import React from 'react'

const countChartData = [
  { attribute: 'Cell1', desktop: 10, fill: '#C3EBFA' },
  { attribute: 'Cell2', desktop: 7, fill: '#CFCEFF' },
  { attribute: 'Cell3', desktop: 6, fill: '#FAE27C' },
  { attribute: 'Cell4', desktop: 13, fill: '#CFCEFF' },
  { attribute: 'Cell5', desktop: 8, fill: '#FAE27C' },
]
const data = {
  title: 'Cells',
  total: 44,
}
const chartConfig = {
  cell1: {
    label: 'APG 1',
    color: '#C3EBFA',
  },
  cell2: {
    label: 'APG 2',
    color: '#CFCEFF',
  },
  cell3: {
    label: 'APG 3',
    color: '#FAE27C',
  },
  cell4: {
    label: 'APG 4',
    color: '#CFCEFF',
  },
  cell5: {
    label: 'APG 5',
    color: '#FAE27C',
  },
}

const ZonalLeadersDashboardPage = async () => {
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

export default ZonalLeadersDashboardPage
