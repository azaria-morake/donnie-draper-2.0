// src/App.tsx
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import { GlobalStyles } from './styles/GlobalStyles';
import { Navigation } from './components/functional/Navigation'; // Import Nav
import { useState, useEffect } from 'react';

// Pages
import { Boardroom } from './pages/Boardroom';
import { Campaigns } from './pages/Campaigns';
import { TheMan } from './pages/TheMan';
import { Rolodex } from './pages/Rolodex';
import { SeEssentials } from './pages/SeEssentials';

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, []);

  const isSeEssentials = currentPath === '/se-essentials' || currentPath === '/se-essentials/';

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      
      {isSeEssentials ? (
        <SeEssentials />
      ) : (
        <>
          {/* The Floating Elevator Panel */}
          <Navigation />

          <main>
            {/* We wrap components in divs with IDs for the anchors to work */}
            <div id="boardroom">
              <Boardroom />
            </div>
            
            <div id="campaigns">
              <Campaigns />
            </div>
            
            <div id="theman">
              <TheMan />
            </div>
            
            <div id="rolodex">
              <Rolodex />
            </div>
          </main>
        </>
      )}
    </ThemeProvider>
  );
}

export default App;