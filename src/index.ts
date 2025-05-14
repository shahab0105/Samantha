import * as readline from "readline";
import { askSamantha } from "./samantha";
import { loadAndChunkDocs } from "./document/loader";

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

// prompt();
function sandBoxInit() {
  const chunks = loadAndChunkDocs("D:\\Projects\\Samantha\\src\\knowledge\\",300);
  console.log(chunks);
}
sandBoxInit();