import sys

from fastapi.testclient import TestClient

import app as backend_app
import rag
from rag import clear_rag_chain, get_rag_chain, load_markdown_documents


client = TestClient(backend_app.app)


def test_heavy_runtime_dependencies_are_lazy_loaded():
    assert "sentence_transformers" not in sys.modules
    assert "langchain_groq" not in sys.modules


def test_backend_allows_github_pages_origin():
    response = client.options(
        "/chat",
        headers={
            "Origin": "https://sclark003.github.io",
            "Access-Control-Request-Method": "POST",
            "Access-Control-Request-Headers": "content-type",
        },
    )
    assert response.status_code == 200
    assert response.headers.get("access-control-allow-origin") == "https://sclark003.github.io"


def test_private_doc_is_in_index():
    docs = load_markdown_documents()
    assert any(
        d.metadata.get("source", "").replace("\\", "/").endswith(
            "private_docs/portfolio_chatbot_about_me.md"
        )
        for d in docs
    )


def test_rag_chain_can_reload():
    clear_rag_chain()
    first = get_rag_chain(force_refresh=True)
    second = get_rag_chain(force_refresh=True)
    assert first is not None
    assert second is not None
    clear_rag_chain()
