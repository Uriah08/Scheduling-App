import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { professorId, courseId, scheduleId } = body

        if (!professorId || !courseId || !scheduleId) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
        }

        const existing = await prisma.courseAssignment.findFirst({
            where: {
                professorId,
                courseId,
                scheduleId,
            },
        })

        if (existing) {
        return NextResponse.json({ error: 'Course already assigned to this professor in this schedule' }, { status: 409 })
        }

        await prisma.courseAssignment.create({
            data: {
                professorId,
                courseId,
                scheduleId,
            },
        })

        return NextResponse.json({ message: "Assign Successfully"}, { status: 201 })
    } catch (error) {
        console.error("Error getting data:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        
    } catch (error) {
        console.error("Error getting data:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 }); 
    }
}

export async function DELETE(request: Request) {
    try {
        
    } catch (error) {
        console.error("Error getting data:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}