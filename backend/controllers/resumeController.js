const Resume = require("../models/Resume")
const parseResume = require("../services/resumeParser")
const analyzeResume = require("../services/aiAnalyzer")

exports.uploadResume = async (req,res)=>{

  const text = await parseResume(req.file.path)
  const analysis = analyzeResume(text)

  const resume = await Resume.create({
    userId:req.user.id,
    fileName:req.file.filename,
    content:text,
    skills:analysis.skills,
    score:analysis.score,
    jobRoles:analysis.jobRoles,
    companies:analysis.companies,
    suggestions:analysis.suggestions
  })

  res.json({ success:true, resume })
}

exports.getResumes = async (req,res)=>{
  const resumes = await Resume.find({ userId:req.user.id })
  res.json({ success:true, resumes })
}
