import React, { useState } from 'react';

const MainPortal = ({ onNavigateToUrl }) => {
  const [url, setUrl] = useState('https://www.google.com');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const quickLinks = [
    { name: 'Google', url: 'https://www.google.com' },
    { name: 'GitHub', url: 'https://www.github.com' },
    { name: 'Stack Overflow', url: 'https://www.stackoverflow.com' },
    { name: 'Reddit', url: 'https://www.reddit.com' },
    { name: 'YouTube', url: 'https://www.youtube.com' },
    { name: 'Wikipedia', url: 'https://www.wikipedia.org' }
  ];

  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleNavigate();
  };

  const handleNavigate = () => {
    const trimmedUrl = url.trim();
    
    if (!trimmedUrl) {
      setError('Please enter a URL');
      return;
    }

    if (!isValidUrl(trimmedUrl)) {
      setError('Please enter a valid URL (include http:// or https://)');
      return;
    }

    setError('');
    setIsLoading(true);
    
    // Simulate a brief loading state
    setTimeout(() => {
      setIsLoading(false);
      onNavigateToUrl(trimmedUrl);
    }, 500);
  };

  const handleQuickLink = (quickUrl) => {
    setUrl(quickUrl);
    setError('');
  };

  const showError = (message) => {
    setError(message);
    setTimeout(() => setError(''), 3000);
  };

  return (
    <div className="main-portal">
      <div className="container">
        <header className="header">
          <h1 className="logo">OutletV1</h1>
          <p className="subtitle">Web Portal Gateway</p>
        </header>

        <main className="main">
          <div className="portal-section">
            <form onSubmit={handleSubmit} className="url-input-container">
              <label htmlFor="url-input" className="input-label">
                Enter Website URL
              </label>
              <div className="input-group">
                <input
                  type="url"
                  id="url-input"
                  className="url-input"
                  placeholder="https://example.com"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  onFocus={(e) => e.target.select()}
                />
                <button
                  type="submit"
                  className={`go-button ${isLoading ? 'loading' : ''}`}
                  disabled={isLoading}
                >
                  <span className="button-text">
                    {isLoading ? 'Loading...' : 'Go to Portal'}
                  </span>
                  <div className="button-icon">→</div>
                </button>
              </div>
            </form>

            <div className="quick-links">
              <p className="quick-links-title">Quick Access</p>
              <div className="links-grid">
                {quickLinks.map((link, index) => (
                  <button
                    key={index}
                    className="quick-link"
                    onClick={() => handleQuickLink(link.url)}
                  >
                    {link.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </main>

        <footer className="footer">
          <p>&copy; 2024 OutletV1. Secure web portal access.</p>
        </footer>
      </div>

      {error && (
        <div className="error-notification">
          {error}
        </div>
      )}
    </div>
  );
};

export default MainPortal;
