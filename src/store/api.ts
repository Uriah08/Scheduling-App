import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Schedule, Professor, Course, Room, Section } from "@/generated/prisma";

type ScheduleResponse = {
  schedules?: Schedule[];
}

type ProfessorResponse = {
  professors? : Professor[]
}

type CourseResponse = {
  courses?: Course[]
}

type RoomResponse = {
  rooms?: Room[]
}

type SectionResponse = {
  sections?: Section[]
}

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api",
  }),
  tagTypes: ['Schedule','Professor','Course','Room','Section'],
  endpoints: (build) => ({
    createSchedule: build.mutation({
      query: (data) => ({
        url: "/schedules",
        method: "POST",
        body: data,
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
    createProfessor: build.mutation({
      query: (data) => ({
        url: "/professors",
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ['Professor'],
    }),
    getProfessors: build.query<ProfessorResponse, void>({
      query: () => ({
        url: "/professors",
        method: "GET",
      }),
      providesTags: ['Professor'],
    }),
    createCourse: build.mutation({
      query: (data) => ({
        url: "/courses",
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ['Course'],
    }),
    createRoom: build.mutation({
      query: (data) => ({
        url: "/rooms",
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ['Room'],
    }),
    createSection: build.mutation({
      query: (data) => ({
        url: "/sections",
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ['Section'],
    }),
  }),
});

export const { 
  useCreateScheduleMutation,
  useGetSchedulesQuery,
  useCreateProfessorMutation,
  useCreateCourseMutation,
  useCreateRoomMutation,
  useCreateSectionMutation
} = api;
