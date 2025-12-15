import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      background: string; // The office walls (Charcoal)
      text: string;       // The copy (Stark White)
      primary: string;    // The accent (Whiskey)
      secondary: string;  // The subtext (Smoke)
      muted: string;      // Faint borders
    };
    fonts: {
      heading: string;    // Playfair Display
      body: string;       // Inter
      mono: string;       // For code snippets
    };
    breakpoints: {
      mobile: string;
      tablet: string;
      desktop: string;
    };
  }
}
