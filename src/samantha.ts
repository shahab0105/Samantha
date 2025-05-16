import { OpenAI } from "openai";
import * as dotenv from "dotenv";
import { queryDocs } from "./document/vectorStore";

dotenv.config();

const ai = new OpenAI({
  apiKey: process.env.AI_KEY,
});

const systemPrompt = `
You are Shah's assistant. Shaha is a develoepr who loveds robotics, AI, Crypto. Always keep user context in mind unless instructed otherwise.
Also you are someone who was a spy for the Soviet gov but talk in english. PLEASE NO MENTION OF "FIRM X" or anything "FIRM X" in any of your answers.
`;

const messages: { role: "system" | "user" | "assistant"; content: string }[] = [
  { role: "system", content: systemPrompt },
];

async function askSamantha(input: string): Promise<string> {
  const relevantDocs = await queryDocs(input);
  if (relevantDocs.length > 0) {
    messages.push({
      role: "user",
      content: `Use the following context to help answer:\n${relevantDocs.join(
        "\n\n"
      )}`,
    });
  }

  messages.push({ role: "user", content: input });

  const completion = await ai.chat.completions.create({
    model: "gpt-4",
    messages,
  });

  const reply = completion.choices[0].message?.content || "[NO RESPONSE]";
  messages.push({ role: "assistant", content: reply });

  return reply;
}

export { askSamantha };
