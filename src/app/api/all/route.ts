import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const [professors, courses, sections, rooms] = await Promise.all([
      prisma.professor.findMany(),
      prisma.course.findMany(),
      prisma.section.findMany(),
      prisma.room.findMany()
    ]);

    return NextResponse.json({
      status: 200,
      data: {
        professors,
        courses,
        sections,
        rooms
      }
    });
  } catch (error) {
    console.error("Error getting data:", error);
    return NextResponse.json({ error: "Failed to get data" }, { status: 500 });
  }
}
