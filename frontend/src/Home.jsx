import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ReactMarkdown from "react-markdown";

function Home() {
  const [topic, setTopic] = useState("");
  const [platform, setPlatform] = useState("");
  const [tone, setTone] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Protect route
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/login");
    }
  }, [navigate]);

  const generateContent = async () => {
    try {
      setLoading(true);
      setResult("");

      const response = await axios.post(
        "http://127.0.0.1:8000/generate",
        { topic, platform, tone }
      );

      setResult(response.data.content);
    } catch (error) {
      alert("Error generating content");
    } finally {
      setLoading(false);
    }
  };

  // const handleLogout = () => {
  //   localStorage.removeItem("user");
  //   navigate("/login");
  // };

  return (
    <div className="container">
      {/* <button
        style={{ position: "absolute", top: "20px", right: "20px" }}
        onClick={handleLogout}
      >
        Logout
      </button> */}

      <div className="card">
        <h1>AI Marketing Content Generator</h1>

        <input
          type="text"
          placeholder="Enter Topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />

        <input
          type="text"
          placeholder="Platform (Instagram, LinkedIn...)"
          value={platform}
          onChange={(e) => setPlatform(e.target.value)}
        />

        <input
          type="text"
          placeholder="Tone (Professional, Casual...)"
          value={tone}
          onChange={(e) => setTone(e.target.value)}
        />

        <button onClick={generateContent} disabled={loading}>
          {loading ? "Generating..." : "Generate Content"}
        </button>

        {result && (
          <div className="result">
            <h2>Generated Content:</h2>
            <ReactMarkdown>{result}</ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
