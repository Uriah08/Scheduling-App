import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
    try {
        const body = await request.json()

        const { selectedSection, professorId, course, day, timeStart, timeEnd, scheduleId} = body

        const startTime = timeStart.split(' - ')[0];
        const endTime = timeEnd.split(' - ')[1];

        function timeToMinutes(timeStr: string): number {
        const [time, modifier] = timeStr.split(" ");
        const [rawHours, minutes] = time.split(":").map(Number);

        let hours = rawHours;
        if (modifier === "PM" && hours !== 12) hours += 12;
        if (modifier === "AM" && hours === 12) hours = 0;

        return hours * 60 + minutes;
        }

        function formatTime(minutes: number): string {
        const h = Math.floor(minutes / 60);
        const m = minutes % 60;
        return `${h}:${m.toString().padStart(2, "0")}`;
        }

        const startMinutes = timeToMinutes(startTime);
        const endMinutes = timeToMinutes(endTime);

        const timeSlots: string[] = [];
        for (let t = startMinutes; t <= endMinutes; t += 30) {
        timeSlots.push(formatTime(t));
        }
        
        await prisma.weeklySchedule.create({
            data: {
                sectionId: selectedSection,
                scheduleId,
                professorId,
                courseId: course,
                day,
                time: timeSlots
            }
        })

        return NextResponse.json({ error: "Success" }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}