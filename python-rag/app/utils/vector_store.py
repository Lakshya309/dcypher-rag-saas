import os
from langchain_community.vectorstores import FAISS
from langchain_huggingface import HuggingFaceEmbeddings
VECTOR_DIR = "data/vectorstore/index"

emb = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")

# Global store
vs = None

def get_vectorstore():
    global vs
    if vs is None:
        if os.path.exists(VECTOR_DIR):
            vs = FAISS.load_local(VECTOR_DIR, emb, allow_dangerous_deserialization=True)
        else:
            vs = FAISS.from_texts(["init"], emb)
    return vs

def add_to_vectorstore(chunks):
    vs = get_vectorstore()
    vs.add_documents(chunks)
    vs.save_local(VECTOR_DIR)

def query_vectorstore(query):
    vs = get_vectorstore()
    return vs.similarity_search(query, k=4)
