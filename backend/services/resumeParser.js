const fs = require("fs")
const pdfParse = require("pdf-parse")
const mammoth = require("mammoth")
const parseResume = async (filePath) => {
  try {
    const fileBuffer = fs.readFileSync(filePath)
    if (filePath.endsWith(".pdf")) {
      const data = await pdfParse(fileBuffer)
      return data.text
    }
    if (filePath.endsWith(".docx")) {
      const data = await mammoth.extractRawText({ buffer: fileBuffer })
      return data.value
    }
    return ""
  } catch (error) {
    console.error("Parsing error:", error)
    return ""
  }
}
module.exports = parseResume
