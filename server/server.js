require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("✅ MongoDB Connected");
    })
    .catch((err) => {
        console.log("❌ MongoDB Error:", err);
    });

// Test Route
app.get("/api/message", (req, res) => {
    res.json({
        message: "Hello from Express Backend 🚀",
    });
});

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});