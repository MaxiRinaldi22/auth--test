"use client"

import { useState } from "react"
import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar"
import moment from "moment"
import "react-big-calendar/lib/css/react-big-calendar.css"

// Initialize localizer
const localizer = momentLocalizer(moment)

// Mock data for reservations
const reservations = [
  {
    id: 1,
    title: "Reserved",
    start: new Date(2023, 5, 15, 10, 0),
    end: new Date(2023, 5, 15, 11, 0),
  },
  {
    id: 2,
    title: "Reserved",
    start: new Date(2023, 5, 16, 14, 0),
    end: new Date(2023, 5, 16, 15, 0),
  },
]

export default function Calendar() {
  const [events] = useState(reservations)

  return (
    <div className="h-[600px]">
      <BigCalendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "100%" }}
      />
    </div>
  )
}

