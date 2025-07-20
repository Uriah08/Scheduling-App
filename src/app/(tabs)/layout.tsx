import { BookCopy } from 'lucide-react';
import React from 'react'
import Image from 'next/image';
import Link from 'next/link';

type Props = {
    children: React.ReactNode;
}
const TabLayout = ({ children }: Props ) => {
  return (
    <div className='flex'>
        <div className='flex flex-col w-[300px] bg-[#0b6602] h-[100vh] items-center'>
                <div className='flex gap-3 items-center mt-5'>
                  <Image src={'/cvsu-logo.png'} width={50} height={50} alt='logo'/>
                  <h1 className='text-white text-xl font-bold'>CVSU Scheduling</h1>
                </div>
                <Link href={'/home'} className='mt-5 w-full border-y py-2 flex items-center gap-5 justify-center cursor-pointer hover:bg-[#0b7804] transition-all duration-200'>
                  <BookCopy className='text-white'/>
                  <h1 className='text-white'>Schedules</h1>
                </Link>
                <Link href={'/input'} className='w-full border-b py-2 flex items-center gap-5 justify-center cursor-pointer hover:bg-[#0b7804] transition-all duration-200'>
                  <BookCopy className='text-white'/>
                  <h1 className='text-white'>Inputs</h1>
                </Link>
              </div>
        {children}
    </div>
  )
}

export default TabLayout