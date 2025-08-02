import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { roomSchema } from "@/schemas";

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const parsed = roomSchema.safeParse(body)

        if (!parsed.success) {
            return NextResponse.json(
                { error: parsed.error.format() },
                { status: 400 }
            );
        }

        const { name } = parsed.data

        await prisma.room.create({
            data: {
                name
            }
        })
        
        return NextResponse.json({ message: "Room Created Successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error creating schedule:", error);
        return NextResponse.json({ error: "Failed to create schedule" }, { status: 500 });
    }
}

export async function GET() {
    try {
        const rooms = await prisma.room.findMany({});
        
        return NextResponse.json({rooms}, { status: 200 });
    } catch (error) {
        console.error("Error creating room:", error);
        return NextResponse.json({ error: "Failed to get room" }, { status: 500 });
    }
}