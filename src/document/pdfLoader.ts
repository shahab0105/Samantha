// src/document/pdfLoader.ts
import fs from "fs";
import pdf from "pdf-parse";

export async function extractTextFromPDF(filePath: string): Promise<string> {
  const buffer = fs.readFileSync(filePath);
  const data = await pdf(buffer);
  return data.text; // plain text output
}
