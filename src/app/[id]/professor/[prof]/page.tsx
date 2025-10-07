'use client'

import React, { useState } from 'react'
import { useGetProfAssignQuery, useGetProfessorQuery, useGetScheduleQuery, useGetTestQuery, useGetWeeklyProfQuery } from '@/store/api';
import { useParams } from 'next/navigation'
import { Button } from '@/components/ui/button';
import { Dialog } from '@/components/ui/dialog';
import CreateClass from '@/components/dialogs/CreateClass'
import ScheduleTable from '@/components/ScheduleTable';

const ProfessorPage = ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = React.use(params);   
    const param = useParams();
    const professorId = param.prof as string;
    const { data: prof, isLoading: profLoading } = useGetProfessorQuery(professorId)
    const { data: schedule, isLoading: scheduleLoading } = useGetScheduleQuery(id)
    const { data: profAssigned, isLoading: assignProfLoading } = useGetProfAssignQuery({ scheduleId: id, professorId})
    const { data: section, isLoading: sectionLoading } = useGetTestQuery(id)
    const { data: profSchedules, isLoading: profSchedLoading } = useGetWeeklyProfQuery({professorId, scheduleId: id})
    const [open, setOpen] = useState(false)

    if(profLoading || scheduleLoading || assignProfLoading || sectionLoading || profSchedLoading) return <div>Loading...</div>
    
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
        <Dialog open={open} onOpenChange={setOpen}>
          <Button onClick={() => setOpen(true)} variant={'outline'}>Add Class</Button>
          <CreateClass setOpen={setOpen} data={profAssigned} scheduleId={id} professorId={professorId} section={section}/>
        </Dialog>
      </div>
      <div className="overflow-auto mt-5">
      <ScheduleTable schedule={profSchedules ?? {}}/>
    </div>
    </div>
  )
}

export default ProfessorPage