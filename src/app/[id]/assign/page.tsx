'use client'

import React, { useCallback, useState } from 'react'
import { 
  useGetProfessorsQuery, 
  useGetCoursesQuery, 
  useAssignCourseMutation, 
  useGetAssignedCourseQuery 
} from '@/store/api'
import { DraggableCourse } from '@/components/container/DraggableCourse'
import { ProfessorDropZone } from '@/components/container/ProfessorDropZone'
import { Input } from '@/components/ui/input'
import { Filter, Search } from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const AssignPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id: scheduleId } = React.use(params);
  const { data: courses, isLoading: courseLoading } = useGetCoursesQuery()
  const { data: professors, isLoading: professorLoading } = useGetProfessorsQuery()
  const { data: assignedCourses , isLoading: assignedLoading } = useGetAssignedCourseQuery(scheduleId)
  const [assignCourses] = useAssignCourseMutation()
  const [open, setOpen] = useState(false)

  const assignedCourseIds = assignedCourses?.map((ac) => ac.courseId) || [];

  const unassignedCourses = courses?.courses?.filter(
    (course) => !assignedCourseIds.includes(course.id)
  );


  const handleAssign = useCallback( async (professorId: string, courseId: string) => {
    try {
      const values = { professorId, courseId, scheduleId}
      await assignCourses(values).unwrap()
    } catch (error) {
      console.log(error);
    }
  }, [scheduleId, assignCourses])

  if (courseLoading || professorLoading || assignedLoading) return <div>Loading...</div>

  return (
    <div className='p-5 h-[100vh] w-full flex flex-col overflow-hidden'>
      <h1 className='text-3xl font-bold'>Assign</h1>
      <div className='flex h-full w-full gap-5'>
        <div className='flex flex-col max-w-[300px] w-full mt-5 mb-10'>
          <h1 className='text-xl font-semibold text-zinc-600'>Professors</h1>
          <div className='w-full overflow-y-auto flex flex-col gap-3 mt-5'>
            {professors?.professors?.map((prof) => {
              const profCourses = assignedCourses?.filter(
                (assignment) => assignment.professorId === prof.id
              )

              return (
                <ProfessorDropZone
                  key={prof.id}
                  professor={prof}
                  assignedCourses={profCourses || []}
                  onDropCourse={handleAssign}
                  scheduleId={scheduleId}
                />
              )
            })}
          </div>
        </div>

        <div className='flex flex-col w-full mt-5 mb-10'>
          <div className='flex items-center gap-5'>
            <h1 className='text-xl font-semibold text-zinc-600'>Courses</h1>
            <div className='w-full relative flex gap-5 items-center'>
              <Input placeholder='Search' className='pl-8 rounded-full'/>
              <Search className='absolute top-2 left-2 text-zinc-500' size={20}/>
              <DropdownMenu open={open} onOpenChange={setOpen}>
                <DropdownMenuTrigger asChild>
                  <Filter className={`${open ? 'text-zinc-900' : 'text-zinc-500'} cursor-pointer`}/>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[200px]">
                  <DropdownMenuLabel>Filter</DropdownMenuLabel>
                  <DropdownMenuGroup>
                    <DropdownMenuItem>All</DropdownMenuItem>
                    <DropdownMenuItem>Computer Science</DropdownMenuItem>
                    <DropdownMenuItem>Information Technology</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>1st Semester</DropdownMenuItem>
                    <DropdownMenuItem>2nd Semester</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>1st Semester</DropdownMenuItem>
                    <DropdownMenuItem>2nd Semester</DropdownMenuItem>
                    <DropdownMenuItem>3rd Semester</DropdownMenuItem>
                    <DropdownMenuItem>4th Semester</DropdownMenuItem>
                    <DropdownMenuItem>5th Semester</DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <div className='bg-zinc-100 p-5 mt-5 rounded-2xl h-full grid grid-cols-5 gap-3 overflow-auto'>
            {unassignedCourses?.map((course) => (
              <DraggableCourse key={course.id} course={course} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AssignPage
