// src/pages/TheMan.tsx
import styled from 'styled-components';

const Section = styled.section`
  min-height: 100vh;
  padding: 6rem 2rem;
  background-color: ${({ theme }) => theme.colors.background};
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 4rem 1rem;
    align-items: flex-start; /* Align top so it doesn't float weirdly */
  }
`;

const BackgroundSchematic = styled.div`
  position: absolute;
  top: 0; left: 0; width: 100%; height: 100%;
  opacity: 0.15;
  pointer-events: none;
  background-image: url('https://images.unsplash.com/photo-1581094794329-cd119277d3b6?q=80&w=1000&auto=format&fit=crop');
  background-size: cover;
  background-position: center;
  filter: grayscale(100%) contrast(1.5);
  mix-blend-mode: screen;
`;

const BlueprintContainer = styled.div`
  max-width: 1000px;
  width: 100%;
  border: 1px solid ${({ theme }) => theme.colors.secondary};
  background: rgba(18, 18, 18, 0.9);
  backdrop-filter: blur(10px);
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;

  /* The "Blueprint" double-line border effect */
  padding: 4px; 
  box-shadow: 0 20px 50px rgba(0,0,0,0.5);
`;

const HeaderBlock = styled.div`
  border-bottom: 2px solid ${({ theme }) => theme.colors.text};
  padding: 1.5rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  background: ${({ theme }) => theme.colors.background};
`;

const SectionTitle = styled.h2`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 2rem;
  line-height: 1;
`;

const MetaData = styled.div`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.6rem;
  color: ${({ theme }) => theme.colors.primary};
  text-transform: uppercase;
  text-align: right;
  letter-spacing: 0.1em;
`;

// --- THE SWIPE LOGIC ---
const GridContent = styled.div`
  /* Desktop: Grid */
  display: grid;
  grid-template-columns: 1fr 1fr;

  /* Mobile: Horizontal Scroll Snap */
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: flex;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    scroll-behavior: smooth;
    
    /* Hide scrollbar */
    &::-webkit-scrollbar { display: none; }
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;

// Slide 1: Philosophy
const PhilosophySide = styled.div`
  padding: 3rem;
  border-right: 1px solid ${({ theme }) => theme.colors.muted};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    min-width: 100%; /* Full width of container */
    scroll-snap-align: center;
    border-right: none;
    padding: 2rem;
  }
`;

// Slide 2: Specs
const SpecSide = styled.div`
  display: flex;
  flex-direction: column;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    min-width: 100%; /* Full width of container */
    scroll-snap-align: center;
    border-left: 1px solid ${({ theme }) => theme.colors.muted};
  }
`;

// Visual Helpers
const BigStat = styled.div`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: clamp(4rem, 6vw, 6rem);
  color: ${({ theme }) => theme.colors.primary};
  line-height: 0.8;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.text};
  text-transform: uppercase;
  letter-spacing: 0.2em;
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px dashed ${({ theme }) => theme.colors.muted};
`;

const Copy = styled.p`
  font-family: ${({ theme }) => theme.fonts.body};
  color: ${({ theme }) => theme.colors.secondary};
  font-size: 0.95rem;
  line-height: 1.7;
`;

const SpecRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem 2rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.muted};

  &:last-child { border-bottom: none; }
`;

const SpecName = styled.span`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.text};
`;

const SpecValue = styled.span`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.primary};
  border: 1px solid ${({ theme }) => theme.colors.primary};
  padding: 0.2rem 0.5rem;
`;

// Mobile Only: Swipe Hint at the bottom
const MobileSwipeIndicator = styled.div`
  display: none;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem;
    gap: 0.5rem;
    border-top: 1px solid ${({ theme }) => theme.colors.muted};
    background: ${({ theme }) => theme.colors.background};
    
    font-family: ${({ theme }) => theme.fonts.mono};
    font-size: 0.65rem;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.secondary};
    letter-spacing: 0.15em;

    /* Animation */
    span {
        animation: pulse 2s infinite;
    }
    @keyframes pulse {
        0% { opacity: 0.3; }
        50% { opacity: 1; }
        100% { opacity: 0.3; }
    }
  }
`;

export const TheMan = () => {
  const specs = [
    { name: "Frontend Architecture", val: "React / Next.js / TypeScript" },
    { name: "Backend Systems", val: "Python (Django/Flask) / Node" },
    { name: "AI & LLM Integration", val: "OpenAI / Gemini / Llama (Groq)" },
    { name: "Data Strategy", val: "PostgreSQL / Firebase / Mongo" },
    { name: "Cloud Infrastructure", val: "AWS / Docker / Kubernetes" },
    { name: "Quality Assurance", val: "Cypress / TDD / Postman" },
  ];

  return (
    <Section>
      <BackgroundSchematic />
      
      <BlueprintContainer>
        <HeaderBlock>
          <SectionTitle>The Method</SectionTitle>
          <MetaData>
            Ref: DD-9010 <br />
            Rev: 2.0 (Alpha)
          </MetaData>
        </HeaderBlock>

        <GridContent>
          {/* Card 1: Philosophy */}
          <PhilosophySide>
             {/* Row for 90% and 10% */}
  <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-end', marginBottom: '2rem' }}>
  <div>
      <BigStat style={{ fontSize: '3rem' }}>90%</BigStat>
      <StatLabel style={{ border: 'none', padding: 0 }}>Contemplation</StatLabel>
    </div>
    <div>
      <BigStat style={{ fontSize: '3rem' }}>10%</BigStat>
      <StatLabel style={{ border: 'none', padding: 0 }}>Execution</StatLabel>
    </div>
  </div>

  {/* 100% below */}
  <div style={{ textAlign: 'center' }}>
    <BigStat>100%</BigStat>
    <StatLabel>Precision</StatLabel>
  </div>

            <Copy>
            Precision means the product behaves exactly as promised, because every decision was made before it was built.
            Nothing is accidental — the idea, the architecture, the final line of code — all intentional. 
              <br /><br />
              There's only one clean cut.
            </Copy>
          </PhilosophySide>

          {/* Card 2: Specs */}
          <SpecSide>
            <div style={{ padding: '1rem 2rem', borderBottom: '1px solid #333', color: '#666', fontFamily: 'Fira Code', fontSize: '0.7rem' }}>
              // TECHNICAL SPECIFICATIONS
            </div>
            {specs.map((spec, i) => (
              <SpecRow key={i}>
                <SpecName>{spec.name}</SpecName>
                <SpecValue>{spec.val}</SpecValue>
              </SpecRow>
            ))}
          </SpecSide>
        </GridContent>

        <MobileSwipeIndicator>
           <span>&lt;&lt; Swipe for Specs &gt;&gt;</span>
        </MobileSwipeIndicator>

      </BlueprintContainer>
    </Section>
  );
};