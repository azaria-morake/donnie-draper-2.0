// src/pages/Campaigns.tsx
import styled from 'styled-components';
import { ProjectCard } from '../components/functional/ProjectCard';

const Section = styled.section`
  padding: 8rem 0;
  background-color: transparent;
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
    -ms-overflow-style: none;
    scrollbar-width: none;
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
      title: "FinBridge",
      role: "Lead Architect",
      pitch: "Connecting SMEs to capital with silent precision. AI-driven insights meet real-time banking integrations for a seamless investment ecosystem.",
      image: "/finbridge.jpg", // Using same image for desktop for now
      mobileImage: "/finbridge-1-1.png",
      tech: ["React", "Python", "AI/ML", "AWS"],
    },
    {
      title: "UX Giants",
      role: "Product Engineer",
      pitch: "Code is emotion. We don't just build software; we engineer the feeling behind the pixel, merging technical prowess with human-centric design.",
      image: "/ux-giants.jpg",
      mobileImage: "/ux-giants-1-1.png",
      tech: ["React", "GSAP", "Node.js", "Design Systems"],
    },
    {
      title: "WAYPOINT",
      role: "Full Stack Engineer",
      pitch: "Safety in real-time. A geospatial panic button that tracks your journey and alerts your circle when it matters most.",
      image: "/waypoint.jpg",
      mobileImage: "/waypoint-1-1.png",
      tech: ["React", "Firebase", "Mapbox", "Geolocation"],
    },
    {
      title: "LyfLify",
      role: "Backend Lead",
      pitch: "Healthcare without the cold wait. AI triage, instant booking, and medical records in one seamless interface bridging patient and cure.",
      image: "/lyflify.jpg",
      mobileImage: "/lyflify-1-1.png",
      tech: ["Python", "FastAPI", "React", "PostgreSQL"],
    },
    {
      title: "TembaShield",
      role: "Security Analyst",
      pitch: "A national digital shield. AI-powered threat scanning and ransomware resilience democratized for individuals and enterprises alike.",
      image: "/tembashield.jpg",
      mobileImage: "/tembashield-1-1.png",
      tech: ["Python", "Rust", "CyberSec", "AI Ops"],
    },
    {
      title: "FotoDump",
      role: "Mobile Developer",
      pitch: "Ephemeral memories for the digital age. Upload albums that vanish after 24 hours. The beauty of the moment, captured then released.",
      image: "/fotodump.jpg",
      mobileImage: "/fotodump-1-1.png",
      tech: ["React Native", "Firebase", "Cloud Functions"],
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