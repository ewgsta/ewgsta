import React from 'react';

import './Admin.css';

function Login({ onLogin }) {
  const handleLogin = () => {
    // Open GitHub auth popup using the existing api/auth endpoint
    const width = 600, height = 600;
    const left = (window.innerWidth / 2) - (width / 2);
    const top = (window.innerHeight / 2) - (height / 2);

    const authWindow = window.open(
      '/api/auth',
      'GitHubAuth',
      `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=${width}, height=${height}, top=${top}, left=${left}`
    );

    // Listen for the postMessage from the popup
    const messageListener = (event) => {
      if (typeof event.data !== 'string') return;

      // 1. Handshake step: the popup says it's authorizing
      if (event.data === 'authorizing:github') {
        authWindow.postMessage(event.data, event.origin);
      }

      // 2. Success step: the popup sends the token
      if (event.data.startsWith('authorization:github:success:')) {
        try {
          const jsonStr = event.data.replace('authorization:github:success:', '');
          const data = JSON.parse(jsonStr);
          if (data.token) {
            onLogin(data.token);
            window.removeEventListener('message', messageListener);
            if (authWindow) authWindow.close();
          }
        } catch (err) {
          console.error("Failed to parse auth token", err);
        }
      }
    };

    window.addEventListener('message', messageListener);
  };

  return (
    <div className="admin-wrapper admin-login-container">
      <div className="admin-login-box">
        <div className="admin-login-logo" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '24px' }}>
          <img src="https://github.com/ewgsta.png" alt="E-CMS Logo" style={{ width: 40, height: 40, borderRadius: '8px' }} />
          <span style={{ fontSize: '24px', fontWeight: 600 }}>E-CMS</span>
        </div>
        
        <button onClick={handleLogin} className="admin-btn admin-btn-primary">
          <i className="fa-brands fa-github"></i>
          <span>Continue with GitHub</span>
        </button>
      </div>
    </div>
  );
}

export default Login;
