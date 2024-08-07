import React from "react";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import logo from "../../assets/img/logo.png";
import grid_dynamics_logo from "../../assets/img/grid_dynamics_logo.png";
import { useUser } from "../UserContext";

export default function DwonloadButton() {
  const navigate = useNavigate();
  const {
    // handleModifyClick,
    setNewTestCases,
    setModifiedReport,
    setCodebase,
    setFinalTestReport,
    setTestCases,
    setSelectFile,
    setIsModifyClicked,
    modifiedReport,
    finalTestReport,
    newTestCases,
    codebase,
    fileName,
    testCases,
    allFileNames,
    setAllFileNames,
    setInsertedCode,
    setInputSource,
    setCodebaseExplaination,
    setTestCasesExplaination,
    inputSource,
    socket,
    codebaseName,
    selectedLanguage,
    setFileName
  } = useUser();

  const handleDownloadClick = () => {
    const pdfDoc = new jsPDF();
    const fontSizeTitle = 14;
    const fontSizeContent = 10;
    const lineHeight = 4;
    const pageHeight = pdfDoc.internal.pageSize.height;
    const pageWidth = pdfDoc.internal.pageSize.width;
    const margin = 10;
    const padding = 5;
    const bottomPadding = 10;

    const addTable = (title, content) => {
      pdfDoc.setDrawColor(0);
      pdfDoc.setLineWidth(0.2);
      pdfDoc.rect(
        margin,
        cursorY,
        pageWidth - 2 * margin,
        pageHeight - margin * 2
      );

      cursorY += lineHeight;

      pdfDoc.setFontSize(fontSizeTitle);

      pdfDoc.setFont("helvetica", "bold");
      pdfDoc.text(title, margin + padding, cursorY + padding);
      cursorY += lineHeight + padding;

      pdfDoc.setFont("helvetica", "normal");
      pdfDoc.setFontSize(fontSizeContent);
      const lines = pdfDoc.splitTextToSize(
        content,
        pageWidth - 2 * margin - 2 * padding
      );

      for (let i = 0; i < lines.length; i++) {
        if (cursorY + lineHeight > pageHeight - margin - bottomPadding) {
          addNewPage();
          pdfDoc.rect(
            margin,
            cursorY,
            pageWidth - 2 * margin,
            pageHeight - margin * 2
          );
          cursorY += lineHeight + padding;
        }

        pdfDoc.text(lines[i], margin + padding, cursorY + padding);
        cursorY += lineHeight;
      }

      cursorY += bottomPadding;
    };

    const addNewPage = () => {
      pdfDoc.addPage();
      cursorY = margin;
    };

    const addTimestamp = () => {
      const currentDate = new Date();
      const timestamp =
        "Report Generated at : \n" + currentDate.toLocaleString();

      pdfDoc.setFontSize(fontSizeContent);
      pdfDoc.setFont("helvetica", "normal");

      const timestampWidth = pdfDoc.getTextWidth(timestamp);
      const timestampX = pageWidth - timestampWidth + 25;
      const timestampY = margin + padding - 5;

      pdfDoc.text(timestamp, timestampX, timestampY);
    };

    pdfDoc.setFont("helvetica", "normal");

    let cursorY = margin;

    pdfDoc.setFontSize(fontSizeTitle + 2);

    const addLogo = () => {
      const logoWidth = 200;
      const logoHeight = 50;
      const opacity = 0.4;
      for (
        let pageNumber = 0;
        pageNumber < pdfDoc.getNumberOfPages();
        pageNumber++
      ) {
        pdfDoc.setPage(pageNumber + 1);
        const pageCenterX = pageWidth / 2;
        const pageCenterY = pageHeight / 2;

        pdfDoc.addImage(
          grid_dynamics_logo,
          "PNG",
          pageCenterX - logoWidth / 2,
          pageCenterY - logoHeight / 2,
          logoWidth,
          logoHeight,
          undefined,
          "FAST",
          opacity
        );
      }
      pdfDoc.setPage(1);
    };

    const remainingText = "Overall Report";
    const addHeader = () => {
      pdfDoc.setFontSize(fontSizeTitle + 2);
      const logoWidth = 50;
      const logoHeight = 10;
      const logoImage = new Image();
      logoImage.src = logo;
      const topMargin = 4;
      const gap = 0;

      const centerLogoX = (pageWidth - logoWidth) / 2;
      const centerTextX = (pageWidth - pdfDoc.getTextWidth(remainingText)) / 2;

      pdfDoc.addImage(
        logoImage,
        "PNG",
        centerLogoX,
        topMargin,
        logoWidth,
        logoHeight
      );

      pdfDoc.setFont("helvetica", "bold");
      pdfDoc.text(
        remainingText,
        centerTextX,
        cursorY + logoHeight + topMargin + gap
      );

      pdfDoc.setFont("helvetica", "normal");

      cursorY += lineHeight + padding + logoHeight + gap;
    };

    // addLogo();
    addTimestamp();
    addHeader();

    let report = modifiedReport || finalTestReport;
    let generated_test_cases = newTestCases || testCases;
    addTable("Your inserted codebase", codebase);
    console.log("Generated new test cases : ", generated_test_cases);
    addTable("See the generated test cases ", generated_test_cases);
    addTable("See the final test report", report);

    // const pdfContent = pdfDoc.output();
    // sessionStorage.setItem(fileName, pdfContent);
    // setAllFileNames((prevFileNames) => [...prevFileNames, fileName]);

    // sessionStorage.setItem("allFileNames", JSON.stringify(allFileNames));

    pdfDoc.save(`${fileName}.pdf`);
  };

  const handleNewTestCaseClick = () => {
    setFinalTestReport("");
    setTestCases("");
    setSelectFile("");
    setCodebase("");
    setCodebaseExplaination("");
    setTestCasesExplaination("");
    // setModifiedReport("");
    // setInsertedCode("");
    setInputSource("");
    // setNewTestCases("");
    // setIsModifyClicked(false);
    navigate("/home");

    // window.location.reload();
  };
  const handleResetStates = () => {
    setTestCases("");
    setFinalTestReport("");
    setTestCasesExplaination("");
  };

  const handleModifyClick = () => {
    handleResetStates();
    console.log("Modify btn clicked ");
    // setIsModifyClicked(true);
    console.log("Modified input :", {
      code_base: inputSource,
      code_base_name: codebaseName,
      language: selectedLanguage
    });
    socket.emit("modify_tests", {
      code_base: inputSource,
      code_base_name: codebaseName,
      language: selectedLanguage
    });

    socket.on("tests_generated", (data) => {
      console.log("Modified test cases : ", data);
      setTestCases(data.test_cases);
      setFileName(data.test_file_name);
    });
    socket.on("tests_explanation", (data) => {
      console.log("Modified test cases explanation : ", data);
      setTestCasesExplaination(data.explanation);
    });
    socket.on("report", (data) => {
      console.log("Modified test report", data);
      setFinalTestReport(data.report);
    });
  };

  return (
    <div className="download">
      <div className="download-heading">
        <h4>Do you want to download or Retry the file ?</h4>
        {/* <i className="fa-solid fa-download main-download"></i> */}
      </div>

      <button className=" btn-download" onClick={handleDownloadClick}>
        {/* <i className="fa-solid fa-download"></i>  Download  Report */}
        <span class="material-symbols-outlined">download</span> Download Report
      </button>

      <div className="buttons">
        <button className="btn-retry" onClick={handleModifyClick}>
          {" "}
          {/* <i className="fa-solid fa-rotate-right"></i> Modify */}
          <span class="material-symbols-outlined">replay</span> Regenerate
        </button>
        <button className=" btn-newtest" onClick={handleNewTestCaseClick}>
          {/* <i className="fa-solid fa-comment-medical"></i> Try New Test */}
          <span class="material-symbols-outlined">
add
</span> Try New Test
        </button>
      </div>
    </div>
  );
}
