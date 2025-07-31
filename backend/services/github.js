// services/github.js
import axios from 'axios';
import simpleGit from 'simple-git';

export const exchangeCodeForToken = async (code) => {
  const res = await axios.post(
    'https://github.com/login/oauth/access_token',
    {
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      code,
    },
    {
      headers: { Accept: 'application/json' },
    }
  );
  return res.data.access_token;
};

export const createRepo = async (token, repoName, username, localPath) => {
  // Step 1: Create repo via GitHub API
  await axios.post(
    'https://api.github.com/user/repos',
    { name: repoName, private: false },
    { headers: { Authorization: `token ${token}` } }
  );

  // Step 2: Setup and push via simple-git
  const git = simpleGit(localPath);
  await git.init();
  await git.addRemote('origin', `https://oauth2:${token}@github.com/${username}/${repoName}.git`);
  await git.add('.');
  await git.commit('Initial commit');

  // 🔥 Fix: explicitly create 'main' branch before pushing
  await git.checkoutLocalBranch('main');
  await git.push('origin', 'main');

  // Return repo URL
  return `https://github.com/${username}/${repoName}`;
};
