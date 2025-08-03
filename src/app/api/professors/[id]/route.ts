import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
    req: Request,
    context: { params: { id: string } }
) {
    try {
        const { id } = await context.params;

        const professor = await prisma.professor.findUnique({
            where: {
                id
            }
        })
        
        return NextResponse.json(professor , { status: 201 })
    } catch (error) {
        console.error("Error getting data:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}