import os
import psycopg2
from psycopg2.extras import DictCursor
from pgvector.psycopg2 import register_vector
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

def get_db_connection():
    conn = psycopg2.connect(DATABASE_URL)
    register_vector(conn)
    return conn
def delete_embeddings(session_id: str = None, before: str = None):
    """
    Deletes embeddings by session_id or before a specified timestamp.
    - session_id: The session ID to delete.
    - before: A timestamp string (e.g., '2023-01-01T00:00:00');
              embeddings created before this time will be deleted.
    """
    if not session_id and not before:
        print("Either session_id or before timestamp must be provided.")
        return

    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        if session_id:
            query = "DELETE FROM embeddings WHERE session_id = %s"
            params = (session_id,)
        elif before:
            query = "DELETE FROM embeddings WHERE created_at < %s"
            params = (before,)

        cursor.execute(query, params)
        conn.commit()
        print(f"{cursor.rowcount} embeddings deleted.")
    finally:
        cursor.close()
        conn.close()
