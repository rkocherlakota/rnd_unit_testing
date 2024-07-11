#Import necessary modules
import logging
import requests
import os
from urllib.parse import urlparse
import sys
import re

# Function to extract codebase from the provided input
def get_code_base(input_source):
    try:
        # Check if any input source is provided
        if input_source is None:
            logging.error("No input source is provided")
            raise ValueError("Input source cannot be None")

        # If input source is a URL
        if input_source.startswith("http"):
            # Fetch code from the URL
            response = requests.get(input_source)
            code_base = response.content.decode("utf-8")
            logging.info("The input source is a URL")
            print("The input source is a URL")

            # Extract filename from the URL
            url_path = urlparse(input_source).path
            filename = os.path.basename(url_path)
            code_base_name, _ = os.path.splitext(filename)

            # Clean code base name by removing numerical and special characters
            code_base_name = re.sub(r'^[^a-zA-Z]+', '', code_base_name)
            code_base_name = re.sub(r'[^a-zA-Z0-9_.-]', '', code_base_name)

        # If input source is a file
        elif os.path.isfile(input_source):
            _, file_extension = os.path.splitext(input_source)
            
            # Check if file is a Java file
            if file_extension.lower() != '.java':
                print("Invalid file type. Please upload a .java file.")
                sys.exit(1) 
            
            # Read code from the file
            with open(input_source, 'r') as f:
                code_base = f.read()
            
            logging.info("The input source is a Java file")
            print("Input source is a .java file")

            # Extract filename without its extension
            code_base_name, _ = os.path.splitext(os.path.basename(input_source))

        # If input source is a code snippet
        else:
            # Extract class name from the code snippet
            match = re.search(r'public\s+class\s+(\w+)', input_source)
            if match:
                class_name = match.group(1)
            else:
                raise ValueError("Class name not found in the code snippet.")

            # Clean class name by removing numerical and special characters
            class_name = re.sub(r'[^a-zA-Z0-9_.-]', '', class_name)

            # Generate code base name from the class name
            code_base_name = class_name

            code_base = input_source

            logging.info("The input soource is a code Snippet")
            print("Input source is a code snippet")

        logging.info("The input has been extracted from the input source.")
        logging.info("Generating unit test cases is in progress...")

        # Create directories for code if not exists
        os.makedirs("src/main/java/com/gd", exist_ok=True)

        # Write code base to file in src/main/java directory
        code_file_path = os.path.join("src/main/java/com/gd", f"{code_base_name}.java")
        with open(code_file_path, "w") as code_file:
            code_file.write(code_base)

        print(code_base) 
        print("Code base name is: ", code_base_name)   
        return code_base, code_file_path, code_base_name

    except Exception as e:
        logging.error(f"Error in getting the codebase from the input source: {str(e)}")
        raise