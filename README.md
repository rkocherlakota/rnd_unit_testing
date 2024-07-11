# Software Unit Testing App

## Overview

This repository contains a Flask-based web application designed to automate the process of generating and analyzing unit tests for Java and Python codebases. The system allows users to input their codebases, generate unit test cases, explain the codebase and test cases, generate reports, and modify test cases for better coverage.

## Table of Contents

1. [Introduction](#introduction)
2. [How It Works](#how-it-works)
3. [Features](#features)
4. [Why Use This App?](#uses)
5. [Requirements](#requirements)
6. [Getting Started](#getting-started)
7. [Folder Structure](#folder-structure)
8. [Usage](#usage)
9. [Prompting Techniques](#prompting-techniques)
10. [Results](#results)
11. [Issues and Contributions](#contributing)
12. [License](#license)


## Introduction

This application aims to simplify the software unit testing process by automating the generation of unit test cases for both Python and Java. It utilizes advanced natural language processing capabilities to create comprehensive test scenarios for diverse codebases.


## How It Works

The application workflow consists of three main steps: generating unit test cases, executing them against the provided codebase, and generating detailed test reports. The underlying technology, Claude 2.1, processes system and human prompts to deliver coherent and runnable Python unit tests.


## Features

- **Extracting the CodeBase:** The app extracts the codebase from three input sources which are direct code snippet, File (.py or .java) and GitHub repository.
- **CodeBase Description:** The app gives a description of the provided codebase.
- **Automated Test Case Generation:** The app automates the generation of unit test cases based on provided code snippets or entire codebases.
- **Test Case Description:** The app gives a description of the generated unit test cases.
- **Execution and Reporting:** It executes the generated test cases, compares expected vs. actual results, and generates detailed reports with pass/fail status, errors, and code coverage.
- **Test Regeneration Assistance:** In case of less code coverage, the app assists in modifying the test cases to handle better code coverage.



## Why Use This App?

- **Efficiency:** Automating the unit testing process reduces manual effort and accelerates the identification of potential issues.
- **Comprehensive Testing:** The app encourages the creation of positive, negative, and edge test cases, ensuring thorough coverage of code paths.
- **Continuous Improvement:** Through detailed reports and code modification suggestions, the app facilitates continuous improvement in code quality.


## Requirements

Ensure you have the following prerequisites before using the application:

- Python 3.x
- Claude API key
- Required Python libraries (specified in requirements.txt)


## Getting Started

1. Clone this repository to your local machine.
2. Install the required Python libraries using `pip install -r Requirements.txt`.
3. Obtain an API key for Claude model and set it as an environment variable (`ANTHROPIC_API_KEY`).
4. Run the application using `python app.py`.


## Folder Structure

The project is organized as follows:

- `backend`: Contains core functionality, model, prompts, scripts and backend endpoints.
- `frontend`: All scripts related to UI.
- `prompt_test`: Houses scripts for testing different prompting techniques.
- `pom.xml`: An XML file that contains information about the project and configuration details used by Maven to build the project.
- `Requirements.txt`: Contains the list of requirements/ dependencies


## Usage

1. Run the application, providing the source code or URL or file path as input.
2. The application will generate unit test cases based on the code.
3. Execute the generated tests, and the application will provide a detailed report and modify the provided testcases if needed.
4. Additionally it will even provide the description of the codebase and the generated unit test cases.


## Prompting Techniques

The application utilizes various prompting techniques, such as "Zero shot", "Few shot", "Chain of Thought", "Tree of thought", " ReAct" and a combination of both "Chain of Thought and Few shot". The README file in the `prompt_test` directory provides insights into the effectiveness of each technique.


## Results

The `prompt_test/README.md` file summarizes the results obtained from testing different prompting techniques. It suggests that a combination of "Chain of Thought" and "Few Shot Examples" yields the best outcomes for generating logical and complex unit test cases.


## Issues and Contributions

If you encounter any issues or have suggestions for improvements, feel free to open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

---

*Note: Ensure that you have obtained the necessary credentials for the Anthropics API and set them in the `ANTHROPIC_API_KEY` environment variable before using the app.*