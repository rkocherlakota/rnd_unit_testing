#Import necessary functions and modules
import logging
from langchain.prompts import ChatPromptTemplate
from java.prompts.system_prompts import *
from java.prompts.default_prompts import *
from model.claude_model import model
import subprocess

#Function to execute the test cases and generate the report based on the output
def generate_report(test_cases, test_cases_name, code_base):
    try:
        logging.info("Executing the unit test cases against the codebase...")
        print("Executing the unit test cases against the codebase...")

        # Executing the generated test cases to generate report
        completed_process = subprocess.run(['mvn', 'test', f'-Dtest={test_cases_name}'], capture_output=True, text=True)

        logging.info("Execution completed")
        logging.info("Report generation is in progress...")
        print(completed_process)

        #Prompts to LLM for generating the report
        logging.info("Generating the report...")
        sys_message = generate_report_prompt
        human_message = generate_report_default

        prompt = ChatPromptTemplate.from_messages(
        [
            ("system", sys_message),
            ("human", human_message),
        ]
        )
        chain = prompt | model
        out = chain.invoke({"test_cases": test_cases, "completed_process": completed_process, "code_base": code_base})

        report = out.content

        logging.info("Report generated successfully")
        print("The generated report is:\n", report)

        return report

    except Exception as e:
        #Log any errors encountered during report generation
        logging.error(f"Error in generating the report: {str(e)}")
        raise