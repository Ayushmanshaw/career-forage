// controllers/resumeController.js

import Resume from '../models/Resume.js';

// POST /api/resumes
export const createResume = async (req, res) => {
  try {
    console.log('Incoming data:', req.body);

    const { userId, resumeData, template } = req.body;

    const newResume = new Resume({
      userId,
      data: resumeData,
      template: template,
    });

    await newResume.save();

    res.status(201).json({ message: 'Resume saved successfully' });
  } catch (err) {
    console.error('Save error:', err);
    res.status(500).json({ error: 'Server error while saving resume' });
  }
};

// GET /api/resumes?userId=...
export const getResumes = async (req, res) => {
  try {
    const userId = req.query.userId;
    const resumes = await Resume.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json(resumes);
  } catch (err) {
    console.error('Fetch error:', err);
    res.status(500).json({ error: 'Server error while fetching resumes' });
  }
};

// DELETE /api/resumes/:id
export const deleteResume = async (req, res) => {
  try {
    const resumeId = req.params.id;
    const deleted = await Resume.findByIdAndDelete(resumeId);

    if (!deleted) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    res.status(200).json({ message: 'Resume deleted successfully' });
  } catch (err) {
    console.error('Delete error:', err);
    res.status(500).json({ error: 'Server error while deleting resume' });
  }
};
