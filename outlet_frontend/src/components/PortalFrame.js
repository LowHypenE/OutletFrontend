import React, { useState, useEffect } from 'react';

const PortalFrame = ({ url, onBack }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  // Updated backend URL to use Vercel serverless API
  const backendUrl = 'https://outlet-backend.vercel.app/api';
  const learnUrl = `${backendUrl}/learn?url=${encodeURIComponent(url)}`;

  // Handle iframe load and error events
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

  // Refresh iframe content
  const handleRefresh = () => {
    setIsLoading(true);
    setError('');
    const iframe = document.getElementById('portal-iframe');
    if (iframe) {
      iframe.src = learnUrl;
    }
  };

  // Escape key to go back
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') onBack();
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="portal-frame" style={{ position: 'relative', height: '100%', width: '100%' }}>
      {/* Header */}
      <div className="portal-header" style={{ display: 'flex', alignItems: 'center', padding: '0.5rem', background: '#222', color: '#fff' }}>
        <button onClick={onBack} style={{ marginRight: '1rem' }}>← Back</button>
        <div style={{ flex: 1 }}>{url}</div>
        <button onClick={handleRefresh}>⟳ Refresh</button>
      </div>

      {/* Loading Overlay */}
      {isLoading && (
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(255,255,255,0.9)', display: 'flex',
          flexDirection: 'column', justifyContent: 'center', alignItems: 'center', zIndex: 1000
        }}>
          <div className="loading-spinner" style={{ marginBottom: '1rem' }}></div>
          <div>Loading website...</div>
        </div>
      )}

      {/* Error Overlay */}
      {error && (
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          background: '#ff4757', color: '#fff', display: 'flex',
          flexDirection: 'column', justifyContent: 'center', alignItems: 'center', zIndex: 1000, padding: '2rem'
        }}>
          <div style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>⚠️</div>
          <div>{error}</div>
          <button
            onClick={onBack}
            style={{
              marginTop: '1rem', padding: '0.5rem 1rem',
              background: '#fff', color: '#ff4757', border: 'none',
              borderRadius: '4px', cursor: 'pointer'
            }}
          >
            Go Back
          </button>
        </div>
      )}

      {/* Iframe */}
      <iframe
        id="portal-iframe"
        src={learnUrl}
        title="Portal Frame"
        sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox"
        style={{ width: '100%', height: '100%', border: 'none' }}
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
