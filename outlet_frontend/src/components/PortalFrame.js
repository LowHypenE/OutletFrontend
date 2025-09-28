import React, { useState, useEffect } from 'react';

const PortalFrame = ({ url, onBack }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const backendUrl = 'https://outletbackend.onrender.com';
  const proxyUrl = `${backendUrl}/proxy?url=${encodeURIComponent(url)}`;

  useEffect(() => {
    const handleIframeLoad = () => {
      setIsLoading(false);
      setError('');
    };

    const handleIframeError = () => {
      setIsLoading(false);
      setError('Failed to load the website. The site may not allow embedding.');
    };

    const iframe = document.getElementById('portal-iframe');
    if (iframe) {
      iframe.addEventListener('load', handleIframeLoad);
      iframe.addEventListener('error', handleIframeError);

      return () => {
        iframe.removeEventListener('load', handleIframeLoad);
        iframe.removeEventListener('error', handleIframeError);
      };
    }
  }, []);

  const handleRefresh = () => {
    setIsLoading(true);
    setError('');
    const iframe = document.getElementById('portal-iframe');
    if (iframe) {
      iframe.src = proxyUrl;
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onBack();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="portal-frame">
      <div className="portal-header">
        <button className="back-button" onClick={onBack}>
          ← Back
        </button>
        <div className="portal-url">{url}</div>
        <button className="refresh-button" onClick={handleRefresh}>
          ⟳ Refresh
        </button>
      </div>
      
      {isLoading && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 1000,
          background: 'rgba(255, 255, 255, 0.9)',
          padding: '2rem',
          borderRadius: '8px',
          textAlign: 'center'
        }}>
          <div className="loading-spinner" style={{ margin: '0 auto 1rem' }}></div>
          <div>Loading website...</div>
        </div>
      )}

      {error && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 1000,
          background: '#ff4757',
          color: 'white',
          padding: '2rem',
          borderRadius: '8px',
          textAlign: 'center',
          maxWidth: '400px'
        }}>
          <div style={{ marginBottom: '1rem', fontSize: '1.2rem' }}>⚠️</div>
          <div>{error}</div>
          <button
            onClick={onBack}
            style={{
              marginTop: '1rem',
              padding: '0.5rem 1rem',
              background: 'white',
              color: '#ff4757',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Go Back
          </button>
        </div>
      )}

      <iframe
        id="portal-iframe"
        className="portal-iframe"
        src={proxyUrl}
        sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox"
        title="Portal Frame"
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false);
          setError('Failed to load the website. The site may not allow embedding.');
        }}
      />
    </div>
  );
};

export default PortalFrame;
