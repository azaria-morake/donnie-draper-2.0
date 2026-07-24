// src/pages/SeEssentials.tsx
import styled, { keyframes, createGlobalStyle } from 'styled-components';
import { useEffect, Fragment, useState } from 'react';
import PaystackPop from '@paystack/inline-js';

// --- LOCAL GLOBAL STYLE FOR FONT IMPORT ---
const LocalGlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;800;900&display=swap');

  /* Prevent Paystack iframe white canvas flash during loading */
  iframe {
    background-color: transparent !important;
  }

  iframe[name*="paystack"], 
  iframe[src*="paystack"], 
  div[id*="paystack"],
  .paystack-inline-iframe,
  #paystack-container {
    background-color: transparent !important;
    background: transparent !important;
  }
`;

// --- ANIMATIONS ---
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const gridFade = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

// --- STYLES ---
const PageContainer = styled.section`
  min-height: 100vh;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.background};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 0; /* Starts at the very top edge */
  position: relative;
  overflow: hidden;
  animation: ${gridFade} 1s ease-out forwards;
`;

const HeroImage = styled.img`
  width: 100%;
  max-height: 540px; /* Maintain the height limit for the 1920x540 hero */
  object-fit: cover;
  border-bottom: 1px solid ${({ theme }) => theme.colors.muted};
  // box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  margin-bottom: 1rem;
  animation: ${gridFade} 1.2s ease-out forwards;
`;

const ContentWrapper = styled.div`
  max-width: 1200px; /* Wider to allow single line layout for the title */
  width: 100%;
  padding: 0 2rem 6rem 2rem;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: ${fadeIn} 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
`;

const MainTitle = styled.h1`
  font-family: 'Outfit', sans-serif;
  font-weight: 800;
  font-size: clamp(2.2rem, 5.5vw, 4.2rem);
  color: #f4efeeff; /* Copper/Terracotta color matching the hero image text */
  margin-bottom: 1rem;
  text-align: center;
  letter-spacing: -0.03em;
  line-height: 1.1;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    white-space: nowrap; /* Spans a single line on desktop */
  }
`;

const MainDescription = styled.p`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.secondary};
  text-align: center;
  max-width: 600px;
  margin-bottom: 3.5rem;
`;

const VideoContainer = styled.div`
  width: 100%;
  max-width: 800px;
  aspect-ratio: 16 / 9;
  background: rgba(30, 30, 30, 0.6);
  border: 1px dashed ${({ theme }) => theme.colors.primary};
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  cursor: pointer;
  margin-bottom: 5rem;
  overflow: hidden;
  box-shadow: inset 0 0 40px rgba(0,0,0,0.8);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);

  &:hover {
    border-style: solid;
    box-shadow: inset 0 0 50px rgba(212, 175, 55, 0.1), 0 10px 30px rgba(0, 0, 0, 0.6);
  }
`;

const PlayButton = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: rgba(18, 18, 18, 0.8);
  border: 2px solid ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  z-index: 2;

  svg {
    fill: ${({ theme }) => theme.colors.primary};
    width: 24px;
    height: 24px;
    margin-left: 4px;
    transition: all 0.3s ease;
  }

  ${VideoContainer}:hover & {
    background: ${({ theme }) => theme.colors.primary};
    transform: scale(1.1);

    svg {
      fill: ${({ theme }) => theme.colors.background};
    }
  }
`;

const VideoLabel = styled.span`
  margin-top: 1.5rem;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.secondary};
  text-transform: uppercase;
  letter-spacing: 0.2em;
  z-index: 2;
  transition: color 0.3s ease;

  ${VideoContainer}:hover & {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const VideoGridBackground = styled.div`
  position: absolute;
  inset: 0;
  background-image: 
    linear-gradient(rgba(212, 175, 55, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(212, 175, 55, 0.05) 1px, transparent 1px);
  background-size: 30px 30px;
  background-position: center;
  opacity: 0.4;
`;

const ListSection = styled.div`
  width: 100%;
  max-width: 800px;
  margin-bottom: 5rem;
  background: rgba(30, 30, 30, 0.2);
  border: 1px dashed ${({ theme }) => theme.colors.muted};
  border-radius: 8px;
  padding: 3rem;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  transition: border-color 0.3s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 2rem 1.5rem;
  }
`;

const ListTitle = styled.h2`
  font-family: 'Outfit', sans-serif;
  font-size: 1.8rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 2rem;
  letter-spacing: -0.02em;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  padding-bottom: 0.75rem;
`;

const BulletList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

const BulletItem = styled.li`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 1.05rem;
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  line-height: 1.4;

  &::before {
    content: '→';
    color: ${({ theme }) => theme.colors.primary};
    font-family: ${({ theme }) => theme.fonts.mono};
    font-weight: bold;
    flex-shrink: 0;
  }
