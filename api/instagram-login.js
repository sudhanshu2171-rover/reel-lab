export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'GET required' });

  const clientId = process.env.INSTAGRAM_APP_ID;
  const redirectUri = process.env.INSTAGRAM_REDIRECT_URI;

  if (!clientId || !redirectUri) {
    return res.status(503).json({
      error: 'Instagram OAuth is not configured yet.',
      setup: ['INSTAGRAM_APP_ID', 'INSTAGRAM_REDIRECT_URI']
    });
  }

  const state = crypto.randomUUID();
  const authUrl = new URL('https://www.instagram.com/oauth/authorize');
  authUrl.searchParams.set('client_id', clientId);
  authUrl.searchParams.set('redirect_uri', redirectUri);
  authUrl.searchParams.set('response_type', 'code');
  authUrl.searchParams.set('scope', 'instagram_business_basic,instagram_business_manage_insights');
  authUrl.searchParams.set('state', state);

  res.setHeader('Set-Cookie', `reel_lab_oauth_state=${state}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=600`);
  return res.redirect(302, authUrl.toString());
}
