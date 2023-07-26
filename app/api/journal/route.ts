import { getUserByClerkID } from "@/utils/auth";
import { NextResponse } from "next/server";
import { prisma } from "@/utils/db";
import { revalidatePath } from "next/cache";

export const POST = async () => {
    const user = await getUserByClerkID();
    const entry = await prisma.journalEntry.create({
        data: {
            userId: user.id,
            content: "Write your content here",
        },
    });

    revalidatePath("/journal");

    return NextResponse.json({ data: entry });
};

export const DELETE = async (request: Request, { params }) => {
    const user = await getUserByClerkID();

    await prisma.journalEntry.delete({
        where: {
            userId_id: {
                userId: user.id,
                id: params.id,
            },
        },
    });

    revalidatePath("/journal");

    return NextResponse.next();
};
