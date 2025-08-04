'use client'

import CreateCourse from '@/components/dialogs/CreateCourse';
import CreateProfessor from '@/components/dialogs/CreateProfessor';
import CreateRoom from '@/components/dialogs/CreateRoom';
import CreateSection from '@/components/dialogs/CreateSection';
import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import React from 'react'

const Professors = () => {
 const [ openProfessorDialog, setOpenProfessorDialog ] = React.useState(false);
  return (
    <div className='flex flex-col p-5 gap-5 w-full'>
        <div className='p-3 rounded-xl border border-zinc-300 flex-col gap-3'>
          <div className='flex justify-between items-center'>
            <h1 className='text-xl font-semibold'>Professors</h1>
            <Dialog open={openProfessorDialog} onOpenChange={setOpenProfessorDialog}>
              <DialogTrigger asChild>
                <Button className='bg-[#0b6602] hover:bg-[#0b7804] text-white cursor-pointer'>Add Professors</Button>
              </DialogTrigger>
              <CreateProfessor onOpenChange={setOpenProfessorDialog}/>
            </Dialog>
          </div>
        </div>
      </div>
    
  )

}

export default Professors