import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
    req: NextRequest,
    context: { params: { id: string } }
) {
    const { id } = await context.params;

    try {
        const assigns = await prisma.courseAssignment.findMany({
            where: {
                scheduleId: id
            },
            include: {
                course: true,
                professor: {
                    select: {
                        id: true
                    }
                },
            }
        })

        return NextResponse.json( assigns , { status: 201 })
    } catch (error) {
        console.error("Error getting data:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
