import fs from "fs";
import path from "path";

export function loadAndChunkDocs(
  dir: string,
  chunkSize: number = 300
): { id: string; text: string }[] {
  const files = fs.readdirSync(dir);
  const allChunks: { id: string; text: string }[] = [];
  for (const file of files) {
    const filePath = path.join(dir, file);
    const content = fs.readFileSync(filePath, "utf-8");
    const chunks = chunkText(content, chunkSize);
    chunks.forEach((ch, i) => {
      allChunks.push({
        id: `${file}::part-${i}`,
        text: ch,
      });
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
