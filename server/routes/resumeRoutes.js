const express = require("express");
const router = express.Router();
console.log("✅ resumeRoutes loaded");
const Resume = require("../models/Resume");

// Save Resume
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
            error,
        });
    }
});

// Get All Resumes
router.get("/", async (req, res) => {
    try {
        const resumes = await Resume.find();

        res.status(200).json(resumes);
    } catch (error) {
        res.status(500).json({
            message: "Error fetching resumes",
            error,
        });
    }
});

router.get("/test", (req, res) => {
    res.send("Resume Route Working");
});

module.exports = router;