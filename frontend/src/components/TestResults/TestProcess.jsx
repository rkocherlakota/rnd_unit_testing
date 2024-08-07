import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./TestResults.css";
import { Timeline,Progress, Spin } from "antd";
import { useUser } from "../UserContext";
import Footer1 from "../Footer/Footer1";
import ProgressComponent from "./ProgressComponent";
import ShowDetails from "./ShowDetails";
import DwonloadButton from "./DownloadButton";
import { initResizerFn } from "../../js/resizer";
export default function TestProcess() {
  const navigate = useNavigate();
  const {
    codebaseExplaination,
    codebase,
    testCases,
    finalTestReport,
    testCasesExplaination,
    selectedLanguage,
    socket
  } = useUser();
  const [isCodebaseVisible, setIsCodebaseVisible] = useState(true);
  const [isTestCasesVisible, setIsTestCasesVisible] = useState(false);
  const [isCodebaseDescriptionVisible, setIsCodebaseDescriptionVisible] =
    useState(false);

  const [isExecutedTestVisible, setIsExecutedTestVisible] = useState(false);

  const [isTestcaseExplainationVisible, setIsTestcaseExplainationVisible] =
    useState(false);

  const handleCodebaseVisibleClick = () => {
    setIsCodebaseVisible(!isCodebaseVisible);
  };

  const handleViewButtonClick = () => {
    setIsCodebaseDescriptionVisible(!isCodebaseDescriptionVisible);
  };

  const viewTestbtn = () => {
    setIsTestCasesVisible(!isTestCasesVisible);
  };
  const handleExecutedTests = () => {
    setIsExecutedTestVisible(!isExecutedTestVisible);
  };
  const handleTestCaseExplain = () => {
    setIsTestcaseExplainationVisible(!isTestcaseExplainationVisible);
  };
  const [isLeftContentVisible, setIsLeftContentVisible] = useState(true);
  const handleArrowClick = () => {
    setIsLeftContentVisible(!isLeftContentVisible);
  };

  const asideRef = useRef();
  const scrollToRef = useRef();
  // scrollToRef.current.scrollIntoView();
  const progressRef = useRef(null);

  useEffect(() => {
    const asideElement = asideRef.current;

    const handleMutation = () => {
      if (scrollToRef.current) {
        scrollToRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "nearest"
        });
      }
    };

    const observer = new MutationObserver(handleMutation);

    observer.observe(asideElement, {
      childList: true,
      subtree: true
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  // const overall_report = parseTestReport(finalTestReport);

  const milestones = [
    {
      name: (
        <>
          <div className="extraction">
            <h3>
              {" "}
              <i className="fa-solid fa-code "></i> Codebase Extraction{" "}
              {codebase ? "" : <Spin size="small" />}
            </h3>
            <div className="discription">
              {codebase ? (
                <p>
                  {" "}
                  {/* <i className="fa-solid fa-circle-check"></i> */}- The code
                  has been extracted successfully{" "}
                  <span
                    className={`show-hide-link ${
                      isCodebaseVisible ? "hide" : "show"
                    }`}
                    onClick={handleCodebaseVisibleClick}
                  >
                    {isCodebaseVisible ? "Hide" : "Show"}
                  </span>
                </p>
              ) : (
                ""
              )}
            </div>
          </div>
        </>
      ),
      done: codebase
    },
    {
      name: (
        <>
          <ProgressComponent
            progressInfo={{
              heading: "Codebase Description",
              subHeading: "- The description of codebase has been generated",
              type: codebaseExplaination,
              handleOnClick: handleViewButtonClick,
              handleType: isCodebaseDescriptionVisible,
              icon: <i className="fa-solid fa-book"></i>,
              progressRef: progressRef
            }}
          />
        </>
      ),
      done: codebaseExplaination
    }
  ];

  if (codebaseExplaination) {
    milestones.push(
      {
        name: (
          <>
            <ProgressComponent
              progressInfo={{
                heading: "Test Cases Description",
                subHeading: "- The test cases description has been generated",
                type: testCasesExplaination,
                handleOnClick: handleTestCaseExplain,
                handleType: isTestcaseExplainationVisible,
                icon: <i className="fa-solid fa-file-lines"></i>
              }}
            />
          </>
        ),
        done: testCasesExplaination
      },
      {
        name: (
          <>
            {" "}
            <ProgressComponent
              progressInfo={{
                heading: "Test Cases Generation",
                subHeading: "- The test cases have been generated successfully",
                type: testCases,
                handleOnClick: viewTestbtn,
                handleType: isTestCasesVisible,
                icon: <i className="fa-solid fa-list"></i>
              }}
            />
          </>
        ),
        done: testCases
      }
    );
  }

  if (testCasesExplaination) {
    milestones.push(
      {
        name: (
          <>
            <ProgressComponent
              progressInfo={{
                heading: "Test Cases Execution",
                subHeading: "- Test cases has been executed successfully",
                type: finalTestReport,
                handleOnClick: handleExecutedTests,
                handleType: isExecutedTestVisible,
                icon: <i className="fa-solid fa-rotate"></i>
              }}
            />
          </>
        ),
        done: finalTestReport
      },

      {
        name: (
          <>
            <div className="extraction">
              <h3>
                <i className="fa-regular fa-file-lines "></i> Overall Test
                Report {finalTestReport ? "" : <Spin size="small" />}
              </h3>
              <div className="discription">
                {finalTestReport ? (
                  <>
                    <p>- The report has been generated successfully </p>
                    {/* <pre className="overall-report">
         
                      {overall_report.Overall_Report}
                    </pre> */}
                  </>
                ) : (
                  ""
                )}
              </div>
            </div>
          </>
        ),
        done: finalTestReport
      }
    );
  }

  const handleBackToHome = () => {
    socket.disconnect();
    console.log("socket", socket);
    navigate("/home");
    window.location.reload();
  };

  useEffect(() => {
    var resizer = document.querySelector(".resizer");
    var sidebar = document.querySelector(".sidebar");
    initResizerFn(resizer, sidebar);
  }, []);

  return (
    <>
      <section className="container">
        <div className="info">
          <i className="fa-solid fa-arrow-left" onClick={handleBackToHome}></i>
          <h3> {selectedLanguage} Unit testing </h3>
        </div>

        <main className="content">
          <aside className="sidebar">
            <div className="left_content">
              <div className="test-status">
                <Timeline mode="left" className="timeline">
                  {milestones.map((milestone, index) => (
                    <Timeline.Item
                      key={index}
                      label={milestone.done ? "Done" : "In Progress"}
                      color={milestone.done ? "green" : "blue"}
                    >
                      {milestone.name}
                      {/* {milestone.done && (
                    <Progress percent={100} status="success" />
                  )} */}
                    </Timeline.Item>
                  ))}
                </Timeline>

                {finalTestReport ? <DwonloadButton /> : ""}
              </div>
            </div>
            <div class="resizer"></div>
          </aside>


          <aside className="right_content" ref={asideRef}>
            <div className="right_content-item">
              {isCodebaseVisible && (
                <ShowDetails
                  scrollToRef={scrollToRef}
                  generatedItem={codebase}
                  heading="Your inserted code :"
                />
              )}
            </div>

            <div className="right_content-item">
              {isCodebaseDescriptionVisible && (
                <>
                  <ShowDetails
                    scrollToRef={scrollToRef}
                    generatedItem={codebaseExplaination}
                    heading="Understand your codebase :"
                  />
                </>
              )}
            </div>

            <div className="right_content-item">
              {testCasesExplaination && (
                <>
                  {isTestcaseExplainationVisible && (
                    <ShowDetails
                      scrollToRef={scrollToRef}
                      generatedItem={testCasesExplaination}
                      heading="Understand generated test cases :"
                    />
                  )}
                </>
              )}
            </div>

            <div className="right_content-item">
              {isTestCasesVisible && (
                <>
                  <ShowDetails
                    scrollToRef={scrollToRef}
                    generatedItem={testCases}
                    heading="Review generated test cases :"
                  />
                </>
              )}
            </div>

            <div className="right_content-item">
              {isExecutedTestVisible && (
                <>
                  {" "}
                  <ShowDetails
                    scrollToRef={scrollToRef}
                    generatedItem={finalTestReport}
                    heading="Status report on executed test cases :"
                  />
                </>
              )}
            </div>
          </aside>
        </main>
      </section>
      <Footer1 />
    </>
  );
}