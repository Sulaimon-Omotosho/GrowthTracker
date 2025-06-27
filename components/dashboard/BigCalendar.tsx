'use client'

import moment from 'moment'
import { calendarEvents } from '@/constants/index'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { useState } from 'react'
import { Calendar, momentLocalizer, View, Views } from 'react-big-calendar'

const localizer = momentLocalizer(moment)

const BigCalendar = () => {
  const [view, setView] = useState<View>(Views.WEEK)

  const handleOnChangeView = (selectedView: View) => {
    setView(selectedView)
  }

  return (
    <Calendar
      localizer={localizer}
      events={calendarEvents}
      startAccessor='start'
      endAccessor='end'
      views={['week', 'day']}
      view={view}
      style={{ height: '98%' }}
      onView={handleOnChangeView}
      min={new Date(2025, 1, 0, 8, 0, 0)}
      max={new Date(2025, 1, 0, 22, 0, 0)}
    />
  )
}

export default BigCalendar
