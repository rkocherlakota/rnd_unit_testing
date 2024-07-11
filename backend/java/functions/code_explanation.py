#Import necessary functions and modules
from langchain.prompts import ChatPromptTemplate
from java.prompts.system_prompts import *
from java.prompts.default_prompts import *
from model.claude_model import model
import logging 
# import logging

#Function to explain the provided codebase
def explain_code_base(code_base):
    try:
        #Prompts to LLM for explaining the codebase
        sys_message = explain_code_base_prompt
        human_message = explain_code_base_default

        prompt = ChatPromptTemplate.from_messages(
        [
            ("system", sys_message),
            ("human", human_message),
        ]
        )
        chain = prompt | model
        out = chain.invoke({"code_base": code_base})

        #Extract the generated explanation
        explanation = out.content

        print(explanation)
        return explanation

    except Exception as e:
        #Log any errors encountered during generating the explanation
        logging.error(f"Error in generating the explanation: {str(e)}")
        raise