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
  grid-template-columns: 1.2fr 1fr; /* Text gets slightly more space */
  align-items: center;
  padding: 0 4rem;
  position: relative;
  overflow: hidden;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    padding: 1rem 2rem 2rem 2rem;
    text-align: center;
    gap: 2rem;
  }
`;

const ContentSide = styled.div`
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    align-items: center;
    margin-bottom: 50px;
  }
`;

const IllustrationSide = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  opacity: 0;
  animation: ${riseUp} 1.5s ease-out forwards 0.5s;
  //margin-top: -4rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    margin-top: -1rem;
  }

  img {
    width: 100%;
    max-width: 600px;
    height: auto;
    object-fit: contain;
    /* Noir Filter: Grayscale + High Contrast */
    filter: grayscale(100%) contrast(1.2) brightness(0.8);
    mix-blend-mode: lighten; /* Blends nicely with dark bg */
    mask-image: linear-gradient(to bottom, black 80%, transparent 100%);
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
  margin-bottom: 2rem;
  opacity: 0;
  animation: ${riseUp} 1s ease-out forwards 0.3s;
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
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding-top: 1rem;
  }
`;

const ScrollIndicator = styled.div`
  position: absolute;
  bottom: 7rem;
  left: 50%; /* Center strictly */
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
  background: ${({ theme }) => theme.colors.primary};
  animation: ${smokeFade} 2.5s infinite ease-in-out;
`;

// --- COMPONENT ---
export const Boardroom = () => {
  return (
    <Wrapper>


    
      <ContentSide>
        <PreHeader>Donnie Draper</PreHeader>
        <Headline>
          The Blueprint <br />
          <span style={{ color: '#64748B' }}>Before The Build.</span>
        </Headline>

        <IllustrationSide>
        {/* Architecture/Drafting Image */}
        <img 
          src="/dd-1.jpg" 
          alt="Architectural Blueprint" 
        />
      </IllustrationSide>
      <SubHeadline>
  <strong>Good architecture isn’t scalable code. It’s scalable decisions.</strong>
  <br />   <br />
  If the blueprint is honest, the build cannot even begin to lie.
</SubHeadline>
      </ContentSide>


      
      <ScrollIndicator>
        <Label>Inspect</Label>
        <Line />
      </ScrollIndicator>
    </Wrapper>
  );
};