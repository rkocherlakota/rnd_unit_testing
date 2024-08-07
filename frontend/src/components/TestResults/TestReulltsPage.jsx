
import Header from "../Header/Header";
import { useUser } from "../UserContext";
import { useNavigate } from "react-router-dom";
import TestProcess from "../TestResults/TestProcess";
// import '../TestResults/TestResults.css'

export default function TestResultsPage() {
  let {
    setFinalTestReport,
    setTestCases,
    setSelectFile,
    setCodebase,
    setIsModifyClicked,
    setModifiedReport,
    setInsertedCode,
    socket
  } = useUser();
  const navigate = useNavigate();

  const handleBackToHome = () => {
    socket.disconnect();
    setFinalTestReport("");
    setTestCases("");
    setSelectFile(null);
    setCodebase("");
    setInsertedCode("");
    setModifiedReport("");
    setIsModifyClicked(false);
    navigate("/home");

    window.location.reload();
  };

  return (
    <>
      <Header />
     <TestProcess/>
    </>
  );
}
