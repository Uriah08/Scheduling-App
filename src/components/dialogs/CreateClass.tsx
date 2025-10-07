'use client'

import { CourseAssignments, SectionResponse } from '@/store/api'
import { DialogContent, DialogTitle } from '../ui/dialog'
import React, { useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import { days, timeSlots } from '@/schemas'
import { Button } from '../ui/button'
import clsx from 'clsx'
import { useCreateWeeklyMutation } from '@/store/api'

type CreateClassProps = {
  data: CourseAssignments | undefined
  scheduleId: string
  professorId: string
  section: SectionResponse | undefined
  setOpen: (open: boolean) => void
}

const CreateClass = ({ data, scheduleId, professorId, section, setOpen}: CreateClassProps) => {
  const [selectedCourse, setSelectedCourse] = useState('')
  const [selectedSection, setSelectedSection] = useState('')
  const [selectedDay, setSelectedDay] = useState('')
  const [selectedTimeStart, setSelectedTimeStart] = useState('')
  const [selectedTimeEnd, setSelectedTimeEnd] = useState('')
  const [createWeekly, { isLoading: weekLoading }] = useCreateWeeklyMutation()
  const [errors, setErrors] = useState({
    section: false,
    course: false,
    day: false,
    timeStart: false,
    timeEndRequired: false,
    timeEndInvalid: false,
  })

  const selectedCourseObj = data?.assign.find(item => item.course.id === selectedCourse)
  const courseYear = selectedCourseObj?.course.year
  const courseProgram = selectedCourseObj?.course.program

  const handleCreate = async () => {
    const hasEmptySection = selectedSection === ''
    const hasEmptyCourse = selectedCourse === ''
    const hasEmptyDay = selectedDay === ''
    const hasEmptyStart = selectedTimeStart === ''
    const hasEmptyEnd = selectedTimeEnd === ''

    const startIndex = timeSlots.indexOf(selectedTimeStart)
    const endIndex = timeSlots.indexOf(selectedTimeEnd)
    const invalidTimeRange = !hasEmptyStart && !hasEmptyEnd && startIndex >= endIndex

    setErrors({
      section: hasEmptySection,
      course: hasEmptyCourse,
      day: hasEmptyDay,
      timeStart: hasEmptyStart,
      timeEndRequired: hasEmptyEnd,
      timeEndInvalid: invalidTimeRange,
    })

    if (
      hasEmptySection ||
      hasEmptyCourse ||
      hasEmptyDay ||
      hasEmptyStart ||
      hasEmptyEnd ||
      invalidTimeRange
    ) {
      return
    }

    try {
      const values = {
        selectedSection,
        scheduleId,
        professorId,
        course: selectedCourse,
        day: selectedDay,
        timeStart: selectedTimeStart,
        timeEnd: selectedTimeEnd,
        sectionId: selectedSection
      }

      await createWeekly(values).unwrap()
      setOpen(false)
    } catch (error) {
      console.log(error);
    }

    console.log({
      selectedSection,
      scheduleId,
      professorId,
      course: selectedCourse,
      day: selectedDay,
      timeStart: selectedTimeStart,
      timeEnd: selectedTimeEnd,
      sectionId: selectedSection,
    })
  }

  return (
    <DialogContent className='w-full' aria-describedby={undefined}>
      <DialogTitle>Create Class</DialogTitle>
      <div className='flex flex-col space-y-2 w-full'>
        {/* Course */}
        <h1 className='text-sm font-semibold text-zinc-800'>Course</h1>
        <Select
          value={selectedCourse}
          onValueChange={(v) => {
            setSelectedCourse(v)
            setSelectedSection('')
            setErrors((prev) => ({ ...prev, course: false }))
          }}
        >
          <SelectTrigger className={clsx('w-full', errors.course && 'border-red-500')}>
            <SelectValue placeholder='Select course' />
          </SelectTrigger>
          <SelectContent className='w-full'>
            {data?.assign.map((item) => (
              <SelectItem key={item.id} value={item.course.id}>
                {item.course.code}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.course && <span className='text-red-500 text-sm'>Course is required</span>}

        {/* Section */}
        <h1 className='text-sm font-semibold text-zinc-800'>Section</h1>
        <Select
          disabled={!selectedCourse}
          value={selectedSection}
          onValueChange={(v) => {
            setSelectedSection(v)
            setErrors((prev) => ({ ...prev, section: false }))
          }}
        >
          <SelectTrigger className={clsx('w-full', errors.section && 'border-red-500')}>
            <SelectValue placeholder='Select section' />
          </SelectTrigger>
          <SelectContent className='w-full'>
            {section?.sections
              ?.filter(item => item.year === courseYear && item.type === courseProgram)
              .map(secs => (
                <SelectItem key={secs.id} value={secs.id}>
                  {(secs.type === 'Computer Science' ? 'BSCS' : 'BSIT') +
                    ' ' +
                    secs.year[0] +
                    secs.section}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
        {errors.section && <span className='text-red-500 text-sm'>Section is required</span>}

        {/* Day */}
        <h1 className='text-sm font-semibold text-zinc-800'>Day</h1>
        <Select
          disabled={!selectedCourse}
          value={selectedDay}
          onValueChange={(v) => {
            setSelectedDay(v)
            setErrors((prev) => ({ ...prev, day: false }))
          }}
        >
          <SelectTrigger className={clsx('w-full', errors.day && 'border-red-500')}>
            <SelectValue placeholder='Select day' />
          </SelectTrigger>
          <SelectContent className='w-full'>
            {days.map(day => (
              <SelectItem key={day} value={day}>
                {day}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.day && <span className='text-red-500 text-sm'>Day is required</span>}

        {/* Time Start */}
        <h1 className='text-sm font-semibold text-zinc-800'>Time Start</h1>
        <Select
          disabled={!selectedCourse}
          value={selectedTimeStart}
          onValueChange={(v) => {
            setSelectedTimeStart(v)
            setErrors((prev) => ({ ...prev, timeStart: false }))
          }}
        >
          <SelectTrigger className={clsx('w-full', errors.timeStart && 'border-red-500')}>
            <SelectValue placeholder='Select time' />
          </SelectTrigger>
          <SelectContent className='w-full'>
            {timeSlots.map((slot) => (
              <SelectItem key={slot} value={slot}>
                {slot}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.timeStart && (
          <span className='text-red-500 text-sm'>Start time is required</span>
        )}

        {/* Time End */}
        <h1 className='text-sm font-semibold text-zinc-800'>Time End</h1>
        <Select
          disabled={!selectedCourse}
          value={selectedTimeEnd}
          onValueChange={(v) => {
            setSelectedTimeEnd(v)
            setErrors((prev) => ({ ...prev, timeEndRequired: false, timeEndInvalid: false }))
          }}
        >
          <SelectTrigger className={clsx('w-full', errors.timeEndRequired && 'border-red-500')}>
            <SelectValue placeholder='Select time' />
          </SelectTrigger>
          <SelectContent className='w-full'>
            {timeSlots.map((slot) => (
              <SelectItem key={slot} value={slot}>
                {slot}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.timeEndRequired && (
          <span className='text-red-500 text-sm'>End time is required</span>
        )}
        {errors.timeEndInvalid && (
          <span className='text-red-500 text-sm'>End time must be after start time</span>
        )}

        <div className='flex items-center gap-5 mt-3 w-full justify-end'>
          <Button onClick={() => setOpen(false)} variant='outline'>Cancel</Button>
          <Button
            disabled={weekLoading}
            className='bg-[#0b6602] hover:bg-[#084e02] cursor-pointer'
            onClick={handleCreate}
          >
            {weekLoading ? 'Creating' : 'Create'}
          </Button>
        </div>
      </div>
    </DialogContent>
  )
}

export default CreateClass
