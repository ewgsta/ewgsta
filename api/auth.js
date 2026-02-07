
export default async function handler(req, res) {
    const { host } = req.headers;
    const protocol = req.headers['x-forwarded-proto'] || 'http';
    const clientId = process.env.OAUTH_CLIENT_ID || 'Ov23liUXss5HXRkqGzb4';
    const siteUrl = process.env.URL || `${protocol}://${host}`;
    const redirectUri = `${siteUrl}/api/callback`;

    // Scopes required for Decap CMS: repo (for private repos/writing), user (optional)
    const scope = 'repo,user';

    const authUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=${scope}&redirect_uri=${encodeURIComponent(redirectUri)}`;

    res.redirect(authUrl);
}
