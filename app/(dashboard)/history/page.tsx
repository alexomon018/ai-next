import { getUserByClerkID } from "@/utils/auth";
import { prisma } from "@/utils/db";
import React from "react";
import HistoryChart from "@/components/HistoryChart";

const getData = async () => {
    const user = await getUserByClerkID();
    const analyses = await prisma.analysis.findMany({
        where: {
            userId: user.id,
        },
        orderBy: {
            updatedAt: "asc",
        },
    });

    const sum = analyses.reduce((acc, curr) => acc + curr.sentimentScore, 0);
    const avg = Math.round(sum / analyses.length);
    return { analyses, avg };
};

const History = async () => {
    const { analyses, avg } = await getData();
    return (
        <div className="h-full px-6 py-8">
            <div>
                <h1 className="mb-4 text-2xl">{`Avg. Sentiment: ${avg}`}</h1>
            </div>
            <div className="w-full h-full">
                <HistoryChart data={analyses} />
            </div>
        </div>
    );
};

export default History;
