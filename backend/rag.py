import json
import os
import re
from pathlib import Path
from typing import TYPE_CHECKING

from dotenv import load_dotenv

if TYPE_CHECKING:
    from langchain_classic.schema import Document

load_dotenv()

INDEX_DIR = Path(__file__).resolve().parent / "index"
INDEX_PATH = INDEX_DIR / "faiss.index"
METADATA_PATH = INDEX_DIR / "metadata.json"
EMBEDDING_MODEL = "sentence-transformers/paraphrase-MiniLM-L3-v2"
MODEL_API_URL = os.getenv("MODEL_API_URL")
MODEL_API_KEY = os.getenv("MODEL_API_KEY")
MODEL_NAME = os.getenv("MODEL_NAME", "")
USE_GROQ = os.getenv("USE_GROQ", "false").lower() in {"1", "true", "yes", "on"}
_EMBEDDING_MODEL_CACHE = None


def get_embedding_model():
    global _EMBEDDING_MODEL_CACHE
    if _EMBEDDING_MODEL_CACHE is None:
        from sentence_transformers import SentenceTransformer

        _EMBEDDING_MODEL_CACHE = SentenceTransformer(EMBEDDING_MODEL, device="cpu")
    return _EMBEDDING_MODEL_CACHE


class _SimpleRAG:
    def __init__(self, llm, index, metadata, model):
        self.llm = llm
        self.index = index
        self.metadata = metadata
        self.model = model

    def _fallback_answer(self, query: str, context: str) -> str:
        if not context:
            return "I could not find enough portfolio context to answer that question confidently."

        chunks = [chunk.strip() for chunk in context.split("\n\n") if chunk.strip()]
        best = chunks[0]
        preview = re.sub(r"\s+", " ", best)[:500].strip()
        return f"Based on the portfolio context, {preview}"

    def invoke(self, payload):
        query = str(payload.get("query", "")).strip()
        context = retrieve_context(query, self.index, self.metadata, self.model, top_k=2)

        if not context:
            return {"result": self._fallback_answer(query, context)}

        prompt = (
            "You are a helpful assistant for Sarah Clark's portfolio website. "
            "Answer questions about Sarah's skills, projects, experience and background "
            "using only the provided context. Keep the answer brief and factual. "
            "If the answer is not present in the context, say you do not have that information.\n\n"
            f"Context: {context}\n\nQuestion: {query}\n\nAnswer:"
        )

        if not self.llm:
            external_answer = call_optional_model(prompt)
            if external_answer:
                return {"result": external_answer}
            return {"result": self._fallback_answer(query, context)}

        try:
            result = self.llm.invoke(prompt, timeout=8)
        except Exception as exc:
            print(f"Model call failed, falling back to retrieved context: {exc}")
            return {"result": self._fallback_answer(query, context)}

        answer = getattr(result, "content", str(result)).strip()
        if not answer:
            return {"result": self._fallback_answer(query, context)}
        return {"result": answer}


def load_markdown_documents() -> list:
    """Load text from markdown files in the repo."""
    from langchain_classic.schema import Document

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


def build_vector_index(documents: list, force_refresh: bool = False):
    if INDEX_PATH.exists() and METADATA_PATH.exists() and not force_refresh:
        return load_vector_index()

    from langchain_text_splitters import RecursiveCharacterTextSplitter

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

    import faiss
    import numpy as np

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
    import faiss

    if not INDEX_PATH.exists() or not METADATA_PATH.exists():
        raise FileNotFoundError(f"Vector index not found at {INDEX_DIR}")

    index = faiss.read_index(str(INDEX_PATH))
    metadata = json.loads(METADATA_PATH.read_text(encoding="utf-8"))
    model = get_embedding_model()
    return index, metadata, model


def retrieve_context(query: str, index, metadata, model, top_k: int = 3) -> str:
    if not query:
        return ""

    import numpy as np

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


def call_optional_model(prompt: str):
    url = os.getenv("MODEL_API_URL")
    if not url:
        return None

    try:
        import json
        import urllib.request

        payload = {
            "model": os.getenv("MODEL_NAME") or "",
            "messages": [{"role": "user", "content": prompt}],
            "temperature": 0.2,
        }
        headers = {"Content-Type": "application/json"}
        api_key = os.getenv("MODEL_API_KEY")
        if api_key:
            headers["Authorization"] = f"Bearer {api_key}"

        request = urllib.request.Request(
            url,
            data=json.dumps(payload).encode("utf-8"),
            headers=headers,
            method="POST",
        )
        with urllib.request.urlopen(request, timeout=8) as response:
            data = json.loads(response.read().decode("utf-8"))

        if isinstance(data, dict):
            if isinstance(data.get("choices"), list) and data["choices"]:
                message = data["choices"][0].get("message", {})
                if isinstance(message, dict):
                    content = message.get("content")
                    if content:
                        return str(content).strip()
                text = data["choices"][0].get("text")
                if text:
                    return str(text).strip()
            if isinstance(data.get("output"), list):
                for item in data["output"]:
                    if isinstance(item, dict) and item.get("content"):
                        return str(item["content"]).strip()
            if isinstance(data.get("content"), str) and data["content"].strip():
                return data["content"].strip()
    except Exception as exc:
        print(f"Optional model call failed: {exc}")

    return None


def build_rag_chain(force_refresh: bool = False):
    if INDEX_PATH.exists() and METADATA_PATH.exists() and not force_refresh:
        try:
            index, metadata, model = load_vector_index()
            return _SimpleRAG(llm=None, index=index, metadata=metadata, model=model)
        except Exception as exc:
            print(f"Loaded cached index failed, rebuilding from source: {exc}")

    documents = load_markdown_documents()
    if not documents:
        raise ValueError("No markdown content found in the repo source files.")

    index, metadata, model = build_vector_index(documents, force_refresh=force_refresh)
    return _SimpleRAG(llm=None, index=index, metadata=metadata, model=model)


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