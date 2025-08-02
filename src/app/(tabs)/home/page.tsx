'use client'

import CreateSchedule from '@/components/dialogs/CreateSchedule'
import { Dialog } from '@/components/ui/dialog'
import React, { useEffect } from 'react'
import { useGetSchedulesQuery } from '@/store/api'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

const Homepage = () => {
  const router = useRouter()
  const [open, setOpen] = React.useState(false);
  const { data, isLoading } = useGetSchedulesQuery();
  const schedules = data?.schedules || [];
  
   if (isLoading) {
     return <div>Loading...</div>;
   }
  
  return (

    <div className='bg-gray-300 w-full h-[100vh] overflow-auto'>
      <h1 className='text-2xl font-bold ml-5 mt-5 '>Scheduling</h1>
      <div className='grid grid-cols-3 mt-5 gap-5 mx-5'>
          {schedules?.map((schedule) => (
        <div key={schedule.id} className='flex flex-col bg-white justify-center p-5 rounded-md max-w-[400px]'>
          <h1 className='text-2xl font-bold border-b-2 border-black py-2'>{schedule.name}</h1>
          <p className="items-center mt-5 bg-gray-200 px-3 h-[135px] rounded-md pt-2 break-words whitespace-pre-wrap">
  {schedule .description}
</p>
          <div className='flex flex-row gap-5 mt-5'>
              <div className=' flex flex-row gap-2 text-[15px]'>
                <h1 className='font-bold'>Year:</h1>
                <h1>{schedule.year}</h1>
              </div>
              <div className=' flex flex-row gap-2 text-[15px]'>
                <h1 className='font-bold'>Semester:</h1>
                <h1>{schedule.semester}</h1>
              </div>
              
          </div>
          
            <button className='mt-5 p-3 bg-green-800 rounded-md font-bold text-white cursor-pointer hover:bg-green-900'>Edit</button>
        </div>
          ))}
      </div>

      <Dialog onOpenChange={setOpen} open={open}>
          <button onClick={() => setOpen(true)} className='absolute bottom-5 right-5 py-3 px-5 bg-[#0b6602] rounded-full hover:bg-[#0b7804] text-white cursor-pointer'>Add Schedule</button>
        <CreateSchedule onOpenChange={setOpen}/>
      </Dialog>
    </div>
    /* <div className='flex-col p-5 w-full'>
      <h1 className='text-3xl font-extrabold'>Schedules</h1>
      <div className='flex-1 flex gap-5 mt-10'>
        {schedules?.map((schedule) => (
          <div key={schedule.id} className='p-2 border border-zinc-400 rounded-lg flex flex-col max-w-[300px] cursor-pointer'>
          <h1 className='text-xl font-bold'>{schedule.name}</h1>
          <p className='text-sm text-zinc-500'>{schedule.description}</p>
          <h1 className='font-semibold text-sm'>Year: <span className='text-sm font-normal text-zinc-500 '>{schedule.year}</span></h1>
          <h1 className='font-semibold text-sm'>Semester: <span className='text-sm font-normal text-zinc-500 '>{schedule.semester}</span></h1>
          <Button onClick={() => router.push(`/${schedule.id}`)}>Edit</Button>
        </div>
        ))}
      </div>
      <Dialog onOpenChange={setOpen} open={open}>
          <button onClick={() => setOpen(true)} className='absolute bottom-5 right-5 py-3 px-5 bg-[#0b6602] rounded-full hover:bg-[#0b7804] text-white cursor-pointer'>Add Schedule</button>
        <CreateSchedule onOpenChange={setOpen}/>
      </Dialog>
    </div> */


  )
}

export default Homepage