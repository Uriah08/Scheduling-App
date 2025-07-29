import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { professorSchema } from "@/schemas";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const parsed = professorSchema.safeParse(body);

        if (!parsed.success) {
            return NextResponse.json(
                { error: parsed.error.format() },
                { status: 400 }
            );
        }

        const { firstName, lastName, middleInitial, acadRank } = parsed.data

        await prisma.professor.create({
            data: {
                firstName,
                lastName,
                middleInitial,
                acadRank
            }
        })
        
        return NextResponse.json({ message: "Professor Created Successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error creating schedule:", error);
        return NextResponse.json({ error: "Failed to create schedule" }, { status: 500 });
    }
}

export async function GET() {
    try {


        return NextResponse.json({ message: "Get Successfull"}, { status: 200 });
    } catch (error) {
        console.error("Error creating schedule:", error);
        return NextResponse.json({ error: "Failed to get schedule" }, { status: 500 });
    }
}