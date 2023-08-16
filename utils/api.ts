export const createURL = (path: string) => {
    return window.location.origin + path;
};

export const createNewJournalEntry = async () => {
    const res = await fetch(
        new Request(createURL("/api/journal"), {
            method: "POST",
        })
    );

    if (res.ok) {
        const data = await res.json();
        return data.data;
    }
};

export const updateJournalEntry = async (id: string, content: string) => {
    const res = await fetch(
        new Request(createURL(`/api/journal/${id}`), {
            method: "PATCH",
            body: JSON.stringify({ content }),
        })
    );

    if (res.ok) {
        const data = await res.json();
        return data.data;
    }
};

export const deleteJournalEntry = async (id: string) => {
    const res = await fetch(
        new Request(createURL(`/api/journal/${id}`), {
            method: "DELETE",
        })
    );

    if (res.ok) {
        return true;
    }
};

export const askQuestion = async (question: string) => {
    const res = await fetch(
        new Request(createURL("/api/question"), {
            method: "POST",
            body: JSON.stringify({ question }),
        })
    );

    if (res.ok) {
        const data = await res.json();
        return data.data;
    }
};
