import styled from 'styled-components';

// --- INTERFACES ---
interface ProjectProps {
  title: string;
  role: string;     // e.g., "Lead Architect"
  pitch: string;    // The "Problem"
  outcome: string;  // The "Result"
  tech: string[];   // The Stack
  link: string;
}

// --- STYLES ---
const Card = styled.article`
  background: rgba(255, 255, 255, 0.03); /* Very subtle glass effect */
  border-left: 4px solid ${({ theme }) => theme.colors.primary};
  padding: 2.5rem;
  margin-bottom: 3rem;
  transition: transform 0.3s ease, background 0.3s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateX(10px); /* Slides out like pulling a file */
    background: rgba(255, 255, 255, 0.05);
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 1rem;
`;

const Title = styled.h3`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.text};
`;

const Role = styled.span`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.primary};
  text-transform: uppercase;
  letter-spacing: 0.1em;
`;

const SectionTitle = styled.h4`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 0.75rem;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.secondary};
  margin-bottom: 0.5rem;
  letter-spacing: 0.2em;
`;

const Text = styled.p`
  font-family: ${({ theme }) => theme.fonts.body};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 2rem;
  max-width: 600px;
  line-height: 1.7;
`;

const TechStack = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-top: 1rem;
`;

const TechTag = styled.span`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.secondary};
  border: 1px solid ${({ theme }) => theme.colors.muted};
  padding: 0.25rem 0.75rem;
  border-radius: 99px;
`;

// --- COMPONENT ---
export const ProjectCard = ({ title, role, pitch, outcome, tech }: ProjectProps) => {
  return (
    <Card>
      <Header>
        <Title>{title}</Title>
        <Role>{role}</Role>
      </Header>

      <SectionTitle>The Pitch</SectionTitle>
      <Text>{pitch}</Text>

      <SectionTitle>The Outcome</SectionTitle>
      <Text>{outcome}</Text>

      <TechStack>
        {tech.map((t) => (
          <TechTag key={t}>{t}</TechTag>
        ))}
      </TechStack>
    </Card>
  );
};
