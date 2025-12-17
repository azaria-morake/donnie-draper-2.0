// src/pages/Rolodex.tsx
import styled, { keyframes, css } from 'styled-components';
import { useState } from 'react';

// --- ANIMATIONS ---
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

// --- STYLES ---
const Section = styled.section`
  min-height: 90vh; /* Almost full screen */
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  
  /* The "Draper" Vibe Image */
  background-image: url('/dd-3.png');
  background-size: cover;
  background-position: center;
`;

const VignetteOverlay = styled.div`
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  /* Heavy dark gradient + a radial vignette to focus the center */
  background: linear-gradient(to bottom, rgba(18,18,18,0.7) 0%, rgba(18,18,18,1) 90%),
              radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.8) 100%);
  z-index: 1;
`;

const ContentContainer = styled.div`
  position: relative;
  z-index: 2;
  text-align: center;
  max-width: 800px;
  padding: 0 2rem;
`;

const Headline = styled.h2`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: clamp(3rem, 6vw, 5rem);
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.1;
  margin-bottom: 2rem;
  text-shadow: 0 4px 10px rgba(0,0,0,0.5);
`;

const SubText = styled.p`
  font-family: ${({ theme }) => theme.fonts.body};
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1.2rem;
  margin-bottom: 4rem;
  opacity: 0.8;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const LinkContainer = styled.div`
  display: flex;
  gap: 2rem;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-direction: column;
    gap: 1.5rem;
    width: 100%;
  }
`;

/* THE "EXECUTIVE KEY" BUTTON */
const ContactButton = styled.a`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 3rem;
  min-width: 200px;
  
  /* Glassmorphism Base */
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(4px);
  border: 1px solid ${({ theme }) => theme.colors.primary}; /* Gold Border */
  
  /* Typography */
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  
  /* Animation */
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  cursor: pointer;
  overflow: hidden;

  /* The Hover State: "Lights On" */
  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.background}; /* Text turns dark for contrast */
    box-shadow: 0 0 25px rgba(194, 139, 71, 0.4); /* Golden Glow */
    transform: translateY(-2px);
    border-color: ${({ theme }) => theme.colors.primary};
  }

  /* Active/Click State */
  &:active {
    transform: translateY(0);
    opacity: 0.9;
  }

  /* Mobile Tweaks */
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 100%;
    padding: 1.2rem;
  }
`;

const Footer = styled.footer`
  position: absolute;
  bottom: 2rem;
  width: 100%;
  text-align: center;
  z-index: 2;
  opacity: 0.6;
`;

const Copyright = styled.span`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.65rem;
  color: ${({ theme }) => theme.colors.muted};
  text-transform: uppercase;
  letter-spacing: 0.1em;
`;

/* --- WHATSAPP MODAL STYLES --- */
const ModalOverlay = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(8px);
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  animation: ${fadeIn} 0.3s ease;
`;

const ModalBox = styled.div`
  background: #111;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  width: 100%;
  max-width: 500px;
  padding: 2rem;
  position: relative;
  box-shadow: 0 0 50px rgba(0,0,0,0.8);
  animation: ${slideUp} 0.4s ease-out;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const ModalHeader = styled.h3`
  font-family: ${({ theme }) => theme.fonts.mono};
  color: ${({ theme }) => theme.colors.primary};
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  border-bottom: 1px solid ${({ theme }) => theme.colors.muted};
  padding-bottom: 1rem;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 150px;
  background: rgba(255,255,255,0.05);
  border: 1px solid ${({ theme }) => theme.colors.muted};
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 1rem;
  padding: 1rem;
  resize: none;
  outline: none;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.secondary};
    opacity: 0.5;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
`;

const ModalButton = styled.button<{ $primary?: boolean }>`
  background: ${({ $primary, theme }) => $primary ? theme.colors.primary : 'transparent'};
  color: ${({ $primary, theme }) => $primary ? theme.colors.background : theme.colors.secondary};
  border: 1px solid ${({ $primary, theme }) => $primary ? theme.colors.primary : theme.colors.muted};
  padding: 0.8rem 1.5rem;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ $primary, theme }) => $primary ? '#fff' : 'rgba(255,255,255,0.05)'};
    color: ${({ $primary }) => $primary ? '#000' : '#fff'};
    transform: translateY(-2px);
  }
`;

// --- COMPONENT ---
export const Rolodex = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [message, setMessage] = useState('');

  const handleOpen = (e: React.MouseEvent) => {
    e.preventDefault(); // Stop default link behavior
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handleTransmit = () => {
    // 1. Format the message
    const encodedMessage = encodeURIComponent(message);
    // 2. Your number
    const phoneNumber = "27660857813"; 
    
    // 3. Open WhatsApp API
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
    
    // 4. Close modal
    setIsModalOpen(false);
    setMessage('');
  };

  return (
    <Section>
      <VignetteOverlay />
      
      <ContentContainer>
        <Headline>
          Your idea is brilliant.
        </Headline>
        <SubText>
          Bring it to life. Make the call.
        </SubText>

        <LinkContainer>
          {/* WhatsApp triggers the modal now */}
          <ContactButton href="#" onClick={handleOpen}>
            WhatsApp
          </ContactButton>

          <ContactButton href="mailto:azaraiamorake@gmail.com">
            Mail
          </ContactButton>
          
          <ContactButton href="https://linkedin.com/in/azaria-morake-04216b242/" target="_blank">
            LinkedIn
          </ContactButton>
          
          <ContactButton href="https://github.com/azaria-morake" target="_blank">
            GitHub
          </ContactButton>
        </LinkContainer>
      </ContentContainer>

      {/* --- THE TRANSMISSION MODAL --- */}
      {isModalOpen && (
        <ModalOverlay onClick={handleClose}>
          {/* Stop propagation so clicking the box doesn't close it */}
          <ModalBox onClick={(e) => e.stopPropagation()}>
            <ModalHeader>Send WhatsApp Message</ModalHeader>
            <TextArea 
              placeholder="Enter your brief..." 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              autoFocus
            />
            <ButtonGroup>
              <ModalButton onClick={handleClose}>Abort</ModalButton>
              <ModalButton $primary onClick={handleTransmit}>Send</ModalButton>
            </ButtonGroup>
          </ModalBox>
        </ModalOverlay>
      )}

      <Footer>
        <Copyright>JHB / REMOTE — © {new Date().getFullYear()} DD.</Copyright>
      </Footer>
    </Section>
  );
};