import logging 
import sys
from python.functions.input_handling import *
from python.functions.code_explanation import *
from python.functions.test_generation import *
from python.functions.tests_explanation import *
from python.functions.report_generation import *
from python.functions.modify_tests import *


def main():
    try:
        input_source = "https://raw.githubusercontent.com/shushrutsharma/Data-Structures-and-Algorithms-Python/master/13.%20Mini-Projects/email_project/demo.py"
        
        code_base, code_file_path, code_base_name = get_code_base(input_source)
        code_explanation = explain_code_base(code_base)

        test_cases, test_cases_name, test_file_name = generate_test_cases(code_base, code_base_name)
        tests_explanation = explain_test_cases(test_cases, code_base)

        final_report = generate_report(test_cases, test_file_name, code_base)

        # modified_tests, test_cases_name, test_file_name = modify_test_cases(code_base, code_base_name)
        # new_tests_explanation = explain_test_cases(modified_tests, code_base)
        # modified_report = generate_report(modified_tests, test_file_name)

    except Exception as e:
        logging.error(f"An error occurred: {str(e)}")
        sys.exit(1)

if __name__ == "__main__":
    main()

    