import fs from "fs";
import path from "path";
import { extractTextFromPDF } from "./pdfLoader";
export async function loadAndChunkDocs(
  dir: string,
  chunkSize = 300
): Promise<{ id: string; text: string }[]> {
  const files = fs.readdirSync(dir);
  const allChunks: { id: string; text: string }[] = [];

  for (const file of files) {
    const fullPath = path.join(dir, file);
    const ext = path.extname(file).toLowerCase();

    let content = "";

    if (ext === ".pdf") {
      content = await extractTextFromPDF(fullPath);
    } else {
      content = fs.readFileSync(fullPath, "utf-8");
    }

    const chunks = chunkText(content, chunkSize);

    chunks.forEach((chunk, i) => {
      allChunks.push({ id: `${file}::part-${i}`, text: chunk });
    });
  }

  return allChunks;
}

function chunkText(text: string, maxWords: number = 300): string[] {
  const words = text.split(/\s+/);
  const chunks: string[] = [];
  for (let i = 0; i < words.length; i += maxWords) {
    const chunk = words.slice(i, i + maxWords).join(" ");
    chunks.push(chunk);
  }
  return chunks;
}
