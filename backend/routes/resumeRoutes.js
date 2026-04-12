const express = require("express")
const router = express.Router()

const upload = require("../services/multerConfig")
const auth = require("../middleware/authMiddleware")

/* ✅ IMPORT BOTH FUNCTIONS */
const {
  uploadResume,
  getResumes
} = require("../controllers/resumeController")

/* ROUTES */
router.post("/", auth, upload.single("resume"), uploadResume)
router.get("/", auth, getResumes)

module.exports = router