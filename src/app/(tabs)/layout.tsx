'use client';

import { BookCheck, BookCopy, Calendar, GraduationCap, Plus, School } from 'lucide-react';
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
]
const TabLayout = ({ children }: Props ) => {
  const [activeTab, setActiveTab] = useState('Schedules');
  return (
    <div className='flex'>
        <div className='flex flex-col min-w-[250px] bg-linear-to-t from-[#0f8b09] to-[#0bcb0d] h-[100vh] items-center'>
                <Link href={'/'} className='flex items-center mt-5 gap-3'>
                  <Image src={'/cvsu-logo.png'} alt='logo' width={50} height={50} className='rounded-full' />
                  <h1 className='text-white text-[17px] font-bold'>CVSU SCHEDULING</h1>
                </Link>
                <div className='flex flex-row  items-center gap-3 mt-10 bg-[#457a00] py-2 px-2 rounded-full cursor-pointer hover:bg-[#188010] transition-all duration-300'>
                  <Plus className='text-white bg-[#233d00] w-[40px] h-[40px] rounded-full' size={30}  />
                  <h1 className='text-white text-[20px] font-bold px-3'>Add Schedule</h1>
                </div>

                <div className='flex flex-col gap-3 mt-10 '>
                  {sidebarItems.map((item, index) => (
                    <div onClick={() => setActiveTab(item.name)} key={index} 
                    className={`flex flex-row gap-2 mt-5 items-center py-2 px-2 rounded-2xl hover:bg-[#233d00] transition-all duration-300 cursor-pointer ${activeTab === item.name ? 'bg-[#233d00]' : ''}`}>
                    <item.icon className='text-white' size={35} />
                    <Link href={item.href} className='text-white text-[22px] px-4'>{item.name}</Link>
                  </div>
                  ))}
                  {/* <div className='flex flex-row gap-2 mt-5 items-center justify-center py-2 px-2 rounded-2xl hover:bg-[#233d00] transition-all duration-300 cursor-pointer'>
                    <Calendar className='text-white' size={35} />
                    <Link href={'/home'} className='text-white text-[22px] px-6'>SCHEDULES</Link>
                  </div>

                   <div className='flex flex-row gap-2 mt-5 items-center justify-center py-2 px-2 rounded-2xl hover:bg-[#233d00] transition-all duration-300 cursor-pointer'>
                    <Calendar className='text-white' size={35} />
                    <Link href={'/home'} className='text-white text-[22px] px-4'>PROFESSORS</Link>
                  </div>

                   <div className='flex flex-row gap-2 mt-5 items-center justify-center py-2 px-2 rounded-2xl hover:bg-[#233d00] transition-all duration-300 cursor-pointer'>
                    <Calendar className='text-white' size={35} />
                    <Link href={'/home'} className='text-white text-[22px] px-2'>CLASSROOMS</Link>
                  </div>

                   <div className='flex flex-row gap-2 mt-5 items-center justify-center py-2 px-2 rounded-2xl hover:bg-[#233d00] transition-all duration-300 cursor-pointer'>
                    <Calendar className='text-white' size={35} />
                    <Link href={'/home'} className='text-white text-[22px] px-9'>COURSES</Link>
                  </div> */}
                  
                  
                </div>

              </div>
        {children}
    </div>
  )
}

export default TabLayout