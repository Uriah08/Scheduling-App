import { z } from "zod"

export const scheduleSchema = z.object({
  name: z.string().min(2).max(50),
  description: z.string().max(200).optional(),
  year: z.string().min(1, {
    message: "Please select a year"
  }),
  semester: z.string().min(1, {
    message: "Please select a semester"
  })
})

export const professorSchema = z.object({
  firstName: z.string().min(2, {
    message: "First name is required"
  }),
  lastName: z.string().min(2, {
    message: "Last name is required"
  }),
  middleInitial: z.string().max(1, {
    message: "Middle initial must be a single character"
  }).optional(),
  acadRank: z.string().min(1, {
    message: "Academic rank is required"
  }),
})

export const courseSchema = z.object({
  program: z.string().min(1, {
    message: "Please select a program"
  }),
  code: z.string().min(2, {
    message: "Course code is required"
  }),
  title: z.string().min(2, {
    message: "Course title is required"
  }),
  creditLec: z.string().min(1),
  creditLab: z.string().optional(),
  contactLec: z.string().min(1),
  contactLab: z.string().optional(),
  prerequisites: z.array(z.string()).optional(),
  year: z.string().min(2, {
    message: "Course title is required"
  }),
  semester: z.string().min(2, {
    message: "Course title is required"
  }),
})

export const sectionSchema = z.object({
  type: z.string().min(1, {
    message: "Section type is required"
  }),
  year: z.string().min(1, {
    message: "Year is required"
  }),
  section: z.string().min(1, {
    message: "Section name is required"
  })
})

export const roomSchema = z.object({
  name: z.string().min(2, {
    message: "Room name is required"
  }),
})

export const acadRank = [
  { label: "Part-Time", value: "Part-Time" },
  { label: "Instructor I", value: "Instructor I" },
  { label: "Instructor II", value: "Instructor II" },
  { label: "Instructor III", value: "Instructor III" },
  { label: "Professor IV", value: "Professor IV" },
  { label: "Assistant Professor I", value: "Assistant Professor I" },
  { label: "Assistant Professor II", value: "Assistant Professor II" },
  { label: "Assistant Professor III", value: "Assistant Professor III" },
  { label: "Assistant Professor IV", value: "Assistant Professor IV" },
  { label: "Associate Professor I", value: "Associate Professor I" },
  { label: "Associate Professor II", value: "Associate Professor II" },
  { label: "Associate Professor III", value: "Associate Professor III" },
  { label: "Associate Professor IV", value: "Associate Professor IV" },
]

export const years = [
  { label: "2025-2026", value: "2025-2026" },
  { label: "2026-2027", value: "2026-2027" },
  { label: "2027-2028", value: "2027-2028" },
  { label: "2028-2029", value: "2028-2029" },
  { label: "2029-2030", value: "2029-2030" },
  { label: "2030-2031", value: "2030-2031" },
  { label: "2031-2032", value: "2031-2032" },
  { label: "2032-2033", value: "2032-2033" },
  { label: "2033-2034", value: "2033-2034" },
  { label: "2034-2035", value: "2034-2035" },
] as const

export const timeSlots = [
  '7:00 - 7:30',
  '7:30 - 8:00',
  '8:00 - 8:30',
  '8:30 - 9:00',
  '9:00 - 9:30',
  '9:30 - 10:00',
  '10:00 - 10:30',
  '10:30 - 11:00',
  '11:00 - 11:30',
  '11:30 - 12:00',
  '12:00 - 12:30',
  '12:30 - 1:00',
  '1:00 - 1:30',
  '1:30 - 2:00',
  '2:00 - 2:30',
  '2:30 - 3:00',
  '3:00 - 3:30',
  '3:30 - 4:00',
  '4:00 - 4:30',
  '4:30 - 5:00',
  '5:00 - 5:30',
  '5:30 - 6:00',
  '6:00 - 6:30',
  '6:30 - 7:00',
]

export const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

export const colors = [
  '#FF6B6B',
  '#6BCB77',
  '#4D96FF',
  '#FFD93D',
  '#FF6F91',
  '#6A67CE',
  '#00C2A8',
  '#F28482',
  '#FFB703',
  '#A8DADC',
];