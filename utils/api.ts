export const createURL = (path: string) => {
  return window.location.origin + path;
};

interface FetchArgs {
  method?: 'GET' | 'POST' | 'PATCH' | 'DELETE';
  body?: string;
  headers?: Record<string, string>;
}

export const performFetchRequest = async (url: string, options: FetchArgs) => {
  try {
    const res = await fetch(
      new Request(createURL(url), {
        ...options,
      })
    );

    if (res.ok) {
      const data = await res.json();
      return data.data;
    }
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};

export const createNewJournalEntry = async () => {
  const options = {
    method: 'POST',
  } as FetchArgs;
  return performFetchRequest('/api/journal', options);
};

export const updateJournalEntry = async (id: string, content: string) => {
  const options = {
    method: 'PATCH',
    body: JSON.stringify({ content }),
  } as FetchArgs;
  return performFetchRequest(`/api/journal/${id}`, options);
};

export const deleteJournalEntry = async (id: string) => {
  const options = {
    method: 'DELETE',
  } as FetchArgs;
  return performFetchRequest(`/api/journal/${id}`, options);
};

export const askQuestion = async (question: string) => {
  const options = {
    method: 'POST',
    body: JSON.stringify({ question }),
  } as FetchArgs;
  return performFetchRequest('/api/questions', options);
};
