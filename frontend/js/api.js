const API_URL = "https://resume-backend-lvzo.onrender.com/api"

/* -------- AUTH -------- */

async function registerUser(data) {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })
  return res.json()
}

async function loginUserAPI(data) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })
  return res.json()
}

/* -------- RESUME -------- */

async function uploadResumeAPI(file) {

  const formData = new FormData()
  formData.append("resume", file)

  const token = localStorage.getItem("token")

  console.log("UPLOAD TOKEN:", token)

  if(!token){
    alert("Please login again")
    window.location.href = "login.html"
    return
  }

  const res = await fetch(`${API_URL}/resume`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`
    },
    body: formData
  })

  return res.json()
}

async function getResumesAPI() {

  const token = localStorage.getItem("token")

  console.log("FETCH TOKEN:", token)

  if(!token){
    alert("Please login again")
    window.location.href = "login.html"
    return
  }

  const res = await fetch(`${API_URL}/resume`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  return res.json()
}

/* -------- LOGOUT -------- */

function logout(){
  localStorage.removeItem("token")
  window.location.href = "login.html"
}
