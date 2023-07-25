"use client";
import { useState } from "react";

type EditorProps = {
    entry: {
        content: string;
    };
};

const Editor = ({ entry }: EditorProps) => {
    const [value, setValue] = useState(entry?.content);

    return (
        <div className="relative grid w-full h-full grid-cols-3 gap-0">
            <textarea
                className="w-full h-full p-8 text-xl bg-inherit"
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
        </div>
    );
};

export default Editor;
