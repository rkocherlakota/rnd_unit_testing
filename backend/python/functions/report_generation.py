#Import necessary functions and modules
import logging
from langchain.prompts import ChatPromptTemplate
from python.prompts.default_prompts import *
from python.prompts.system_prompts import *
from model.claude_model import model
import subprocess
import os

#Function to execute the test cases and generate the report based on the output
def generate_report(test_cases, test_file_name, code_base):
    try:
        #Giving path to the test file
        test_file_path = os.path.join("results", test_file_name)

        #Change directory to 'results'
        os.chdir("results") 

        #Run pytest with verbose output and capture the result
        logging.info("Executing the unit test cases against the codebase...")

        completed_process = subprocess.run(['pytest', test_file_name, '-v'], capture_output=True, text=True)
        code_coverage = subprocess.run(['coverage', 'report', '-m'], capture_output=True, text=True)

        os.chdir("..") 

        logging.info("Execution completed")
        logging.info("Report generation is in progress...")

        print(completed_process)
        print(code_coverage)

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
        out = chain.invoke({"test_cases": test_cases, "completed_process": completed_process, "code_coverage": code_coverage})

        report = out.content

        logging.info("Report generated successfully")
        print("The generated report is:\n", report)

        return report

    except Exception as e:
        #Log any errors encountered during report generation
        logging.error(f"Error in generating the report: {str(e)}")
        raise