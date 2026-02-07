
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

        // Escape the token for safe embedding
        const escapedToken = access_token.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/"/g, '\\"');

        // Don't auto-close - let Decap CMS handle it
        const content = `<!DOCTYPE html>
<html>
<head>
  <title>Authorizing...</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; text-align: center; padding: 50px; background: #1a1a2e; color: #eee; }
    .spinner { border: 3px solid #333; border-top: 3px solid #00d4ff; border-radius: 50%; width: 30px; height: 30px; animation: spin 1s linear infinite; margin: 20px auto; }
    @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
  </style>
</head>
<body>
  <div class="spinner"></div>
  <p>Authorizing...</p>
  <p id="status" style="font-size: 12px; color: #888;"></p>
  
  <script>
    (function() {
      var token = '${escapedToken}';
      var provider = 'github';
      var statusEl = document.getElementById('status');
      
      function sendMessage() {
        var data = JSON.stringify({ token: token, provider: provider });
        var message = 'authorization:' + provider + ':success:' + data;
        
        if (window.opener) {
          window.opener.postMessage(message, '*');
          statusEl.textContent = 'Message sent, waiting for CMS...';
          return true;
        } else {
          statusEl.textContent = 'Error: No opener window found';
          return false;
        }
      }
      
      // Send message immediately and periodically
      sendMessage();
      var interval = setInterval(function() {
        sendMessage();
      }, 500);
      
      // Stop after 10 seconds and show manual close option
      setTimeout(function() {
        clearInterval(interval);
        statusEl.innerHTML = 'If not redirected automatically, <a href="javascript:window.close()" style="color:#00d4ff">click here to close</a>';
      }, 10000);
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
