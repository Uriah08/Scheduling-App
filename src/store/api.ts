import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Schedule } from "@/generated/prisma";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api",
  }),
  tagTypes: [],
  endpoints: (build) => ({
    createSchedule: build.mutation<Schedule, Schedule>({
      query: (schedule) => ({
        url: "/schedules",
        method: "POST",
        body: schedule,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
  }),
});

export const { 
  useCreateScheduleMutation
} = api;
