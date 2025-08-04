'use client'

import { CourseAssignments } from '@/store/api'
import { DialogContent, DialogTitle } from '../ui/dialog'
import React, { useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { timeSlots } from '@/schemas'
import { Button } from '../ui/button'
import clsx from 'clsx'

type CreateClassProps = {
  data: CourseAssignments | undefined;
};

const CreateClass = ({ data }: CreateClassProps) => {
  const [selectedCourse, setSelectedCourse] = useState('')
  const [selectedDay, setSelectedDay] = useState('')
  const [selectedTimeStart, setSelectedTimeStart] = useState('')
  const [selectedTimeEnd, setSelectedTimeEnd] = useState('')
  const [errors, setErrors] = React.useState({
    course: false,
    day: false,
    timeStart: false,
    timeEndRequired: false,
    timeEndInvalid: false,
  });

  const handleCreate = () => {
    const hasEmptyCourse = selectedCourse === '';
    const hasEmptyDay = selectedDay === '';
    const hasEmptyStart = selectedTimeStart === '';
    const hasEmptyEnd = selectedTimeEnd === '';

    const startIndex = timeSlots.indexOf(selectedTimeStart);
    const endIndex = timeSlots.indexOf(selectedTimeEnd);
    const invalidTimeRange = !hasEmptyStart && !hasEmptyEnd && startIndex >= endIndex;

    setErrors({
        course: hasEmptyCourse,
        day: hasEmptyDay,
        timeStart: hasEmptyStart,
        timeEndRequired: hasEmptyEnd,
        timeEndInvalid: invalidTimeRange,
    });

    if (
        hasEmptyCourse ||
        hasEmptyDay ||
        hasEmptyStart ||
        hasEmptyEnd ||
        invalidTimeRange
    ) {
        return;
    }

    console.log({
        course: selectedCourse,
        day: selectedDay,
        timeStart: selectedTimeStart,
        timeEnd: selectedTimeEnd,
    });

    };

  return (
    <DialogContent className='w-full'>
      <DialogTitle>Create Class</DialogTitle>
      <div className='flex flex-col space-y-2 w-full'>

        <h1 className='text-sm font-semibold text-zinc-800'>Course</h1>
        <Select value={selectedCourse} onValueChange={(v) => {
          setSelectedCourse(v)
          setErrors((prev) => ({ ...prev, course: false }))
        }}>
          <SelectTrigger className={clsx("w-full", errors.course && "border-red-500")}>
            <SelectValue placeholder="Select course" />
          </SelectTrigger>
          <SelectContent className="w-full">
            {data?.assign.map((item) => (
              <SelectItem key={item.id} value={item.course.code}>
                {item.course.code}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.course && <span className="text-red-500 text-sm">Course is required</span>}

        <h1 className='text-sm font-semibold text-zinc-800'>Day</h1>
        <Select value={selectedDay} onValueChange={(v) => {
          setSelectedDay(v)
          setErrors((prev) => ({ ...prev, day: false }))
        }}>
          <SelectTrigger className={clsx("w-full", errors.day && "border-red-500")}>
            <SelectValue placeholder="Select day" />
          </SelectTrigger>
          <SelectContent className="w-full">
            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(day => (
              <SelectItem key={day} value={day}>{day}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.day && <span className="text-red-500 text-sm">Day is required</span>}

        <h1 className='text-sm font-semibold text-zinc-800'>Time Start</h1>
        <Select value={selectedTimeStart} onValueChange={(v) => {
          setSelectedTimeStart(v)
          setErrors((prev) => ({ ...prev, timeStart: false }))
        }}>
          <SelectTrigger className={clsx("w-full", errors.timeStart && "border-red-500")}>
            <SelectValue placeholder="Select time" />
          </SelectTrigger>
          <SelectContent className="w-full">
            {timeSlots.map((slot) => (
              <SelectItem key={slot} value={slot}>{slot}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.timeStart && <span className="text-red-500 text-sm">Start time is required</span>}

        <h1 className='text-sm font-semibold text-zinc-800'>Time End</h1>
        <Select value={selectedTimeEnd} onValueChange={(v) => {
          setSelectedTimeEnd(v)
          setErrors((prev) => ({ ...prev, timeEnd: false }))
        }}>
          <SelectTrigger className={clsx("w-full", errors.timeEndRequired && "border-red-500")}>
            <SelectValue placeholder="Select time" />
          </SelectTrigger>
          <SelectContent className="w-full">
            {timeSlots.map((slot) => (
              <SelectItem key={slot} value={slot}>{slot}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.timeEndRequired && (
        <span className="text-red-500 text-sm">End time is required</span>
        )}
        {errors.timeEndInvalid && (
        <span className="text-red-500 text-sm">End time must be after start time</span>
        )}

        {/* Buttons */}
        <div className='flex items-center gap-5 mt-3 w-full justify-end'>
          <Button variant={'outline'}>Cancel</Button>
          <Button
            className='bg-[#0b6602] hover:bg-[#084e02] cursor-pointer'
            onClick={handleCreate}
          >
            Create
          </Button>
        </div>
      </div>
    </DialogContent>
  )
}

export default CreateClass
