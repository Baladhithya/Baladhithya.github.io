import { useState, useEffect, useRef } from 'react';
import { scrollToSection } from '@/lib/utils';
import type { Theme } from '../App';

const navLinks = [
  { name: 'About', href: 'about' },
  { name: 'Education', href: 'education' },
  { name: 'Skills', href: 'skills' },
  { name: 'Experience', href: 'experience' },
  { name: 'Projects', href: 'projects' },
  { name: 'Certs', href: 'certifications' },
  { name: 'Notes', href: 'notes' },
  { name: 'Contact', href: 'contact' }
];

interface NavbarProps {
  theme: Theme;
  toggleTheme: () => void;
  soundEnabled: boolean;
  toggleSound: () => void;
}

export function Navbar({ theme, toggleTheme, soundEnabled, toggleSound }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [scrollY, setScrollY] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  const isScrolled = scrollY > 40;
  const isLight = theme === 'light';

  const handleNavClick = (sectionId: string) => {
    scrollToSection(sectionId);
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;

      setScrollY(currentY);
      setScrollProgress(docHeight > 0 ? (currentY / docHeight) * 100 : 0);

      if (currentY > lastScrollY.current + 8 && currentY > 120) {
        setIsVisible(false);
      } else if (currentY < lastScrollY.current - 4) {
        setIsVisible(true);
      }
      lastScrollY.current = currentY;

      const sections = document.querySelectorAll('section[id]');
      let current = '';
      sections.forEach(section => {
        const top = section.getBoundingClientRect().top;
        if (top < 120) current = section.getAttribute('id') || '';
      });
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const IconButton = ({ onClick, title, label, children }: {
    onClick: () => void; title: string; label: string; children: React.ReactNode;
  }) => (
    <button
      onClick={onClick}
      title={title}
      aria-label={label}
      className="w-8 h-8 flex items-center justify-center border font-mono text-xs transition-all duration-300 focus:outline-none theme-toggle"
    >
      {children}
    </button>
  );

  const SoundIcon = () => soundEnabled ? (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
    </svg>
  ) : (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
      <line x1="23" y1="9" x2="17" y2="15"/>
      <line x1="17" y1="9" x2="23" y2="15"/>
    </svg>
  );

  const ThemeIcon = () => isLight ? (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  ) : (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5"/>
      <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
      <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
    </svg>
  );

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="absolute top-0 left-0 h-[2px] transition-all duration-150 ease-out z-10 nav-progress"
          style={{ width: `${scrollProgress}%`, opacity: isScrolled ? 1 : 0 }} />
        <div className={`absolute inset-0 transition-all duration-500 nav-bg ${isScrolled ? 'scrolled' : ''}`} />

        <div className="relative max-w-6xl mx-auto px-6 lg:px-8">
          <div className={`flex justify-between items-center transition-all duration-500 ${isScrolled ? 'py-3' : 'py-5'}`}>

            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="group flex items-center gap-2 focus:outline-none"
            >
              <span className={`font-mono font-bold tracking-tight transition-all duration-500 nav-logo ${isScrolled ? 'text-base' : 'text-lg'}`}>
                <span className="nav-accent opacity-70 group-hover:opacity-100 transition-opacity duration-300">~/</span>
                <span className="nav-logo-name group-hover:text-[color:var(--term-green)] transition-colors duration-300">baladhithya</span>
              </span>
              <span className={`inline-block w-[2px] nav-accent-bg animate-pulse transition-all duration-500 ${isScrolled ? 'h-3.5' : 'h-4'}`} />
            </button>

            {/* Desktop */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href;
                return (
                  <a
                    key={link.href}
                    href={`#${link.href}`}
                    onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                    className={`relative px-3 py-1.5 font-mono text-xs transition-all duration-300 group focus:outline-none nav-link ${isActive ? 'active' : ''}`}
                  >
                    {isActive && <span className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full nav-accent-bg animate-pulse" />}
                    {link.name}
                    <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-px nav-accent-bg transition-all duration-300 ${isActive ? 'w-full opacity-60' : 'w-0 group-hover:w-full opacity-40'}`} />
                  </a>
                );
              })}

              <div className="flex items-center gap-1.5 ml-2">
                <IconButton onClick={toggleSound} title={soundEnabled ? 'Mute sounds' : 'Enable sounds'} label="Toggle sound">
                  <SoundIcon />
                </IconButton>
                <IconButton onClick={toggleTheme} title={isLight ? 'Switch to dark' : 'Switch to light'} label="Toggle theme">
                  <ThemeIcon />
                </IconButton>
              </div>
            </div>

            {/* Mobile */}
            <div className="md:hidden flex items-center gap-2">
              <button onClick={toggleSound} className="nav-link theme-toggle focus:outline-none" aria-label="Toggle sound">
                <SoundIcon />
              </button>
              <button onClick={toggleTheme} className="nav-link theme-toggle focus:outline-none" aria-label="Toggle theme">
                <ThemeIcon />
              </button>
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="nav-link focus:outline-none" aria-label="Toggle menu">
                <div className="w-5 flex flex-col gap-1.5 items-end">
                  <span className={`block h-px bg-current transition-all duration-300 ${mobileMenuOpen ? 'w-5 rotate-45 translate-y-2.5' : 'w-5'}`} />
                  <span className={`block h-px bg-current transition-all duration-300 ${mobileMenuOpen ? 'opacity-0 w-0' : 'w-3.5'}`} />
                  <span className={`block h-px bg-current transition-all duration-300 ${mobileMenuOpen ? 'w-5 -rotate-45 -translate-y-2.5' : 'w-5'}`} />
                </div>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={`fixed inset-0 z-40 md:hidden transition-all duration-500 ${mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 mobile-menu-bg backdrop-blur-xl" onClick={() => setMobileMenuOpen(false)} />
        <div className="relative flex flex-col items-center justify-center h-full gap-2">
          <p className="font-mono nav-accent text-xs mb-6 tracking-widest uppercase opacity-40">— navigate —</p>
          {navLinks.map((link, i) => {
            const isActive = activeSection === link.href;
            return (
              <a
                key={link.href}
                href={`#${link.href}`}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                className={`font-mono text-2xl py-2 px-6 transition-all duration-300 mobile-nav-link ${isActive ? 'active' : ''}`}
                style={{ transitionDelay: mobileMenuOpen ? `${i * 50}ms` : '0ms', transform: mobileMenuOpen ? 'translateY(0)' : 'translateY(12px)', opacity: mobileMenuOpen ? 1 : 0 }}
              >
                {isActive && <span className="nav-accent mr-2">{'>'}</span>}
                {link.name}
              </a>
            );
          })}
        </div>
      </div>
    </>
  );
}
