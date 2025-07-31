'use client'

import CreateSchedule from '@/components/dialogs/CreateSchedule'
import { Dialog } from '@/components/ui/dialog'
import React from 'react'
import { useGetSchedulesQuery } from '@/store/api'
import Link from 'next/link'

const Homepage = () => {
  const [open, setOpen] = React.useState(false);
  const { data, isLoading } = useGetSchedulesQuery();
  const schedules = data?.schedules || [];
  
  if (isLoading) {
    return <div>Loading...</div>;
  }
  
  return (
    <div className='flex-col p-5 w-full'>
      <h1 className='text-3xl font-extrabold'>Schedules</h1>
      <div className='flex-1 flex gap-5 mt-10'>
        {schedules?.map((schedule) => (
          <Link href={`/${schedule.id}`} key={schedule.id} className='p-2 border border-zinc-400 rounded-lg flex flex-col max-w-[300px] cursor-pointer'>
          <h1 className='text-xl font-bold'>{schedule.name}</h1>
          <p className='text-sm text-zinc-500'>{schedule.description}</p>
          <h1 className='font-semibold text-sm'>Year: <span className='text-sm font-normal text-zinc-500 '>{schedule.year}</span></h1>
          <h1 className='font-semibold text-sm'>Semester: <span className='text-sm font-normal text-zinc-500 '>{schedule.semester}</span></h1>
        </Link>
        ))}
      </div>
      <Dialog onOpenChange={setOpen} open={open}>
          <button onClick={() => setOpen(true)} className='absolute bottom-5 right-5 py-3 px-5 bg-[#0b6602] rounded-full hover:bg-[#0b7804] text-white cursor-pointer'>Add Schedule</button>
        <CreateSchedule onOpenChange={setOpen}/>
      </Dialog>
    </div>
  )
}

export default Homepage