# 🧠 Samantha — RAG Chatbot in Node.js

**Samantha** is a Retrieval-Augmented Generation (RAG) chatbot built with Node.js that lets you query your own documents using a local CLI interface. It combines the power of OpenAI’s language models with semantic search over locally stored files to provide accurate, context-aware answers.

---

## ✨ Features

- 📁 Load and chunk local text/PDF files
- 🧠 Generate embeddings and build a local vector store
- 🔍 Retrieve relevant chunks for each user query
- 💬 Combine retrieved context with the user's prompt and send to OpenAI's API
- 🖥️ Chat directly from your terminal (CLI interface)

---

## 📦 Installation

```bash
git clone https://github.com/shahab0105/Samantha.git
cd Samantha
npm install
```

---

## 🛠️ Usage

### 1. Prepare your documents

Put your `.txt` or `.pdf` files in the `src/knowledge/` directory.

### 2. Run the embedding script

This will load and chunk your documents and generate a local vector store.

```bash
npm run build-store
```

### 3. Start the chatbot

Run the CLI chatbot:

```bash
npm run chat
```

Start asking questions like:

```
> What is this document about?
> Summarize the second chapter.
> Who is mentioned in the intro?
```

Samantha will search your files and respond with answers based on real document context.

---

## 📂 Project Structure

```
src/
├── document/
│   ├── loader.ts         # Loads and chunks documents
│   ├── vectorStore.ts    # Embedding + vector DB
├── samantha.ts           # Core RAG chatbot logic
├── index.ts              # CLI entry point
.env                      # Your OpenAI key and configs
```

---

## 🧪 Tech Stack

- Node.js + TypeScript
- OpenAI API (GPT-3.5 / GPT-4)
- Local in-memory vector store using cosine similarity
- CLI input via `readline`
- PDF/text parsing with `pdf-parse` and `fs`

---

## 🔐 Environment Variables

Create a `.env` file in the root:

```
OPENAI_API_KEY=your-api-key
```

---

## 🗒️ Notes

- Currently supports `.txt` and `.pdf` (via custom parsers)
- Embeddings and chunked content are stored in-memory on each run
- Designed for local testing and prototyping, not production-scale use

---

## 📜 License

MIT License

---

## 👤 Author

Built by [shahab uddin](https://github.com/shahab0105) for educational and experimental purposes.
