import Announcement from '@/components/dashboard/Announcement'
import { AttendanceChart } from '@/components/dashboard/AttendanceChart'
import EventCalendar from '@/components/dashboard/EventCalendar'
import { CountChart } from '@/components/dashboard/CountChart'
import { FollowUpChart } from '@/components/dashboard/FollowUpChart'
import UserCard from '@/components/dashboard/UserCard'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import React from 'react'
import SmallUserCard from '@/components/dashboard/SmallUserCard'
import {
  getLeaderCountsByRole,
  getLeadersCount,
  getUsersCount,
  getWorkersCount,
} from '@/lib/actions/data'

const AdminDashboard = async () => {
  const session = await getServerSession(authOptions)
  // console.log('User', session?.user)

  const membersCount = await getUsersCount()
  const leadersCount = await getLeadersCount()
  // const leadersByRole = await getLeaderCountsByRole()
  const workersCount = await getWorkersCount()
  // console.log('Workers count:', workersCount)

  const countChartData = [
    { attribute: 'Zone1', desktop: 50, fill: '#C3EBFA' },
    { attribute: 'Zone2', desktop: 37, fill: '#CFCEFF' },
    { attribute: 'Zone3', desktop: 46, fill: '#FAE27C' },
    { attribute: 'Zone4', desktop: 43, fill: '#CFCEFF' },
    { attribute: 'Zone5', desktop: 48, fill: '#FAE27C' },
  ]
  const data = {
    title: 'Zones',
    total: 224,
  }
  const chartConfig = {
    zone1: {
      label: 'Zone 1',
      color: '#C3EBFA',
    },
    zone2: {
      label: 'Zone 2',
      color: '#CFCEFF',
    },
    zone3: {
      label: 'Zone 3',
      color: '#FAE27C',
    },
    zone4: {
      label: 'Zone 4',
      color: '#CFCEFF',
    },
    zone5: {
      label: 'Zone 5',
      color: '#FAE27C',
    },
  }

  return (
    <div className='p-4 flex gap-4 flex-col md:flex-row max-h-[calc(100vh-64px)] min-h-[calc(100vh-64px)] overflow-hidden remove-scrollbar'>
      {/* LEFT SIDE  */}
      <div className='w-full lg:w-2/3 flex flex-col gap-8 max-h-[calc(100vh-64px)] min-h-[calc(100vh-64px)] overflow-scroll remove-scrollbar pb-8'>
        {/* USER CARD  */}
        <div className=' bg-clip-content border-4 p-3 rounded-xl flex flex-col gap-4'>
          <div className='flex flex-col lg:flex-row gap-4 justify-between flex-wrap'>
            <UserCard type='members' figure={membersCount.count as any} />
            <UserCard type='workers' figure={workersCount.count as any} />
            <UserCard type='leaders' figure={leadersCount.count as any} />
          </div>
          <div className='flex gap-4 justify-between flex-wrap'>
            <SmallUserCard type='departments' figure='48' />
            <SmallUserCard type='districts' figure='10' />
            <SmallUserCard type='communities' figure='60' />
            <SmallUserCard type='cells' figure='680' />
          </div>
        </div>
        {/* MIDDLE CHARTS  */}
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
          <FollowUpChart />
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

export default AdminDashboard
