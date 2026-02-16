import { useState } from "react";
import axios from "axios";

function App() {
  const [topic, setTopic] = useState("");
  const [platform, setPlatform] = useState("");
  const [tone, setTone] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const generateContent = async () => {
    try {
      setLoading(true);
      setResult("");

      const response = await axios.post(
        "http://127.0.0.1:8000/generate",
        {
          topic,
          platform,
          tone,
        }
      );

      setResult(response.data.content);
    } catch (error) {
      console.error(error);
      alert("Error generating content");
    } finally {
      setLoading(false);
    }
  };
  return (
  <div className="container">
    <div className="card">
      <h1>🚀 AI Marketing Content Generator</h1>

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

      <button onClick={generateContent}>
        {loading ? "Generating..." : "Generate Content"}
      </button>

      {result && (
        <div className="result">
          <h2>✨ Generated Content:</h2>
          <p>{result}</p>
        </div>
      )}
    </div>
  </div>
);


  // return (
    // <div style={{ padding: "40px", fontFamily: "Arial" }}>
    //   <h1>🚀 AI Marketing Content Generator</h1>

    //   <input
    //     type="text"
    //     placeholder="Enter Topic"
    //     value={topic}
    //     onChange={(e) => setTopic(e.target.value)}
    //     style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
    //   />

    //   <input
    //     type="text"
    //     placeholder="Platform (Instagram, LinkedIn...)"
    //     value={platform}
    //     onChange={(e) => setPlatform(e.target.value)}
    //     style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
    //   />

    //   <input
    //     type="text"
    //     placeholder="Tone (Professional, Casual...)"
    //     value={tone}
    //     onChange={(e) => setTone(e.target.value)}
    //     style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
    //   />

    //   <button
    //     onClick={generateContent}
    //     style={{
    //       padding: "10px 20px",
    //       backgroundColor: "#4CAF50",
    //       color: "white",
    //       border: "none",
    //       cursor: "pointer",
    //     }}
    //   >
    //     {loading ? "Generating..." : "Generate Content"}
    //   </button>

    //   {result && (
    //     <div style={{ marginTop: "30px", whiteSpace: "pre-wrap" }}>
    //       <h2>✨ Generated Content:</h2>
    //       <p>{result}</p>
    //     </div>
    //   )}
    // </div>

  // );
}

export default App;
