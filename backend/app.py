import re

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from rag import get_rag_chain

app = FastAPI()


allowed_origins = [
    "http://localhost:3000",
    "http://localhost:5173",
    "http://localhost:8000",
    "http://127.0.0.1:3000",
    "http://127.0.0.1:5173",
    "http://127.0.0.1:8000",
    "https://sclark003.github.io",
    "https://www.sclark003.github.io",
]


@app.middleware("http")
async def add_cors_headers(request: Request, call_next):
    origin = request.headers.get("origin")
    response = await call_next(request)

    if origin and (
        origin in allowed_origins or re.match(r"https://.*\.github\.io$", origin)
    ):
        response.headers["Access-Control-Allow-Origin"] = origin
        response.headers["Access-Control-Allow-Credentials"] = "true"
        response.headers["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS"
        response.headers["Access-Control-Allow-Headers"] = "Authorization, Content-Type, X-Requested-With"
        response.headers["Vary"] = "Origin"

    return response


app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_origin_regex=r"https://.*\.github\.io$",
    allow_methods=["*"],
    allow_headers=["*"],
    allow_credentials=True,
)

class ChatRequest(BaseModel):
    message: str
    history: list[dict[str, str]] = []


@app.get("/")
async def root():
    return {"status": "ok", "service": "sclark003-backend"}


@app.get("/healthz")
async def healthz():
    return {"status": "ok"}


@app.post("/chat")
async def chat(request: ChatRequest):
    if not request.message or len(request.message.strip()) == 0:
        return {"reply": "Please ask me something!"}

    max_history_turns = 6
    history_lines = []
    recent_history = request.history[-max_history_turns:]
    for item in recent_history:
        role = item.get("role", "").strip().capitalize()
        text = item.get("text", "").strip()
        if role and text:
            history_lines.append(f"{role}: {text}")

    question = request.message.strip()
    if history_lines:
        question = "Previous conversation:\n" + "\n".join(history_lines) + "\n\nCurrent question: " + question

    chain = get_rag_chain()
    try:
        result = chain.invoke({"query": question})
        return {"reply": result["result"]}
    finally:
        from rag import clear_rag_chain
        clear_rag_chain()
