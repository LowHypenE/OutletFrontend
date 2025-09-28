import React, { useState, useEffect } from 'react';
import './App.css';
import LoadingScreen from './components/LoadingScreen';
import MainPortal from './components/MainPortal';
import PortalFrame from './components/PortalFrame';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [showPortal, setShowPortal] = useState(false);
  const [currentUrl, setCurrentUrl] = useState('');

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const handleNavigateToUrl = (url) => {
    setCurrentUrl(url);
    setShowPortal(true);
  };

  const handleBackToMain = () => {
    setShowPortal(false);
    setCurrentUrl('');
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (showPortal) {
    return (
      <PortalFrame
        url={currentUrl}
        onBack={handleBackToMain}
      />
    );
  }

  return (
    <MainPortal onNavigateToUrl={handleNavigateToUrl} />
  );
}

export default App;
