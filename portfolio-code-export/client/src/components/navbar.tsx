import React, { useState, useEffect } from 'react';
import { scrollToSection } from '@/lib/utils';

const navLinks = [
  { name: 'About', href: 'about' },
  { name: 'Education', href: 'education' },
  { name: 'Skills', href: 'skills' },
  { name: 'Experience', href: 'experience' },
  { name: 'Projects', href: 'projects' },
  { name: 'Contact', href: 'contact' }
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleNavClick = (sectionId: string) => {
    scrollToSection(sectionId);
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      // Update navbar background on scroll
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Update active section
      const sections = document.querySelectorAll('section[id]');
      let current = '';
      
      sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        if (sectionTop < 100) {
          current = section.getAttribute('id') || '';
        }
      });
      
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Desktop Navigation */}
      <nav id="desktop-nav" className={`fixed w-full z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/90 backdrop-blur-md shadow-lg py-2' 
          : 'bg-transparent py-4'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <a 
                href="#" 
                className={`text-2xl font-bold transition-colors duration-300 ${
                  isScrolled ? 'text-primary' : 'text-white'
                } hover:text-gradient`}
              >
                <span className="relative group">
                  Baladhithya T
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-500 to-purple-500 transition-all duration-300 group-hover:w-full"></span>
                </span>
              </a>
            </div>
            <div className="hidden md:flex items-center space-x-1">
              {navLinks.map((link) => (
                <a 
                  key={link.href} 
                  href={`#${link.href}`} 
                  onClick={(e) => { 
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className={`px-4 py-2 rounded-full transition-all duration-300 relative ${
                    activeSection === link.href 
                      ? isScrolled 
                        ? 'text-white bg-primary font-medium' 
                        : 'text-white bg-white/20 backdrop-blur-sm font-medium' 
                      : isScrolled 
                        ? 'text-primary hover:bg-primary/10' 
                        : 'text-white hover:bg-white/10'
                  }`}
                >
                  {link.name}
                </a>
              ))}
            </div>
            
            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button 
                onClick={toggleMenu} 
                className={`focus:outline-none transition-colors ${isScrolled ? 'text-primary' : 'text-white'}`}
                aria-label="Toggle menu"
              >
                {!mobileMenuOpen ? (
                  <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                  </svg>
                ) : (
                  <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div 
        id="mobile-menu" 
        className={`fixed inset-0 bg-primary/95 backdrop-blur-lg z-40 flex-col justify-center items-center md:hidden transition-all duration-500 ${
          mobileMenuOpen 
            ? 'opacity-100 translate-y-0 flex' 
            : 'opacity-0 -translate-y-full hidden'
        }`}
      >
        <div className="space-y-6 py-8 text-center">
          {navLinks.map((link) => (
            <div key={link.href} className="transform transition-transform duration-300 hover:scale-110">
              <a 
                href={`#${link.href}`} 
                className={`text-2xl font-medium py-2 px-6 rounded-full ${
                  activeSection === link.href 
                    ? 'text-white bg-white/20' 
                    : 'text-white/80 hover:text-white'
                }`}
                onClick={(e) => { 
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
              >
                {link.name}
              </a>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
