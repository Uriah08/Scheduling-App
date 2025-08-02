import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Schedule, Professor, Course, Room, Section } from "@/generated/prisma";

type SchedulesResponse = {
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

type GetAllResponse = {
  status: number;
  data: {
    professors: {
      id: string;
      firstName: string;
      lastName: string;
      middleInitial?: string;
      acadRank: string;
    }[];
    courses: {
      id: string;
      program: string;
      code: string;
      title: string;
      creditLec: number;
      creditLab: number;
      contactLec: number;
      contactLab: number;
      prerequisites: string[];
      year: string;
      semester: string;
    }[];
    sections: {
      id: string;
      type: string;
      year: string;
      section: string;
    }[];
    rooms: {
      id: string;
      name: string;
    }[];
  };
};


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
    getSchedules: build.query<SchedulesResponse, void>({
      query: () => ({
        url: "/schedules",
        method: "GET",
      }),
      providesTags: ['Schedule'],
    }),
    getSchedule: build.query<Schedule, string>({
      query: (id) => ({
        url: `/schedules/${id}`,
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
    getCourses: build.query<CourseResponse, void>({
      query: () => ({
        url: "/courses",
        method: "GET",
      }),
      providesTags: ['Course'],
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
    getRooms: build.query<RoomResponse, void>({
      query: () => ({
        url: "/rooms",
        method: "GET",
      }),
      providesTags: ['Room'],
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
    getSections: build.query<SectionResponse, void>({
      query: () => ({
        url: "/section",
        method: "GET",
      }),
      providesTags: ['Section'],
    }),
    getAll: build.query<GetAllResponse, void>({
      query: () => ({
        url: "/all",
        method: "GET",
      }),
      providesTags: ['Section','Schedule','Room','Course','Professor'],
    }),
  }),
});

export const { 
  useCreateScheduleMutation,
  useGetSchedulesQuery,
  useGetScheduleQuery,
  useCreateProfessorMutation,
  useGetProfessorsQuery,
  useCreateCourseMutation,
  useGetCoursesQuery,
  useCreateRoomMutation,
  useGetRoomsQuery,
  useCreateSectionMutation,
  useGetSectionsQuery,
  useGetAllQuery
} = api;
