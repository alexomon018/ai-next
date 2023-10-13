import { OpenAIChat } from 'langchain/llms/openai';
import {
  StructuredOutputParser,
  OutputFixingParser,
} from 'langchain/output_parsers';
import { ConversationalRetrievalQAChain } from 'langchain/chains';
import { PromptTemplate } from 'langchain/prompts';
import z from 'zod';
import { BufferMemory } from 'langchain/memory';
import { Document } from 'langchain/document';
import { loadQARefineChain } from 'langchain/chains';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { MemoryVectorStore } from 'langchain/vectorstores/memory';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { HNSWLib } from 'langchain/vectorstores/hnswlib';

import * as fs from 'fs';

const parser = StructuredOutputParser.fromZodSchema(
  z.object({
    mood: z
      .string()
      .describe('the mood of the person who wrote the journal entry.'),
    subject: z.string().describe('the subject of the journal entry.'),
    negative: z
      .boolean()
      .describe(
        'is the journal entry negative? (i.e. does it contain negative emotions?).'
      ),
    summary: z.string().describe('quick summary of the entire entry.'),
    color: z
      .string()
      .describe(
        'a hexidecimal color code the represents the mood of the entry. Example #0101fe for blue representing happiness.'
      ),
    sentimentScore: z
      .number()
      .describe(
        'sentiment of the text and rated on a scale from -10 to 10, where -10 is extremely negative, 0 is neutral, and 10 is extremely positive.'
      ),
  })
);

const getPrompt = async (content: string) => {
  const format_instructions = parser.getFormatInstructions();
  const prompt = new PromptTemplate({
    template:
      'Analyze the following journal entry. Follow the intrusctions and format your response to match the format instructions, no matter what! \n{format_instructions}\n{entry}',
    inputVariables: ['entry'],
    partialVariables: { format_instructions },
  });

  const input = await prompt.format({ entry: content });

  return input;
};

export const analyze = async (content: string) => {
  const input = await getPrompt(content);

  const model = new OpenAIChat({
    temperature: 0,
    modelName: 'gpt-3.5-turbo',
  });

  const result = await model.call(input);

  try {
    return parser.parse(result);
  } catch (error) {
    console.log(error);
  }
};

export const qa = async (question: string) => {
  const CUSTOM_QUESTION_GENERATOR_CHAIN_PROMPT = `Given the following conversation and a follow up question, return the conversation history excerpt that includes any relevant context to the question if it exists and rephrase the follow up question to be a standalone question.
Chat History:
{chat_history}
Follow Up Input: {question}
Your answer should follow the following format:
\`\`\`
Use the following pieces of context to answer the users question.
If you don't know the answer, just say that you don't know, don't try to make up an answer.
----------------
<Relevant chat history excerpt as context here>
Standalone question: <Rephrased question here>
\`\`\`
Your answer:`;

  const cityProps = fs.readFileSync('utils/props.json', 'utf8') as any;

  const textSplitter = new RecursiveCharacterTextSplitter({ chunkSize: 1000 });

  const docs = await textSplitter.createDocuments([cityProps]);

  const model = new OpenAIChat({ temperature: 0, modelName: 'gpt-3.5-turbo' });
  const store = await HNSWLib.fromDocuments(docs, new OpenAIEmbeddings());

  const chain = ConversationalRetrievalQAChain.fromLLM(
    model,
    store.asRetriever(),
    {
      memory: new BufferMemory({
        memoryKey: 'chat_history',
        returnMessages: true,
      }),
      questionGeneratorChainOptions: {
        template: CUSTOM_QUESTION_GENERATOR_CHAIN_PROMPT,
      },
    }
  );

  const res = await chain.call({ question });

  console.log('res', res);

  return res.text;
};
