// src/components/functional/Navigation.tsx
import styled from 'styled-components';
import { useState, useEffect } from 'react';

// --- STYLES ---

const NavContainer = styled.nav`
  /* --- DESKTOP (Default) --- */
  position: fixed;
  right: 2rem;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  z-index: 1000;

  /* --- MOBILE (Horizontal Accordion) --- */
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    top: 1.5rem;           /* Just above the content */
    right: auto;
    left: 50%;
    transform: translateX(-50%); /* Center horizontally */
    flex-direction: row;
    gap: 0.75rem;          /* Tighter gap for mobile */
    align-items: center;
    
    /* Optional: A subtle backing pill to make it pop against complex images */
    background: rgba(18, 18, 18, 0.8);
    backdrop-filter: blur(8px);
    padding: 0.5rem 1rem;
    border-radius: 99px;
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
`;

const NavItem = styled.div<{ $active: boolean }>`
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94); /* Smooth "Push" easing */
  
  /* Mobile: Click target size adjustment */
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    height: 30px; /* Larger touch target area */
  }
`;

const Dot = styled.div<{ $active: boolean }>`
  width: 10px;
  height: 10px;
  border: 1px solid ${({ theme, $active }) => $active ? theme.colors.primary : theme.colors.secondary};
  background: ${({ theme, $active }) => $active ? theme.colors.primary : 'transparent'};
  border-radius: 50%;
  transition: all 0.3s ease;
  flex-shrink: 0; /* Prevent dot from squishing */

  /* Hover effect for Desktop */
  ${NavItem}:hover & {
    background: ${({ theme }) => theme.colors.primary};
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const Label = styled.span<{ $active: boolean }>`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.text}; /* White text for better readability on mobile */
  text-transform: uppercase;
  letter-spacing: 0.1em;
  white-space: nowrap;
  
  /* --- DESKTOP BEHAVIOR (Float Left) --- */
  @media (min-width: 769px) {
    position: absolute;
    right: 24px;
    top: 50%;
    transform: translateY(-50%);
    opacity: 0;
    transition: opacity 0.3s ease, transform 0.3s ease;
    pointer-events: none;
    color: ${({ theme }) => theme.colors.primary}; /* Gold on Desktop */

    ${NavItem}:hover & {
      opacity: 1;
      transform: translateY(-50%) translateX(-5px);
    }
  }

  /* --- MOBILE BEHAVIOR (Accordion Expand) --- */
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    overflow: hidden;
    max-width: ${({ $active }) => ($active ? '120px' : '0px')}; /* The Accordion Magic */
    opacity: ${({ $active }) => ($active ? '1' : '0')};
    margin-left: ${({ $active }) => ($active ? '0.75rem' : '0px')};
    transition: max-width 0.4s ease, opacity 0.3s ease, margin 0.3s ease;
  }
`;

// --- COMPONENT ---

export const Navigation = () => {
  const [activeSection, setActiveSection] = useState('boardroom');

  useEffect(() => {
    const handleScroll = () => {
      // Offset logic: triggers slightly before the section hits top of screen
      const scrollPosition = window.scrollY + window.innerHeight * 0.4;
      
      const sections = ['boardroom', 'campaigns', 'theman', 'rolodex'];
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    // Offset for the fixed header on mobile if needed, though centered nav avoids this issue
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const navItems = [
    { id: 'boardroom', label: 'Boardroom' },
    { id: 'campaigns', label: 'Campaigns' },
    { id: 'theman', label: 'The Man' },
    { id: 'rolodex', label: 'Rolodex' },
  ];

  return (
    <NavContainer>
      {navItems.map((item) => (
        <NavItem 
          key={item.id} 
          $active={activeSection === item.id} 
          onClick={() => scrollTo(item.id)}
        >
          {/* On Mobile: Label comes AFTER dot for the "push right" effect */}
          <Dot $active={activeSection === item.id} />
          <Label $active={activeSection === item.id}>{item.label}</Label>
        </NavItem>
      ))}
    </NavContainer>
  );
};