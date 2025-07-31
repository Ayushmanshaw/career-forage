import express from 'express';
import { exchangeCodeForToken, createRepo } from '../services/github.js';
import { customizeTemplate } from '../services/portfolioBuilder.js';
import path from 'path';
import axios from 'axios';

const router = express.Router();

router.get('/github/callback', async (req, res) => {
  try {
    const code = req.query.code;
    const state = JSON.parse(Buffer.from(req.query.state, 'base64').toString());

    const accessToken = await exchangeCodeForToken(code);

        const userRes = await axios.get('https://api.github.com/user', {
      headers: { Authorization: `token ${accessToken}` },
    });
    const username = userRes.data.login;
    const repoName = `portfolio-${Date.now()}`;

    const localPath = await customizeTemplate(state);
    const repoUrl = await createRepo(accessToken, repoName, username, localPath);

    res.redirect(repoUrl);
  } catch (err) {
    console.error(err);
    res.status(500).send('OAuth or generation failed');
  }
});

export default router;
