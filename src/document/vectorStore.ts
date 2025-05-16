import fs from "fs";
import path from "path";
import { getEmbedding } from "../utils/embeddingUtils";

const storePath = path.resolve(__dirname, "../../src/data/docVectors.json");

interface VectorDoc {
  id: string;
  text: string;
  vector: number[];
}

async function buildVectorStore(chunks: { id: string; text: string }[]) {
  const vectors: VectorDoc[] = [];
  for (const chunk of chunks) {
    const chunkEmbedding = await getEmbedding(chunk.text);
    vectors.push({ ...chunk, vector: chunkEmbedding });
  }
  //lets write this to jsonfile vectorStore
  fs.writeFileSync(storePath, JSON.stringify(vectors, null, 2));
  //   fs.writeFileSync(storePath,JSON.stringify(chunks,null,2));
}

function loadVectorStore(): VectorDoc[] {
  // const vectors: VectorDoc[] = [];
  const rawVectors = fs.readFileSync(storePath, "utf-8");
  // vectors.push(JSON.parse(rawVectors));
  const vectors = JSON.parse(rawVectors);
  return vectors as VectorDoc[];
}
//simply the dotproduct of two vectors
//so we will get the dot product between the vector(getembedding output) of user's question/query
//so dot product of each row/record and then get the top 3 results
function cosineSim(a: number[], b: number[]): number {
  const dot = a.reduce((sum, ai, i) => sum + ai * b[i], 0);
  const normA = Math.sqrt(a.reduce((sum, ai) => sum + ai * ai, 0));
  const normB = Math.sqrt(b.reduce((sum, bi) => sum + bi * bi, 0));
  return dot / (normA * normB);
}

//uses cosinesymmetry to return the top k or default 3
export async function queryDocs(query: string, topK = 3): Promise<string[]> {
  const queryVec = await getEmbedding(query);
  const docs = loadVectorStore();

  const validDocs = docs.filter(
    (d) => Array.isArray(d.vector) && d.vector.length === queryVec.length
  );
  return validDocs
    .map((d) => ({ ...d, score: cosineSim(queryVec, d.vector) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, topK)
    .map((d) => d.text);
}
export { buildVectorStore, loadVectorStore };
