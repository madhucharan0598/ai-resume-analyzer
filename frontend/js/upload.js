const dropZone = document.getElementById("dropZone")
const fileInput = document.getElementById("resumeFile")
const fileName = document.getElementById("fileName")
let uploadedFile = null
function selectFile() {
  fileInput.click()
}
fileInput.addEventListener("change", function () {
  uploadedFile = this.files[0]
  fileName.innerText = uploadedFile.name
})

/* drag events */
dropZone.addEventListener("dragover", function (e) {
  e.preventDefault()
  dropZone.classList.add("dragover")
})
dropZone.addEventListener("dragleave", function () {
  dropZone.classList.remove("dragover")
})
dropZone.addEventListener("drop", function (e) {
  e.preventDefault()
  dropZone.classList.remove("dragover")
  uploadedFile = e.dataTransfer.files[0]
  fileName.innerText = uploadedFile.name
})

async function uploadResume(){

  if(!uploadedFile){
    alert("Upload file first")
    return
  }

  try{

    const res = await uploadResumeAPI(uploadedFile)

    console.log("Upload success:", res)

    /* 🔥 DELAYED REDIRECT (FIXES YOUR ISSUE) */
    setTimeout(() => {
      window.location.href = "dashboard.html"
    }, 300)

  }catch(error){
    console.error(error)
    alert("Upload failed")
  }
}