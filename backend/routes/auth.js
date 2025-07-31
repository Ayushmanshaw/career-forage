// 📁 routes/github.js
import express from 'express';
import { exchangeCodeForToken, createRepo } from '../services/github.js';
import { customizeTemplate } from '../services/portfolioBuilder.js';
import path from 'path';
import axios from 'axios';
import { exec } from 'child_process';
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();

router.get('/github/callback', async (req, res) => {
  try {
    const code = req.query.code;
    const state = JSON.parse(Buffer.from(req.query.state, 'base64').toString());

    if (!code) {
      console.error('❌ No code provided in callback');
      return res.status(400).json({ error: 'Missing code parameter' });
    }

    console.log("🔁 GitHub OAuth code received:", code);

    // 1. Exchange GitHub code for token
    const accessToken = await exchangeCodeForToken(code);

    if (!accessToken) {
      console.error("❌ Failed to exchange code for access token. Check CLIENT_ID and CLIENT_SECRET.");
      return res.status(401).json({ error: 'Invalid GitHub OAuth token' });
    }

    console.log("✅ GitHub access token:", accessToken?.slice(0, 6) + '...');

    // 2. Get authenticated GitHub username
    const userRes = await axios.get('https://api.github.com/user', {
      headers: { Authorization: `token ${accessToken}` },
    });

    const username = userRes.data.login;
    const repoName = `portfolio-${Date.now()}`;
    console.log(`👤 GitHub user: ${username}`);

    // 3. Customize the portfolio template
    const localPath = await customizeTemplate(state);
    console.log(`📁 Portfolio template customized at: ${localPath}`);

    // 4. Create repo on GitHub and push
    const repoUrl = await createRepo(accessToken, repoName, username, localPath);
    console.log(`📦 Repo pushed to GitHub: ${repoUrl}`);

    // 5. Deploy to Vercel
    exec(
      `vercel deploy --prod --yes --token=${process.env.VERCEL_TOKEN} --cwd ${localPath}`,
      (error, stdout, stderr) => {
        if (error) {
          console.error('❌ Vercel deployment failed:', stderr);
          return res.status(500).json({ error: 'Vercel deployment failed' });
        }

        const match = stdout.match(/https:\/\/[^\s]+\.vercel\.app/);
        const deployedUrl = match ? match[0] : null;

        if (!deployedUrl) {
          console.error("❌ Couldn't extract Vercel URL from deployment output");
          return res.status(500).json({ error: 'Failed to extract Vercel URL' });
        }

        console.log(`🚀 Deployed to Vercel: ${deployedUrl}`);

        // ✅ Redirect to frontend to show QR & success page
        const redirectUrl = `${process.env.FRONTEND_URL}/portfolio?githubUrl=${encodeURIComponent(
          repoUrl
        )}&vercelUrl=${encodeURIComponent(deployedUrl)}`;

        console.log(`🌐 Redirecting to frontend: ${redirectUrl}`);
        return res.redirect(redirectUrl);
      }
    );
  } catch (err) {
    console.error('❌ Error in GitHub callback:', err.message || err);
    return res.status(500).json({ error: 'OAuth or portfolio generation failed' });
  }
});

export default router;
