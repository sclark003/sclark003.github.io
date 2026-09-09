from rag import clear_rag_chain, get_rag_chain, load_markdown_documents


def test_private_doc_is_in_index():
    docs = load_markdown_documents()
    assert any(
        d.metadata.get("source", "").endswith("private_docs/portfolio_chatbot_about_me.md")
        for d in docs
    )


def test_rag_chain_can_reload():
    clear_rag_chain()
    first = get_rag_chain(force_refresh=True)
    second = get_rag_chain(force_refresh=True)
    assert first is not None
    assert second is not None
    clear_rag_chain()
