// src/components/functional/ProjectCard.tsx
import styled, { css } from 'styled-components';
import { useRef, useEffect } from 'react';

interface ProjectProps {
  title: string;
  role: string;
  pitch: string;
  image?: string;
  mobileImage?: string;
  tech: string[];
  isActive: boolean;
  onToggle: () => void;
}

// --- STYLES ---

const Card = styled.article<{ $isActive: boolean }>`
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.muted};
  box-shadow: 12px 12px 0px rgba(20, 20, 20, 0.4); 
  display: flex;
  
  /* MOBILE: Stacked Vertical */
  flex-direction: column;
  width: 100%;
  position: relative;
  transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  overflow: hidden;

  /* DESKTOP: Side-by-Side Row */
  @media (min-width: 769px) {
    flex-direction: row; 
    align-items: stretch; 
    min-height: 320px;    
  }

  @media (hover: hover) {
    &:hover {
      transform: translateY(-5px);
      border-color: ${({ theme }) => theme.colors.primary};
      box-shadow: 15px 15px 0px rgba(194, 139, 71, 0.1);
    }
  }

  ${({ $isActive, theme }) => $isActive && css`
    transform: translateY(-5px);
    border-color: ${theme.colors.primary};
    box-shadow: 15px 15px 0px rgba(194, 139, 71, 0.1);
  `}
`;

const StyledImage = styled.img<{ $isActive: boolean }>`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: filter 0.5s ease, transform 0.5s ease;
  will-change: filter, transform;

  filter: grayscale(100%) brightness(0.8);
  transform: scale(1);

  ${Card}:hover & {
    @media (hover: hover) {
      filter: grayscale(0%);
      transform: scale(1.05);
    }
  }

  ${({ $isActive }) => $isActive && css`
    filter: grayscale(0%) !important;
    transform: scale(1.05) !important;
  `}
`;

const ImageArea = styled.div`
  height: 300px; 
  width: 100%;
  background-color: #0f0f0f;
  border-bottom: 1px solid ${({ theme }) => theme.colors.muted};
  overflow: hidden;
  position: relative;
  flex-shrink: 0; 

  @media (min-width: 769px) {
    width: 320px; 
    height: auto; 
    border-bottom: none;
    border-right: 1px solid ${({ theme }) => theme.colors.muted};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    height: auto;
    aspect-ratio: 1 / 1;
  }
`;

const OverlayTitle = styled.h3<{ $isActive: boolean }>`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 1.5rem;
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.75rem;
  color: #fff;
  z-index: 5;
  background: linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 100%);
  opacity: ${({ $isActive }) => ($isActive ? 0 : 1)};
  transform: translateY(${({ $isActive }) => ($isActive ? '20px' : '0')});
  transition: opacity 0.3s ease, transform 0.3s ease;
  pointer-events: none;

  @media (min-width: 769px) {
    display: none;
  }
`;

const ContentDrawer = styled.div<{ $isActive: boolean }>`
  max-height: ${({ $isActive }) => ($isActive ? '1000px' : '0')};
  opacity: ${({ $isActive }) => ($isActive ? '1' : '0')};
  overflow: hidden;
  transition: max-height 0.5s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s ease;
  background: ${({ theme }) => theme.colors.background};

  @media (min-width: 769px) {
    max-height: none;
    opacity: 1;
    overflow: visible;
    flex-grow: 1; 
    display: flex;
    flex-direction: column;
    justify-content: center; 
  }
`;

const InnerContent = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
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

const TapIndicator = styled.div`
  display: none;
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: rgba(0, 0, 0, 0.7);
    padding: 0.25rem 0.5rem;
    border: 1px solid ${({ theme }) => theme.colors.primary};
    border-radius: 2px;
    z-index: 10;
    pointer-events: none;
    
    span {
      font-family: ${({ theme }) => theme.fonts.mono};
      font-size: 0.6rem;
      color: ${({ theme }) => theme.colors.primary};
      text-transform: uppercase;
      letter-spacing: 0.1em;
    }
  }
`;

// --- COMPONENT ---

export const ProjectCard = ({ 
  title, 
  role, 
  pitch, 
  image, 
  mobileImage, 
  tech,
  isActive, 
  onToggle 
}: ProjectProps) => {
  
  const cardRef = useRef<HTMLElement>(null);
  const isMounted = useRef(false);

  useEffect(() => {
    const isMobile = window.innerWidth <= 768;

    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }

    // UPDATED LOGIC: Run if mobile AND ref exists (removed && isActive)
    if (isMobile && cardRef.current) {
      const timer = setTimeout(() => {
        cardRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
          inline: 'center'
        });
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isActive]); // Triggers on both OPEN and CLOSE

  return (
    <Card 
      ref={cardRef} 
      onClick={onToggle} 
      $isActive={isActive}
    >
      <ImageArea>
        <TapIndicator>
          <span>{isActive ? "Tap To Close" : "Tap To Expand"}</span>
        </TapIndicator>

        <OverlayTitle $isActive={isActive}>
          {title}
        </OverlayTitle>

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

      <ContentDrawer $isActive={isActive}>
        <InnerContent>
          <Title>{title}</Title>
          <Role>{role}</Role>
          <Text>{pitch}</Text>
          <TechStack>
            {tech.map((t) => <TechTag key={t}>{t}</TechTag>)}
          </TechStack>
        </InnerContent>
      </ContentDrawer>
    </Card>
  );
};