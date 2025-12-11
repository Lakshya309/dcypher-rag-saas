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

def create_db_and_tables():
    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        # DO NOT enable pgvector here — Supabase free tier blocks it.
        # Enable manually via Supabase dashboard.

        cursor.execute("""
        CREATE TABLE IF NOT EXISTS embeddings (
            id BIGSERIAL PRIMARY KEY,
            session_id TEXT NOT NULL,
            content TEXT NOT NULL,
            embedding VECTOR(768) NOT NULL
        )
        """)

        conn.commit()
        cursor.close()
        conn.close()
        print("Database initialized successfully.")

    except Exception as e:
        print(f"Database initialization failed: {e}")
