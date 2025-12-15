import type { DefaultTheme } from 'styled-components';

export const theme: DefaultTheme = {
  colors: {
    background: '#121212', // Very dark grey, almost black
    text: '#E0E0E0',       // Off-white, easier on the eyes than pure white
    primary: '#D4AF37',    // Metallic Gold / Whiskey
    secondary: '#A0A0A0',  // Silver / Smoke grey
    muted: '#333333',      // Dark grey for subtle dividers
  },
  fonts: {
    heading: "'Playfair Display', serif",
    body: "'Inter', sans-serif",
    mono: "'Fira Code', monospace",
  },
  breakpoints: {
    mobile: '576px',
    tablet: '768px',
    desktop: '1024px',
  },
};
