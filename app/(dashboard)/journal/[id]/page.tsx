import React from 'react';
import Editor from '@/components/Editor';
import { prisma } from '@/utils/db';
import { getUserByClerkID } from '@/utils/auth';

interface Analysis {
  color: string;
  subject: string;
  mood: string;
  negative: boolean;
  summary: string;
  sentimentScore: number;
}

interface JournalEntry {
  content: string;
  id: string;
  analysis: Analysis | null;
}

const getEntry = async (id: string): Promise<JournalEntry | null> => {
  const user = await getUserByClerkID();
  const entry = await prisma.journalEntry.findUnique({
    where: {
      userId_id: {
        userId: user.id,
        id: id,
      },
    },
    include: {
      analysis: true,
    },
  });

  return entry;
};

const EntryPage = async ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const entry = await getEntry(params.id);

  const defaultAnalysis: Analysis = {
    color: '',
    subject: '',
    mood: '',
    negative: false,
    summary: '',
    sentimentScore: 0,
  };

  const entryData: JournalEntry = {
    content: entry?.content || '',
    id: entry?.id || '',
    analysis: entry?.analysis || defaultAnalysis,
  };

  return (
    <div className="grid w-full h-full grid-cols-[1fr,1fr]">
      <div className="col-span-2">
        {entryData && <Editor entry={entryData} />}
      </div>
    </div>
  );
};

export default EntryPage;
