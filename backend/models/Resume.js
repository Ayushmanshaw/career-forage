// models/Resume.js
import mongoose from 'mongoose';

const resumeSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  data: { type: Object, required: true },
  template: { type: String, required: true },
  resumeUrl: { type: String }
}, { timestamps: true });

const Resume = mongoose.model('Resume', resumeSchema);
export default Resume;
