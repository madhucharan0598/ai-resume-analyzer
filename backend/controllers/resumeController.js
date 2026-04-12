const Resume = require("../models/Resume");
const parseResume = require("../services/resumeParser");
const analyzeResume = require("../services/aiAnalyzer");

exports.uploadResume = async (req, res) => {
  try {

    console.log("FILE RECEIVED:", req.file)

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" })
    }

    const filePath = req.file.path

    console.log("FILE PATH:", filePath)

    const text = await parseResume(filePath)

    console.log("PARSED TEXT:", text?.slice(0, 100))

    const analysis = analyzeResume(text)

    console.log("ANALYSIS:", analysis)

    const resume = await Resume.create({
      userId: req.user.id,
      fileName: req.file.filename,
      content: text,
      skills: analysis.skills || [],
      score: analysis.score || 0,
      jobRoles: analysis.jobRoles || [],
      suggestions: analysis.suggestions || []
    })

    console.log("SAVED RESUME:", resume)

    res.json({
      success: true,
      message: "Resume analyzed successfully",
      resume
    })

  } catch (error) {

    console.error("UPLOAD ERROR:", error)

    res.status(500).json({
      message: "Error analyzing resume",
      error: error.message
    })
  }
}
exports.getResumes = async (req, res) => {
  try {
    const resumes = await Resume.find({ userId: req.user.id })
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: resumes.length,
      resumes
    });
  } catch (error) {
    console.error("getResumes error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Error fetching resumes",
      error: error.message
    });
  }
};
