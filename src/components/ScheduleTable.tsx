'use client'

import React from 'react'

const timeSlots = [
  { start: '7:00 AM', end: '7:30 AM' },
  { start: '7:30 AM', end: '8:00 AM' },
  { start: '8:00 AM', end: '8:30 AM' },
  { start: '8:30 AM', end: '9:00 AM' },
  { start: '9:00 AM', end: '9:30 AM' },
  { start: '9:30 AM', end: '10:00 AM' },
  { start: '10:00 AM', end: '10:30 AM' },
  { start: '10:30 AM', end: '11:00 AM' },
  { start: '11:00 AM', end: '11:30 AM' },
  { start: '11:30 AM', end: '12:00 PM' },
  { start: '12:00 PM', end: '12:30 PM' },
  { start: '12:30 PM', end: '1:00 PM' },
  { start: '1:00 PM', end: '1:30 PM' },
  { start: '1:30 PM', end: '2:00 PM' },
  { start: '2:00 PM', end: '2:30 PM' },
  { start: '2:30 PM', end: '3:00 PM' },
  { start: '3:00 PM', end: '3:30 PM' },
  { start: '3:30 PM', end: '4:00 PM' },
  { start: '4:00 PM', end: '4:30 PM' },
  { start: '4:30 PM', end: '5:00 PM' },
  { start: '5:00 PM', end: '5:30 PM' },
  { start: '5:30 PM', end: '6:00 PM' },
  { start: '6:00 PM', end: '6:30 PM' },
  { start: '6:30 PM', end: '7:00 PM' },
]

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

const normalize = (time: string) => {
  const [hourMin, ampm] = time.split(' ')
  const [hourRaw, minRaw] = hourMin.split(':')
  let hour = Number(hourRaw)
  const min = Number(minRaw)

  if (ampm === 'PM' && hour !== 12) hour += 12
  if (ampm === 'AM' && hour === 12) hour = 0

  return `${hour}:${min.toString().padStart(2, '0')}`
}

type ClassScheduleTableProps = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    schedule?: any
}
const ClassScheduleTable = ({ schedule }: ClassScheduleTableProps) => {

    const classSchedule = schedule?.classSchedule ?? []
    
  return (
    <div className="overflow-auto">
      <table className="min-w-full border text-sm">
        <thead>
          <tr>
            <th className="border px-4 py-2 text-left bg-gray-100">Time</th>
            {days.map((day) => (
              <th key={day} className="border px-4 py-2 text-center bg-gray-100">
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {timeSlots.map(({ start, end }) => {
            const label = `${start} - ${end}`
            const normalizedStart = normalize(start)
            const normalizedEnd = normalize(end)

            return (
              <tr key={label}>
                <td className="border px-4 py-2 font-medium bg-gray-50">{label}</td>
                {days.map((day) => {
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  const match = classSchedule.find((s: any) => s.day === day)
                  const isClassTime =
                    match &&
                    match.time.includes(normalizedStart) &&
                    match.time.includes(normalizedEnd)

                  return (
                    <td
                      key={`${day}-${label}`}
                      className={`border px-4 py-2 text-center ${
                        isClassTime ? 'bg-blue-300 font-semibold' : ''
                      }`}
                    >
                      {isClassTime ? 'CLASS' : ''}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default ClassScheduleTable
