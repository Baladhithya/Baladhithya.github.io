import { useEffect, useState, useCallback } from 'react';
import { Navbar } from '@/components/navbar';
import { HeroSection } from '@/components/hero-section';
import { AboutSection } from '@/components/about-section';
import { EducationSection } from '@/components/education-section';
import { SkillsSection } from '@/components/skills-section';
import { ExperienceSection } from '@/components/experience-section';
import { ProjectsSection } from '@/components/projects-section';
import { AwardsSection } from '@/components/awards-section';
import { CertificationsSection } from '@/components/certifications-section';
import { NotesSection } from '@/components/notes-section';
import { ContactSection } from '@/components/contact-section';
import { Footer } from '@/components/footer';
import { Toaster } from '@/components/ui/toaster';
import { SplashScreen } from '@/components/splash-screen';
import { KonamiEasterEgg } from '@/components/konami-easter-egg';

export type Theme = 'dark' | 'light';

const DEFAULT_ACCENT = '#00ff41';

function applyAccent(color: string, theme: Theme) {
  const root = document.documentElement;
  if (theme === 'light') {
    root.style.setProperty('--term-green', darkenHex(color, 0.55));
    root.style.setProperty('--term-green-dim', hexToRgba(darkenHex(color, 0.55), 0.65));
  } else {
    root.style.setProperty('--term-green', color);
    root.style.setProperty('--term-green-dim', hexToRgba(color, 0.6));
  }
}

function hexToRgba(hex: string, alpha: number) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

function darkenHex(hex: string, factor: number) {
  const r = Math.round(parseInt(hex.slice(1, 3), 16) * factor);
  const g = Math.round(parseInt(hex.slice(3, 5), 16) * factor);
  const b = Math.round(parseInt(hex.slice(5, 7), 16) * factor);
  return `#${r.toString(16).padStart(2,'0')}${g.toString(16).padStart(2,'0')}${b.toString(16).padStart(2,'0')}`;
}

// Section flash-on-enter using IntersectionObserver
function useSectionFlash() {
  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    const seen = new Set<Element>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !seen.has(entry.target)) {
            seen.add(entry.target);
            entry.target.classList.add('section-flash');
            setTimeout(() => entry.target.classList.remove('section-flash'), 500);
          }
        });
      },
      { threshold: 0.15 }
    );

    sections.forEach(s => observer.observe(s));
    return () => observer.disconnect();
  }, []);
}

function App() {
  const [showTop, setShowTop] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => {
    try { return localStorage.getItem('portfolio-sound') !== 'false'; } catch { return false; }
  });
  const [theme, setTheme] = useState<Theme>(() => {
    return (localStorage.getItem('portfolio-theme') as Theme) || 'dark';
  });
  const [accentColor, setAccentColor] = useState<string>(() => {
    return localStorage.getItem('portfolio-accent') || DEFAULT_ACCENT;
  });

  useSectionFlash();

  useEffect(() => {
    document.title = "Baladhithya T — Portfolio";
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('portfolio-theme', theme);
    applyAccent(accentColor, theme);
  }, [theme, accentColor]);

  useEffect(() => {
    localStorage.setItem('portfolio-accent', accentColor);
    applyAccent(accentColor, theme);
  }, [accentColor, theme]);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = showSplash ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [showSplash]);

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark');

  const toggleSound = useCallback(() => {
    setSoundEnabled(prev => {
      const next = !prev;
      try { localStorage.setItem('portfolio-sound', String(next)); } catch {}
      return next;
    });
  }, []);

  const handleColorSelect = (color: string) => setAccentColor(color);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      {showSplash && (
        <SplashScreen
          onDismiss={() => setShowSplash(false)}
          onColorSelect={handleColorSelect}
          selectedColor={accentColor}
        />
      )}

      <KonamiEasterEgg />

      <Navbar theme={theme} toggleTheme={toggleTheme} soundEnabled={soundEnabled} toggleSound={toggleSound} />
      <HeroSection soundEnabled={soundEnabled} />
      <AboutSection />
      <EducationSection />
      <SkillsSection />
      <ExperienceSection />
      <ProjectsSection />
      <AwardsSection />
      <CertificationsSection />
      <NotesSection />
      <ContactSection />
      <Footer />
      <Toaster />

      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to top"
        className={`fixed bottom-6 right-6 z-50 w-9 h-9 flex items-center justify-center border font-mono text-xs transition-all duration-300 back-to-top ${
          showTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
          <path d="M1 7L6 2L11 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </button>
    </div>
  );
}

export default App;
