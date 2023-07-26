"use client";
import { updateJournalEntry } from "@/utils/api";
import { useState } from "react";
import { useAutosave } from "react-autosave";

type EditorProps = {
    entry: {
        content: string;
        id: string;
    };
};

const Editor = ({ entry }: EditorProps) => {
    const [value, setValue] = useState(entry?.content);
    const [isLoading, setisLoading] = useState(false);

    useAutosave({
        data: value,
        onSave: async (_value) => {
            setisLoading(true);
            await updateJournalEntry(entry.id, _value);
            setisLoading(false);
        },
    });

    return (
        <div className="relative grid w-full h-full grid-cols-3 gap-0">
            {isLoading && <div>...Loading</div>}
            <textarea
                className="w-full h-full p-8 text-xl bg-inherit"
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
        </div>
    );
};

export default Editor;
