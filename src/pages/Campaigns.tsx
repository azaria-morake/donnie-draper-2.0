// src/pages/Campaigns.tsx
import styled from 'styled-components';
import { ProjectCard } from '../components/functional/ProjectCard';

const Section = styled.section`
  padding: 8rem 0; /* Removed side padding here to allow full-width swipe on mobile */
  background-color: ${({ theme }) => theme.colors.background};
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden; /* Prevents horizontal scrollbar on the body */
`;

const HeaderContainer = styled.div`
  width: 100%;
  max-width: 800px;
  padding: 0 2rem; /* Keep header aligned with desktop grid */
`;

const Label = styled.h2`
  font-family: ${({ theme }) => theme.fonts.mono};
  color: ${({ theme }) => theme.colors.secondary};
  font-size: 0.9rem;
  margin-bottom: 2rem;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  border-bottom: 1px solid ${({ theme }) => theme.colors.muted};
  padding-bottom: 1rem;
`;

// The magic container that switches direction
const ScrollContainer = styled.div`
  width: 100%;
  max-width: 800px;
  
  /* Desktop Layout (Default) */
  display: flex;
  flex-direction: column;
  gap: 3rem;
  padding: 0 2rem; /* Side padding for desktop */

  /* Mobile Layout (Swipe) */
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-direction: row;
    overflow-x: auto; /* Enable horizontal scroll */
    padding: 0 1.5rem 2rem 1.5rem; /* Add bottom padding for scrollbar/touch area */
    gap: 1.5rem;
    width: 100vw; /* Force full width */
    
    /* The Snap Physics */
    scroll-snap-type: x mandatory;
    scroll-behavior: smooth;
    -webkit-overflow-scrolling: touch; /* Momentum scrolling on iOS */

    /* Hide Scrollbar (Clean Look) */
    &::-webkit-scrollbar {
      display: none;
    }
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
  }
`;

// Wrapper to force card width on mobile
const CardWrapper = styled.div`
  width: 100%;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    min-width: 85vw; /* Card takes 85% of screen width */
    scroll-snap-align: center; /* Locks the card in the center when swiping */
  }
`;

export const Campaigns = () => {
  const projects = [
    {
      title: "Vanguard Finance",
      role: "Lead Frontend Architect",
      pitch: "They wanted a dashboard. I gave them a cockpit. The data was complex, but the user experience needed to be silent.",
      outcome: "Reduced load times by 40% and simplified user flows, resulting in a 15% increase in daily active users.",
      tech: ["React", "TypeScript", "D3.js", "AWS"],
      link: "#"
    },
    {
      title: "Lumina Health",
      role: "Full Stack Engineer",
      pitch: "Healthcare interfaces are usually sterile. We injected warmth into the code.",
      outcome: "Built a HIPAA-compliant telemedicine platform that scaled to 10k concurrent users during launch week.",
      tech: ["Next.js", "Node.js", "PostgreSQL", "WebRTC"],
      link: "#"
    },
    {
      title: "Aeon Motors",
      role: "Creative Developer",
      pitch: "Selling an electric future requires an electric interface. A 3D WebGL experience.",
      outcome: "Award-winning site design that increased pre-orders by 200% over the previous quarter.",
      tech: ["Three.js", "React-Three-Fiber", "GSAP"],
      link: "#"
    }
  ];

  return (
    <Section>
      <HeaderContainer>
        <Label>Selected Campaigns</Label>
      </HeaderContainer>

      <ScrollContainer>
        {projects.map((p, i) => (
          <CardWrapper key={i}>
            <ProjectCard {...p} />
          </CardWrapper>
        ))}
      </ScrollContainer>
    </Section>
  );
};
