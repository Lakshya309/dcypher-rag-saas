import asyncio
from app.services.rag_service import process_pdf_from_url

async def main():
    try:
        await process_pdf_from_url("https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf", "test_session")
        print("Success")
    except Exception as e:
        print("Failed with:", repr(e))

asyncio.run(main())
