import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import sendIcon from "../../assets/img/sendIcon.png";

import { useUser } from "../UserContext";
import { io } from "socket.io-client";
import SelectLanguage from "./SelectLanguage";
export default function InputBox() {
  const [codeInput, setCodeInput] = useState("");
  const [fileInput, setFileInput] = useState("");
  const {
    selectFile,
    setInsertedCode,
    setSelectFile,
    setCodebase,
    setInputSource,
    inputSource,
    setSelectedFileName,
    setCodebaseExplaination,
    setTestCases,
    testCases,
    codebase,
    fileName,
    setFileName,
    setFinalTestReport,
    setTestCasesExplaination,
    selectedLanguage,
    socket,
    setCodebaseName
  } = useUser();
  const navigate = useNavigate();

  const handleFileSelect = (event) => {
    const file = event.target.files[0];

    if (!file) {
      // Handle the case where the user cancels the file selection
      setSelectFile(null);
      setSelectedFileName("");
      setFileInput("");
      setInputSource("");
      return;
    }

    // Update selected file name
    setSelectedFileName(file.name);

    // Check file extension based on selected language
    if (file && !file.name.endsWith(".py") && selectedLanguage === "Python") {
      alert("Please select a Python file");
      return;
    }

    if (file && !file.name.endsWith(".java") && selectedLanguage === "Java") {
      alert("Please select a Java file");
      return;
    }

    // Update the state with the selected file
    setSelectFile(file);

    // Read file content
    const reader = new FileReader();
    reader.onload = (e) => {
      const fileContent = e.target.result;
      setFileInput(fileContent);
      setInputSource(fileContent);
      // console.log("File content is ",inputSource)
    };
    reader.readAsText(file);
  };

  const handleCodeInputChange = (event) => {
    setCodeInput(event.target.value);
    setInputSource(event.target.value);
  };

  const handleStartChat = () => {
    // console.log("file input ", fileInput)
    setInputSource(selectFile ? fileInput : codeInput);

    console.log("The input source from start handle chat :", inputSource);
    if (
      selectedLanguage === "Python" &&
      typeof (inputSource === "string") &&
      !inputSource.trim() &&
      !selectFile
    ) {
      alert(
        "Please insert Python code or codebase link or select a python file"
      );
      return;
    }
    if (
      selectedLanguage === "Java" &&
      typeof (inputSource === "string") &&
      !inputSource.trim() &&
      !selectFile
    ) {
      alert("Please select a Java file");
      return;
    }
    setInsertedCode(inputSource);
    console.log("Socket : ", socket);
    socket.emit("generate_test_cases", {
      language: selectedLanguage,
      code_base: inputSource
    });
    // socket.emit("get_tests_and_report", { language: selectedLanguage, code_base: inputSource });
    let generated_codebase;
    const handleCodebase = (data) => {
      console.log("The codebase is:", data);
      setCodebase(data.code_base);
      setCodebaseName(data.code_base_name);
      generated_codebase = data.code_base;
      // console.log("The code base is from variable", generated_codebase);
    };

    socket.on("codebase", handleCodebase);

    socket.on("code_explanation", (data) => {
      console.log("The code explaination : ", data);
      setCodebaseExplaination(data.explanation);
    });

  
    socket.on("tests_explanation", (data) => {
      setTestCasesExplaination(data.explanation);
      console.log("The test explaination", data);
    });

    socket.on("tests_generated", (data) => {
      console.log("test cases", data);

      setTestCases(data.test_cases);

      setFileName(data.test_file_name);

      socket.emit("generate_report", {
        code_base: generated_codebase,
        test_cases: data.test_cases,
        test_file_name:
          selectedLanguage === "Python" ? data.test_file_name : "",
        test_case_name: selectedLanguage === "Java" ? data.test_case_name : "",
        language: selectedLanguage
      });
    });

    socket.on("report_generated", (data) => {
      console.log("The report generated", data);
      setFinalTestReport(data.report);
    });

    navigate("/results");
  };

  const calculateTextAreaHeight = () => {
    const lineHeight = 20;
    const numberOfLines = codeInput.split("\n").length;
    const newHeight = lineHeight * numberOfLines;
    const maxHeight = 200;
    return Math.min(newHeight, maxHeight) + "px";
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleStartChat();
    } else if (event.key === "Enter" && event.shiftKey) {
      event.preventDefault();
      setCodeInput((prevCodeInput) => prevCodeInput + "\n");
    }
  };
  

  const handleDeleteFile = () => {
    setSelectFile(null);
  };
  return (
    <div className="chat-input-container">
      <SelectLanguage />
      <textarea
        placeholder={
          selectFile
            ? `File selected: ${selectFile.name}`
            : selectedLanguage === "Java"
            ? "Please insert Java code / select a file"
            : "Please insert Python code / github link / select a file"
        }
        value={codeInput}
        onChange={handleCodeInputChange}
        onKeyDown={handleKeyDown}
        readOnly={selectFile !== null} // Set readOnly based on whether a file is selected
        className="text-input"
        style={{
          height: calculateTextAreaHeight(),
          maxHeight: "200px",
          resize: "none"
        }}
      />
      {selectFile && (
        <i class="fa-regular fa-trash-can" onClick={handleDeleteFile}></i>
      )}
      <div className="file_and_send">
        <div className="file-input-wrapper">
          <label htmlFor="fileInput" className="file-input-label">
            <span className="file-symbol">&#128206;</span>
          </label>
          <input
            type="file"
            id="fileInput"
            accept={
              selectedLanguage === "Python"
                ? ".py, .txt, .html, .css, .ipynb, .pdf, .png, .jpeg, .svg"
                : selectedLanguage === "Java"
                ? ".java, .py"
                : ".py, .txt, .html, .css, .ipynb, .pdf, .png, .jpeg, .svg, .java, .js"
            }
            onChange={handleFileSelect}
            className="file-input"
          />
        </div>

        <button onClick={handleStartChat} className="btn send-btn">
          <img src={sendIcon} alt="Send Icon" className="send-icon" />
        </button>
      </div>
    </div>
  );
}
