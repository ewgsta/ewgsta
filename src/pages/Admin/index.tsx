import React, { useState, Component } from 'react';
import Login from './Login';
import Dashboard from './Dashboard';

interface ErrorBoundaryState {
    hasError: boolean;
    error: Error | null;
}

class ErrorBoundary extends Component<{ children: React.ReactNode }, ErrorBoundaryState> {
    constructor(props: { children: React.ReactNode }) {
        super(props);
        this.state = { hasError: false, error: null };
    }
    static getDerivedStateFromError(error: Error) {
        return { hasError: true, error };
    }
    render() {
        if (this.state.hasError) {
            return (
                <div style={{ padding: '50px', background: '#222', color: '#ff6b6b', height: '100vh', zIndex: 9999, position: 'relative' }}>
                    <h2>Admin Panel Error</h2>
                    <pre>{this.state.error?.toString()}</pre>
                </div>
            );
        }
        return this.props.children;
    }
}

function Admin() {
    const [token, setToken] = useState<string | null>(() => localStorage.getItem('github_cms_token'));

    const handleLogin = (newToken: string) => {
        localStorage.setItem('github_cms_token', newToken);
        setToken(newToken);
    };

    const handleLogout = () => {
        localStorage.removeItem('github_cms_token');
        setToken(null);
    };

    return (
        <ErrorBoundary>
            {token ? (
                <Dashboard token={token} onLogout={handleLogout} />
            ) : (
                <Login onLogin={handleLogin} />
            )}
        </ErrorBoundary>
    );
}

export default Admin;
