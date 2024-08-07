export default function parseTestReport(report) {
  const totalTestCasesMatch = report.match(/Total unit test cases = (\d+)/);
  const passedTestCasesMatch = report.match(/Passed unit test cases = (\d+)/);
  const failedTestCasesMatch = report.match(/Failed unit test cases = (\d+)/);

  const total_num_of_testcase = totalTestCasesMatch
    ? totalTestCasesMatch[1]
    : "N/A";
  const total_passed_test_cases = passedTestCasesMatch
    ? passedTestCasesMatch[1]
    : "N/A";
  const total_failed_test_cases = failedTestCasesMatch
    ? failedTestCasesMatch[1]
    : "N/A";

  const overallReportMatch = report.match(
    /Overall Report:[\s\S]*?Pass rate = (\d+(\.\d+)?)%[\s\S]*?Code coverage = (\d+(\.\d+)?)%/
  );

  const passRate = overallReportMatch ? overallReportMatch[1] : "N/A";
  const codeCoverage = overallReportMatch ? overallReportMatch[3] : "N/A";

  const Overall_Report = `Overall Report:
  Total unit test cases  ${total_num_of_testcase}
  Passed unit test cases  ${total_passed_test_cases}
  Failed unit test cases  ${total_failed_test_cases}
  Pass rate  ${passRate}%
  Code coverage  ${codeCoverage}%
  
The overall code coverage is: ${
    codeCoverage >= 80 ? "Good coverage" : "Normal coverage"
  }`;

  return {
    total_num_of_testcase,
    total_passed_test_cases,
    total_failed_test_cases,
    Overall_Report
  };
}
