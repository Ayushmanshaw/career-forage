// routes/resumeRoutes.js
// const express = require("express");
// const router = express.Router();
// const { createResume, getResumes } = require("../controllers/resumeController");

// router.post("/", createResume);
// router.get("/", getResumes);

// module.exports = router;

const express = require("express");
const router = express.Router();
const { createResume, getResumes } = require("../controllers/resumeController");

router.post("/", createResume);
router.get("/", getResumes);

module.exports = router;
