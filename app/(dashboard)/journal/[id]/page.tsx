import React from "react";
import Editor from "@/components/Editor";
import { prisma } from "@/utils/db";
import { getUserByClerkID } from "@/utils/auth";

const getEntry = async (id: string) => {
    const user = await getUserByClerkID();
    const entry = await prisma.journalEntry.findUnique({
        where: {
            userId_id: {
                userId: user.id,
                id: id,
            },
        },
    });

    return entry;
};

const EntryPage = async ({ params }) => {
    const entry = await getEntry(params.id);

    return (
        <div>
            <Editor entry={entry} />
        </div>
    );
};

export default EntryPage;
