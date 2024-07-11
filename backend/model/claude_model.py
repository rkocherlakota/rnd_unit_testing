from langchain_anthropic import ChatAnthropic
from validation.credentials import set_credentials

# Set credentials
ChatAnthropic.api_key = set_credentials()

# Initializing the model
model = ChatAnthropic(model_name="claude-3-haiku-20240307", max_tokens=4096)