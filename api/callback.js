
export default async function handler(req, res) {
    const { code } = req.query;
    const clientId = process.env.OAUTH_CLIENT_ID || 'Ov23liUXss5HXRkqGzb4';
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

        // Send token back to opener immediately
        const content = `<!DOCTYPE html>
<html>
<head>
  <title>Authenticating...</title>
</head>
<body>
  <p>Authenticating with GitHub...</p>
  <script>
    (function() {
      var token = "${access_token}";
      var provider = "github";
      
      // Message format for Decap CMS
      var message = "authorization:" + provider + ":success:" + JSON.stringify({
        token: token,
        provider: provider
      });
      
      // Send to opener
      if (window.opener) {
        window.opener.postMessage(message, "*");
        setTimeout(function() { window.close(); }, 1000);
      } else {
        document.body.innerHTML = "<p>Authentication successful! You can close this window.</p>";
      }
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
<body>
  <h1>Authentication Failed</h1>
  <p>${err.message}</p>
  <p><a href="javascript:window.close()">Close this window</a></p>
</body>
</html>`;
        res.setHeader('Content-Type', 'text/html');
        res.status(500).send(errorContent);
    }
}
