'use client'

import CreateSection from "@/components/dialogs/CreateSection";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { useGetAllQuery, useGetScheduleQuery } from "@/store/api";
import { use, useState } from 'react';

const SchedulePage = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);
  const { data: schedule, isLoading: scheduleLoading, error } = useGetScheduleQuery(id);
  const { data: allData, isLoading: allLoading } = useGetAllQuery(id)
  const [ openSectionDialog, setOpenSectionDialog ] = useState(false)

  if(!schedule) return <div>Error</div>

  if (scheduleLoading || allLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading schedule</div>;
  
  return (
    <div className="p-5 flex flex-col w-full h-full">
      <div className="flex items-center justify-between">
        <div className="text-3xl font-bold">{schedule.name}</div>
        <Dialog open={openSectionDialog} onOpenChange={setOpenSectionDialog}>
              <DialogTrigger asChild>
                <Button className='bg-[#0b6602] hover:bg-[#0b7804] text-white cursor-pointer'>Add Section</Button>
              </DialogTrigger>
              <CreateSection onOpenChange={setOpenSectionDialog} id={id}/>
            </Dialog>
      </div>
      <div className="grid xl:grid-cols-4 grid-cols-2 gap-5 mt-5">
        <div className="p-5 bg-[#035413] rounded-2xl flex flex-col">
          <h1 className="text-xl font-semibold text-white">Professors</h1>
          <h1 className="text-5xl font-bold mt-5 text-white">
            {allData?.data.professors.length}
          </h1>
        </div>
        <div className="p-5 bg-[#035413] rounded-2xl">
          <h1 className="text-xl font-semibold text-white">Courses</h1>
          <h1 className="text-5xl font-bold mt-5 text-white">
            {allData?.data.courses.length}
          </h1>
        </div>
        <div className="p-5 bg-[#035413] rounded-2xl">
          <h1 className="text-xl font-semibold text-white">Rooms</h1>
          <h1 className="text-5xl font-bold mt-5 text-white">
            {allData?.data.rooms.length}
          </h1>
        </div>
        <div className="p-5 bg-[#035413] rounded-2xl">
          <h1 className="text-xl font-semibold text-white">Sections</h1>
          <h1 className="text-5xl font-bold mt-5 text-white">
            {allData?.data.sections.length}
          </h1>
        </div>
      </div>
      <h1 className="text-xl font-semibold mt-5">Faculty Loading</h1>
    </div>
  );
};

export default SchedulePage;