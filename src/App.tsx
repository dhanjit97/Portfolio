import React from 'react';
import { ScrollProgress } from './components/ScrollProgress';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MarqueeTape } from './components/MarqueeTape';
import { ProjectShowcase } from './components/ProjectShowcase';
import { TechnicalFocus } from './components/TechnicalFocus';
import { FieldNotes } from './components/FieldNotes';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-[#F4EFE6] text-[#141413] flex flex-col font-sans selection:bg-[#D7FF3F] selection:text-[#141413]">
      {/* Animated Neo-Brutalist Scroll Progress Bar */}
      <ScrollProgress />

      {/* Top Bar Contract (Wordmark - Links - Primary CTA) */}
      <Navbar />

      {/* Main Content Flow */}
      <main className="flex-1 flex flex-col">
        {/* Hero Section with Asymmetrical Typography & Signature 3D Specimen */}
        <Hero />

        {/* Continuous Engineering Marquee Hazard Tape */}
        <MarqueeTape />

        {/* Selected Work & Systems with Schematics & Architecture Dossiers */}
        <ProjectShowcase />

        {/* Technical Focus Pillars */}
        <TechnicalFocus />

        {/* Field Notes & Works in Progress */}
        <FieldNotes />

        {/* About & Engineering Ethos */}
        <AboutSection />

        {/* Direct Contact & Verification Links */}
        <ContactSection />
      </main>

      {/* Compliant Footer */}
      <Footer />
    </div>
  );
}
