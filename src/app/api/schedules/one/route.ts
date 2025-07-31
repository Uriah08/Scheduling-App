import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Missing ID" }, { status: 400 });
    }

    console.log(id);
    

    const schedule = await prisma.schedule.findUnique({
      where: { id },
    });

    if (!schedule) {
      return NextResponse.json({ error: "Schedule not found" }, { status: 404 });
    }

    console.log(schedule);
    
    return NextResponse.json({ message: "WOW"}, { status: 200});
  } catch (error) {
    console.error("Error getting schedule:", error);
    return NextResponse.json({ error: "Failed to get schedule" }, { status: 500 });
  }
}