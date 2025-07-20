import CreateSchedule from '@/components/dialogs/CreateSchedule'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import React from 'react'

const Homepage = () => {
  return (
    <div className='flex'>
      <Dialog>
        <DialogTrigger asChild>
          <button className='absolute bottom-5 right-5 py-3 px-5 bg-[#0b6602] rounded-full hover:bg-[#0b7804] text-white cursor-pointer'>Add Schedule</button>
        </DialogTrigger>
        <CreateSchedule/>
      </Dialog>
    </div>
  )
}

export default Homepage