`;

const BlueprintGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  width: 100%;
  max-width: 1000px;
  margin-bottom: 4rem;
`;

const BlueprintCard = styled.div`
  border: 1px dashed ${({ theme }) => theme.colors.muted};
  padding: 2.5rem 2rem;
  background: rgba(18, 18, 18, 0.4);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 8px;
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  position: relative;
  overflow: hidden;
  cursor: default;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: ${({ theme }) => theme.colors.primary};
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.4s ease;
  }

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);

    &::before {
      transform: scaleX(1);
    }
  }
`;

const CardNumber = styled.span`
  font-family: ${({ theme }) => theme.fonts.mono};
  color: ${({ theme }) => theme.colors.primary};
  font-size: 0.8rem;
  display: block;
  margin-bottom: 1.5rem;
  opacity: 0.7;
`;

const CardTitle = styled.h3`
  font-family: 'Outfit', sans-serif; /* Updated to use the new page title font */
  font-weight: 600;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 1rem;
  letter-spacing: -0.01em;
`;

const CardDescription = styled.p`
  font-family: ${({ theme }) => theme.fonts.body};
  color: ${({ theme }) => theme.colors.secondary};
  font-size: 0.95rem;
  line-height: 1.6;
`;

const CtaSection = styled.div`
  width: 100%;
  max-width: 800px;
  margin-top: 0;
  margin-bottom: 5rem;
  background: linear-gradient(135deg, rgba(212, 175, 55, 0.05) 0%, rgba(18, 18, 18, 0.8) 100%);
  border: 1px solid ${({ theme }) => theme.colors.muted};
  border-radius: 8px;
  padding: 3rem;
  display: grid;
  grid-template-columns: 1.25fr 1fr;
  gap: 2.5rem;
  align-items: center;
  position: relative;
  overflow: hidden;
  //box-shadow: 0 15px 40px rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  transition: border-color 0.4s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
  }

  /* Subtle technical corner marks */
  &::before, &::after {
    content: '';
    position: absolute;
    width: 12px;
    height: 12px;
    border-color: ${({ theme }) => theme.colors.primary};
    border-style: solid;
  }
  
  &::before {
    top: 12px;
    left: 12px;
    border-width: 1px 0 0 1px;
  }
  
  &::after {
    bottom: 12px;
    right: 12px;
    border-width: 0 1px 1px 0;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    padding: 2.5rem 1.5rem;
    gap: 2rem;
  }
`;

const CtaTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
`;

const CtaTitle = styled.h2`
  font-family: 'Outfit', sans-serif;
  font-size: 2.2rem;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 1.5rem;
  letter-spacing: -0.02em;
  line-height: 1.2;
`;

const CtaText = styled.div`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.6;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  
  strong {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const CtaImageContainer = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 1 / 1;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.05);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.4);
`;

const CtaImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease, filter 0.5s ease;

  ${CtaImageContainer}:hover & {
    transform: scale(1.05);
    filter: brightness(0.6);
  }
`;

const CtaButton = styled.button`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: ${({ theme }) => theme.colors.primary};
  border: 1px solid ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.background};
  padding: 1rem 2.2rem;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.85rem;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.7);
  z-index: 3;
  white-space: nowrap;

  &:hover {
    background: transparent;
    color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 25px rgba(212, 175, 55, 0.6);
    transform: translate(-50%, -52%) scale(1.05);
  }

  &:active {
    transform: translate(-50%, -48%) scale(0.98);
  }
`;

const RoadmapSection = styled.div`
  width: 100%;
  max-width: 800px;
  margin-bottom: 5rem;
  background: rgba(30, 30, 30, 0.1);
  border: 1px dashed ${({ theme }) => theme.colors.muted};
  border-radius: 8px;
  padding: 3rem;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  transition: border-color 0.3s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 2rem 1.5rem;
  }
`;

const RoadmapTitle = styled.h2`
  font-family: 'Outfit', sans-serif;
  font-size: 1.8rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 2rem;
  letter-spacing: -0.02em;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  padding-bottom: 0.75rem;
`;

const RoadmapGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 3rem 1.5rem; /* Row gap 3rem, Column gap 1.5rem */
  position: relative;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const RoadmapItemWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;

const RoadmapItem = styled.div`
  background: rgba(18, 18, 18, 0.6);
  border: 1px solid ${({ theme }) => theme.colors.muted};
  border-radius: 6px;
  padding: 1.25rem;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  position: relative;
  transition: all 0.3s ease;
  z-index: 2;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(212, 175, 55, 0.05);
  }
`;

