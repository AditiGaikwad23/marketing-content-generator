import { useState, useEffect } from "react";
import "../styles/auth.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setEmail("");
    setPassword("");
  }, []);

  const handleLogin = async () => {
  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/login",
      { email, password }
    );

    localStorage.setItem("user", email);

    setEmail("");
    setPassword("");

    alert(response.data.message);

    navigate("/");   // 🔥 Go directly to AI Generator

  } catch (error) {
    alert("Login failed");
    }
  };


  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Login</h2>
        <form autoComplete="off">
        <input
          type="email"
          autoComplete="new-email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          autoComplete="new-password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        </form>
        <button onClick={handleLogin}>Login</button>
        
        {/* <button>Login</button> */}
      </div>
    </div>
  );
}

export default Login;
