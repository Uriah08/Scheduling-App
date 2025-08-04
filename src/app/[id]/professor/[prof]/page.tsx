'use client'

import React from 'react'
import { useGetProfAssignQuery, useGetProfessorQuery, useGetScheduleQuery } from '@/store/api';
import { useParams } from 'next/navigation'
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import CreateClass from '@/components/dialogs/CreateClass'
import { timeSlots, days } from '@/schemas';

const ProfessorPage = ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = React.use(params);   
    const param = useParams();
    const professorId = param.prof as string;
    const { data: prof, isLoading: profLoading } = useGetProfessorQuery(professorId)
    const { data: schedule, isLoading: scheduleLoading } = useGetScheduleQuery(id)
    const { data: profAssigned, isLoading: assignProfLoading } = useGetProfAssignQuery({ scheduleId: id, professorId})

    if(profLoading || scheduleLoading || assignProfLoading) return <div>Loading...</div>
    
  return (
    <div className='p-5 flex flex-col w-full'>
      <h1 className='text-3xl font-bold'>{prof?.firstName.toUpperCase()} {prof?.middleInitial?.toUpperCase()}. {prof?.lastName.toUpperCase()}</h1>
      <h1 className='text-2xl font-bold mt-5 text-center'>FACULTY CLASS SCHEDULE</h1>
      <h1 className='text-lg font-semibold mt-1 text-center'>{schedule?.semester} A.Y. {schedule?.year}</h1>
      <div className='flex justify-between items-center'>
        <div className='w-full mt-5 flex flex-col'>
          <h1>NAME: <span className='font-bold'>{prof?.firstName.toUpperCase()} {prof?.middleInitial?.toUpperCase()}. {prof?.lastName.toUpperCase()}</span></h1>
          <h1>TCH PER WEEK:</h1>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant={'outline'}>Add Class</Button>
          </DialogTrigger>
          <CreateClass data={profAssigned}/>
        </Dialog>
      </div>
      <div className="overflow-auto">
      <table className="min-w-full border border-gray-300 text-sm">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2 text-left bg-gray-200">Time</th>
            {days.map((day) => (
              <th key={day} className="border border-gray-300 p-2 text-center bg-gray-100">
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {timeSlots.map((slot, idx) => (
            <tr key={idx}>
              <td className="border border-gray-300 p-2 font-semibold bg-gray-50">{slot}</td>
              {days.map((day) => (
                <td key={day + idx} className="border border-gray-300 p-2 h-10 text-center">
                  {/* You can dynamically render subject info here */}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  )
}

export default ProfessorPage