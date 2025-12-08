import os
from app.utils.pdf_loader import load_pdf
from app.utils.splitter import split_docs
from app.utils.vector_store import get_vectorstore, add_to_vectorstore, query_vectorstore
from app.utils.llm import get_llm

DATA_DIR = "data/vectorstore"

async def process_pdf(file):
    # Save file
    path = f"data/{file.filename}"
    with open(path, "wb") as f:
        f.write(await file.read())

    # Load
    docs = load_pdf(path)

    # Split
    chunks = split_docs(docs)

    # Add to vectorstore
    add_to_vectorstore(chunks)

    return {"message": "PDF processed", "chunks": len(chunks)}


async def answer_query(query: str):
    retriever = query_vectorstore(query)
    llm = get_llm()

    context = "\n\n".join([d.page_content for d in retriever])

    prompt = f"""
    You must rewrite and optimize any text I give you. Follow these rules strictly. Do not use formatting such as bold, italics, headings, bullet points, special characters or emojis. Output plain text only. The rewritten text must be concise, grammatically correct and maintain the original meaning. If the text contains errors, fix them. If it contains slang or informal tone, preserve it only when essential to context. If the input is too long, summarize it while retaining all key information. If the input is short, expand it only when needed for clarity. Always ensure the output is safe, coherent and free of hallucinations. If the input contains incomplete sentences, reconstruct them logically. If the input contains sensitive, harmful, or private content, remove or neutralize it. Always handle edge cases like empty input, repeated text, mixed languages, broken grammar, or irrelevant content by producing the clearest valid version possible. If the input already looks correct, return a polished version without unnecessary changes.

    CONTEXT:
    {context}

    QUESTION:
    {query}

    ANSWER:
    """

    answer = llm.invoke(prompt)
    return answer, [d.metadata for d in retriever]
