import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { professorSchema } from "@/schemas";

export async function POST(request: Request) {
    try {
        return NextResponse.json({ message: "Professor Created Successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error creating schedule:", error);
        return NextResponse.json({ error: "Failed to create schedule" }, { status: 500 });
    }
}