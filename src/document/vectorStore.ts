import fs from "fs";
import path from "path";
import { getEmbedding } from "../utils/embeddingUtils";

const storePath = path.resolve(__dirname, "../../data/docVectors.json");

interface VectorDoc {
  id: String;
  text: String;
  vector: number[];
}

function buildVectorStore(chunks: { id: string; text: string[] }): void {
  const vectors: VectorDoc[] = [];
  for(const chunk of chunks){
    const chunkEmbedding = getEmbedding(chunk.text);
    vectors.push({...chunk, vector: chunkEmbedding});
  }
  //lets write this to jsonfile vectorStore
  fs.writeFileSync(storePath, JSON.stringify(vectors, null, 2));

}

function loadVectorStore(): VectorDoc[]{
    const vectors: VectorDoc[] = [];
    const rawVectors = fs.readFileSync(storePath,"utf-8");
    vectors.push(JSON.parse(rawVectors));
    return vectors;

}
