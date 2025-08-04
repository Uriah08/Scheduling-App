import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
    req: NextRequest,
    context: { params: { id: string } }
) {
    try {
        const { id } = await context.params;
        const sections = await prisma.section.findMany({
            where: {
                scheduleId: id
            }
        })
        
        return NextResponse.json({ sections }, { status: 200 })
    } catch (error) {
        console.error("Error getting data:", error);
        return NextResponse.json({ error: "Failed to get data" }, { status: 500 });
    }
}