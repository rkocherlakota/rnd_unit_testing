import React, { createContext, useContext, useState, useEffect } from "react";
// import jsPDF from "jspdf";
import { io } from "socket.io-client";
const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [insertedCode, setInsertedCode] = useState("");
  const [finalTestReport, setFinalTestReport] = useState("");
  const [selectFile, setSelectFile] = useState(null);
  const [testCases, setTestCases] = useState("");
  const [codebase, setCodebase] = useState("");
  const [fileName, setFileName] = useState("");
  const [allFileNames, setAllFileNames] = useState([]);
  const [inputSource, setInputSource] = useState("");
  const [isModifyClicked, setIsModifyClicked] = useState(false);
  const [modifiedReport, setModifiedReport] = useState("");
  const [newTestCases, setNewTestCases] = useState("");
  const [selectedFileName, setSelectedFileName] = useState("");
 const [codebaseName, setCodebaseName]= useState("");
  const [codebaseExplaination, setCodebaseExplaination]= useState("");
  const [testCasesExplaination, setTestCasesExplaination] = useState("");
  const socket = io("http://localhost:5000");
  const [selectedLanguage, setSelectedLanguage] = useState("Python");
  // console.log("The current language :", selectedLanguage)
  useEffect(() => {
    // Retrieve allFileNames from local storage during initialization
    const storedAllFileNames = JSON.parse(localStorage.getItem("allFileNames"));

    if (storedAllFileNames && Array.isArray(storedAllFileNames)) {
      setAllFileNames(storedAllFileNames);
    }


    // If no values are found, `allFileNames` state remains unchanged
  }, []);

  useEffect(() => {
    // Update local storage whenever allFileNames changes
    localStorage.setItem("allFileNames", JSON.stringify(allFileNames));
  }, [allFileNames]);

  const updateUser = (newUser) => {
    if (newUser !== user) {
      setUser((prevUser) => {
        if (prevUser && newUser && prevUser.id === newUser.id) {
          return prevUser;
        } else {
          return newUser;
        }
      });
    }
  };

  const updateCode = (newCode) => {
    setInsertedCode(newCode);
  };

  const deleteFileName = (index) => {
    const updatedFileNames = [...allFileNames];
    updatedFileNames.splice(index, 1);
    setAllFileNames(updatedFileNames);
    localStorage.setItem("allFileNames", JSON.stringify(updatedFileNames));
  };

 

  
  return (
    <UserContext.Provider
      value={{
        codebaseName,
        setCodebaseName,
        selectedLanguage,
        setSelectedLanguage,
        testCasesExplaination,
        setTestCasesExplaination,
        codebaseExplaination,
        setCodebaseExplaination,
        modifiedReport,
        setNewTestCases,
        setModifiedReport,
        isModifyClicked,
        setIsModifyClicked,
        inputSource,
        setInputSource,
        socket,
        // handleModifyClick,
        // handleDownloadClick,
        fileName,
        setFileName,
        allFileNames,
        setAllFileNames,
        codebase,
        setCodebase,
        user,
        testCases,
        setTestCases,
        selectFile,
        setSelectFile,
        setUser,
        updateUser,
        finalTestReport,
        setFinalTestReport,
        insertedCode,
        setInsertedCode,
        updateCode,
        deleteFileName,
        selectedFileName,
        setSelectedFileName, 
        newTestCases
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
