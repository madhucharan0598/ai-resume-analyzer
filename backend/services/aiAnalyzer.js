const analyzeResume = (text) => {

  const lower = text.toLowerCase()

  const skillsList = ["javascript","react","node","mongodb","python","java","html","css"]

  const found = skillsList.filter(s => lower.includes(s))

  let score = 40 + found.length * 8
  if(lower.includes("project")) score += 10
  if(lower.includes("experience")) score += 10
  score = Math.min(score, 100)

  let jobRoles = []
  if(found.includes("react") && found.includes("node")) jobRoles.push("Full Stack Developer")
  if(found.includes("javascript")) jobRoles.push("Frontend Developer")
  if(found.includes("python")) jobRoles.push("Backend Developer")

  let companies = []
  if(jobRoles.includes("Full Stack Developer")) companies.push("Google","Amazon","Microsoft")
  if(jobRoles.includes("Frontend Developer")) companies.push("Meta","Netflix")
  if(jobRoles.includes("Backend Developer")) companies.push("Uber","PayPal")

  companies = [...new Set(companies)]

  let suggestions = []
  if(found.length < 4) suggestions.push("Add more skills")
  if(!lower.includes("project")) suggestions.push("Add projects")
  if(!lower.includes("experience")) suggestions.push("Add experience")

  return { skills: found, score, jobRoles, companies, suggestions }
}

module.exports = analyzeResume
