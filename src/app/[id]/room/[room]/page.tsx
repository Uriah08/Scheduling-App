'use client'

import React from 'react'
import { useGetRoomQuery, useGetScheduleQuery } from '@/store/api';
import { useParams } from 'next/navigation';

const RoomPage = ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = React.use(params);
    const param = useParams();
    const roomId = param.room as string;
    const { data: room, isLoading: roomLoading } = useGetRoomQuery(roomId) 
    const { data: schedule, isLoading: scheduleLoading } = useGetScheduleQuery(id)

    if(roomLoading || scheduleLoading) return <div>Loading...</div>
    
  return (
    <div className='p-5 flex flex-col w-full'>
      <h1 className='text-3xl font-bold'>{room?.name}</h1>
      <h1 className='text-2xl font-bold mt-5 text-center'>ITD ROOM UTILIZATION CLASS SCHEDULE</h1>
      <h1 className='text-lg font-semibold mt-1 text-center'>{schedule?.semester} A.Y. {schedule?.year}</h1>
      <h1 className='text-xl text-center font-bold'>{room?.name}</h1>
    </div>
  )
}

export default RoomPage