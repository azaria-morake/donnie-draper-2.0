// src/App.tsx
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import { GlobalStyles } from './styles/GlobalStyles';
import { Navigation } from './components/functional/Navigation'; // Import Nav

// Pages
import { Boardroom } from './pages/Boardroom';
import { Campaigns } from './pages/Campaigns';
import { TheMan } from './pages/TheMan';
import { Rolodex } from './pages/Rolodex';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      
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
    </ThemeProvider>
  );
}

export default App;