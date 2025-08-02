'use client'

import React, { useCallback } from 'react'
import { useGetProfessorsQuery, useGetCoursesQuery } from '@/store/api'
import { DraggableCourse } from '@/components/container/DraggableCourse'
import { ProfessorDropZone } from '@/components/container/ProfessorDropZone'

const AssignPage = () => {
  const { data: courses, isLoading: courseLoading } = useGetCoursesQuery()
  const { data: professors, isLoading: professorLoading } = useGetProfessorsQuery()

  const handleAssign = useCallback((professorId: string, courseId: string) => {
    console.log('Assign course', courseId, 'to professor', professorId)
  }, [])

  if (courseLoading || professorLoading) return <div>Loading...</div>

  return (
    <div className='p-5 h-[100vh] w-full flex flex-col overflow-hidden'>
      <h1 className='text-3xl font-bold'>Assign</h1>
      <div className='flex h-full w-full gap-5'>
        {/* Professors */}
        <div className='flex flex-col max-w-[300px] w-full mt-5 mb-10'>
          <h1 className='text-xl font-semibold text-zinc-600'>Professors</h1>
          <div className='w-full overflow-y-auto flex flex-col gap-3 mt-5'>
            {professors?.professors?.map((prof) => (
              <ProfessorDropZone key={prof.id} professor={prof} onDropCourse={handleAssign} />
            ))}
          </div>
        </div>

        {/* Courses */}
        <div className='flex flex-col w-full mt-5 mb-10'>
          <h1 className='text-xl font-semibold text-zinc-600'>Courses</h1>
          <div className='bg-zinc-100 p-5 mt-5 rounded-2xl h-full grid grid-cols-5 gap-3 overflow-auto'>
            {courses?.courses?.map((course) => (
              <DraggableCourse key={course.id} course={course} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AssignPage
