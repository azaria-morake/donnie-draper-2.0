// src/pages/Rolodex.tsx
import styled from 'styled-components';

// --- STYLES ---
const Section = styled.section`
  min-height: 90vh; /* Almost full screen */
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  /* The "Draper" Vibe Image: Silhouette, city lights, phone */
  background-image: url('/dd-3.png');
  background-size: cover;
  background-position: center;
`;

// The moody overlay that makes text readable and adds atmosphere
const VignetteOverlay = styled.div`
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  /* Heavy dark gradient + a radial vignette to focus the center */
  background: linear-gradient(to bottom, rgba(18,18,18,0.7) 0%, rgba(18,18,18,1) 90%),
              radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.8) 100%);
  z-index: 1;
`;

const ContentContainer = styled.div`
  position: relative;
  z-index: 2;
  text-align: center;
  max-width: 700px;
  padding: 0 2rem;
`;

const Headline = styled.h2`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: clamp(3rem, 6vw, 5rem);
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.1;
  margin-bottom: 2rem;
  text-shadow: 0 4px 10px rgba(0,0,0,0.5);
`;

const SubText = styled.p`
  font-family: ${({ theme }) => theme.fonts.body};
  color: ${({ theme }) => theme.colors.secondary};
  font-size: 1.2rem;
  margin-bottom: 4rem;
  opacity: 0.8;
`;

const LinkContainer = styled.div`
  display: flex;
  gap: 3rem;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-direction: column;
    gap: 1rem;
  }
`;

// Minimalist, glowing links instead of buttons
const ContactLink = styled.a`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 1rem;
 // text-transform: uppercase;
  letter-spacing: 0.2em;
  color: ${({ theme }) => theme.colors.primary}; /* Gold text */
  text-decoration: none;
  position: relative;
  transition: all 0.3s ease;
  padding-bottom: 5px;

  /* The glowing underline effect */
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0%; /* Starts hidden */
    height: 1px;
    background: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 10px ${({ theme }) => theme.colors.primary}, 0 0 20px ${({ theme }) => theme.colors.primary}; /* Neon glow */
    transition: width 0.3s ease;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.text}; /* Turns white on hover */
    text-shadow: 0 0 10px rgba(255,255,255,0.5);
    
    &::after {
      width: 100%; /* Expands full width */
    }
  }
`;

const Footer = styled.footer`
  position: absolute;
  bottom: 2rem;
  width: 100%;
  text-align: center;
  z-index: 2;
`;

const Copyright = styled.span`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.65rem;
  color: ${({ theme }) => theme.colors.muted};
  text-transform: uppercase;
  letter-spacing: 0.1em;
`;

// --- COMPONENT ---
export const Rolodex = () => {
  return (
    <Section>
      <VignetteOverlay />
      
      <ContentContainer>
        <Headline>
          The idea is ready. <br />
          Are you?
        </Headline>
        <SubText>
          Don't let it go to waste. Make the call.
        </SubText>

        <LinkContainer>
          <ContactLink href="mailto:azaraiamorake@gmail.com">Mail</ContactLink>
          <ContactLink href="https://linkedin.com" target="_blank">LinkedIn</ContactLink>
          <ContactLink href="https://github.com" target="_blank">GitHub</ContactLink>
        </LinkContainer>
      </ContentContainer>

      <Footer>
        <Copyright>JHB / REMOTE — © {new Date().getFullYear()} DD.</Copyright>
      </Footer>
    </Section>
  );
};