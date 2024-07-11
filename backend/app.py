#Importing necessary modules and functions
from flask import Flask, render_template
from flask_socketio import SocketIO, emit
import logging

from python.functions.input_handling import get_code_base as get_code_base_python
from python.functions.code_explanation import explain_code_base as explain_code_base_python
from python.functions.test_generation import generate_test_cases as generate_test_cases_python
from python.functions.tests_explanation import explain_test_cases as explain_test_cases_python
from python.functions.report_generation import generate_report as generate_report_python
from python.functions.modify_tests import modify_test_cases as modify_test_cases_python

from java.functions.input_handling import get_code_base as get_code_base_java
from java.functions.code_explanation import explain_code_base as explain_code_base_java
from java.functions.test_generation import generate_test_cases as generate_test_cases_java
from java.functions.tests_explanation import explain_test_cases as explain_test_cases_java
from java.functions.report_generation import generate_report as generate_report_java
from java.functions.modify_tests import modify_test_cases as modify_test_cases_java


app = Flask(__name__, template_folder='../../frontend/public')
socketio = SocketIO(app, cors_allowed_origins="http://localhost:3000")
logging.basicConfig(filename='app.log', level=logging.INFO, format='%(asctime)s [%(levelname)s] - %(message)s', filemode="w")


@app.route('/')
def index():
    try:
        return render_template('index.html')
    except Exception as e:
        emit('error', str(e))
        logging.error(f"Error in index route: {str(e)}")


#Function to extract the codebase from the input source, provide description for the codebase, and generate test cases for the provided codebase and also provide description about the test cases
@socketio.on('generate_test_cases')
def handle_generate_tests(data):

    try:
        code_base = data['code_base']
        language = data["language"]
        print("The current language is ", language)
        if language =="Python" :
        
            #Extract codebase from the input source
            code_base, code_file_path, code_base_name = get_code_base_python(code_base)
            emit('codebase', {"code_base": code_base, "code_base_name" : code_base_name})
            
            #Provide description/explanation for the extracted codebase
            explain_task = explain_code_base_python(code_base)
            emit('code_explanation', {'explanation': explain_task})

            #Generate unit test cases for the provided codebase
            test_cases, test_cases_name, test_file_name = generate_test_cases_python(code_base, code_base_name)

            explain_tests = explain_test_cases_python(test_cases, code_base)
            
            emit('tests_explanation', {'explanation': explain_tests})
            emit('tests_generated', {'test_cases': test_cases, "test_case_name":test_cases_name, 'test_file_name': test_file_name})

        else:

            #Extract codebase from the input source
            code_base, code_file_path, code_base_name = get_code_base_java(code_base)
            emit('codebase', {"code_base": code_base, "code_base_name" : code_base_name})
            
            #Provide description/explanation for the extracted codebase
            explain_task = explain_code_base_java(code_base)
            emit('code_explanation', {'explanation': explain_task})
            
            #Generate unit test cases for the provided codebase
            test_cases, test_cases_name, test_file_name = generate_test_cases_java(code_base, code_base_name)

            explain_tests = explain_test_cases_java(test_cases, code_base)

            emit('tests_explanation', {'explanation': explain_tests})
            emit('tests_generated', {'test_cases': test_cases, 'test_case_name': test_cases_name, "test_file_name": test_file_name})

    #Exception handling and logging if any error encounters
    except Exception as e:
        emit('error', str(e))
        logging.error(f"Error in handle_generate_tests: {str(e)}")


#Function to execute the generated test cases and generate report
@socketio.on('generate_report')
def handle_generate_report(data):
    print("The data object for report", data)
    try:
        code_base = data['code_base']
        print("The codebase is here ............", code_base)
        test_cases = data['test_cases']
        test_cases_name = data['test_case_name']
        test_file_name = data['test_file_name']
        language = data["language"]

        if language =="Python":

            #Execute the generated unit test cases and also make a report based on the execution status
            report = generate_report_python(test_cases, test_file_name, code_base)
            emit('report_generated', {'report': report})
        
        else:

            #Execute the generated unit test cases and also make a report based on the execution status
            report = generate_report_java(test_cases, test_cases_name, code_base)
            emit('report_generated', {'report': report})

    #Exception handling and logging if any error encounters
    except Exception as e:
        emit('error', str(e))
        logging.error(f"Error in handle_generate_report: {str(e)}")


#Function to modify the unit test cases and generate report for the modified unit test cases
@socketio.on('modify_tests')
def handle_modify_tests(data):
    try:
        code_base = data['code_base']
        code_base_name = data['code_base_name']
        language = data["language"]

        if language == "Python":

            #Regenerate/modify the unit test cases for the provided codebase
            new_test_cases, test_cases_name, test_file_name = modify_test_cases_python(code_base, code_base_name)
            
            #Provide explanation for the modified unit test cases
            explanation = explain_test_cases_python(new_test_cases, code_base)

            emit('tests_explanation', {'explanation' : explanation})
            emit('tests_generated', {'test_cases': new_test_cases, "test_case_name":test_cases_name, 'test_file_name': test_file_name})

            #Execute the modified unit test cases and also make a report based on the execution status
            report = generate_report_python(new_test_cases, test_file_name, code_base)
            emit('report', {'report' : report})

        else:
            #Regenerate/modify the unit test cases for the provided codebase
            new_test_cases, test_cases_name, test_file_name = modify_test_cases_java(code_base, code_base_name)

            #Provide explanation for the modified unit test cases
            explanation = explain_test_cases_java(new_test_cases, code_base)

            emit('tests_explanation', {'explanation' : explanation})
            emit('tests_generated', {'test_cases': new_test_cases, "test_case_name":test_cases_name, 'test_file_name': test_file_name})

            #Execute the modified unit test cases and also make a report based on the execution status
            report = generate_report_java(new_test_cases, test_cases_name, code_base)
            emit('report', {'report' : report})

    except Exception as e:
        emit('error', str(e))
        logging.error(f"Error in handle_modify_tests: {str(e)}")    


if __name__ == '__main__':
    try:
        socketio.run(app, debug=True)
    except Exception as e:
        logging.error(f"Error in socketio.run: {str(e)}")