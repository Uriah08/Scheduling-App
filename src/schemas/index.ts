import { z } from "zod"

export const scheduleSchema = z.object({
  name: z.string().min(2).max(50),
  description: z.string().max(200).optional(),
  year: z.string().min(10, {
    message: "Please select a year"
  }),
  semester: z.string().min(1, {
    message: "Please select a semester"
  })
})

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