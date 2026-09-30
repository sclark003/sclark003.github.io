import json
import os
import re
from pathlib import Path

import faiss
import numpy as np
from dotenv import load_dotenv
from langchain_classic.schema import Document
from langchain_groq import ChatGroq
from langchain_text_splitters import RecursiveCharacterTextSplitter
from sentence_transformers import SentenceTransformer

load_dotenv()

INDEX_DIR = Path(__file__).resolve().parent / "index"
INDEX_PATH = INDEX_DIR / "faiss.index"
METADATA_PATH = INDEX_DIR / "metadata.json"
EMBEDDING_MODEL = "sentence-transformers/paraphrase-MiniLM-L3-v2"
_EMBEDDING_MODEL_CACHE = None


def get_embedding_model():
    global _EMBEDDING_MODEL_CACHE
    if _EMBEDDING_MODEL_CACHE is None:
        _EMBEDDING_MODEL_CACHE = SentenceTransformer(EMBEDDING_MODEL, device="cpu")
    return _EMBEDDING_MODEL_CACHE


class _SimpleRAG:
    def __init__(self, llm, index, metadata, model):
        self.llm = llm
        self.index = index
        self.metadata = metadata
        self.model = model

    def invoke(self, payload):
        query = str(payload.get("query", "")).strip()
        context = retrieve_context(query, self.index, self.metadata, self.model, top_k=3)
        prompt = (
            "You are a helpful assistant for Sarah Clark's portfolio website. "
            "Answer questions about Sarah's skills, projects, experience and background "
            "using only the information provided below. Be concise and friendly. "
            "If the answer is not in the context, say you don't have that information.\n\n"
            f"Context: {context}\n\nQuestion: {query}\n\nAnswer:"
        )
        result = self.llm.invoke(prompt)
        answer = getattr(result, "content", str(result)).strip()
        return {"result": answer}


def load_markdown_documents() -> list[Document]:
    """Load text from markdown files in the repo."""
    documents: list[Document] = []
    repo_root = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
    private_root = os.path.join(repo_root, "private_docs")
    if os.path.isdir(private_root):
        for dirpath, _, filenames in os.walk(private_root):
            for fname in filenames:
                if not fname.lower().endswith(".md"):
                    continue
                path = os.path.join(dirpath, fname)
                try:
                    with open(path, "r", encoding="utf-8") as f:
                        text = f.read()
                    if text.startswith("---"):
                        parts = text.split("---", 2)
                        if len(parts) >= 3:
                            text = parts[2]
                    text = re.sub(r"```[\s\S]*?```", "", text)
                    text = re.sub(r"!\[[^\]]*\]\([^\)]+\)", "", text)
                    text = re.sub(r"\[([^\]]+)\]\([^\)]+\)", r"\1", text)
                    text = re.sub(r"^#+\s*", "", text, flags=re.M)
                    text = re.sub(r"\n{3,}", "\n\n", text)
                    cleaned = text.strip()
                    if cleaned:
                        rel = os.path.relpath(path, repo_root)
                        documents.append(Document(page_content=cleaned, metadata={"source": rel, "private": True}))
                except Exception as e:
                    print(f"Error loading private markdown {path}: {e}")

    return documents


def build_vector_index(documents: list[Document], force_refresh: bool = False):
    if INDEX_PATH.exists() and METADATA_PATH.exists() and not force_refresh:
        return load_vector_index()

    INDEX_DIR.mkdir(parents=True, exist_ok=True)
    splitter = RecursiveCharacterTextSplitter(chunk_size=300, chunk_overlap=50)
    entries = []
    for doc in documents:
        chunks = splitter.split_text(doc.page_content)
        for chunk_index, chunk in enumerate(chunks):
            text = chunk.strip()
            if not text:
                continue
            entries.append(
                {
                    "text": text,
                    "source": doc.metadata.get("source", "unknown"),
                    "private": bool(doc.metadata.get("private", False)),
                    "chunk_index": chunk_index,
                }
            )

    if not entries:
        raise ValueError("No non-empty document chunks were created from scraped content.")

    model = get_embedding_model()
    texts = [entry["text"] for entry in entries]
    embeddings = model.encode(texts, convert_to_numpy=True, normalize_embeddings=True)
    embeddings = np.asarray(embeddings, dtype=np.float32)

    index = faiss.IndexFlatIP(embeddings.shape[1])
    index.add(embeddings)

    faiss.write_index(index, str(INDEX_PATH))
    METADATA_PATH.write_text(json.dumps(entries, ensure_ascii=False, indent=2), encoding="utf-8")
    return index, entries, model


def load_vector_index():
    if not INDEX_PATH.exists() or not METADATA_PATH.exists():
        raise FileNotFoundError(f"Vector index not found at {INDEX_DIR}")

    index = faiss.read_index(str(INDEX_PATH))
    metadata = json.loads(METADATA_PATH.read_text(encoding="utf-8"))
    model = get_embedding_model()
    return index, metadata, model


def retrieve_context(query: str, index, metadata, model, top_k: int = 3) -> str:
    if not query:
        return ""

    query_vec = model.encode([query], convert_to_numpy=True, normalize_embeddings=True)
    query_vec = np.asarray(query_vec, dtype=np.float32)
    _, indices = index.search(query_vec, top_k)

    context_parts = []
    for idx in indices[0]:
        if 0 <= int(idx) < len(metadata):
            chunk = metadata[int(idx)].get("text", "")
            if chunk:
                context_parts.append(chunk)

    return "\n\n".join(context_parts)


def build_rag_chain(force_refresh: bool = False):
    if INDEX_PATH.exists() and METADATA_PATH.exists() and not force_refresh:
        try:
            index, metadata, model = load_vector_index()
            groq_api_key = os.getenv("GROQ_API_KEY")
            if not groq_api_key:
                raise ValueError("GROQ_API_KEY not found in environment variables.")
            llm = ChatGroq(model="openai/gpt-oss-20b", temperature=0.3, api_key=groq_api_key)
            return _SimpleRAG(llm=llm, index=index, metadata=metadata, model=model)
        except Exception as exc:
            print(f"Loaded cached index failed, rebuilding from source: {exc}")

    documents = load_markdown_documents()
    if not documents:
        raise ValueError("No markdown content found in the repo source files.")

    index, metadata, model = build_vector_index(documents, force_refresh=force_refresh)

    groq_api_key = os.getenv("GROQ_API_KEY")
    if not groq_api_key:
        raise ValueError("GROQ_API_KEY not found in environment variables.")

    llm = ChatGroq(model="openai/gpt-oss-20b", temperature=0.3, api_key=groq_api_key)
    return _SimpleRAG(llm=llm, index=index, metadata=metadata, model=model)


rag_chain = None


def clear_rag_chain():
    global rag_chain
    rag_chain = None


def get_rag_chain(force_refresh: bool = False):
    global rag_chain
    if rag_chain is None or force_refresh:
        try:
            rag_chain = build_rag_chain(force_refresh=force_refresh)
        except Exception as e:
            print(f"Warning: RAG chain build failed: {e}")

            class _FallbackChain:
                def __init__(self, message):
                    self._message = message

                def invoke(self, *args, **kwargs):
                    return {"result": "I can't access the knowledge base right now. Please try again later."}

            rag_chain = _FallbackChain(str(e))
    return rag_chain