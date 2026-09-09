import requests
from bs4 import BeautifulSoup
from langchain_classic.schema import Document
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_groq import ChatGroq
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_community.vectorstores import FAISS
from langchain_classic.chains import RetrievalQA
from langchain_classic.prompts import PromptTemplate
from dotenv import load_dotenv
import os
import re

load_dotenv()

SITE_PAGES = [
    "https://sclark003.github.io/",
    "https://sclark003.github.io/experience",
    "https://sclark003.github.io/programming",
]

def scrape_site(urls: list[str]) -> list[Document]:
    documents = []
    for url in urls:
        try:
            res = requests.get(url, timeout=10)
            res.raise_for_status()
            soup = BeautifulSoup(res.text, "html.parser")
            # Strip chrome- keep only the main content
            for tag in soup(["nav","header","footer","script","style"]):
                tag.decompose()
            # Prefer main or article tag, fallback to body
            container = soup.find("main") or soup.find("article") or soup.body
            text = container.get_text(separator="\n", strip=True) if container else ""
            if text:
                documents.append(Document(page_content=text, metadata={"source": url}))
            print(f"Scraped {url} ({len(text)} characters)")
        except Exception as e:
            print(f"Error scraping {url}: {e}")
    return documents

def extract_jsx_text(source: str) -> str:
    source = re.sub(r'//.*?$|/\*[\s\S]*?\*/', '', source, flags=re.M)
    source = re.sub(r'^\s*(import|export).*$','', source, flags=re.M)

    text_nodes = re.findall(r'>([^<]+)<', source)
    string_literals = [match[1] for match in re.findall(r'(["\'])(.*?)\1', source, flags=re.S)]

    parts: list[str] = []
    for raw in text_nodes + string_literals:
        text = raw.strip()
        if not text:
            continue
        if re.search(r'^(https?:|/|mailto:|tel:)', text):
            continue
        if re.search(r'\.(png|jpe?g|gif|svg|webp|ico|mp4|pdf|docx?)$', text, re.I):
            continue
        if len(text) < 3:
            continue
        if re.fullmatch(r'[\[\]{}()<>.,:;"\'\\/\s]+', text):
            continue
        cleaned = re.sub(r'\s+', ' ', text)
        parts.append(cleaned)

    if not parts:
        return ''

    unique_parts = []
    seen = set()
    for part in parts:
        if part in seen:
            continue
        seen.add(part)
        unique_parts.append(part)

    return '\n\n'.join(unique_parts)

def load_markdown_documents() -> list[Document]:
    """Load text from React page source files in `src/components` and private markdown docs in `private_docs/`.

    This is the default document source because the site content is authored in React components,
    not in repo markdown. Private markdown docs are also included when they exist.
    """
    documents: list[Document] = []
    repo_root = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
    components_root = os.path.join(repo_root, 'src', 'components')
    if os.path.isdir(components_root):
        for dirpath, _, filenames in os.walk(components_root):
            for fname in filenames:
                if not fname.lower().endswith(('.jsx', '.js')):
                    continue
                path = os.path.join(dirpath, fname)
                try:
                    with open(path, 'r', encoding='utf-8') as f:
                        source = f.read()
                    cleaned = extract_jsx_text(source)
                    if cleaned:
                        rel = os.path.relpath(path, repo_root)
                        documents.append(Document(page_content=cleaned, metadata={"source": rel}))
                except Exception as e:
                    print(f"Error loading JSX source {path}: {e}")

    private_root = os.path.join(repo_root, 'private_docs')
    if os.path.isdir(private_root):
        for dirpath, _, filenames in os.walk(private_root):
            for fname in filenames:
                if not fname.lower().endswith('.md'):
                    continue
                path = os.path.join(dirpath, fname)
                try:
                    with open(path, 'r', encoding='utf-8') as f:
                        text = f.read()
                    # Strip YAML front matter if present
                    if text.startswith('---'):
                        parts = text.split('---', 2)
                        if len(parts) >= 3:
                            text = parts[2]
                    # Remove fenced code blocks
                    text = re.sub(r'```[\s\S]*?```', '', text)
                    # Remove images e.g. ![alt](url)
                    text = re.sub(r'!\[[^\]]*\]\([^\)]+\)', '', text)
                    # Convert markdown links [text](url) -> text
                    text = re.sub(r'\[([^\]]+)\]\([^\)]+\)', r'\1', text)
                    # Remove heading markers
                    text = re.sub(r'^#+\s*', '', text, flags=re.M)
                    # Collapse excessive newlines
                    text = re.sub(r'\n{3,}', '\n\n', text)
                    cleaned = text.strip()
                    if cleaned:
                        rel = os.path.relpath(path, repo_root)
                        documents.append(Document(page_content=cleaned, metadata={"source": rel, "private": True}))
                except Exception as e:
                    print(f"Error loading private markdown {path}: {e}")

    return documents

def build_rag_chain():
    # Load markdown files from the repo `content/` directory as the default source
    documents = load_markdown_documents()
    if not documents:
        # If no markdown found, fall back to scraping the configured site pages
        print("No markdown content found; attempting to scrape SITE_PAGES as fallback")
        documents = scrape_site(SITE_PAGES)
        if not documents:
            raise ValueError("No markdown content found in content/ and no documents scraped from SITE_PAGES.")

    # Split documents into chunks
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=300, chunk_overlap=50)
    docs = text_splitter.split_documents(documents)
    docs = [doc for doc in docs if getattr(doc, 'page_content', '').strip()]
    if not docs:
        raise ValueError("No non-empty document chunks were created from scraped content.")

    # Create embeddings
    embeddings = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")

    # Create vector store
    vectorstore = FAISS.from_documents(docs, embeddings)

    # Create retriever
    retriever = vectorstore.as_retriever(search_kwargs={"k": 3})

    # Create RAG chain with Groq API key from .env
    groq_api_key = os.getenv("GROQ_API_KEY")
    if not groq_api_key:
        raise ValueError("GROQ_API_KEY not found in environment variables.")

    llm = ChatGroq(model="openai/gpt-oss-20b", temperature=0.3, api_key=groq_api_key)

    prompt = PromptTemplate(
        input_variables=["context", "question"],
        template="You are a helpful assistant for Sarah Clark's portfolio website. Answer questions about Sarah's skills, projects, experience and background using only the information provided below. Be concise and friendly. If the answer is not in the context, say you don't have that information. \n\nContext: {context}\n\nQuestion: {question}\n\nAnswer:"
    )

    rag_chain = RetrievalQA.from_chain_type(
        llm = llm,
        retriever=retriever,
        chain_type_kwargs={"prompt": prompt},
    )

    return rag_chain

rag_chain = None

def get_rag_chain():
    global rag_chain
    if rag_chain is None:
        try:
            rag_chain = build_rag_chain()
        except Exception as e:
            # Provide a lightweight fallback chain so the API can reply instead of 500
            print(f"Warning: RAG chain build failed: {e}")
            class _FallbackChain:
                def __init__(self, message):
                    self._message = message

                def invoke(self, *args, **kwargs):
                    # Keep the same return shape used by the app
                    return {"result": "I can't access the knowledge base right now. Please try again later."}

            rag_chain = _FallbackChain(str(e))
    return rag_chain