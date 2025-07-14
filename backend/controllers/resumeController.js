// controllers/resumeController.js

const Resume = require('../models/Resume');

// POST /api/resumes
const createResume = async (req, res) => {
  try {
    console.log('Incoming data:', req.body); // 🪵 Log request body for debugging

    const { userId, resumeData, template } = req.body;

    const newResume = new Resume({
      userId,
      data: resumeData,
      template: template, // Store the selected template ID
    });

    await newResume.save();

    res.status(201).json({ message: 'Resume saved successfully' });
  } catch (err) {
    console.error('Save error:', err);
    res.status(500).json({ error: 'Server error while saving resume' });
  }
};

const getResumes = async (req, res) => {
  try {
    const userId = req.query.userId; // or from Clerk token
    const resumes = await Resume.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json(resumes);
  } catch (err) {
    console.error('Fetch error:', err);
    res.status(500).json({ error: 'Server error while fetching resumes' });
  }
};

module.exports = { createResume, getResumes };
