const fs = require("fs")
const pdfParse = require("pdf-parse")
const mammoth = require("mammoth")

const parseResume = async (filePath) => {

  const buffer = fs.readFileSync(filePath)

  if(filePath.endsWith(".pdf")){
    const data = await pdfParse(buffer)
    return data.text
  }

  if(filePath.endsWith(".docx")){
    const data = await mammoth.extractRawText({ buffer })
    return data.value
  }

  return ""
}

module.exports = parseResume
