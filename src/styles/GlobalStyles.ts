// src/styles/GlobalStyles.ts
import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  /* Import Fonts */
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600&family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Fira+Code&display=swap');

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    scroll-behavior: smooth; /* CRITICAL FOR NAVIGATION */
  }

  body {
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    font-family: ${({ theme }) => theme.fonts.body};
    -webkit-font-smoothing: antialiased;
    line-height: 1.6;
    overflow-x: hidden;

    /* --- THE BLUEPRINT GRID EFFECT --- */
    background-image: 
      linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
    background-size: 50px 50px; /* Size of the grid squares */
    background-position: center top;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${({ theme }) => theme.fonts.heading};
    font-weight: 700;
    line-height: 1.2;
  }

  a {
    text-decoration: none;
    color: inherit;
  }
`;