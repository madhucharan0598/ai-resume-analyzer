const token = localStorage.getItem("token")

if(!token){
  alert("Please login first")
  window.location.href = "login.html"
}

async function loadDashboard(){

  try{

    console.log("🚀 Loading dashboard...")

    const data = await getResumesAPI()

    console.log("📦 API DATA:", data)

    if(!data.success){
      alert("Error from server")
      return
    }

    const resumes = data.resumes

    if(!resumes || resumes.length === 0){
      alert("No resumes found")
      return
    }

    const latest = resumes[0]

    console.log("📌 Latest:", latest)

    /* ---------- SCORE ---------- */
    document.getElementById("scoreText").innerText = latest.score + "%"

    /* ---------- SKILLS ---------- */
    const skillsContainer = document.getElementById("skills")
    skillsContainer.innerHTML = ""

    latest.skills.forEach(skill => {
      const span = document.createElement("span")
      span.className = "skill-tag"
      span.innerText = skill
      skillsContainer.appendChild(span)
    })

    /* ---------- JOB ROLES ---------- */
    const jobs = document.getElementById("jobs")
    jobs.innerHTML = ""

    latest.jobRoles.forEach(job => {
      const li = document.createElement("li")
      li.innerText = job
      jobs.appendChild(li)
    })

    /* ---------- SUGGESTIONS ---------- */
    const tips = document.getElementById("tips")
    tips.innerHTML = ""

    latest.suggestions.forEach(tip => {
      const li = document.createElement("li")
      li.innerText = tip
      tips.appendChild(li)
    })

    /* ---------- HISTORY ---------- */
    const list = document.getElementById("resumeList")
    list.innerHTML = ""

    resumes.forEach(resume => {
      const li = document.createElement("li")
      li.innerText = `${resume.fileName} - Score: ${resume.score}%`
      list.appendChild(li)
    })

  }catch(error){

    console.error("❌ DASHBOARD ERROR:", error)

    alert("Error loading dashboard")
  }
}

/* 🔥 ONLY CALL FUNCTION HERE */
loadDashboard()