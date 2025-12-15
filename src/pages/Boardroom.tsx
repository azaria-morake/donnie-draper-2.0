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
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 2rem;
  position: relative; /* For positioning the scroll indicator */
`;

const PreHeader = styled.h2`
  font-family: ${({ theme }) => theme.fonts.body};
  color: ${({ theme }) => theme.colors.secondary};
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.4em;
  margin-bottom: 2rem;
  
  /* Animation */
  opacity: 0;
  animation: ${riseUp} 1s ease-out forwards;
  animation-delay: 0.2s;
`;

const Headline = styled.h1`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: clamp(3rem, 8vw, 7rem); /* Responsive sizing */
  color: ${({ theme }) => theme.colors.text};
  text-align: center;
  line-height: 1.1;
  font-weight: 700;

  /* Animation */
  opacity: 0;
  animation: ${riseUp} 1.2s ease-out forwards;
  animation-delay: 0.8s;
`;

const Accent = styled.span`
  color: ${({ theme }) => theme.colors.primary}; /* Whiskey Gold */
  font-style: italic;
  display: block; /* Force new line for impact */
  margin-top: 0.5rem;
`;

const ScrollIndicator = styled.div`
  position: absolute;
  bottom: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  
  /* Animation */
  opacity: 0;
  animation: ${riseUp} 1s ease-out forwards;
  animation-delay: 2.5s; /* Waits until user has read the text */
`;

const Label = styled.span`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: ${({ theme }) => theme.colors.muted};
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
      <PreHeader>Donnie Draper</PreHeader>
      <Headline>
        Wait for it.
        <Accent>The idea comeths.</Accent>
      </Headline>
      
      <ScrollIndicator>
        <Label>Scroll</Label>
        <Line />
      </ScrollIndicator>
    </Wrapper>
  );
};
