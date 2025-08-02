import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { scheduleSchema } from "@/schemas";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const parsed = scheduleSchema.safeParse(body);

        if (!parsed.success) {
            return NextResponse.json(
                { error: parsed.error.format() },
                { status: 400 }
            );
        }

        const { name, description, year, semester } = parsed.data;

        await prisma.schedule.create({
            data: {
                name,
                description,
                year,
                semester
            }
        })

        return NextResponse.json({ message: "Creating Schedule Successful" }, { status: 201 });
    } catch (error) {
        console.error("Error creating schedule:", error);
        return NextResponse.json({ error: "Failed to create schedule" }, { status: 500 });
    }
}

export async function GET() {
    try {
        const schedules = await prisma.schedule.findMany({});
        
        return NextResponse.json({schedules}, { status: 200 });
    } catch (error) {
        console.error("Error creating schedule:", error);
        return NextResponse.json({ error: "Failed to get schedule" }, { status: 500 });
    }
}