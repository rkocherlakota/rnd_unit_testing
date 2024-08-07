import React, { useEffect , useState} from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import "../src/assets/css/base.css";
import LoginPage from "./components/Login/LoginPage";
import HomePage from "./components/Home/HomePage";
import ResultsPage from "./components/Results/ResultsPage";
import { useUser, UserProvider } from "./components/UserContext";
import TestResultsPage from "./components/TestResults/TestReulltsPage";
const PrivateRoute = ({ children }) => {
  const { user, setUser } = useUser();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser && !user) {
      setUser(JSON.parse(storedUser));
    }

    setLoading(false);
  }, [user, setUser]);

  if (loading) {
    return null;
  }
  return user ? <>{children}</> : <Navigate to="/" replace />;
};


function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element={<PrivateRoute><HomePage /></PrivateRoute>} />
          <Route path="/results" element={<PrivateRoute><TestResultsPage /></PrivateRoute>} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
