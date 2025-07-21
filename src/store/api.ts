import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Schedule } from "@/generated/prisma";

type ScheduleResponse = {
  schedules?: Schedule[];
}

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api",
  }),
  tagTypes: ['Schedule'],
  endpoints: (build) => ({
    createSchedule: build.mutation({
      query: (schedule) => ({
        url: "/schedules",
        method: "POST",
        body: schedule,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ['Schedule'],
    }),
    getSchedules: build.query<ScheduleResponse, void>({
      query: () => ({
        url: "/schedules",
        method: "GET",
      }),
      providesTags: ['Schedule'],
    }),
  }),
});

export const { 
  useCreateScheduleMutation,
  useGetSchedulesQuery
} = api;
