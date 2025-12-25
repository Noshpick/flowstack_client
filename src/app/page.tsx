'use client'
import {
  HeroSection,
  ServicesSection,
  PortfolioSection,
  StagesSection,
  TeamSection,
  ContactSection
} from './components/sections';
import "../../i18n/i18n";

export default function HomePage() {
  return (
    <main className='mt-20'>
      <div id="hero">
        <HeroSection />
      </div>
      
      <div id="services">
        <ServicesSection />
      </div>
      
      <div id="portfolio">
        <PortfolioSection />
      </div>
      
      <div id="stages">
        <StagesSection />
      </div>
      
      <div id="team">
        <TeamSection />
      </div>
      
      <div id="contact">
        <ContactSection />
      </div>
    </main>
  );
}