// src/pages/TheMan.tsx
import styled from 'styled-components';

const Section = styled.section`
  padding: 8rem 2rem;
  background-color: ${({ theme }) => theme.colors.background};
  display: flex;
  justify-content: center;
`;

const Container = styled.div`
  max-width: 1000px;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
`;

// Left Column: The "90/10" Graphic
const StatBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-right: 1px solid ${({ theme }) => theme.colors.muted};
  padding-right: 2rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    border-right: none;
    border-bottom: 1px solid ${({ theme }) => theme.colors.muted};
    padding-right: 0;
    padding-bottom: 3rem;
  }
`;

const BigNumber = styled.div`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 8rem;
  line-height: 0.8;
  color: ${({ theme }) => theme.colors.primary};
  opacity: 0.9;
`;

const StatLabel = styled.div`
  font-family: ${({ theme }) => theme.fonts.mono};
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.2rem;
  margin-bottom: 2rem;
  margin-top: 0.5rem;
`;

// Right Column: The Copy & Skills
const ContentBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Heading = styled.h2`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  color: ${({ theme }) => theme.colors.text};
`;

const BodyText = styled.p`
  font-family: ${({ theme }) => theme.fonts.body};
  color: ${({ theme }) => theme.colors.secondary};
  font-size: 1.1rem;
  line-height: 1.8;
  margin-bottom: 3rem;
`;

const SkillGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
`;

const SkillItem = styled.div`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.text};
  border-left: 2px solid ${({ theme }) => theme.colors.muted};
  padding-left: 0.75rem;
  transition: all 0.2s ease;

  &:hover {
    border-left-color: ${({ theme }) => theme.colors.primary};
    padding-left: 1rem;
    color: ${({ theme }) => theme.colors.primary};
    cursor: default;
  }
`;

export const TheMan = () => {
  const skills = [
    "React / Next.js",
    "TypeScript / Node",
    "Vite Ecosystem",
    "UI Architecture",
    "Creative Strategy",
    "Performance Ops"
  ];

  return (
    <Section>
      <Container>
        <StatBlock>
          <div>
            <BigNumber>90%</BigNumber>
            <StatLabel>Contemplation</StatLabel>
          </div>
          <div style={{ marginTop: '2rem' }}>
            <BigNumber style={{ color: '#64748B' }}>10%</BigNumber>
            <StatLabel>Execution</StatLabel>
          </div>
        </StatBlock>

        <ContentBlock>
          <Heading>The Method.</Heading>
          <BodyText>
            My process is an act of patient contemplation. I don't rush into code. 
            I sit with the problem. I stare at the ceiling. I wait.
            <br /><br />
            Because when the idea finally lands, the execution isn't work—it's inevitable.
            The best code is written in the mind before it ever touches the keyboard.
          </BodyText>
          
          <div style={{ marginBottom: '1rem', fontFamily: 'Fira Code', fontSize: '0.8rem', color: '#666', textTransform: 'uppercase' }}>
            // Core Capabilities
          </div>
          <SkillGrid>
            {skills.map(skill => (
              <SkillItem key={skill}>{skill}</SkillItem>
            ))}
          </SkillGrid>
        </ContentBlock>
      </Container>
    </Section>
  );
};
