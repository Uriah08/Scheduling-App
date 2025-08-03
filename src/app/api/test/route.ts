import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
    try {
        const sections = await prisma.section.findMany()
        return NextResponse.json({ sections }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Failed to get sections" }, { status: 500 });
    }
}