import React, { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  vscDarkPlus,
  solarizedlight,
  duotoneLight,
 
} from "react-syntax-highlighter/dist/esm/styles/prism";
import { useUser } from "../UserContext";

export default function ShowDetails({ scrollToRef, generatedItem, heading }) {
  const { selectedLanguage } = useUser();
  const [copyStatus, setCopyStatus] = useState("Copy code");
  const [fontSize, setFontSize] = useState(10); // Default font size
  const [theme, setTheme] = useState(vscDarkPlus); // Default theme

  const handleZoomIn = () => {
    setFontSize((prevSize) => prevSize + 2); // Increase font size by 2
  };

  const handleZoomOut = () => {
    setFontSize((prevSize) => Math.max(prevSize - 2, 8)); // Decrease font size by 2, but not below 8
  };

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
  };
  const isThemeActive = (checkTheme) => theme === checkTheme;

  const handleCopyClick = () => {
    const codeContent = generatedItem.replace(/<[^>]*>/g, ""); // Remove HTML tags if any
    const textArea = document.createElement("textarea");
    textArea.value = codeContent;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);

    setCopyStatus("Copied");

    // Reset the text after a short delay
    setTimeout(() => {
      setCopyStatus("Copy code");
    }, 2000);
  };

  const getStyledReport = (testReport) => {
    if (typeof testReport !== "string") {
      return { __html: "Invalid report data" };
    }

    const highlightedReport = testReport.replace(
      /(status: (Passed|Failed)|Pass rate = 100%|Code coverage = 80%)/g,
      (match) =>
        match.includes("status:")
          ? `status: ${renderColoredStatus(match.split(":")[1].trim())}`
          : match
    );

    return { __html: highlightedReport };
  };

  const renderColoredStatus = (status) => {
    const color =
      status === "Passed" ? "green" : status === "Failed" ? "red" : "black";
    return <span style={{ color }}>{status}</span>;
  };

  return (
    <div className="codebase" ref={scrollToRef}>
      <h4 className="codebase-heading">{heading}</h4>
   <div className="codebase-nav">

      <div className="copy-item">
        <span>{selectedLanguage}</span>

        <div className="zoom-controls">
          <button onClick={handleZoomIn}>+</button>
          <button onClick={handleZoomOut}>-</button>
        </div>
        <div className="theme-controls">
        <p className="theme">Theme :</p>
        <button
          onClick={() => handleThemeChange(vscDarkPlus)}
          className={isThemeActive(vscDarkPlus) ? "active" : ""}
        >
          Dark
        </button>
        <button
          onClick={() => handleThemeChange(solarizedlight)}
          className={isThemeActive(solarizedlight) ? "active" : ""}
        >
          Medium
        </button>
        <button
          onClick={() => handleThemeChange(duotoneLight)}
          className={isThemeActive(duotoneLight) ? "active" : ""}
        >
          Light
        </button>
        
       
      </div>

        <span className="copy_icon" onClick={handleCopyClick}>
          {copyStatus === "Copy code" ? (
            <i className="fa-solid fa-copy"></i>
          ) : (
            <i className="fa-solid fa-check"></i>
          )}
          {copyStatus}
        </span>
      </div>

      <SyntaxHighlighter
        language="python"
        style={theme}
        customStyle={{ fontSize }}
      >
        {getStyledReport(generatedItem).__html}
      </SyntaxHighlighter>
   </div>

    </div>
  );
}