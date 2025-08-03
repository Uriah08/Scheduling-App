'use client'

import React from 'react'
import { useGetRoomQuery } from '@/store/api';
import { useParams } from 'next/navigation';

const RoomPage = ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = React.use(params);
    const param = useParams();
    const roomId = param.room as string;
    const { data: room, isLoading: roomLoading } = useGetRoomQuery(roomId) 

    if(roomLoading) return <div>Loading...</div>
    
  return (
    <div className='p-5'>
      <h1 className='text-3xl font-bold'>{room?.name}</h1>
    </div>
  )
}

export default RoomPage