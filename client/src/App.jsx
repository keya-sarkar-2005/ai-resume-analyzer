import { useState } from "react";

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [skills, setSkills] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const resumeData = {
      name,
      email,
      skills: skills.split(",").map((skill) => skill.trim()),
    };

    try {
      const response = await fetch("http://localhost:5000/api/resumes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(resumeData),
      });

      const data = await response.json();

      alert(data.message);

      setName("");
      setEmail("");
      setSkills("");
    } catch (error) {
      console.error(error);
      alert("Error saving resume");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>AI Resume Analyzer</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label><br />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <br />

        <div>
          <label>Email:</label><br />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <br />

        <div>
          <label>Skills (comma separated):</label><br />
          <input
            type="text"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            placeholder="Java, React, MongoDB"
          />
        </div>

        <br />

        <button type="submit">
          Save Resume
        </button>
      </form>
    </div>
  );
}

export default App;