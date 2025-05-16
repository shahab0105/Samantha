import * as readline from "readline";
import { askSamantha } from "./samantha";
import { loadAndChunkDocs } from "./document/loader";
import { buildVectorStore } from "./document/vectorStore";

const mode = process.argv[2];
const knowledgeRoot: string  = process.env.knowledgeRoot ?? "C:/Users/<your_user>/documents";
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function prompt() {
  rl.question("You: ", async (input: string) => {
    if (input === "BYE") {
      console.log("Samantha's left the chatroom");
      return; //break recursion here
    }
    const response = await askSamantha(input);
    console.log("Samantha:", response);
    prompt();
  });
}

async function initStore() {
  const chunks = await loadAndChunkDocs(knowledgeRoot, 300);
  await buildVectorStore(chunks);
}
// sandBoxInit();
// prompt();

async function main() {
  if (mode == "build") {
    await initStore();
  } else if (mode == "run") {
    prompt();
  }
}

main();