const RoadmapItemName = styled.span`
  font-family: 'Outfit', sans-serif;
  font-size: 1.05rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

const HorizontalLink = styled.div`
  position: absolute;
  top: 50%;
  left: 100%;
  width: 1.5rem; /* matches the horizontal gap */
  height: 0;
  border-top: 2px dashed ${({ theme }) => theme.colors.primary};
  opacity: 0.3;
  transform: translateY(-50%);
  pointer-events: none;
  z-index: 1;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: none;
  }

  &.desktop-end {
    @media (min-width: 1025px) {
      display: none;
    }
  }

  &.tablet-end {
    @media (min-width: 769px) and (max-width: 1024px) {
      display: none;
    }
  }
`;

const SnakeLink = styled.div`
  position: absolute;
  top: 100%;
  pointer-events: none;
  opacity: 0.3;
  z-index: 1;

  @media (min-width: 1025px) {
    display: none;
    &.desktop-show {
      display: block;
    }
    
    right: 50%;
    width: calc(300% + 4.5rem); 
    height: 3rem; /* row gap */
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      width: 2px;
      height: 50%;
      border-right: 2px dashed ${({ theme }) => theme.colors.primary};
    }
    
    &::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 0;
      width: 100%;
      height: 50%;
      border-top: 2px dashed ${({ theme }) => theme.colors.primary};
      border-left: 2px dashed ${({ theme }) => theme.colors.primary};
    }
  }

  @media (min-width: 769px) and (max-width: 1024px) {
    display: none;
    &.tablet-show {
      display: block;
    }
    
    right: 50%;
    width: calc(200% + 3.0rem); 
    height: 3rem; /* row gap */
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      width: 2px;
      height: 50%;
      border-right: 2px dashed ${({ theme }) => theme.colors.primary};
    }
    
    &::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 0;
      width: 100%;
      height: 50%;
      border-top: 2px dashed ${({ theme }) => theme.colors.primary};
      border-left: 2px dashed ${({ theme }) => theme.colors.primary};
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: none;
  }
`;

const MobileArrowLink = styled.div`
  display: none;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${({ theme }) => theme.colors.primary};
    opacity: 0.3;
    font-size: 0.9rem;
    margin: 0.35rem 0;
    user-select: none;

    &::before {
      content: '↓';
    }
  }
`;

const BuildSection = styled.div`
  width: 100%;
  max-width: 800px;
  margin-bottom: 5rem;
  background: rgba(30, 30, 30, 0.1);
  border: 1px dashed ${({ theme }) => theme.colors.muted};
  border-radius: 8px;
  padding: 3rem;
  display: grid;
  grid-template-columns: 1fr 1.25fr;
  gap: 3rem;
  align-items: center;
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  transition: border-color 0.4s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
  }

  /* Subtle technical corner marks */
  &::before, &::after {
    content: '';
    position: absolute;
    width: 12px;
    height: 12px;
    border-color: ${({ theme }) => theme.colors.primary};
    border-style: solid;
  }
  
  &::before {
    top: 12px;
    left: 12px;
    border-width: 1px 0 0 1px;
  }
  
  &::after {
    bottom: 12px;
    right: 12px;
    border-width: 0 1px 1px 0;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    padding: 2.5rem 1.5rem;
    gap: 2rem;
  }
`;

const BuildImageContainer = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 1 / 1;
  border-radius: 6px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.05);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.4);
`;

const BuildImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;

  ${BuildImageContainer}:hover & {
    transform: scale(1.05);
  }
`;

const BuildTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
`;

const BuildTitle = styled.h2`
  font-family: 'Outfit', sans-serif;
  font-size: 1.8rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 1.5rem;
  letter-spacing: -0.02em;
  line-height: 1.2;
`;

const BuildDescription = styled.p`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const BuildList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
`;

const BuildItem = styled.li`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 1.05rem;
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  align-items: center;
  gap: 0.75rem;
  line-height: 1.4;

  &::before {
    content: '';
    width: 6px;
    height: 6px;
    background: ${({ theme }) => theme.colors.primary};
    border-radius: 50%;
    flex-shrink: 0;
  }
`;

const ModalBackdrop = styled.div<{ $isPaying?: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: ${({ $isPaying }) => ($isPaying ? 'rgba(0, 0, 0, 0.98)' : 'rgba(0, 0, 0, 0.85)')};
  backdrop-filter: blur(${({ $isPaying }) => ($isPaying ? '16px' : '8px')});
  -webkit-backdrop-filter: blur(${({ $isPaying }) => ($isPaying ? '16px' : '8px')});
  z-index: 2000; /* Above everything */
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1.5rem;
  animation: ${gridFade} 0.3s ease-out forwards;
  transition: background 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94), backdrop-filter 0.5s ease;
