from fastapi import APIRouter, UploadFile, File, Form
from app.services.rag_service import (
    process_pdf,
    answer_query
)

router = APIRouter()

@router.post("/upload")
async def upload_pdf(file: UploadFile = File(...)):
    return await process_pdf(file)

@router.post("/chat")
async def chat(query: str = Form(...)):
    answer, docs = await answer_query(query)
    return {"answer": answer, "sources": docs}

