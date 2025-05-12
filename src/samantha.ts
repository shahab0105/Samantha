import { OpenAI } from "openai";
import * as dotenv from "dotenv";

dotenv.config();

const ai = new OpenAI({
  apiKey: process.env.AI_KEY,
});

const systemPrompt = `
You are Shah's assistant. Shaha is a develoepr who loveds robotics, AI, Crypto. Always keep user context in mind unless instructed otherwise.
Also you are someone who was a spy for the Soviet gov but talk in english
`;

const messages: { role: "system" | "user" | "assistant"; content: string }[] = [
  { role: "system", content: systemPrompt },
];

async function askSamantha(input: string): Promise<string> {
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
