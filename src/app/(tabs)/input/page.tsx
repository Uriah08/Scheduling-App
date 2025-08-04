'use client'

import CreateCourse from '@/components/dialogs/CreateCourse';
import CreateProfessor from '@/components/dialogs/CreateProfessor';
import CreateRoom from '@/components/dialogs/CreateRoom';
import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import React from 'react'

const InputPage = () => {
  const [ openProfessorDialog, setOpenProfessorDialog ] = React.useState(false);
  const [ openCourseDialog, setOpenCourseDialog ] = React.useState(false)
  const [ openRoomDialog, setOpenRoomDialog ] = React.useState(false)
  return (
    <div className='flex flex-col p-5 gap-5 w-full'>
      <h1 className='text-3xl font-extrabold'>Inputs</h1>
      <div className='grid grid-cols-2 gap-5 w-full'>
        <div className='p-3 rounded-xl border border-zinc-300 flex-col gap-3'>
          <div className='flex justify-between items-center'>
            <h1 className='text-xl font-semibold'>Professors</h1>
            <Dialog open={openProfessorDialog} onOpenChange={setOpenProfessorDialog}>
              <DialogTrigger asChild>
                <Button className='bg-[#0b6602] hover:bg-[#0b7804] text-white cursor-pointer'>Add Professor</Button>
              </DialogTrigger>
              <CreateProfessor onOpenChange={setOpenProfessorDialog}/>
            </Dialog>
          </div>
        </div>
        <div className='p-3 rounded-xl border border-zinc-300 flex-col gap-3'>
          <div className='flex justify-between items-center'>
            <h1 className='text-xl font-semibold'>Courses</h1>
            <Dialog open={openCourseDialog} onOpenChange={setOpenCourseDialog}>
              <DialogTrigger asChild>
                <Button className='bg-[#0b6602] hover:bg-[#0b7804] text-white cursor-pointer'>Add Course</Button>
              </DialogTrigger>
              <CreateCourse onOpenChange={setOpenCourseDialog}/>
            </Dialog>
          </div>
        </div>
        <div className='p-3 rounded-xl border border-zinc-300 flex-col gap-3'>
          <div className='flex justify-between items-center'>
            <h1 className='text-xl font-semibold'>Room</h1>
            <Dialog open={openRoomDialog} onOpenChange={setOpenRoomDialog}>
              <DialogTrigger asChild>
                <Button className='bg-[#0b6602] hover:bg-[#0b7804] text-white cursor-pointer'>Add Room</Button>
              </DialogTrigger>
              <CreateRoom onOpenChange={setOpenRoomDialog}/>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InputPage