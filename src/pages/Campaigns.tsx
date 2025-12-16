// src/pages/Campaigns.tsx
import styled from 'styled-components';
import { ProjectCard } from '../components/functional/ProjectCard';

const Section = styled.section`
  padding: 8rem 0;
  background-color: transparent; /* Transparent to see the blueprint grid */
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
`;

const HeaderContainer = styled.div`
  width: 100%;
  max-width: 1000px;
  padding: 0 2rem;
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

const ScrollContainer = styled.div`
  width: 100%;
  max-width: 1000px;
  display: flex;
  flex-direction: column;
  gap: 3rem;
  padding: 0 2rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-direction: row;
    overflow-x: auto;
    padding: 0 1.5rem 2rem 1.5rem;
    gap: 1.5rem;
    width: 100vw;
    scroll-snap-type: x mandatory;
    scroll-behavior: smooth;
    &::-webkit-scrollbar { display: none; }
  }
`;

const CardWrapper = styled.div`
  width: 100%;
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    min-width: 85vw;
    scroll-snap-align: center;
  }
`;

export const Campaigns = () => {
  const projects = [
    {
      title: "Vanguard Finance",
      role: "Lead Frontend Architect",
      pitch: "They wanted a dashboard. I gave them a cockpit. The data was complex, but the user experience needed to be silent.",
      // Placeholder: Abstract building
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop",
      tech: ["React", "TypeScript", "D3.js", "AWS"],
    },
    {
      title: "Lumina Health",
      role: "Full Stack Engineer",
      pitch: "Healthcare interfaces are usually sterile. We injected warmth into the code.",
      // Placeholder: Clean white interior
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=800&auto=format&fit=crop",
      tech: ["Next.js", "Node.js", "PostgreSQL"],
    },
    {
      title: "Aeon Motors",
      role: "Creative Developer",
      pitch: "Selling an electric future requires an electric interface. A 3D WebGL experience.",
      // Placeholder: Car detail / mechanical
      image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=800&auto=format&fit=crop",
      tech: ["Three.js", "WebGL", "GSAP"],
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
