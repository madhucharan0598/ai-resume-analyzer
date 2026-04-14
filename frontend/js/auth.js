async function loginUser(){

  const email = document.getElementById("email").value
  const password = document.getElementById("password").value

  const res = await loginUserAPI({ email,password })

  if(res.token){
    localStorage.setItem("token", res.token)
    window.location.href = "index.html"
  }
}

async function signupUser(){

  const name = document.getElementById("name").value
  const email = document.getElementById("email").value
  const password = document.getElementById("password").value

  await registerUser({ name,email,password })

  window.location.href = "login.html"
}
