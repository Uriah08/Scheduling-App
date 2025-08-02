import React, { useRef, useEffect } from 'react'
import { useDrop } from 'react-dnd'

type ProfessorDropZoneProps = {
  professor: { id: string; firstName: string; lastName: string }
  onDropCourse: (professorId: string, courseId: string) => void
}

export const ProfessorDropZone = ({ professor, onDropCourse }: ProfessorDropZoneProps) => {
  const ref = useRef<HTMLDivElement>(null)

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
    <div
      ref={ref}
      className={`bg-zinc-200 py-2 px-3 rounded-xl w-full transition-colors duration-200 ${
        isOver ? 'bg-green-200' : ''
      }`}
    >
      <h1 className='text-zinc-600'>
        {professor.firstName} {professor.lastName === 'TBA' ? '' : professor.lastName}
      </h1>
    </div>
  )
}
