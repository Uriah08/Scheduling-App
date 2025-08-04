'use client'

import React from 'react';
import { useDrag } from 'react-dnd'

type DraggableCourseProps = {
  course: { id: string; code: string; program: string }
}

export const DraggableCourse = ({ course }: DraggableCourseProps) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'COURSE',
    item: { id: course.id, code: course.code },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }))

  const ref = React.useRef<HTMLDivElement>(null)
  drag(ref)

  return (
      <div
        ref={ref}
        className={`py-2 px-3 rounded-xl w-full cursor-move h-fit ${course.program === 'Computer Science' ? 'bg-green-200' : 'bg-blue-200'} ${
          isDragging ? 'opacity-50' : ''
        }`}
      >
        <h1 className='text-zinc-600'>{course.code}</h1>
      </div>
  )
}
