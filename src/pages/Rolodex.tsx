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
  
  /* The "Draper" Vibe Image */
  background-image: url('/dd-3.png');
  background-size: cover;
  background-position: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    background-size: 50rem;
    background-position: -19rem -5rem;
    
  }
`;

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
  max-width: 800px;
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
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const LinkContainer = styled.div`
  display: flex;
  gap: 2rem;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-direction: column;
    gap: 1.5rem;
    width: 100%;
  }
`;

/* THE "EXECUTIVE KEY" BUTTON */
const ContactButton = styled.a`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 3rem;
  min-width: 200px;
  
  /* Glassmorphism Base */
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(4px);
  border: 1px solid ${({ theme }) => theme.colors.primary}; /* Gold Border */
  
  /* Typography */
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  
  /* Animation */
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  cursor: pointer;
  overflow: hidden;

  /* The Hover State: "Lights On" */
  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.background}; /* Text turns dark for contrast */
    box-shadow: 0 0 25px rgba(194, 139, 71, 0.4); /* Golden Glow */
    transform: translateY(-2px);
    border-color: ${({ theme }) => theme.colors.primary};
  }

  /* Active/Click State */
  &:active {
    transform: translateY(0);
    opacity: 0.9;
  }

  /* Mobile Tweaks */
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 100%;
    padding: 1.2rem;
  }
`;

const Footer = styled.footer`
  position: absolute;
  bottom: 2rem;
  width: 100%;
  text-align: center;
  z-index: 2;
  opacity: 0.6;
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
          <ContactButton href="mailto:azaraiamorake@gmail.com">
            Mail
          </ContactButton>
          
          <ContactButton href="https://linkedin.com/in/azaria-morake-04216b242/" target="_blank">
            LinkedIn
          </ContactButton>
          
          <ContactButton href="https://github.com/azaria-morake" target="_blank">
            GitHub
          </ContactButton>
        </LinkContainer>
      </ContentContainer>

      <Footer>
        <Copyright>JHB / REMOTE — © {new Date().getFullYear()} DD.</Copyright>
      </Footer>
    </Section>
  );
};