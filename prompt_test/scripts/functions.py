from dotenv import load_dotenv
import interpreter
from langchain.chat_models import ChatAnthropic
from langchain.prompts import ChatPromptTemplate
import os
import requests
from datetime import datetime

load_dotenv()
api_key = os.getenv("ANTHROPIC_API_KEY")
model = ChatAnthropic(model_name="claude-2.1", max_tokens=4096, temperature=0)

def get_code_base(input_source):

    if input_source is None:
        raise ValueError("Input source cannot be None")

    if input_source.startswith("http"):
        try:
            response = requests.get(input_source)
            code_base = response.content.decode("utf-8")

        except requests.exceptions.RequestException as e:
            raise ValueError(f"Error fetching code from URL: {e}")
        
    elif os.path.isfile(input_source):
        with open(input_source, 'r') as f:
            code_base = f.read()

    else:
        code_base = input_source

    print(code_base)

    return code_base


def generate_test_cases(system_messages, human_message, code_base):
    test_cases = []
    tests_folder_path = '/Users/nboddu/Desktop/software_unit_testing/prompt_test'
    tests_folder = os.path.join(tests_folder_path, 'generated_tests')

    if not os.path.exists(tests_folder):
        os.makedirs(tests_folder)    

    now = datetime.now()
    test_cases_filename = f"{tests_folder}/{now.strftime('%Y%m%d%H%M%S')}.txt"
    test_cases_file_path = os.path.join(tests_folder, test_cases_filename)

    with open(test_cases_file_path, "w") as test_cases_file:
        for idx, system_message in enumerate(system_messages):
            prompt = ChatPromptTemplate.from_messages([
                ("system", system_message),
                ("human", human_message),
            ])
            chain = prompt | model
            output = chain.invoke({"code_base": code_base})
            test_case_content = output.content.strip()
            test_cases.append(test_case_content)

            test_cases_file.write(f"Testcase {idx + 1}:\n")
            test_cases_file.write("```python\n")
            test_cases_file.write(test_case_content)
            test_cases_file.write("\n```\n\n")

    print("Unit test cases have been generated successfully.")
    print(f"All the generated unit test cases have been saved in the '{test_cases_file_path}' file.")

    return test_cases


def generate_report(interpreter_system_message, test_cases, code_base):
    reports_folder_path = '/Users/nboddu/Desktop/software_unit_testing/prompt_test'
    reports_folder = os.path.join(reports_folder_path, 'generated_reports')

    if not os.path.exists(reports_folder):
        os.makedirs(reports_folder)    

    now = datetime.now()
    report_filename = f"{reports_folder}/{now.strftime('%Y%m%d%H%M%S')}.txt"
    reports_file_path = os.path.join(reports_folder, report_filename)
    with open(reports_file_path, "w") as file:
        for test_case in test_cases:
            interpreter.reset = True  
            interpreter.model = "claude-2.1"
            interpreter.max_tokens = 4096
            interpreter.api_key = api_key
            interpreter.context_window = 200000
            interpreter.auto_run = True
            interpreter.temperature = 0

            interpreter.system_message = interpreter_system_message
            interpreter_human_prompt = f"Run the {test_case} against {code_base} and create a final report"
            report = interpreter.chat(interpreter_human_prompt)

            file.write(str(report) + "\n\n")
            file.write("#####" * 30 + "\n\n")

    print(f"Report generated successfully and saved in the 'generated_reports' folder with filename: {report_filename}")