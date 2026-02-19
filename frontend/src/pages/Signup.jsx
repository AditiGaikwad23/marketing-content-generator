import { useState, useEffect } from "react";
import "../styles/auth.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setName("");
    setEmail("");
    setPassword("");
  }, []);



  const handleSignup = async () => {
  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/signup",
      { name, email, password }
    );

    setName("");
    setEmail("");
    setPassword("");

    alert(response.data.message);

    navigate("/login");  // 🔥 After signup go to login

  } catch (error) {
    alert("Signup failed");
  }
};


  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Sign Up</h2>

        <form autoComplete="off">
        <input
          type="text"
          placeholder="Enter Name"
          autoComplete="off"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          autoComplete="off"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          autoComplete="new-password"
          placeholder="Create Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        </form>
        <button onClick={handleSignup}>Create Account</button>
    
      </div>
    </div>
  );
}

export default Signup;
