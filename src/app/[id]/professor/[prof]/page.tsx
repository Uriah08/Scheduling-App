'use client'

import React from 'react'
import { useGetProfessorQuery } from '@/store/api';
import { useParams } from 'next/navigation'

const ProfessorPage = ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = React.use(params);   
    const param = useParams();
    const professorId = param.prof as string;
    const { data: prof, isLoading: profLoading } = useGetProfessorQuery(professorId)

    if(profLoading) return <div>Loading...</div>
    
  return (
    <div className='p-5'>
      <h1 className='text-3xl font-bold'>{prof?.firstName.toUpperCase()} {prof?.middleInitial?.toUpperCase()}. {prof?.lastName.toUpperCase()}</h1>
    </div>
  )
}

export default ProfessorPage