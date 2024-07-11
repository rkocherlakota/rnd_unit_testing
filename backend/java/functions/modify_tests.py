#Import necessary functions and modules
from langchain.prompts import (
    ChatPromptTemplate,
    HumanMessagePromptTemplate,
    MessagesPlaceholder,
)
from langchain.chains import LLMChain
from langchain.schema import SystemMessage
from langchain.memory import ConversationBufferMemory
from java.prompts.system_prompts import *
from java.prompts.default_prompts import *
from model.claude_model import model
import os
import logging 

#Function to generate test cases fot the provided codebase
def modify_test_cases(code_base, code_base_name):
    logging.info("Generating unit test cases for the provided input...")
    print("Here is our codebase ", code_base)
    try:
        prompt = ChatPromptTemplate.from_messages(
            [
                SystemMessage(
                    content = regenerate_test_cases_prompt.replace("{", "{{").replace("}", "}}")
                ),  
                MessagesPlaceholder(
                    variable_name = "chat_history"
                ), 
                HumanMessagePromptTemplate.from_template(
                    "{human_input}"                    
                ),  
            ]
        )

        memory = ConversationBufferMemory(memory_key="chat_history", return_messages=True)

        chain = LLMChain(
            llm = model,
            prompt = prompt,
            verbose = True,
            memory = memory
        )

        out = chain.predict(human_input = f"Generate unit test cases for {code_base}. The name of the codebase is {code_base_name}")
        
        #Extract the generated test cases from the output
        new_test_cases = out
        print(out)

        #Log successful test case generation
        logging.info("Unit test cases have been generated successfully")

        #Find the start and end index of the generated test cases
        start_index = new_test_cases.find("```java") + len("```java")
        end_index = new_test_cases.find("```", start_index)
        
        #Apply filters to extract only the generated test cases
        filtered_test_cases = new_test_cases[start_index:end_index].strip()
        print("The generated unit test cases are:\n", filtered_test_cases)

        #Create directories for tests if not exists
        os.makedirs("src/test/java/com/gd", exist_ok=True)

        # Name and path for the test cases file 
        test_cases_name = f"{code_base_name}Test"
        test_file_name = f"{code_base_name}Test.java"  
        test_file_path = os.path.join("src/test/java/com/gd", test_file_name)

        # Write the filtered test cases to the file
        with open(test_file_path, "w") as test_file:
            test_file.write(filtered_test_cases)

        # Logging successful test case saving
        logging.info("Execution in progress...")
        print(f"The test cases have been saved to {test_file_path}")

        print("Test cases name is: ", test_cases_name)
        print("Tests file name is: ", test_file_name)

        # Return the filtered test cases and the test file name
        return filtered_test_cases, test_cases_name, test_file_name

    except Exception as e:
        # Log any errors encountered during test case generation
        logging.error(f"Error in generating the unit test cases: {str(e)}")
        raise