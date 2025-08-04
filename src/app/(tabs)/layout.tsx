'use client';

import { BookCheck, BookCopy, Calendar, GraduationCap, LayoutPanelTop, Plus, School } from 'lucide-react';
import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

type Props = {
    children: React.ReactNode;
}

const sidebarItems = [
  { name: 'Schedules', icon: Calendar, href: '/home' },
  { name: 'Professors', icon: GraduationCap, href: '/professors' },
  { name: 'Classrooms', icon: School, href: '/classrooms' },
  { name: 'Courses', icon: BookCheck, href: '/courses' },
  { name: 'Sections', icon: LayoutPanelTop, href: '/sections' },
]
const TabLayout = ({ children }: Props ) => {
  const [activeTab, setActiveTab] = useState('Schedules');
  return (
    <div className='w-full h-[100vh] flex'>
        <div className='h-full flex-col max-w-[300px] w-full bg-[#262626] rounded-r-2xl justify-center'>
                <Link href={'/'} className='flex w-full items-center gap-5 py-8 justify-center border-b-2'>
                  <Image src={'/cvsu-logo.png'} alt='logo' width={50} height={50} className='rounded-full' />
                  <h1 className='text-white text-[17px] font-bold'>CVSU SCHEDULING</h1>
                </Link>
                <div className='flex flex-row  items-center gap-3 bg-[#457a00] py-2 px-2 rounded-full cursor-pointer hover:bg-[#188010] transition-all duration-300 border-y-2 mt-10 mx-5'>
                  <Plus className='text-white bg-[#233d00] w-[30px] h-[30px] rounded-full' size={30}  />
                  <h1 className='text-white text-[18px] font-bold px-3'>Add Schedule</h1>
                </div>

                <div className='flex flex-col mt-10 border-y-2 w-full py-5'>
                  {sidebarItems.map((item, index) => (
                    <Link href={item.href} onClick={() => setActiveTab(item.name)} key={index} 
                    className={`flex flex-row gap-5 items-center p-2 rounded-2xl hover:bg-zinc-600 transition-all duration-200 cursor-pointer m-3 ${activeTab === item.name ? 'bg-zinc-600' : ''}`}>
                    <item.icon className='text-white' size={30} />
                    <h1 className='text-white text-[18px]'>{item.name}</h1>
                  </Link>
                  ))}
                                 
                </div>

              </div>
        {children}
    </div>
  )
}

export default TabLayout