// src/pages/Boardroom.tsx
import styled, { keyframes } from 'styled-components';

// --- ANIMATIONS ---
const riseUp = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
`;

const smokeFade = keyframes`
  0% { height: 10px; opacity: 0; }
  50% { height: 60px; opacity: 1; }
  100% { height: 10px; opacity: 0; transform: translateY(20px); }
`;

// --- STYLES ---
const Wrapper = styled.section`
  min-height: 100vh;
  width: 100%;
  display: grid;
  grid-template-columns: 1.2fr 1fr; /* Desktop: Text Left | Image Right */
  align-items: center;
  padding: 0 4rem;
  position: relative;
  overflow: hidden;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 6rem 2rem 2rem 2rem;
    gap: 0; /* Gap handled by internal margins */
  }
`;

const ContentSide = styled.div`
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    align-items: center;
    text-align: center;
    width: 100%;
  }
`;

// 1. DESKTOP IMAGE (Hidden on Mobile)
const DesktopIllustration = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  opacity: 0;
  animation: ${riseUp} 1.5s ease-out forwards 0.5s;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: none; /* HIDE ON MOBILE */
  }

  img {
    width: 100%;
    max-width: 600px;
    height: auto;
    object-fit: contain;
    filter: grayscale(100%) contrast(1.2) brightness(0.8);
    mix-blend-mode: lighten;
    mask-image: linear-gradient(to bottom, black 80%, transparent 100%);
  }
`;

// 2. MOBILE IMAGE (Hidden on Desktop)
const MobileIllustration = styled.div`
  display: none; /* HIDE ON DESKTOP */
  width: 100%;
  margin: 0rem 0; /* Spacing between Headline and Subheadline */
  opacity: 0;
  animation: ${riseUp} 1.5s ease-out forwards 0.5s;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: flex;
    justify-content: center;
    height: 35vh; /* Controlled height for mobile */
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    filter: grayscale(100%) contrast(1.2) brightness(0.8);
    mix-blend-mode: lighten;
    
    /* Added -webkit- prefix for mobile Safari/Chrome support */
    -webkit-mask-image: linear-gradient(to bottom, black 50%, transparent 100%);
    mask-image: linear-gradient(to bottom, black 40%, transparent 100%);
  }
`;

const PreHeader = styled.h2`
  font-family: ${({ theme }) => theme.fonts.mono};
  color: ${({ theme }) => theme.colors.primary};
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.4em;
  margin-bottom: 1.5rem;
  opacity: 0;
  animation: ${riseUp} 1s ease-out forwards;
`;

const Headline = styled.h1`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: clamp(2.7rem, 6vw, 5.5rem);
  color: ${({ theme }) => theme.colors.text};
  line-height: 1;
  margin-bottom: 0; /* Margin handled by MobileImage on mobile */
  opacity: 0;
  animation: ${riseUp} 1s ease-out forwards 0.3s;
  
  /* Desktop margin */
  @media (min-width: 769px) {
    margin-bottom: 2rem;
  }
`;

const SubHeadline = styled.p`
  font-family: ${({ theme }) => theme.fonts.body};
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.1rem;
  max-width: 500px;
  line-height: 1.6;
  opacity: 0;
  animation: ${riseUp} 1s ease-out forwards 0.6s;

  strong {
    font-weight: 600;
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const ScrollIndicator = styled.div`
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  opacity: 0;
  animation: ${riseUp} 1s ease-out forwards 2s;
`;

const Label = styled.span`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.6rem;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
`;

const Line = styled.div`
  width: 1px;
  height: 60px;
  background: ${({ theme }) => theme.colors.primary};
  animation: ${smokeFade} 2.5s infinite ease-in-out;
`;

// --- COMPONENT ---
export const Boardroom = () => {
  return (
    <Wrapper>
      {/* 1. Content Block */}
      <ContentSide>
        <PreHeader>
          <span style={{ color: '#64748B' }}>Call</span> Donnie Draper
        </PreHeader>
        
        <Headline>
          The Blueprint <br />
          <span style={{ color: '#64748B' }}>Before The Build.</span>
        </Headline>

        {/* --- MOBILE ONLY IMAGE (Inserted Here) --- */}
        <MobileIllustration>
          <img src="/dd-5.png" alt="Architectural Blueprint" />
        </MobileIllustration>

        <SubHeadline>
          <strong>Good architecture isn’t scalable code. It’s scalable decisions.</strong>
          <br /><br />
          If the blueprint is honest, the build cannot even begin to lie.
        </SubHeadline>
      </ContentSide>

      {/* 2. DESKTOP ONLY IMAGE (Right Column) */}
      <DesktopIllustration>
        <img src="/dd-5.png" alt="Architectural Blueprint" />
      </DesktopIllustration>

      {/* 3. Scroll Indicator */}
      <ScrollIndicator>
        <Label>Inspect</Label>
        <Line />
      </ScrollIndicator>
    </Wrapper>
  );
};