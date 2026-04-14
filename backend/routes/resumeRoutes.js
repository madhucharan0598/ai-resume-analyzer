const router = require("express").Router()
const multer = require("multer")
const auth = require("../middleware/authMiddleware")

const { uploadResume, getResumes } = require("../controllers/resumeController")

const upload = multer({ dest:"uploads/" })

router.post("/", auth, upload.single("resume"), uploadResume)
router.get("/", auth, getResumes)

module.exports = router
