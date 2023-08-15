"use client";

import React, { useState } from "react";

const Question = () => {
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {};

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    className="p-2 text-lg border border-gray-300 rounded-md"
                    disabled={loading}
                    placeholder="Ask a question..."
                />
                <button
                    disabled={loading}
                    type="submit"
                    className="px-4 py-2 bg-blue-400 rounded-md"
                >
                    Ask
                </button>
            </form>
            {loading && <p>Loading...</p>}
            {answer && <p className="my-4 text-xl">{answer}</p>}
        </div>
    );
};

export default Question;