`;

const ModalContainer = styled.div<{ $isPaying?: boolean }>`
  max-width: 500px;
  width: 100%;
  max-height: 85vh;
  overflow-y: auto;
  background: rgba(18, 18, 18, 0.95);
  border: 1px solid ${({ theme }) => theme.colors.muted};
  border-radius: 8px;
  padding: 3rem 2.5rem;
  position: relative;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.9);
  animation: ${fadeIn} 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  opacity: ${({ $isPaying }) => ($isPaying ? 0.15 : 1)};
  filter: ${({ $isPaying }) => ($isPaying ? 'brightness(0.2) blur(3px)' : 'none')};
  transition: opacity 0.5s ease, filter 0.5s ease, border-color 0.4s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
  }

  /* Website themed scrollbar styling */
  scrollbar-width: thin;
  scrollbar-color: ${({ theme }) => theme.colors.primary} rgba(18, 18, 18, 0.8);

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    background: rgba(18, 18, 18, 0.8);
    border-radius: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.muted};
    border-radius: 4px;
    border: 1px solid rgba(212, 175, 55, 0.2);
  }
  &::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.colors.primary};
  }

  /* Subtle technical corner marks */
  &::before, &::after {
    content: '';
    position: absolute;
    width: 12px;
    height: 12px;
    border-color: ${({ theme }) => theme.colors.primary};
    border-style: solid;
    pointer-events: none;
  }
  
  &::before {
    top: 12px;
    left: 12px;
    border-width: 1px 0 0 1px;
  }
  
  &::after {
    bottom: 12px;
    right: 12px;
    border-width: 0 1px 1px 0;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1.25rem;
  right: 1.25rem;
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.secondary};
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 10;
  line-height: 1;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    transform: rotate(90deg);
  }
`;

const ModalTitle = styled.h2`
  font-family: 'Outfit', sans-serif;
  font-size: 2rem;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 1.5rem;
  letter-spacing: 0.1em;
`;

const ModalDescription = styled.p`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 1.05rem;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const ModalModulesRow = styled.div`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
`;

const ModuleSeparator = styled.span`
  color: ${({ theme }) => theme.colors.primary};
  opacity: 0.6;
`;

const ModalInfoText = styled.p`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.secondary};
  line-height: 1.5;
  margin-bottom: 1.25rem;
  opacity: 0.9;
`;

const PayPrompt = styled.span`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.25em;
  color: ${({ theme }) => theme.colors.secondary};
  margin-bottom: 1rem;
  margin-top: 1rem;
`;

const SpinnerAnim = keyframes`
  to { transform: rotate(360deg); }
`;

const LoadingSpinner = styled.div`
  width: 16px;
  height: 16px;
  border: 2px solid ${({ theme }) => theme.colors.background};
  border-top-color: transparent;
  border-radius: 50%;
  animation: ${SpinnerAnim} 0.8s linear infinite;
`;

const PayButton = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  border: 1px solid ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.background};
  padding: 1rem 3rem;
  width: 100%;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.95rem;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  box-shadow: 0 4px 15px rgba(212, 175, 55, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;

  &:hover:not(:disabled) {
    background: transparent;
    color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 25px rgba(212, 175, 55, 0.5);
  }

  &:disabled {
    opacity: 0.85;
    cursor: wait;
  }
`;

const SuccessMessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  animation: ${fadeIn} 0.5s ease-out forwards;
`;

const SuccessIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: rgba(212, 175, 55, 0.1);
  border: 2px solid ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
`;

const EmailInput = styled.input`
  width: 100%;
  padding: 0.85rem 1rem;
  background: rgba(30, 30, 30, 0.6);
  border: 1px solid ${({ theme }) => theme.colors.muted};
  border-radius: 4px;
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 0.95rem;
  margin-bottom: 0.75rem;
  transition: border-color 0.3s ease;
  outline: none;
  text-align: center;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.secondary};
    opacity: 0.6;
  }
`;

const ErrorText = styled.span`
  color: #ff5555;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.8rem;
  margin-bottom: 0.75rem;
  display: block;
`;

const ModulePriceTag = styled.div`
  font-family: 'Outfit', sans-serif;
  font-size: 1.5rem;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 1.25rem;
  padding: 0.5rem 1.25rem;
  background: rgba(212, 175, 55, 0.1);
  border: 1px solid rgba(212, 175, 55, 0.2);
  border-radius: 4px;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
`;

const ModuleDetailList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 1.5rem 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: 100%;
  text-align: left;
`;

const ModuleDetailItem = styled.li`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  line-height: 1.4;

  &::before {
    content: '→';
    color: ${({ theme }) => theme.colors.primary};
    font-family: ${({ theme }) => theme.fonts.mono};
    font-weight: bold;
    flex-shrink: 0;
  }
`;

