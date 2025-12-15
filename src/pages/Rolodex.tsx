// src/pages/Rolodex.tsx
import styled from 'styled-components';

const Section = styled.section`
  padding: 8rem 2rem 4rem 2rem;
  background-color: ${({ theme }) => theme.colors.background};
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const CallToAction = styled.h2`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: clamp(2.5rem, 5vw, 4rem);
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 1rem;
`;

const SubText = styled.p`
  font-family: ${({ theme }) => theme.fonts.body};
  color: ${({ theme }) => theme.colors.secondary};
  font-size: 1.1rem;
  max-width: 500px;
  margin-bottom: 4rem;
`;

const ButtonGrid = styled.div`
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 6rem;
`;

const ContactButton = styled.a`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: ${({ theme }) => theme.colors.primary};
  border: 1px solid ${({ theme }) => theme.colors.primary};
  padding: 1rem 2rem;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  background: transparent;

  /* The "Fill" effect on hover */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 0%;
    height: 100%;
    background: ${({ theme }) => theme.colors.primary};
    transition: width 0.3s ease;
    z-index: -1;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.background};
    cursor: pointer;
    
    &::before {
      width: 100%;
    }
  }
`;

const Footer = styled.footer`
  border-top: 1px solid ${({ theme }) => theme.colors.muted};
  width: 100%;
  padding-top: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  max-width: 1000px;
`;

const Copyright = styled.span`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.secondary};
`;

const AgencyMark = styled.span`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.text};
  font-weight: 700;
`;

export const Rolodex = () => {
  return (
    <Section>
      <CallToAction>The line is open.</CallToAction>
      <SubText>
        The agency is currently accepting new clients for Q1. 
        If you have a vision, I have the blueprint.
      </SubText>

      <ButtonGrid>
        <ContactButton href="mailto:your-email@example.com">Email Me</ContactButton>
        <ContactButton href="https://github.com" target="_blank">GitHub</ContactButton>
        <ContactButton href="https://linkedin.com" target="_blank">LinkedIn</ContactButton>
      </ButtonGrid>

      <Footer>
        <Copyright>© {new Date().getFullYear()} Donnie Draper. All Rights Reserved.</Copyright>
        <AgencyMark>DD.</AgencyMark>
      </Footer>
    </Section>
  );
};
