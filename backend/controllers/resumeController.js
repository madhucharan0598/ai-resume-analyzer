const Resume = require("../models/Resume");
const parseResume = require("../services/resumeParser");
const analyzeResume = require("../services/aiAnalyzer");

exports.uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded"
      })
    }
    const filePath = req.file.path
    let text = ""
    try {
      text = await parseResume(filePath)
    } catch (err) {
      console.error("Parsing failed:", err)
      text = "Fallback resume content"
    }
    const analysis = analyzeResume(text)
    const resume = await Resume.create({
      userId: req.user.id,
      fileName: req.file.filename,
      content: text,
      skills: analysis.skills || [],
      score: analysis.score || 50,
      jobRoles: analysis.jobRoles || [],
      suggestions: analysis.suggestions || []
    })

    return res.json({
      success: true,
      message: "Resume saved successfully",
      resume
    })

  } catch (error) {

    console.error("UPLOAD ERROR:", error)

    return res.status(500).json({
      success: false,
      message: "Error saving resume",
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
