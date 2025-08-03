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

type AssignedCourse = {
  id: string
  scheduleId: string
  professorId: string
  courseId: string
  schedule: {
    id: string
    name: string
    year: string
    semester: string
    description?: string | null
  }
  professor: {
    id: string
    firstName: string
    lastName: string
    middleInitial?: string | null
    acadRank: string
  }
  course: {
    id: string
    program: string
    code: string
    title: string
    creditLec: number
    creditLab: number
    contactLec: number
    contactLab: number
    prerequisites: string[]
    year: string
    semester: string
  }
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
  tagTypes: ['Schedule','Professor','Course','Room','Section', 'Assign'],
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
    getProfessor: build.query<Professor, string>({
      query: (id) => ({
        url: `/professors/${id}`,
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
    getRoom: build.query<Room, string>({
      query: (id) => ({
        url: `/rooms/${id}`,
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
        url: "/sections",
        method: "GET",
      }),
      providesTags: ['Section'],
    }),
    getTest: build.query<SectionResponse, void>({
      query: () => ({
        url: "/test",
        method: "GET",
      }),
      providesTags: ['Section'],
    }),
    getAll: build.query<GetAllResponse, string>({
      query: (id) => ({
        url: `/all/${id}`,
        method: "GET",
      }),
      providesTags: ['Section','Schedule','Room','Course','Professor'],
    }),
    assignCourse: build.mutation({
      query: (data) => ({
        url: "/assign",
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ['Assign']
    }),
    getAssignedCourse: build.query<AssignedCourse[], string>({
      query: (id) => ({
        url: `/assign/${id}`,
        method: "GET",
      }),
      providesTags: ['Assign'],
    }),
    deleteAssignedCourse: build.mutation<void, { scheduleId: string; professorId: string; courseId: string }>({
      query: ({ scheduleId, professorId, courseId }) => ({
        url: `/assign/${scheduleId}/${professorId}/${courseId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Assign'],
    }),
  }),
});

export const { 
  useCreateScheduleMutation,
  useGetSchedulesQuery,
  useGetScheduleQuery,
  useCreateProfessorMutation,
  useGetProfessorsQuery,
  useGetProfessorQuery,
  useCreateCourseMutation,
  useGetCoursesQuery,
  useCreateRoomMutation,
  useGetRoomsQuery,
  useGetRoomQuery,
  useCreateSectionMutation,
  useGetSectionsQuery,
  useGetTestQuery,
  useGetAllQuery,
  useAssignCourseMutation,
  useGetAssignedCourseQuery,
  useDeleteAssignedCourseMutation
} = api;
