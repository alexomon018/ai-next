import { OpenAI } from 'langchain/llms/openai';
import { JsonSpec, JsonObject } from 'langchain/tools';
import { JsonToolkit, createJsonAgent } from 'langchain/agents';
import * as fs from 'fs';

export const agentQa = async (question: string) => {
  let data: JsonObject;
  try {
    const cityProps = fs.readFileSync('utils/props.json', 'utf8') as any;
    data = JSON.parse(cityProps) as JsonObject;
    if (!data) {
      throw new Error('Failed to load OpenAPI spec');
    }
  } catch (e) {
    console.error(e);
    return;
  }

  const toolkit = data && new JsonToolkit(new JsonSpec(data));
  const model = new OpenAI({
    temperature: 0,
  });
  const executor = createJsonAgent(model, toolkit);

  console.log(`Executing with input "${question}"...`);

  const result = await executor.call({ input: question });

  console.log(`Got output ${result.output}`);

  console.log(
    `Got intermediate steps ${JSON.stringify(
      result.intermediateSteps,
      null,
      2
    )}`
  );

  return result.output;
};
