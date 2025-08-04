import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { sectionSchema } from "@/schemas";

export async function POST(request: Request) {
    try {
        const body = await request.json()

        const {
            id,
            ...data
        } = body
        const parsed = sectionSchema.safeParse(data)

        if (!parsed.success) {
            return NextResponse.json(
                { error: parsed.error.format() },
                { status: 400 }
            );
        }

        const { type, year, section } = parsed.data

        console.log(type, year, section, id);
        
        const existing = await prisma.section.findFirst({
            where: {
                type,
                year,
                section,
                scheduleId: id
            }
        })

        if (existing) {
            return NextResponse.json({ error: 'This section exists' }, { status: 409 })
        }

        await prisma.section.create({
            data: {
                scheduleId: id,
                type,
                year,
                section,
            }
        })

        return NextResponse.json({ message: "Created Section Successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error creating schedule:", error);
        return NextResponse.json({ error: "Failed to create schedule" }, { status: 500 });
    }
}

export async function GET() {
    try {
        console.log('hit');
        const sections = await prisma.section.findMany(); 
        
        return NextResponse.json({sections}, { status: 200 });
    } catch (error) {
        console.error("Error creating section:", error);
        return NextResponse.json({ error: "Failed to get sections" }, { status: 500 });
    }
}