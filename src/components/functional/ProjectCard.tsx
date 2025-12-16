// src/components/functional/ProjectCard.tsx
import styled from 'styled-components';

interface ProjectProps {
  title: string;
  role: string;
  pitch: string;
  image?: string; // We now accept an image
  tech: string[];
}

const Card = styled.article`
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.muted};
  /* The "Blueprint" Shadow - gives it depth like a pinned board */
  box-shadow: 12px 12px 0px rgba(20, 20, 20, 0.4); 
  display: flex;
  flex-direction: column;
  min-width: 320px; /* Minimum width for mobile swipe */
  height: 100%;
  transition: transform 0.3s ease, border-color 0.3s ease;
  position: relative;

  &:hover {
    transform: translateY(-5px);
    border-color: ${({ theme }) => theme.colors.primary};
    
    /* Make the shadow "sharper" on hover */
    box-shadow: 15px 15px 0px rgba(194, 139, 71, 0.1); 
  }
`;

const ImageArea = styled.div`
  height: 200px;
  width: 100%;
  background-color: #0f0f0f;
  border-bottom: 1px solid ${({ theme }) => theme.colors.muted};
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: grayscale(100%); /* Keeps the noir vibe */
    transition: filter 0.5s ease, transform 0.5s ease;
  }

  ${Card}:hover & img {
    filter: grayscale(0%); /* Color returns on hover */
    transform: scale(1.05); /* Subtle zoom */
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

export const ProjectCard = ({ title, role, pitch, image, tech }: ProjectProps) => {
  return (
    <Card>
      <ImageArea>
        {/* Use the provided image, or a fallback color block */}
        {image ? (
          <img src={image} alt={title} />
        ) : (
          <div style={{ width: '100%', height: '100%', background: '#1a1a1a' }} />
        )}
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