import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
    try {

        const url = new URL(request.url);
        const pathname = url.pathname;

        const parts = pathname.split('/');

        const scheduleId = parts[3];
        const professorId = parts[4];

        const classSchedule = await prisma.weeklySchedule.findMany({
            where: {
                scheduleId,
                professorId
            }
        })

        console.log(classSchedule);
        

        return NextResponse.json({ classSchedule }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}