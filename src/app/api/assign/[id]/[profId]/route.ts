import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  try {

  const url = new URL(req.url);
    const pathname = url.pathname;

    const parts = pathname.split('/');

    const scheduleId = parts[3];
    const professorId = parts[4];

    const assign = await prisma.courseAssignment.findMany({
      where: {
        scheduleId,
        professorId,
      },
      include: {
        course: true
      }
    });

    return NextResponse.json(
      { assign },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error getting data:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
