import { useState, useEffect } from "react";
import { useUser } from "../UserContext";

export default function History() {
  const { allFileNames, deleteFileName } = useUser();
  const [selectedPDF, setSelectedPDF] = useState(null);

  useEffect(() => {
   
    const storedPDFContent = localStorage.getItem("selectedPDF");
    setSelectedPDF(storedPDFContent);
  }, []);

  const handleDeleteClick = (index) => {
    deleteFileName(index);
  };

  const handleFileClick = (fileName, event) => {
    event.preventDefault();

    const pdfContent = localStorage.getItem(fileName);
    setSelectedPDF(pdfContent);
    
    localStorage.setItem("selectedPDF", pdfContent);

    const newTab = window.open();
    newTab.document.write(`
      <html>
        <body>
          <embed width="100%" height="100%" src="data:application/pdf;base64,${btoa(pdfContent)}" type="application/pdf" />
        </body>
      </html>
    `);

    const pdfFileNameWithoutExtension = fileName.replace(/\.[^/.]+$/, "");
    const pdfUrl = `/pdf-viewer/${pdfFileNameWithoutExtension}`;
    newTab.history.replaceState({}, "PDF Viewer", pdfUrl);
  };

  return (
    <div className="history">
      <h2>Recent Downloads</h2>
      <div className="history-container">
        {allFileNames.length === 0 ? (
          <p>No recent downloads</p>
        ) : (
          allFileNames.slice().reverse().map((item, index) => {
            return (
              <div className="searched-item" key={index}>
                <i className="fa-solid fa-minus"></i>
                <li onClick={(event) => handleFileClick(item, event)}>
                  {`Downloaded file: ${item} `}
                </li>
                <i className="fa-solid fa-trash delete" onClick={() => handleDeleteClick(index)}></i>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
