import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./Home";

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  const [user, setUser] = useState(localStorage.getItem("user"));

  // Update user state when route changes
  useEffect(() => {
    setUser(localStorage.getItem("user"));
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <>
      <div className="navbar">
        <div className="logo">AI Content Generator</div>

        <div className="auth-buttons">
          {user ? (
            <button className="login-btn" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <>
              <Link to="/login">
                <button className="login-btn">Login</button>
              </Link>

              <Link to="/signup">
                <button className="signup-btn">Sign Up</button>
              </Link>
            </>
          )}
        </div>
      </div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}

export default AppWrapper;
