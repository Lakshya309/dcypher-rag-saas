from google import genai
import os
from dotenv import load_dotenv

load_dotenv()

def get_llm():
    """
    Returns a Gemini model wrapper that mimics .invoke() behavior.
    """

    client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

    class GeminiWrapper:
        def invoke(self, prompt: str):
            response = client.models.generate_content(
                model="gemini-2.5-flash",
                contents=prompt
            )
            return response.text

    return GeminiWrapper()
