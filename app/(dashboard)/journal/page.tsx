import { getUserByClerkID } from "@/utils/auth";
import { prisma } from "@/utils/db";
import EntryCard from "@/components/EntryCard";
import Link from "next/link";
import NewEntryCard from "@/components/NewEntryCard";
import { analyze } from "@/utils/ai";

const getEntries = async () => {
    const user = await getUserByClerkID();
    const entries = await prisma.journalEntry.findMany({
        where: {
            userId: user.id,
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    await analyze("write me about your day");

    return entries;
};

const JournalPage = async () => {
    const data = await getEntries();

    return (
        <div className="h-full px-6 py-8 bg-zinc-100/50">
            <h1 className="mb-12 text-4xl">Journals</h1>
            <div className="my-8"></div>
            <div className="grid grid-cols-3 gap-4">
                <NewEntryCard />
                {data.map((entry) => (
                    <div key={entry.id}>
                        <Link href={`/journal/${entry.id}`}>
                            <EntryCard entry={entry} />
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default JournalPage;
