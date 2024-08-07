export default function Information() {
    return (
        <div className="information">
            <h3 className="info-h">User guide for software unit testing : </h3>
            <ul className="information-ul">
                <li>1. Insert a Python / Java code snippet, a Python / Java file, or a GitHub link containing Python /Java code.</li>
                <li>2. The application will then redirect to generate test cases based on the provided code. Please note that this process may take some time.</li>
                <li>3. Once the test cases are generated, the application will execute them and generate a report based on the results. You can modify the code if any tests fail.</li>
                <li>4. Finally, you can download the generated report. 🎉</li>
            </ul>
           
        </div>
    );
}
