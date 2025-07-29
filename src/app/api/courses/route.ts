import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { courseSchema } from "@/schemas";

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const parsed = courseSchema.safeParse(body)

        if (!parsed.success) {
            return NextResponse.json(
                { error: parsed.error.format() },
                { status: 400 }
            );
        }

        const { program, code, title, creditLec, creditLab, contactLec, contactLab, prerequisites } = parsed.data

        await prisma.course.create({
            data: {
                program,
                code,
                title,
                creditLec:  Number(creditLec),
                creditLab: Number(creditLab),
                contactLab: Number(contactLab),
                contactLec: Number(contactLec),
                prerequisites
            }
        })   

        return NextResponse.json({ message: "Course Created Successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error creating schedule:", error);
        return NextResponse.json({ error: "Failed to create schedule" }, { status: 500 });
    }
}