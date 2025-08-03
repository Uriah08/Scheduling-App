import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function DELETE(req: Request) {
  try {

  const url = new URL(req.url);
    const pathname = url.pathname;

    const parts = pathname.split('/');

    const scheduleId = parts[3];
    const professorId = parts[4];
    const courseId = parts[5]; 

    await prisma.courseAssignment.deleteMany({
      where: {
        scheduleId,
        professorId,
        courseId,
      },
    });

    return NextResponse.json(
      { message: "Assign Deleted Successfully" },
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
