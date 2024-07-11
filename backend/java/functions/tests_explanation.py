#Import necessary functions and modules
from langchain.prompts import ChatPromptTemplate
from java.prompts.system_prompts import *
from java.prompts.default_prompts import *
from model.claude_model import model
import logging 

#Function to explain the provided test cases
def explain_test_cases(test_cases, code_base):
    try:
        #Prompts to LLM for explaining the 
        sys_message = explain_test_cases_prompt
        human_message = explain_test_cases_default

        prompt = ChatPromptTemplate.from_messages(
        [
            ("system", sys_message),
            ("human", human_message),
        ]
        )
        chain = prompt | model
        out = chain.invoke({"test_cases": test_cases, "code_base": code_base})

        #Extract the generated explanation
        explanation = out.content

        print(explanation)
        return explanation

    except Exception as e:
        #Log any errors encountered during generating the explanation
        logging.error(f"Error in generating the explanation: {str(e)}")
        raise