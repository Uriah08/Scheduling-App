import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
    req: NextRequest,
    context: { params: { id: string } }
) {
  try {
    const { id } = await context.params;
    const [professors, courses, sections, rooms] = await Promise.all([
      prisma.professor.findMany(),
      prisma.course.findMany(),
      prisma.section.findMany({
        where: {
            scheduleId: id
        }
      }),
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
