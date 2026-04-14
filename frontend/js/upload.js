let uploadedFile = null

function selectFile(){
  document.getElementById("resumeFile").click()
}

document.getElementById("resumeFile").addEventListener("change",e=>{
  uploadedFile = e.target.files[0]
})

async function uploadResume(){

  const res = await uploadResumeAPI(uploadedFile)

  if(res.success){
    window.location.href = "dashboard.html"
  }
}
