const { ClerkExpressRequireAuth } = require('@clerk/clerk-sdk-node');

module.exports = ClerkExpressRequireAuth({
  onError: (err, req, res, next) => {
    console.error('❌ Clerk Auth Error:', err?.message || err);
    res.status(401).json({ error: 'Unauthorized' });
  }
});
