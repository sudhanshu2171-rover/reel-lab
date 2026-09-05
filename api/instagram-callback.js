export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).send('GET required');

  const { code, state, error, error_reason } = req.query || {};
  const expected = getCookie(req.headers.cookie || '', 'reel_lab_oauth_state');
  if (error) return res.redirect(302, `/?instagram_error=${encodeURIComponent(error_reason || error)}`);
  if (!code || !state || !expected || state !== expected) return res.status(400).send('Invalid OAuth state or missing authorization code.');

  const clientId = process.env.INSTAGRAM_APP_ID;
  const clientSecret = process.env.INSTAGRAM_APP_SECRET;
  const redirectUri = process.env.INSTAGRAM_REDIRECT_URI;
  if (!clientId || !clientSecret || !redirectUri) return res.status(503).send('Instagram OAuth server configuration is incomplete.');

  const body = new URLSearchParams({
    client_id: clientId,
    client_secret: clientSecret,
    grant_type: 'authorization_code',
    redirect_uri: redirectUri,
    code
  });

  const tokenResponse = await fetch('https://api.instagram.com/oauth/access_token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body
  });
  const token = await tokenResponse.json();
  if (!tokenResponse.ok || !token.access_token) return res.status(502).json({ error: 'Instagram token exchange failed.' });

  // Never expose the access token to the browser. Persist it in a real encrypted
  // server-side store in the next production step, keyed to the authenticated Reel Lab user.
  // For now, redirect with a non-sensitive success marker only.
  return res.redirect(302, '/?instagram=connected');
}

function getCookie(header, name) {
  const match = header.split(';').map(v => v.trim()).find(v => v.startsWith(`${name}=`));
  return match ? decodeURIComponent(match.slice(name.length + 1)) : null;
}