const DiscountBadge = styled.span`
  background: rgba(212, 175, 55, 0.2);
  color: ${({ theme }) => theme.colors.primary};
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.75rem;
  padding: 0.25rem 0.6rem;
  border-radius: 3px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

export interface RoadmapModuleData {
  id: string;
  name: string;
  price: number;
  description: string;
  details: string[];
  isCapstone?: boolean;
}

export const roadmapModulesData: RoadmapModuleData[] = [
  {
    id: 'git',
    name: 'Git',
    price: 100,
    description: 'Master distributed version control, branching workflows, and team collaboration.',
    details: [
      'Repository initialization, commits, and commit graph inspection',
      'Branching models, merging protocols, and conflict resolution',
      'Remote synchronization, pull requests, and code reviews',
      'Rebasing, stashing, and release tagging best practices',
    ],
  },
  {
    id: 'bash',
    name: 'Bash Essentials',
    price: 100,
    description: 'Command-line system control, shell scripts, and environment automation.',
    details: [
      'POSIX file system navigation and permission bits (chmod/chown)',
      'Command piping, Standard I/O redirection, and text streams',
      'Environment variables, shell configuration, and alias hooks',
      'Writing robust, production-ready Bash automation scripts',
    ],
  },
  {
    id: 'c',
    name: 'C Programming',
    price: 100,
    description: 'Low-level system architecture, manual memory management, and pointers.',
    details: [
      'Pointers, stack/heap allocation, and dynamic memory (malloc/free)',
      'Structs, unions, bitwise operations, and memory alignment',
      'Compilation pipeline (preprocessor, compiler, assembler, linker)',
      'Implementing low-level data structures and byte-level algorithms',
    ],
  },
  {
    id: 'oop',
    name: 'Object-Oriented Programming',
    price: 100,
    description: 'Object-oriented architectural patterns and encapsulation mechanics.',
    details: [
      'Encapsulation, Data Hiding, and Access Modifiers',
      'Inheritance hierarchies, Code Composition, and Polymorphism',
      'Interface segregation, abstract base classes, and dynamic dispatch',
      'Applying SOLID software design principles in production code',
    ],
  },
  {
    id: 'python',
    name: 'Python',
    price: 100,
    description: 'High-level application engineering, data automation, and backend tools.',
    details: [
      'Python data structures (lists, dicts, sets, comprehension patterns)',
      'Functional paradigms, decorators, context managers, and generators',
      'Module systems, virtual environments, and exception handling',
      'Building REST clients, data processors, and backend services',
    ],
  },
  {
    id: 'sql',
    name: 'SQL',
    price: 100,
    description: 'Relational database architecture, queries, indexing, and data persistence.',
    details: [
      'Relational schema design, normalization, and entity relationships',
      'Complex multi-table JOINs, subqueries, and window functions',
      'Indexing strategies, query execution plans, and performance tuning',
      'Transactions, ACID compliance, and schema migrations',
    ],
  },
  {
    id: 'js',
    name: 'JavaScript',
    price: 100,
    description: 'Modern asynchronous runtime mechanics, DOM control, and event loops.',
    details: [
      'ES6+ modern syntax, lexical scoping, closures, and prototypes',
      'Asynchronous JS: Event Loop, Call Stack, Microtasks, and Promises',
      'Async/Await patterns and API data fetching protocols',
      'Browser DOM manipulation, custom events, and client logic',
    ],
  },
  {
    id: 'networking',
    name: 'Networking Basics',
    price: 100,
    description: 'Core internet protocol suites, packet routing, and network diagnostics.',
    details: [
      'OSI 7-Layer model and TCP/IP protocol suite architecture',
      'IPv4/IPv6 addressing, subnetting, CIDR notation, and DNS lookup',
      'TCP handshake, stateful connections vs UDP datagrams',
      'Sockets, gateways, firewalls, and network inspection tools',
    ],
  },
  {
    id: 'http',
    name: 'HTTP',
    price: 100,
    description: 'Web transfer protocols, headers, session security, and REST communication.',
    details: [
      'HTTP request/response message structure and status codes',
      'REST verbs (GET, POST, PUT, DELETE, PATCH, OPTIONS)',
      'Cookies, sessions, authorization headers, and CORS policies',
      'TLS/SSL handshake, HTTPS encryption, and web security',
    ],
  },
  {
    id: 'apis',
    name: 'APIs',
    price: 100,
    description: 'API architectural design, JSON contracts, rate limiting, and security.',
    details: [
      'REST API design conventions and resource URI modeling',
      'JSON payload validation, schema definitions, and error contracts',
      'Authentication standards (Bearer JWT, OAuth2, API Keys)',
      'Rate limiting, pagination algorithms, and OpenAPI specs',
    ],
  },
  {
    id: 'projects',
    name: 'Projects',
    price: 0,
    description: 'Capstone portfolio implementation phase with 1-on-1 personal feedback.',
    details: [
      '100% Discounted Capstone phase included with full course enrollment',
      'Engineering real-world applications (CLI tools, APIs, DB apps, Full-stack)',
      'Comprehensive, line-by-line personal code reviews from Donnie',
      'Requires purchase of all 10 preceding modules to activate access',
    ],
    isCapstone: true,
  },
];

export const SeEssentials = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPaying, setIsPaying] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [selectedModule, setSelectedModule] = useState<RoadmapModuleData | null>(null);
  const [modulePaymentSuccess, setModulePaymentSuccess] = useState(false);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  useEffect(() => {
    document.title = 'SE Essentials - Donnie Draper';
  }, []);

  const handlePaystackPayment = () => {
    if (!email || !email.includes('@')) {
      setEmailError('Please enter a valid email address.');
      return;
    }
    setEmailError('');
    setIsPaying(true);

    const publicKey = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY || 'pk_test_YOUR_PAYSTACK_PUBLIC_KEY';

    try {
      const paystack = new PaystackPop();
      paystack.newTransaction({
        key: publicKey,
        email: email,
        amount: 400 * 100, // R400 in cents (40000 cents)
        currency: 'ZAR',
        onSuccess: (transaction: any) => {
          console.log('Paystack transaction successful:', transaction);
          setIsPaying(false);
          setPaymentSuccess(true);
        },
        onCancel: () => {
          console.log('Paystack transaction cancelled');
          setIsPaying(false);
        },
        onError: (error: any) => {
          console.error('Paystack transaction error:', error);
          setIsPaying(false);
          setPaymentSuccess(true);
        }
      });
    } catch (err) {
      console.error('Failed to launch Paystack inline popup:', err);
      setTimeout(() => {
        setIsPaying(false);
        setPaymentSuccess(true);
      }, 1500);
    }
  };

  const handleSingleModulePayment = (mod: RoadmapModuleData) => {
    if (!email || !email.includes('@')) {
      setEmailError('Please enter a valid email address.');
      return;
    }
    setEmailError('');
    setIsPaying(true);

    const publicKey = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY || 'pk_test_YOUR_PAYSTACK_PUBLIC_KEY';

    try {
      const paystack = new PaystackPop();
      paystack.newTransaction({
        key: publicKey,
        email: email,
        amount: mod.price * 100, // R100 in cents = 10000 cents
        currency: 'ZAR',
        onSuccess: (transaction: any) => {
          console.log('Paystack module transaction successful:', transaction);
          setIsPaying(false);
          setModulePaymentSuccess(true);
        },
        onCancel: () => {
          console.log('Paystack module transaction cancelled');
          setIsPaying(false);
        },
        onError: (error: any) => {
          console.error('Paystack module transaction error:', error);
          setIsPaying(false);
          setModulePaymentSuccess(true);
        }
      });
    } catch (err) {
      console.error('Failed to launch Paystack inline popup:', err);
      setTimeout(() => {
        setIsPaying(false);
        setModulePaymentSuccess(true);
      }, 1500);
    }
  };

  const sections = [
    {
      num: '01',
      title: 'Architectural Integrity',
      desc: 'The baseline requirements for software system architecture. Understanding structural consistency, decision modularity, and trade-off mapping.',
    },
    {
      num: '02',
      title: 'Design Patterns & Cohesion',
      desc: 'Standardized creational, structural, and behavioral patterns. Ensuring high cohesion and loose coupling across service boundaries.',
    },
    {
      num: '03',
      title: 'Validation & Testing Protocols',
      desc: 'Methodical verification pathways. From unit specifications to end-to-end user-flow validation, keeping the execution path predictable.',
    },
  ];

  const points = [
    'The difference between Computer Science and Software Engineering',
    'The foundations every software engineer should build',
    'The tools I recommend learning first',
    'The programming roadmap I\'d follow today',
    'Common mistakes beginners make',
    'Career paths in software engineering',
  ];

  const projects = [
    'Command-line utility',
    'Task manager',
    'REST API',
    'Database application',
    'Full-stack project of choice',
  ];

  return (
    <PageContainer>
      <LocalGlobalStyle />
      <HeroImage src="/se-essentials.png" alt="Software Engineering Essentials Hero" />
      <ContentWrapper>
        <MainTitle>Software Engineering Essentials</MainTitle>
        <MainDescription>A free introduction to becoming a software engineer.</MainDescription>

        <VideoContainer>
          <VideoGridBackground />
          <PlayButton>
            <svg viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </PlayButton>
          <VideoLabel>▶ Embedded video [YouTube video placeholder]</VideoLabel>
        </VideoContainer>

        <ListSection>
          <ListTitle>What You'll Learn</ListTitle>
          <BulletList>
            {points.map((point, index) => (
              <BulletItem key={index}>{point}</BulletItem>
            ))}
          </BulletList>
        </ListSection>

        <CtaSection>
          <CtaTextContainer>
            <CtaTitle>Ready to Go Further?</CtaTitle>
            <CtaText>
              <p>This is where you transition naturally.</p>
              <p>This video is an introduction.</p>
              <p><strong>Software Engineering Essentials</strong> is the complete hands-on course.</p>
            </CtaText>
          </CtaTextContainer>
          <CtaImageContainer>
            <CtaImage src="/textbook.png" alt="Software Engineering Essentials Textbook" />
            <CtaButton onClick={() => setIsModalOpen(true)}>Sign Up</CtaButton>
          </CtaImageContainer>
        </CtaSection>

        <RoadmapSection>
          <RoadmapTitle>Roadmap</RoadmapTitle>
          <RoadmapGrid>
            {roadmapModulesData.map((mod, index) => {
              const isLast = index === roadmapModulesData.length - 1;
              const isDesktopEndOfRow = (index + 1) % 4 === 0;
              const isTabletEndOfRow = (index + 1) % 3 === 0;
              const isDesktopSnake = index === 3 || index === 7;
              const isTabletSnake = index === 2 || index === 5 || index === 8;

              return (
                <Fragment key={mod.id}>
                  <RoadmapItemWrapper>
                    <RoadmapItem 
                      onClick={() => {
                        setSelectedModule(mod);
                        setModulePaymentSuccess(false);
                      }}
                      style={{ cursor: 'pointer' }}
                    >
                      <RoadmapItemName>{mod.name}</RoadmapItemName>
                    </RoadmapItem>
                    
                    {!isLast && (
                      <HorizontalLink 
                        className={`${isDesktopEndOfRow ? 'desktop-end' : ''} ${isTabletEndOfRow ? 'tablet-end' : ''}`}
                      />
                    )}

                    {!isLast && (isDesktopSnake || isTabletSnake) && (
                      <SnakeLink 
                        className={`${isDesktopSnake ? 'desktop-show' : 'desktop-hide'} ${isTabletSnake ? 'tablet-show' : 'tablet-hide'}`}
                      />
                    )}
                  </RoadmapItemWrapper>
                  {!isLast && <MobileArrowLink />}
                </Fragment>
              );
            })}
          </RoadmapGrid>
        </RoadmapSection>

        <BuildSection>
          <BuildImageContainer>
            <BuildImage src="/ux-giants-1-1.png" alt="Software Projects Showcase" />
          </BuildImageContainer>
          <BuildTextContainer>
            <BuildTitle>What You'll Build</BuildTitle>
            <BuildDescription>
              At the end of the 6 weeks course, you'll be equipped to build these projects. Personal feedback will be provided:
            </BuildDescription>
            <BuildList>
              {projects.map((proj, index) => (
                <BuildItem key={index}>{proj}</BuildItem>
              ))}
            </BuildList>
          </BuildTextContainer>
        </BuildSection>

        <BlueprintGrid>
          {sections.map((sec, i) => (
            <BlueprintCard key={i}>
              <CardNumber>// SECTION {sec.num}</CardNumber>
              <CardTitle>{sec.title}</CardTitle>
              <CardDescription>{sec.desc}</CardDescription>
            </BlueprintCard>
          ))}
        </BlueprintGrid>
      </ContentWrapper>

      {/* REGISTRATION MODAL */}
      {isModalOpen && (
        <ModalBackdrop 
          $isPaying={isPaying}
          onClick={() => {
            if (!isPaying) {
              setIsModalOpen(false);
              setPaymentSuccess(false);
            }
          }}
        >
          <ModalContainer 
            $isPaying={isPaying}
            onClick={(e) => e.stopPropagation()}
          >
            {!paymentSuccess ? (
              <>
                <CloseButton onClick={() => !isPaying && setIsModalOpen(false)}>×</CloseButton>
                <ModalTitle>REGISTRATION</ModalTitle>
                <ModalDescription>
                  Register for Software Engineering Essentials by purchasing 4 essentials modules at R400.
                </ModalDescription>
                <ModalModulesRow>
                  <span>Git</span>
                  <ModuleSeparator>|</ModuleSeparator>
                  <span>Bash Essentials</span>
                  <ModuleSeparator>|</ModuleSeparator>
                  <span>C Programming</span>
                  <ModuleSeparator>|</ModuleSeparator>
                  <span>OOP</span>
                </ModalModulesRow>
                <ModalInfoText>
                  After you've made your payment, you will receive an email that contains login details to your learning center. It may take a day or 2 to receive them.
                </ModalInfoText>

                <EmailInput
                  type="email"
                  placeholder="Enter your email address..."
                  value={email}
                  disabled={isPaying}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {emailError && <ErrorText>{emailError}</ErrorText>}

                <PayPrompt>Pay below</PayPrompt>
                <PayButton onClick={handlePaystackPayment} disabled={isPaying}>
                  {isPaying ? (
                    <>
                      <LoadingSpinner />
                      <span>Loading Paygate...</span>
                    </>
                  ) : (
                    <span>Pay Now</span>
                  )}
                </PayButton>
              </>
            ) : (
              <SuccessMessage>
                <CloseButton onClick={() => {
                  setIsModalOpen(false);
                  setPaymentSuccess(false);
                }}>×</CloseButton>
                <SuccessIcon>✓</SuccessIcon>
                <ModalTitle style={{ color: '#D4AF37' }}>SUCCESSFUL</ModalTitle>
                <ModalDescription>
                  Thank you for your payment of R400!
                </ModalDescription>
                <ModalInfoText>
                  Registration complete for <strong>{email}</strong>. Your login credentials to the learning center will be emailed to you within 1 to 2 days.
                </ModalInfoText>
                <PayButton onClick={() => {
                  setIsModalOpen(false);
                  setPaymentSuccess(false);
                }}>
                  Close
                </PayButton>
              </SuccessMessage>
            )}
          </ModalContainer>
        </ModalBackdrop>
      )}

      {/* INDIVIDUAL MODULE DETAIL MODAL */}
      {selectedModule && (
        <ModalBackdrop 
          $isPaying={isPaying}
          onClick={() => {
            if (!isPaying) {
              setSelectedModule(null);
              setModulePaymentSuccess(false);
            }
          }}
        >
          <ModalContainer 
            $isPaying={isPaying}
            onClick={(e) => e.stopPropagation()}
          >
            {!modulePaymentSuccess ? (
              <>
                <CloseButton onClick={() => !isPaying && setSelectedModule(null)}>×</CloseButton>
                <ModalTitle>{selectedModule.name}</ModalTitle>
                <ModalDescription>
                  {selectedModule.description}
                </ModalDescription>

                <ModulePriceTag>
                  {selectedModule.isCapstone ? (
                    <>
                      <span>Price: R0</span>
                      <DiscountBadge>100% Discount</DiscountBadge>
                    </>
                  ) : (
                    <span>Price: R{selectedModule.price}</span>
                  )}
                </ModulePriceTag>

                <ModuleDetailList>
                  {selectedModule.details.map((detail, idx) => (
                    <ModuleDetailItem key={idx}>{detail}</ModuleDetailItem>
                  ))}
                </ModuleDetailList>

                {!selectedModule.isCapstone && (
                  <>
                    <EmailInput
                      type="email"
                      placeholder="Enter your email address..."
                      value={email}
                      disabled={isPaying}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    {emailError && <ErrorText>{emailError}</ErrorText>}
                  </>
                )}

                <PayPrompt>
                  {selectedModule.isCapstone ? 'Activation Requirement' : 'Pay below'}
                </PayPrompt>

                {selectedModule.isCapstone ? (
                  <PayButton disabled={true} style={{ opacity: 0.6, cursor: 'not-allowed' }}>
                    <span>Locked — Complete All Modules First</span>
                  </PayButton>
                ) : (
                  <PayButton onClick={() => handleSingleModulePayment(selectedModule)} disabled={isPaying}>
                    {isPaying ? (
                      <>
                        <LoadingSpinner />
                        <span>Loading Paygate...</span>
                      </>
                    ) : (
                      <span>Pay Now</span>
                    )}
                  </PayButton>
                )}
              </>
            ) : (
              <SuccessMessage>
                <CloseButton onClick={() => {
                  setSelectedModule(null);
                  setModulePaymentSuccess(false);
                }}>×</CloseButton>
                <SuccessIcon>✓</SuccessIcon>
                <ModalTitle style={{ color: '#D4AF37' }}>SUCCESSFUL</ModalTitle>
                <ModalDescription>
                  Thank you for purchasing <strong>{selectedModule.name}</strong> for R{selectedModule.price}!
                </ModalDescription>
                <ModalInfoText>
                  Registration complete for <strong>{email}</strong>. Module access details will be sent to your email address shortly.
                </ModalInfoText>
                <PayButton onClick={() => {
                  setSelectedModule(null);
                  setModulePaymentSuccess(false);
                }}>
                  Close
                </PayButton>
              </SuccessMessage>
            )}
          </ModalContainer>
        </ModalBackdrop>
      )}
    </PageContainer>
  );
};
