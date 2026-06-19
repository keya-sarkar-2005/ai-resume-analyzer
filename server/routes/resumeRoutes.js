const express = require("express");
const router = express.Router();
const Resume = require("../models/Resume");

const multer = require("multer");
const pdfParse = require("pdf-parse");
const fs = require("fs");

console.log("✅ resumeRoutes loaded");

// =======================
// Multer Configuration
// =======================
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },

    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

const upload = multer({
    storage: storage,
});

// =======================
// Save Resume
// =======================
router.post("/", async (req, res) => {
    try {
        const newResume = new Resume(req.body);
        await newResume.save();

        res.status(201).json({
            message: "Resume saved successfully",
            data: newResume,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error saving resume",
            error: error.message,
        });
    }
});

// =======================
// Get All Resumes
// =======================
router.get("/", async (req, res) => {
    try {
        const resumes = await Resume.find();

        res.status(200).json(resumes);
    } catch (error) {
        res.status(500).json({
            message: "Error fetching resumes",
            error: error.message,
        });
    }
});

// =======================
// Test Route
// =======================
router.get("/test", (req, res) => {
    res.send("Resume Route Working");
});

// =======================
// Upload Resume PDF
// =======================
router.post("/upload", upload.single("resume"), async (req, res) => {
    try {

        console.log("========== DEBUG ==========");
        console.log(req.file);
        console.log("===========================");

        // Check whether file exists
        if (!req.file) {
            return res.status(400).json({
                message: "No file uploaded."
            });
        }

        const dataBuffer = fs.readFileSync(req.file.path);

        const pdfData = await pdfParse(dataBuffer);

        res.status(200).json({
            message: "PDF uploaded successfully",
            filename: req.file.filename,
            text: pdfData.text,
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Error processing PDF",
            error: error.message,
        });
    }
});

module.exports = router;