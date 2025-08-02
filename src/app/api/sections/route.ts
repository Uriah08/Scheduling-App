import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { sectionSchema } from "@/schemas";

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const parsed = sectionSchema.safeParse(body)

        if (!parsed.success) {
            return NextResponse.json(
                { error: parsed.error.format() },
                { status: 400 }
            );
        }

        const { type, year, section } = parsed.data

        await prisma.section.create({
            data: {
                type,
                year,
                section
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
        const sections = await prisma.section.findMany({});
        
        return NextResponse.json({sections}, { status: 200 });
    } catch (error) {
        console.error("Error creating section:", error);
        return NextResponse.json({ error: "Failed to get sections" }, { status: 500 });
    }
}