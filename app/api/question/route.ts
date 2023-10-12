import { qa } from '@/utils/ai';
import { NextResponse } from 'next/server';

export const POST = async (request: Request) => {
  const { question } = await request.json();

  const anwser = await qa(question);

  return NextResponse.json({ data: anwser });
};
