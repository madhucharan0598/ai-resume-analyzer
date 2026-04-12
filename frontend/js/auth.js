/* ================= LOGIN ================= */

async function loginUser() {
  const email = document.getElementById("email").value
  const password = document.getElementById("password").value
  try{
    const res = await loginUserAPI({ email, password })
    console.log("Login response:", res)
    /* ❌ LOGIN FAILED */
    if (!res.token) {
      alert(res.message || "Login failed")
      return
    }
    /* ✅ SAVE TOKEN */
    localStorage.setItem("token", res.token)
    alert("Login successful")
    try{
      /* 🔥 CHECK USER RESUMES */
      const resumeRes = await fetch("https://resume-backend-lvzo.onrender.com/api/resume", {
        headers: {
          Authorization: `Bearer ${res.token}`
        }
      })
      const data = await resumeRes.json()
      console.log("Resume Data:", data)
      /* 🔥 SAFE REDIRECT */
      if (data.success && data.resumes && data.resumes.length > 0) {
        window.location.href = "dashboard.html"
      } else {
        window.location.href = "index.html"
      }
    }catch(error){
      console.error("Resume check error:", error)
      /* fallback */
      window.location.href = "index.html"
    }
  }catch(error){
    console.error("Login error:", error)
    alert("Something went wrong during login")
  }
}

/* ================= SIGNUP ================= */
async function signupUser() {

  const name = document.getElementById("name").value
  const email = document.getElementById("email").value
  const password = document.getElementById("password").value
  try{
    const res = await registerUser({ name, email, password })
    console.log("Signup response:", res)
    if(res.success || res.message){
      alert("Account created successfully!")
      /* 🔥 REDIRECT TO LOGIN */
      window.location.href = "login.html"
    } else {
      alert(res.message || "Signup failed")
    }
  }catch(error){
    console.error("Signup error:", error)
    alert("Error during signup")
  }
}
