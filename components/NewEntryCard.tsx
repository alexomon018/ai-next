"use client";

import { createNewJournalEntry } from "@/utils/api";
import React from "react";
import { useRouter } from "next/navigation";

const NewEntryCard = () => {
    const router = useRouter();

    const handleOnClick = async () => {
        const data = await createNewJournalEntry();
        router.push(`/journal/${data.id}`);
    };

    return (
        <div className="overflow-hidden bg-white rounded-lg shadow cursor-pointer">
            <div className="px-4 py-5 sm:p-6" onClick={handleOnClick}>
                <span className="text-3xl text-black">New Entry</span>
            </div>
        </div>
    );
};

export default NewEntryCard;
