import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()

def get_llm():
    """
    Returns a Gemini model wrapper that mimics .invoke() behavior.
    """

    genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
    model = genai.GenerativeModel("gemini-2.5-flash-lite")

    class GeminiWrapper:
        def invoke(self, prompt: str):
            response = model.generate_content(prompt)
            return response.text

    return GeminiWrapper()
