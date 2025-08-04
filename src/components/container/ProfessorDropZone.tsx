import { X } from 'lucide-react';
import React, { useRef, useEffect } from 'react'
import { useDrop } from 'react-dnd'
import { useDeleteAssignedCourseMutation } from '@/store/api';

type ProfessorDropZoneProps = {
  professor: { id: string; firstName: string; lastName: string }
  onDropCourse: (professorId: string, courseId: string) => void
  assignedCourses: { course: { id: string; code: string; title: string; program: string; creditLec: number; creditLab: number } }[]
  scheduleId: string
}

export const ProfessorDropZone = ({ professor, onDropCourse, assignedCourses, scheduleId }: ProfessorDropZoneProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const [deleteAssignedCourse] = useDeleteAssignedCourseMutation()

  const handleRemove = async (professorId: string, courseId: string) => {
    try {
      await deleteAssignedCourse({ scheduleId, professorId, courseId })
    } catch (error) {
      console.log(error);
    }
  }

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'COURSE',
    drop: (item: { id: string; code: string }) => {
      onDropCourse(professor.id, item.id)
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }))

  useEffect(() => {
    if (ref.current) {
      drop(ref.current)
    }
  }, [drop])

  return (
    <div ref={ref} className='flex flex-col gap-1'>
      <div
        className={`bg-zinc-200 py-2 px-3 rounded-xl w-full transition-colors duration-200 ${
          isOver ? 'bg-green-200' : ''
        }`}
      >
        <h1 className='text-zinc-600'>
          {professor.firstName} {professor.lastName === 'TBA' ? '' : professor.lastName}
        </h1>
      </div>
      {assignedCourses.length !== 0 && (
        <div className='w-full p-1 bg-zinc-200 rounded-md flex-wrap flex gap-1'>
          {assignedCourses.map((course) => (
            <div key={course.course.id} className={`rounded-md w-fit py-1 px-1 flex gap-2 items-center ${course.course.program === 'Computer Science' ? 'bg-green-200' : 'bg-blue-200'}`}>
              <h1 className='text-xs text-zinc-500'>{course.course.code}</h1>
              <X onClick={() => handleRemove(professor.id, course.course.id)} size={10} className='text-zinc-500 cursor-pointer'/>
            </div>
          ))}
          <div className='flex justify-between items-center gap-5 w-full'>
            <h1 className='text-xs font-semibold'>Total Units: </h1>
            <h1 className='text-xs font-semibold'>Total Hours: </h1>
          </div>
        </div>
      )}
    </div>
  )
}
