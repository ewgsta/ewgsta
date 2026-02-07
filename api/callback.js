
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

        // Escape the token for safe embedding in JS string
        const escapedToken = access_token.replace(/'/g, "\\'").replace(/"/g, '\\"');

        const content = `<!DOCTYPE html>
<html>
<head>
  <title>Success!</title>
  <style>
    body { font-family: sans-serif; text-align: center; padding: 50px; }
  </style>
</head>
<body>
  <p>Success! Closing...</p>
  <script>
    (function() {
      var provider = 'github';
      var token = '${escapedToken}';
      
      function sendMessage() {
        // Decap CMS expects this exact format
        var data = JSON.stringify({ token: token, provider: provider });
        var message = 'authorization:' + provider + ':success:' + data;
        
        console.log('Sending message:', message);
        
        if (window.opener) {
          // Send to any origin since we don't know the exact origin
          window.opener.postMessage(message, '*');
          console.log('Message sent to opener');
        } else {
          console.log('No window.opener found');
        }
      }
      
      // Send immediately
      sendMessage();
      
      // Also send after a short delay in case opener isn't ready
      setTimeout(sendMessage, 100);
      setTimeout(sendMessage, 500);
      setTimeout(sendMessage, 1000);
      
      // Close after giving time for messages
      setTimeout(function() {
        window.close();
      }, 2000);
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
<body style="font-family: sans-serif; text-align: center; padding: 50px;">
  <h1>Authentication Failed</h1>
  <p style="color: red;">${err.message}</p>
  <p><button onclick="window.close()">Close</button></p>
</body>
</html>`;
        res.setHeader('Content-Type', 'text/html');
        res.status(500).send(errorContent);
    }
}
