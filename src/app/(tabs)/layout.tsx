'use client';

import { BookCheck, Calendar, GraduationCap, LayoutPanelTop, School } from 'lucide-react';
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
                <Link href={'/'} className='flex w-full items-center gap-5 py-8 justify-center'>
                  <Image src={'/cvsu-logo.png'} alt='logo' width={50} height={50} className='rounded-full' />
                  <h1 className='text-white text-[17px] font-bold'>CVSU SCHEDULING</h1>
                </Link>

                <div className='flex flex-col mt-10 w-full py-5'>
                  {sidebarItems.map((item, index) => (
                    <Link href={item.href} onClick={() => setActiveTab(item.name)} key={index} 
                    className={`flex flex-row gap-5 items-center p-2 rounded-2xl hover:bg-zinc-600 transition-all duration-200 cursor-pointer m-3 ${activeTab === item.name ? 'bg-zinc-600' : ''}`}>
                    <item.icon className='text-white' size={20} />
                    <h1 className='text-white text-[15px]'>{item.name}</h1>
                  </Link>
                  ))}
                                 
                </div>

              </div>
        {children}
    </div>
  )
}

export default TabLayout