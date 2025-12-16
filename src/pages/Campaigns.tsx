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
  position: relative; /* Needed to anchor the absolute arrows */

  /* --- MOBILE CENTERING FIX --- */
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
    
    padding: 0 1.5rem 1rem 1.5rem; 
    gap: 1rem;
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

/* --- NAV ARROWS (Mobile Only) --- */
const NavArrow = styled.button<{ $direction: 'left' | 'right', $visible: boolean }>`
  display: none; /* Hidden on Desktop */
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    /* Vertically center relative to viewport/cards */
    top: 55%; 
    transform: translateY(-50%);
    
    /* Position on edges */
    ${({ $direction }) => $direction === 'left' ? 'left: 0.5rem;' : 'right: 0.5rem;'}
    
    width: 44px;
    height: 44px;
    border-radius: 50%;
    
    /* Glassmorphism look */
    background: rgba(18, 18, 18, 0.6);
    backdrop-filter: blur(4px);
    border: 1px solid ${({ theme }) => theme.colors.muted};
    color: ${({ theme }) => theme.colors.primary}; /* Gold arrows */
    font-size: 1.5rem;
    line-height: 1;
    z-index: 50; /* Above the cards */
    cursor: pointer;
    
    /* Visibility transition */
    opacity: ${({ $visible }) => ($visible ? 1 : 0)};
    pointer-events: ${({ $visible }) => ($visible ? 'auto' : 'none')};
    transition: opacity 0.3s ease, background 0.3s ease;
    
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

  // Check scroll position to toggle arrow visibility
  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      // Use a small buffer (10px) to prevent flickering at edges
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  // Listen for scroll events
  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.addEventListener('scroll', checkScroll);
      // Run once on mount to set initial state
      checkScroll();
    }
    return () => el?.removeEventListener('scroll', checkScroll);
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      // Scroll by 85% of screen width (matching card size)
      const scrollAmount = clientWidth * 0.85; 
      
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const projects = [
    {
      title: "FinBridge",
      role: "Lead Architect",
      pitch: "Connecting SMEs to capital with silent precision. AI-driven insights meet real-time banking integrations for a seamless investment ecosystem.",
      image: "/finbridge.jpg",
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

      {/* Navigation Arrows (Mobile Only) */}
      <NavArrow 
        $direction="left" 
        $visible={canScrollLeft} 
        onClick={() => scroll('left')}
        aria-label="Scroll Left"
      >
        ←
      </NavArrow>
      
      <NavArrow 
        $direction="right" 
        $visible={canScrollRight} 
        onClick={() => scroll('right')}
        aria-label="Scroll Right"
      >
        →
      </NavArrow>

      <ScrollContainer ref={scrollRef}>
        {projects.map((p, i) => (
          <CardWrapper key={i}>
            <ProjectCard {...p} />
          </CardWrapper>
        ))}
      </ScrollContainer>
    </Section>
  );
};