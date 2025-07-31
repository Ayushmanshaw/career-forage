// GitHubLoginButton.jsx
import React from 'react';

const GitHubLoginButton = () => {
  const clientId = 'YOUR_GITHUB_CLIENT_ID';
  const redirectUri = 'http://localhost:5000/auth/github/callback';

  const handleLogin = () => {
    const githubAuthURL = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=repo`;
    window.location.href = githubAuthURL;
  };

  return (
    <button onClick={handleLogin} className="btn btn-primary">
      Login with GitHub
    </button>
  );
};

export default GitHubLoginButton;
