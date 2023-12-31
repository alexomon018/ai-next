import { analyze } from '@/utils/ai';
import { getUserByClerkID } from '@/utils/auth';
import { prisma } from '@/utils/db';
import { NextResponse } from 'next/server';

export const PATCH = async (
  request: Request,
  {
    params,
  }: {
    params: {
      id: string;
    };
  }
) => {
  const { content } = await request.json();

  const user = await getUserByClerkID();

  //update the entry in DB
  const updatedEntry = await prisma.journalEntry.update({
    where: {
      userId_id: {
        userId: user.id,
        id: params.id,
      },
    },
    data: {
      content,
    },
  });

  //speak to the AI

  const analysis = await analyze(updatedEntry.content);

  //update the analysis in DB
  const updated = await prisma.analysis.upsert({
    where: {
      entryId: updatedEntry.id,
    },
    create: {
      userId: user.id,
      entryId: updatedEntry.id,
      mood: analysis?.mood as string,
      summary: analysis?.summary as string,
      sentimentScore: analysis?.sentimentScore as number,
      subject: analysis?.subject as string,
      negative: analysis?.negative as boolean,
      color: analysis?.color as string,
    },
    update: {
      mood: analysis?.mood as string,
      summary: analysis?.summary as string,
      sentimentScore: analysis?.sentimentScore as number,
      subject: analysis?.subject as string,
      negative: analysis?.negative as boolean,
      color: analysis?.color as string,
    },
  });

  return NextResponse.json({
    data: {
      ...updatedEntry,
      analysis: updated,
    },
  });
};
