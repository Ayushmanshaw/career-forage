import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// Helper: Sleep for delay (ms)
const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

// Helper: Retry wrapper for OpenAI API
async function makeOpenAIRequest(payload, retries = 3, delay = 3000) {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, // 🔐 safer
    },
  };

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        payload,
        config
      );
      return response.data;
    } catch (error) {
      if (error.response?.status === 429 && attempt < retries) {
        console.warn(`⚠️ Rate limited (attempt ${attempt}). Retrying in ${delay / 1000}s...`);
        await sleep(delay);
      } else {
        throw error;
      }
    }
  }
}

router.post('/parse-resume', async (req, res) => {
  try {
    const { resumeText } = req.body;

    if (!resumeText) {
      return res.status(400).json({ error: 'Missing resume text in request body.' });
    }

    const payload = {
      model: 'gpt-4o',
      temperature: 0.2,
      messages: [
        {
          role: 'system',
          content: 'You are a resume parser AI that extracts structured data from resumes.',
        },
        {
          role: 'user',
          content: `Extract the following structured information from this resume and return in JSON format:\n- Full Name\n- Email\n- Phone\n- Skills\n- Education (degree, institution, year)\n- Work Experience (position, company, duration)\n\nResume:\n\n${resumeText}`,
        },
      ],
    };

    const parsedData = await makeOpenAIRequest(payload);
    const content = parsedData.choices?.[0]?.message?.content;

    res.status(200).json({ parsed: content || 'No structured data found.' });
  } catch (error) {
    console.error('Resume parsing failed:', error.message);
    res.status(error.response?.status || 500).json({
      error: error.response?.data?.error?.message || 'Internal server error',
    });
  }
});

export default router; 

