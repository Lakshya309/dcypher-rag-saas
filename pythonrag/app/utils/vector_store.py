import os
import numpy as np
import google.generativeai as genai
from app.utils.db import get_db_connection, delete_embeddings
from langchain_core.documents import Document
from pgvector.psycopg2 import register_vector

# Initialize Gemini
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

def embed(text):
    """Generates an embedding for the given text."""
    try:
        result = genai.embed_content(
            model="models/text-embedding-004",
            content=text,
            task_type="retrieval_document"
        )
        return result["embedding"]
    except Exception as e:
        print(f"Error embedding text: {e}")
        return None

def add_to_vectorstore(chunks, session_id: str):
    """Adds document chunks to the vector store."""
    if not session_id:
        return

    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        for chunk in chunks:
            if not hasattr(chunk, 'page_content'):
                continue

            embedding_vector = embed(chunk.page_content)
            if embedding_vector:
                # created_at is set by default in the database
                cursor.execute(
                    "INSERT INTO embeddings (session_id, content, embedding) VALUES (%s, %s, %s)",
                    (session_id, chunk.page_content, np.array(embedding_vector))
                )
        conn.commit()
    finally:
        cursor.close()
        conn.close()

def query_vectorstore(query: str, session_id: str, top_k: int = 4):
    """Queries the vector store for similar documents."""
    if not session_id:
        return []

    query_embedding = embed(query)
    if not query_embedding:
        return []

    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        # Use <=> for cosine distance
        cursor.execute(
            """
            SELECT content FROM embeddings 
            WHERE session_id = %s 
            ORDER BY embedding <=> %s 
            LIMIT %s
            """,
            (session_id, np.array(query_embedding), top_k)
        )
        results = cursor.fetchall()
        
        # Convert results to LangChain Document objects
        documents = [Document(page_content=row[0], metadata={}) for row in results]
        return documents
    finally:
        cursor.close()
        conn.close()


