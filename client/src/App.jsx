import { useEffect, useState } from "react";

function App() {
    const [message, setMessage] = useState("Loading...");

    useEffect(() => {
        fetch("http://localhost:5000/api/message")
            .then((response) => response.json())
            .then((data) => {
                setMessage(data.message);
            })
            .catch((error) => {
                console.error(error);
                setMessage("Failed to connect to backend");
            });
    }, []);

    return (
        <div style={{ padding: "40px" }}>
            <h1>AI Resume Analyzer</h1>
            <h2>{message}</h2>
        </div>
    );
}

export default App;