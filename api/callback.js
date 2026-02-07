
export default async function handler(req, res) {
  const { code } = req.query;
  const clientId = 'Ov23liUXss5HXRkqGzb4';
  const clientSecret = process.env.OAUTH_CLIENT_SECRET;

  if (!code) {
    return res.status(400).send('Missing code parameter');
  }

  if (!clientSecret) {
    return res.status(500).send('Missing OAUTH_CLIENT_SECRET environment variable on server.');
  }

  try {
    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code,
      }),
    });

    const data = await tokenResponse.json();

    if (data.error) {
      throw new Error(data.error_description || data.error);
    }

    const { access_token } = data;

    if (!access_token) {
      throw new Error('No access token received from GitHub');
    }

    // Properly escape for JS string
    const escapedToken = access_token.replace(/\\/g, '\\\\').replace(/'/g, "\\'");

    // Use the proper Netlify/Decap CMS OAuth handshake
    const content = `<!DOCTYPE html>
<html>
<head>
  <title>Authorizing...</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; text-align: center; padding: 50px; background: #1a1a2e; color: #eee; }
  </style>
</head>
<body>
  <p>Completing authentication...</p>
  
  <script>
    (function() {
      var token = '${escapedToken}';
      var provider = 'github';
      
      function receiveMessage(e) {
        // Send the token when we receive a message from the opener
        window.opener.postMessage(
          'authorization:' + provider + ':success:' + JSON.stringify({ token: token, provider: provider }),
          e.origin
        );
      }
      
      window.addEventListener('message', receiveMessage, false);
      
      // Start the handshake
      window.opener.postMessage('authorizing:' + provider, '*');
    })();
  </script>
</body>
</html>`;

    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(content);

  } catch (err) {
    console.error('OAuth Callback Error:', err);
    const errorContent = `<!DOCTYPE html>
<html>
<head><title>Authentication Error</title></head>
<body style="font-family: sans-serif; text-align: center; padding: 50px; background: #1a1a2e; color: #eee;">
  <h1 style="color: #ff6b6b;">Authentication Failed</h1>
  <p>${err.message}</p>
  <p><button onclick="window.close()" style="padding: 10px 20px; cursor: pointer;">Close</button></p>
</body>
</html>`;
    res.setHeader('Content-Type', 'text/html');
    res.status(500).send(errorContent);
  }
}
