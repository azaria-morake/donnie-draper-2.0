// src/pages/Campaigns.tsx
import styled from 'styled-components';
import { ProjectCard } from '../components/functional/ProjectCard';
import { useRef, useState, useEffect } from 'react';

// --- STYLES ---

const Section = styled.section`
  padding: 8rem 0;
  background-color: transparent;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  position: relative;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    min-height: 100vh;
    padding: 0;
    justify-content: center;
    scroll-margin-top: 0;
  }
`;

const HeaderContainer = styled.div`
  width: 100%;
  max-width: 1000px;
  padding: 0 2rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    text-align: center;
    padding: 0 1.5rem;
    margin-bottom: 1rem;
  }
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
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    margin-bottom: 1.5rem;
    font-size: 0.8rem;
  }
`;

// THE SCROLL CONTAINER WITH LOCKING LOGIC
const ScrollContainer = styled.div<{ $isLocked?: boolean }>`
  width: 100%;
  max-width: 1000px;
  display: flex;
  flex-direction: column;
  gap: 3rem;
  padding: 0 2rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-direction: row;
    padding: 0 1.5rem 1rem 1.5rem; 
    gap: 1rem;
    width: 100vw;
    
    /* THE LOCK: If a card is active ($isLocked), kill horizontal scroll */
    overflow-x: ${({ $isLocked }) => ($isLocked ? 'hidden' : 'auto')};
    
    /* Disable snapping when locked to prevent jitter */
    scroll-snap-type: ${({ $isLocked }) => ($isLocked ? 'none' : 'x mandatory')};
    
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

const NavArrow = styled.button<{ $direction: 'left' | 'right', $visible: boolean }>`
  display: none;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 55%; 
    transform: translateY(-50%);
    ${({ $direction }) => $direction === 'left' ? 'left: 0.5rem;' : 'right: 0.5rem;'}
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background: rgba(18, 18, 18, 0.6);
    backdrop-filter: blur(4px);
    border: 1px solid ${({ theme }) => theme.colors.muted};
    color: ${({ theme }) => theme.colors.primary};
    font-size: 1.5rem;
    line-height: 1;
    z-index: 50;
    cursor: pointer;
    
    opacity: ${({ $visible }) => ($visible ? 1 : 0)};
    pointer-events: ${({ $visible }) => ($visible ? 'auto' : 'none')};
    transition: opacity 0.3s ease;
    
    &:active {
      background: ${({ theme }) => theme.colors.primary};
      color: ${({ theme }) => theme.colors.background};
    }
  }
`;

// --- COMPONENT ---

export const Campaigns = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeProject, setActiveProject] = useState<number | null>(null);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.addEventListener('scroll', checkScroll);
      checkScroll();
    }
    return () => el?.removeEventListener('scroll', checkScroll);
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.85; 
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const handleToggle = (index: number) => {
    if (activeProject === index) {
      setActiveProject(null);
    } else {
      setActiveProject(index);
    }
  };

  const projects = [
    {
      title: "FinBridge",
      role: "Lead Architect",
      pitch: "Connecting SMEs to capital with silent precision. AI-driven insights meet real-time banking integrations for a seamless investment ecosystem.",
      image: "/finbridge-1-1.png",
      mobileImage: "/finbridge-1-1.png",
      tech: ["React", "Python", "AI/ML", "AWS"],
    },
    {
      title: "UX Giants",
      role: "Product Engineer",
      pitch: "Code is emotion. We don't just build software; we engineer the feeling behind the pixel, merging technical prowess with human-centric design.",
      image: "/ux-giants-1-1.png",
      mobileImage: "/ux-giants-1-1.png",
      tech: ["React", "GSAP", "Node.js", "Design Systems"],
    },
    {
      title: "WAYPOINT",
      role: "Full Stack Engineer",
      pitch: "Safety in real-time. A geospatial panic button that tracks your journey and alerts your circle when it matters most.",
      image: "/waypoint-1-1.png",
      mobileImage: "/waypoint-1-1.png",
      tech: ["React", "Firebase", "Mapbox", "Geolocation"],
    },
    {
      title: "LyfLify",
      role: "Backend Lead",
      pitch: "Healthcare without the cold wait. AI triage, instant booking, and medical records in one seamless interface bridging patient and cure.",
      image: "/lyflify-1-1.png",
      mobileImage: "/lyflify-1-1.png",
      tech: ["Python", "FastAPI", "React", "PostgreSQL"],
    },
    {
      title: "TembaShield",
      role: "Security Analyst",
      pitch: "A national digital shield. AI-powered threat scanning and ransomware resilience democratized for individuals and enterprises alike.",
      image: "/tembashield-1-1.png",
      mobileImage: "/tembashield-1-1.png",
      tech: ["Python", "Rust", "CyberSec", "AI Ops"],
    },
    {
      title: "FotoDump",
      role: "Mobile Developer",
      pitch: "Ephemeral memories for the digital age. Upload albums that vanish after 24 hours. The beauty of the moment, captured then released.",
      image: "/fotodump-1-1.png",
      mobileImage: "/fotodump-1-1.png",
      tech: ["React Native", "Firebase", "Cloud Functions"],
    }
  ];

  return (
    <Section>
      <HeaderContainer>
        <Label>Selected Campaigns</Label>
      </HeaderContainer>

      {/* ARROWS: Hide when ANY card is active */}
      <NavArrow 
        $direction="left" 
        $visible={canScrollLeft && activeProject === null} 
        onClick={() => scroll('left')}
      >
        ←
      </NavArrow>
      
      <NavArrow 
        $direction="right" 
        $visible={canScrollRight && activeProject === null} 
        onClick={() => scroll('right')}
      >
        →
      </NavArrow>

      {/* SCROLL CONTAINER: Locks if activeProject is not null */}
      <ScrollContainer ref={scrollRef} $isLocked={activeProject !== null}>
        {projects.map((p, i) => (
          <CardWrapper key={i}>
            <ProjectCard 
              {...p} 
              isActive={activeProject === i}
              onToggle={() => handleToggle(i)}
            />
          </CardWrapper>
        ))}
      </ScrollContainer>
    </Section>
  );
};