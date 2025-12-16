// src/components/functional/ProjectCard.tsx
import styled, { css } from 'styled-components';
import { useState } from 'react';

interface ProjectProps {
  title: string;
  role: string;
  pitch: string;
  image?: string;
  mobileImage?: string;
  tech: string[];
}

// 1. The Container (Card)
const Card = styled.article<{ $isActive: boolean }>`
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.muted};
  box-shadow: 12px 12px 0px rgba(20, 20, 20, 0.4); 
  display: flex;
  flex-direction: column;
  min-width: 320px;
  height: 100%;
  position: relative;
  transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;

  /* --- DESKTOP HOVER --- */
  /* Only apply hover effects if the device supports hover (mouse) */
  @media (hover: hover) {
    &:hover {
      transform: translateY(-5px);
      border-color: ${({ theme }) => theme.colors.primary};
      box-shadow: 15px 15px 0px rgba(194, 139, 71, 0.1);
    }
  }

  /* --- ACTIVE STATE (Mobile Tap) --- */
  ${({ $isActive, theme }) => $isActive && css`
    transform: translateY(-5px);
    border-color: ${theme.colors.primary};
    box-shadow: 15px 15px 0px rgba(194, 139, 71, 0.1);
  `}
`;

// 2. The Image Component (Handles its own B&W logic)
const StyledImage = styled.img<{ $isActive: boolean }>`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: filter 0.5s ease, transform 0.5s ease;
  will-change: filter, transform;

  /* DEFAULT: Black & White */
  filter: grayscale(100%);
  transform: scale(1);

  /* --- DESKTOP HOVER --- */
  ${Card}:hover & {
    @media (hover: hover) {
      filter: grayscale(0%);
      transform: scale(1.05);
    }
  }

  /* --- ACTIVE STATE (Explicit Prop) --- */
  /* This guarantees color when clicked, regardless of hover state */
  ${({ $isActive }) => $isActive && css`
    filter: grayscale(0%) !important;
    transform: scale(1.05) !important;
  `}
`;

const ImageArea = styled.div`
  /* Desktop Default */
  height: 400px;
  width: 100%;
  background-color: #0f0f0f;
  border-bottom: 1px solid ${({ theme }) => theme.colors.muted};
  overflow: hidden;
  position: relative;

  /* MOBILE UPDATE: Force 1:1 Aspect Ratio */
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    height: auto;
    aspect-ratio: 1 / 1;
  }
`;

const Content = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const Title = styled.h3`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.75rem;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.colors.text};
`;

const Role = styled.span`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.primary};
  text-transform: uppercase;
  margin-bottom: 1.5rem;
  display: block;
  letter-spacing: 0.05em;
`;

const Text = styled.p`
  font-family: ${({ theme }) => theme.fonts.body};
  color: ${({ theme }) => theme.colors.secondary};
  font-size: 0.95rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  flex-grow: 1;
`;

const TechStack = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const TechTag = styled.span`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.7rem;
  color: ${({ theme }) => theme.colors.secondary};
  border: 1px solid ${({ theme }) => theme.colors.muted};
  padding: 0.25rem 0.75rem;
  border-radius: 2px;
`;

// The "Tap to Expand" overlay
const TapIndicator = styled.div`
  display: none;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    bottom: 1rem;
    right: 1rem;
    background: rgba(0, 0, 0, 0.7);
    padding: 0.25rem 0.5rem;
    border: 1px solid ${({ theme }) => theme.colors.primary};
    border-radius: 2px;
    z-index: 10;
    pointer-events: none; /* Let clicks pass through to the Card */
    
    span {
      font-family: ${({ theme }) => theme.fonts.mono};
      font-size: 0.6rem;
      color: ${({ theme }) => theme.colors.primary};
      text-transform: uppercase;
      letter-spacing: 0.1em;
    }
  }
`;

export const ProjectCard = ({ title, role, pitch, image, mobileImage, tech }: ProjectProps) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <Card onClick={() => setIsActive(!isActive)} $isActive={isActive}>
      <ImageArea>
        {/* The Indicator remains! */}
        <TapIndicator>
          <span>{isActive ? "Tap to Close" : "Tap to Expand"}</span>
        </TapIndicator>

        <picture>
          {mobileImage && (
            <source media="(max-width: 768px)" srcSet={mobileImage} />
          )}
          
          <StyledImage 
            src={image || ''} 
            alt={title} 
            $isActive={isActive} 
          />
        </picture>
      </ImageArea>

      <Content>
        <Title>{title}</Title>
        <Role>{role}</Role>
        <Text>{pitch}</Text>
        <TechStack>
          {tech.map((t) => <TechTag key={t}>{t}</TechTag>)}
        </TechStack>
      </Content>
    </Card>
  );
};