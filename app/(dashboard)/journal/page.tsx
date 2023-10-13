import { getUserByClerkID } from '@/utils/auth';
import { prisma } from '@/utils/db';
import Question from '@/components/Question';

interface Analysis {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  entryId: string;
  userId: string;
  mood: string;
  summary: string;
  color: string;
  negative: boolean;
  subject: string;
  sentimentScore: number;
}

interface JournalEntry {
  createdAt: Date;
  analysis: Analysis | null;
  id: string;
}

const getEntries = async (): Promise<JournalEntry[] | null> => {
  const user = await getUserByClerkID();
  const entries = await prisma.journalEntry.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      analysis: true,
    },
  });

  return entries;
};

const JournalPage = async () => {
  const data = await getEntries();

  return (
    <div className="w-full h-full px-6 py-8 bg-zinc-100/50 border-1">
      <h1 className="text-4xl font-bold text-center">LLM Chat test</h1>
      <div className="my-8">
        <Question />
      </div>
    </div>
  );
};

export default JournalPage;
