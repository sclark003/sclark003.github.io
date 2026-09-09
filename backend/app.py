from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from rag import get_rag_chain

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["POST"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    message: str
    history: list[dict[str, str]] = []


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

    result = get_rag_chain().invoke({"query": question})
    return {"reply": result["result"]}
