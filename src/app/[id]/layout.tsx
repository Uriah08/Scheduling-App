'use client'

import { useGetRoomsQuery, useGetScheduleQuery, useGetProfessorsQuery } from '@/store/api'
import { Blinds, BookOpenCheck, ChevronDown, ChevronRight, GraduationCap, Home, HousePlus } from 'lucide-react'
import Image from 'next/image'
import React, { ReactNode, use, useState } from 'react'
import { useRouter } from 'next/navigation'

type ScheduleLayoutProps = {
    children: ReactNode
    params: Promise<{ id: string }>
}

const ScheduleLayout = ({ children, params }: ScheduleLayoutProps) => {
    const router = useRouter()
    const { id } = use(params);
    const { data: schedule, isLoading: scheduleLoading, error } = useGetScheduleQuery(id);
    const { data: rooms, isLoading: roomLoading} = useGetRoomsQuery()
    const { data: professionals, isLoading: profLoading} = useGetProfessorsQuery()

    const [active, setActive] = useState('home')
    const [roomActive, setRoomActive] = useState(false)
    const [profActive, setProfActive] = useState(false)

    if (scheduleLoading || roomLoading || profLoading) return <div>Loading...</div>;
    if(!schedule) return <div>Error</div>
    if (error) return <div>Error loading schedule</div>;
  return (
    <div className='w-full h-[100vh] flex'>
        <div className='h-full flex-col max-w-[300px] w-full bg-[#262626] rounded-r-2xl justify-center'>
            <div className='flex w-full items-center gap-5 p-5 justify-center mt-5'>
                <Image src={'/cvsu-logo.png'} width={200} height={200} alt='logo' className='w-[50px] h-[50px]'/>
                <h1 className='text-2xl font-bold text-white'>CVSU Naic</h1>
            </div>
            <div className='text-center w-full mt-10 border-y-2 py-5 border-zinc-600 text-white text-lg font-semibold'>{schedule.name.toUpperCase()}</div>
            <div className='w-full flex flex-col p-3 gap-3'>
                <div onClick={() => {setActive('home'); router.push(`/${id}/`)}} className={`cursor-pointer text-white hover:bg-zinc-600 transition-all duration-200 flex gap-3 items-center mt-10 w-full py-2 px-5 rounded-lg ${active === 'home' ? 'bg-zinc-600' : ''}`}>
                    <Home className='text-2xl'/>
                    <h1>Home</h1>
                </div>
                <div onClick={() => {setActive('assign'); router.push(`/${id}/assign`)}} className={`cursor-pointer text-white hover:bg-zinc-600 transition-all duration-200 flex gap-3 items-center w-full py-2 px-5 rounded-lg ${active === 'assign' ? 'bg-zinc-600' : ''}`}>
                    <BookOpenCheck className='text-2xl'/>
                    <h1>Assign</h1>
                </div>
                <div onClick={() => { setRoomActive(!roomActive); setProfActive(false)}} className={`cursor-pointer text-white hover:bg-zinc-600 transition-all duration-200 flex justify-between items-center w-full py-2 px-5 rounded-lg ${roomActive ? 'bg-zinc-600' : ''}`}>
                    <div className='flex gap-3 items-center'>
                        <HousePlus className='text-2xl'/>
                        <h1>Rooms</h1>
                    </div>
                    {roomActive ? <ChevronDown size={15}/> :<ChevronRight size={15}/>}
                </div>
                {roomActive && (
                <div className='max-h-[200px] w-full overflow-y-auto'>
                    {rooms?.rooms?.map((room) => (
                        <div key={room.id} onClick={() => { setActive(room.name) }} className={`cursor-pointer text-white hover:bg-zinc-600 transition-all duration-200 flex gap-3 items-center w-full py-2 px-5 rounded-lg ${active === room.name ? 'bg-zinc-600' : ''}`}>
                            <Blinds className='ml-5' size={18}/>
                            <h1 className='text-sm'>{room.name}</h1>
                        </div>
                    ))}
                </div>
                )}
                <div onClick={() => { setProfActive(!profActive); setRoomActive(false)}} className={`cursor-pointer text-white hover:bg-zinc-600 transition-all duration-200 flex justify-between items-center w-full py-2 px-5 rounded-lg ${profActive ? 'bg-zinc-600' : ''}`}>
                    <div className='flex gap-3 items-center'>
                        <GraduationCap className='text-2xl'/>
                        <h1>Professors</h1>
                    </div>
                    {profActive ? <ChevronDown size={15}/> :<ChevronRight size={15}/>}
                </div>
                <div className='max-h-[200px] w-full overflow-y-auto'>
                    {profActive && (
                        professionals?.professors?.map((prof) => (
                            <div key={prof.id} onClick={() => { setActive(prof.id) }} className={`cursor-pointer text-white hover:bg-zinc-600 transition-all duration-200 flex gap-3 items-center w-full py-2 px-5 rounded-lg ${active === prof.id ? 'bg-zinc-600' : ''}`}>
                                <GraduationCap className='ml-5' size={18}/>
                                <h1 className='text-sm'>{prof.firstName} {prof.lastName === 'TBA' ? '' : prof.lastName}</h1>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
        {children}
    </div>
  )
}

export default ScheduleLayout