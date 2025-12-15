// src/App.tsx
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import { GlobalStyles } from './styles/GlobalStyles';
import { Boardroom } from './pages/Boardroom';
import { Campaigns } from './pages/Campaigns';
import { TheMan } from './pages/TheMan';
import { Rolodex } from './pages/Rolodex';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <main>
        <Boardroom />
        <Campaigns />
        <TheMan />
        <Rolodex />
      </main>
    </ThemeProvider>
  );
}

export default App;
