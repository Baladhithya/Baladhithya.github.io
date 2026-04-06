import React, { useEffect } from 'react';
import { Navbar } from '@/components/navbar';
import { HeroSection } from '@/components/hero-section';
import { AboutSection } from '@/components/about-section';
import { EducationSection } from '@/components/education-section';
import { SkillsSection } from '@/components/skills-section';
import { ExperienceSection } from '@/components/experience-section';
import { ProjectsSection } from '@/components/projects-section';
import { AwardsSection } from '@/components/awards-section';
import { ContactSection } from '@/components/contact-section';
import { Footer } from '@/components/footer';
import { Toaster } from '@/components/ui/toaster';

function App() {
  useEffect(() => {
    // Set document title
    document.title = "Baladhithya T - Portfolio";
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <EducationSection />
      <SkillsSection />
      <ExperienceSection />
      <ProjectsSection />
      <AwardsSection />
      <ContactSection />
      <Footer />
      <Toaster />
    </div>
  );
}

export default App;
