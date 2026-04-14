async function loadDashboard(){

  const data = await getResumesAPI()

  const latest = data.resumes[0]

  document.getElementById("scoreText").innerText = latest.score + "%"

  const skills = document.getElementById("skills")
  latest.skills.forEach(s=>{
    const span = document.createElement("span")
    span.innerText = s
    skills.appendChild(span)
  })

  const companies = document.getElementById("companies")
  latest.companies.forEach(c=>{
    const li = document.createElement("li")
    li.innerText = c
    companies.appendChild(li)
  })
}

loadDashboard()
