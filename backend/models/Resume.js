const mongoose = require("mongoose")

const resumeSchema = new mongoose.Schema({
  userId: String,
  fileName: String,
  content: String,
  skills: [String],
  score: Number,
  jobRoles: [String],
  companies: [String],
  suggestions: [String]
})

module.exports = mongoose.model("Resume", resumeSchema)
