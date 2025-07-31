// const express = require('express');
// const fs = require('fs-extra');
// const path = require('path');
// const simpleGit = require('simple-git');
// const { exec } = require('child_process');
// const router = express.Router();

// router.post('/generate', async (req, res) => {
//   const { token, username, data } = req.body;

//   if (!token || !username || !data) {
//     return res.status(400).json({ error: 'Missing token or data' });
//   }

//   const tempDir = path.join(__dirname, '..', 'temp', username);
//   const templateDir = path.join(__dirname, '..', 'templates', 'portfolio-template');

//   try {
//     // 1. Copy template
//     await fs.copy(templateDir, tempDir);

//     // 2. Inject data into template
//     await fs.writeJSON(`${tempDir}/src/data.json`, data);

//     // 3. Git init and push
//     const git = simpleGit(tempDir);
//     const repoName = `portfolio-${Date.now()}`;
//     const remote = `https://oauth2:${token}@github.com/${username}/${repoName}.git`;

//     await git.init();
//     await git.addRemote('origin', remote);
//     await git.add('.');
//     await git.commit('Initial commit');
//     await git.push('origin', 'master');

//     // 4. Vercel deploy
//     exec(
//       `vercel deploy --prod --yes --token=${process.env.VERCEL_TOKEN} --cwd ${tempDir}`,
//       (err, stdout, stderr) => {
//         if (err) {
//           console.error('Vercel error:', stderr);
//           return res.status(500).json({ error: 'Vercel deployment failed' });
//         }
//         const url = stdout.match(/https:\/\/.+\.vercel\.app/);
//         res.json({ success: true, githubRepo: repoName, deployedUrl: url?.[0] });
//       }
//     );
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Portfolio generation failed' });
//   }
// });

// module.exports = router;
const express = require('express');
const fs = require('fs-extra');
const path = require('path');
const simpleGit = require('simple-git');
const { exec } = require('child_process');
const router = express.Router();

router.post('/generate', async (req, res) => {
  const { token, username, data } = req.body;

  if (!token || !username || !data) {
    return res.status(400).json({ error: 'Missing token or data' });
  }

  const tempDir = path.join(__dirname, '..', 'temp', username);
  const templateDir = path.join(__dirname, '..', 'templates', 'portfolio-template');

  try {
    // 1. Copy template
    await fs.copy(templateDir, tempDir);

    // 2. Inject data into template
    await fs.writeJSON(`${tempDir}/src/data.json`, data);

    // 3. Git init, config, and push
    const git = simpleGit(tempDir);
    const repoName = `portfolio-${Date.now()}`;
    const remote = `https://oauth2:${token}@github.com/${username}/${repoName}.git`;

    await git.init();
    await git.addConfig('user.name', 'Career Forage Bot'); // ✅ Git identity fix
    await git.addConfig('user.email', 'noreply@careerforage.app'); // ✅ Git identity fix
    await git.addRemote('origin', remote);
    await git.add('.');
    await git.commit('Initial commit');
    await git.push('origin', 'master');

    // 4. Vercel deploy
    exec(
      `vercel deploy --prod --yes --token=${process.env.VERCEL_TOKEN} --cwd ${tempDir}`,
      (err, stdout, stderr) => {
        if (err) {
          console.error('❌ Vercel deployment error:', stderr);
          return res.status(500).json({ error: 'Vercel deployment failed' });
        }

        const url = stdout.match(/https:\/\/[^\s]+\.vercel\.app/);
        if (!url) {
          console.error('❌ Could not extract deployed Vercel URL');
          return res.status(500).json({ error: 'Failed to extract Vercel URL' });
        }

        console.log(`🚀 Deployed to: ${url[0]}`);
        return res.json({
          success: true,
          githubRepo: `https://github.com/${username}/${repoName}`,
          deployedUrl: url[0],
        });
      }
    );
  } catch (err) {
    console.error('❌ Portfolio generation failed:', err.message || err);
    return res.status(500).json({ error: 'Portfolio generation failed', details: err.message });
  }
});

module.exports = router;
