import os
from dotenv import load_dotenv


def set_credentials() -> str:
    load_dotenv()
    api_key = os.getenv("ANTHROPIC_API_KEY")
    return api_key

set_credentials()