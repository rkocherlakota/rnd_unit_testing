#Import necessary modules
import logging
import requests
import os
from urllib.parse import urlparse
from datetime import datetime
import sys
import re

#Function to extract codebase from the provided input
def get_code_base(input_source):
    try:
        #Checks if any input source is provided
        if input_source is None:
            logging.info("No input source is provided")
            raise ValueError("Input source cannot be None")

        #If input source is a URL
        if input_source.startswith("http"):
            #Fetch code from the URL
            response = requests.get(input_source)
            code_base = response.content.decode("utf-8")
            logging.info("The input source is a URL")
            print("The input source is a URL")

            #Extract filename from the URL
            url_path = urlparse(input_source).path
            filename = os.path.basename(url_path)
            code_base_name, _ = os.path.splitext(filename)

            #Clean code base name by removing numerical and special characters
            code_base_name = re.sub(r'^[^a-zA-Z]+', '', code_base_name)
            code_base_name = re.sub(r'[^a-zA-Z0-9_.-]', '', code_base_name)

        #If input source is a file
        elif os.path.isfile(input_source):
            _, file_extension = os.path.splitext(input_source)
            
            #Check if file is a Python file
            if file_extension.lower() != '.py':
                print("Invalid file type. Please upload a .py file.")
                sys.exit(1) 
            
            #Read code from the file
            with open(input_source, 'r') as f:
                code_base = f.read()
            
            logging.info("The input source is a Python file")
            print("Input source is a .py file")

            #Extract filename without its extension
            code_base_name, _ = os.path.splitext(os.path.basename(input_source))

        #If input source is a code snippet
        else:
            code_base = input_source

            logging.info("The input soource is a Python Snippet")
            print("Input source is a code snippet")

            #Generate code base name with timestamp
            timestamp = datetime.now().strftime("%Y%m%d%H%M%S")
            code_base_name = f"code_{timestamp}"

        logging.info("The input has been extracted from the input source.")
        logging.info("Generating unit test cases is in progress...")

        #Create a directory for results if not exists
        os.makedirs("results", exist_ok=True)

        #Write code base to file
        code_file_path = os.path.join("results", f"{code_base_name}.py")
        with open(code_file_path, "w") as code_file:
            code_file.write(code_base)

        print(code_base)    
        return code_base, code_file_path, code_base_name

    except Exception as e:
        logging.error(f"Error in getting the codebase from the input source: {str(e)}")
        raise
