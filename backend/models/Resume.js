// models/Resume.js
const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  data: { type: Object, required: true },
  template: { type: String, required: true },
  resumeUrl: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Resume', resumeSchema); // ✅ named export
