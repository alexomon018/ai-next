"use client";
import { updateJournalEntry, deleteJournalEntry } from "@/utils/api";
import { useState } from "react";
import { useAutosave } from "react-autosave";

type EditorProps = {
    entry: {
        content: string;
        id: string;
        analysis: {
            color: string;
            subject: string;
            mood: string;
            negative: boolean;
        };
    };
};

const Editor = ({ entry }: EditorProps) => {
    const [value, setValue] = useState(entry?.content);
    const [isLoading, setisLoading] = useState(false);
    const [analysis, setAnalysis] = useState(entry?.analysis);

    useAutosave({
        data: value,
        onSave: async (_value) => {
            setisLoading(true);
            const data = await updateJournalEntry(entry.id, _value);
            setAnalysis(data?.analysis);

            setisLoading(false);
        },
    });

    const handleDelete = async () => {
        setisLoading(true);
        await deleteJournalEntry(entry.id);
        setisLoading(false);
    };

    return (
        <div className="relative grid w-full h-full grid-cols-3 gap-0">
            <div className="col-span-2">
                {isLoading && <div>...Loading</div>}
                <textarea
                    className="w-full p-8 text-xl bg-inherit"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
            </div>

            <div className="border-l border-black/5">
                <div
                    style={{ background: analysis?.color }}
                    className="h-[100px] bg-blue-600 text-white p-8"
                >
                    <h2 className="text-2xl text-black bg-white/25">
                        Analysis
                    </h2>
                </div>
                <div>
                    <ul role="list" className="divide-y divide-gray-200">
                        <li className="flex items-center justify-between px-8 py-4">
                            <div className="w-1/3 text-xl font-semibold">
                                Summary
                            </div>
                            <div className="text-xl">{analysis.summary}</div>
                        </li>
                        <li className="flex items-center justify-between px-8 py-4">
                            <div className="w-1/3 text-xl font-semibold">
                                Subject
                            </div>
                            <div className="text-xl">{analysis.subject}</div>
                        </li>

                        <li className="flex items-center justify-between px-8 py-4">
                            <div className="text-xl font-semibold">Mood</div>
                            <div className="text-xl">{analysis.mood}</div>
                        </li>

                        <li className="flex items-center justify-between px-8 py-4">
                            <div className="text-xl font-semibold">
                                Negative
                            </div>
                            <div className="text-xl">
                                {analysis.negative ? "True" : "False"}
                            </div>
                        </li>
                        <li className="flex items-center justify-between px-8 py-4">
                            <button
                                onClick={handleDelete}
                                type="button"
                                className="px-3 py-2 text-sm font-semibold text-white bg-red-600 rounded-md shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                            >
                                Delete
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Editor;
