import express from "express";
import multer from "multer";
import {
  createResume,
  getResumes,
  deleteResume, // 🆕 import controller
} from "../controllers/resumeController.js";

const router = express.Router();

// Setup multer
const storage = multer.diskStorage({
  destination: "./uploads",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// Routes
router.post("/", createResume); // Save JSON resume data
router.get("/", getResumes);    // Get resumes for user
router.delete("/:id", deleteResume); // 🆕 Delete resume by ID

export default router;
