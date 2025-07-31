// clerkAuth.js (ESM-compatible)
import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node';

const requireClerkAuth = ClerkExpressRequireAuth({
  onError: (err, req, res, next) => {
    console.error('❌ Clerk Auth Error:', err?.message || err);
    res.status(401).json({ error: 'Unauthorized' });
  }
});

export default requireClerkAuth;
