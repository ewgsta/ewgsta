
export default async function handler(req, res) {
    const { code } = req.query;
    const clientId = process.env.OAUTH_CLIENT_ID || 'Ov23liUXss5HXRkqGzb4';
    const clientSecret = process.env.OAUTH_CLIENT_SECRET;

    if (!code) {
        return res.status(400).send('Missing code');
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

        if (!tokenResponse.ok) {
            throw new Error(`Failed to fetch access token: ${tokenResponse.status}`);
        }

        const { access_token, error } = await tokenResponse.json();

        if (error) {
            throw new Error(error);
        }

        // Decap CMS expects: window.opener.postMessage("authorization:github:success:{\"token\":\"...\", \"provider\":\"github\"}", "...")
        const content = `<!DOCTYPE html>
    <html><body>
    <script>
      (function() {
        function receiveMessage(e) {
          console.log("receiveMessage", e);
          // send message to main window with the app
          window.opener.postMessage(
            'authorization:github:success:{"token":"${access_token}","provider":"github"}',
            e.origin
          );
        }
        window.addEventListener("message", receiveMessage, false);
        // Start handshake with parent
        window.opener.postMessage("authorizing:github", "*");
      })()
    </script>
    </body></html>`;

        res.setHeader('Content-Type', 'text/html');
        res.status(200).send(content);

    } catch (err) {
        console.error('OAuth Callback Error:', err);
        res.status(500).send(`OAuth Error: ${err.message}`);
    }
}
