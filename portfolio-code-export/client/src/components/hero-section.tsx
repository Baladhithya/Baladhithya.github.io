import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { personalInfo } from '@/data/personal-info';
import { scrollToSection } from '@/lib/utils';

export function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [typingIndex, setTypingIndex] = useState(0);
  
  useEffect(() => {
    setIsLoaded(true);
    
    // Simulate typing effect
    const typingInterval = setInterval(() => {
      setTypingIndex(prev => {
        if (prev < personalInfo.title.length) {
          return prev + 1;
        } else {
          clearInterval(typingInterval);
          return prev;
        }
      });
    }, 100);
    
    return () => clearInterval(typingInterval);
  }, []);

  return (
    <section id="hero" className="pt-16 md:pt-20 min-h-screen flex items-center bg-black relative overflow-hidden">
      {/* Scanlines effect */}
      <div className="absolute inset-0 pointer-events-none z-10 opacity-30">
        {Array.from({length: 150}).map((_, i) => (
          <div 
            key={i} 
            className="absolute h-px w-full bg-white/10"
            style={{ top: `${i * 4}px` }}
          ></div>
        ))}
      </div>
      
      <div className="max-w-screen-lg mx-auto px-4 md:px-8 w-full relative z-20">
        {/* Profile image and header section */}
        <div className="flex flex-col md:flex-row items-start mb-16">
          <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-2 border-white mb-4 md:mb-0 md:mr-8">
            <div className="h-full w-full flex items-center justify-center bg-white/5">
              <div className="text-white text-5xl">
                <i className="fas fa-user"></i>
              </div>
            </div>
          </div>
          
          <div className="flex-1">
            <h1 className="text-2xl md:text-4xl font-bold text-white mb-1">
              {personalInfo.name} <span className="opacity-60 text-xs">●</span>
            </h1>
            
            <div className="h-8 mb-1">
              <h2 className="text-lg md:text-xl terminal-font text-white">
                {personalInfo.title.substring(0, typingIndex)}
                <span className="animate-blink inline-block">|</span>
              </h2>
            </div>
            
            <div className="flex items-center text-white/60 text-sm space-x-4 mb-4">
              <a 
                href={`mailto:${personalInfo.email}`}
                className="flex items-center hover:text-white transition-colors"
              >
                <span>{personalInfo.email}</span> <span className="ml-1">✉</span>
              </a>
              
              <a 
                href={personalInfo.website || '#'} 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center hover:text-white transition-colors"
              >
                <span>{personalInfo.website || 'website.com'}</span> <span className="ml-1">🔗</span>
              </a>
              
              <div className="flex items-center">
                <span>{personalInfo.location}</span> <span className="ml-1">📍</span>
              </div>
            </div>
            
            <div className="flex space-x-4">
              <a 
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-white/70 transition-colors"
                aria-label="GitHub"
              >
                <i className="fab fa-github"></i> <span className="text-sm">github/{personalInfo.github.split('/').pop()}</span>
              </a>
              
              <a 
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-white/70 transition-colors"
                aria-label="LinkedIn"
              >
                <i className="fab fa-linkedin"></i> <span className="text-sm">linkedin/{personalInfo.linkedin.split('/').pop()}</span>
              </a>
            </div>
          </div>
        </div>
        
        {/* Bio section */}
        <div className="mb-10">
          <div className="flex items-center text-white mb-4">
            <span className="mr-2">$</span>
            <span className="terminal-text">cat bio.txt</span>
          </div>
          
          <div className="border border-white/20 p-4 rounded bg-white/5 text-white mb-6">
            <p className="font-mono leading-relaxed">
              {personalInfo.bio}
            </p>
          </div>
          
          {/* Download resume button */}
          <div className="flex space-x-4 mt-4">
            <Button 
              onClick={() => window.open('/resume.pdf', '_blank')}
              variant="outline"
              className="border-white/50 text-white hover:bg-white hover:text-black transition-all font-mono"
            >
              $ ./download_resume.sh
            </Button>
            
            <Button 
              onClick={() => scrollToSection('contact')}
              variant="outline"
              className="border-white/50 text-white hover:bg-white hover:text-black transition-all font-mono"
            >
              $ ./contact.sh
            </Button>
          </div>
        </div>
        
        {/* Next section indicator */}
        <div className="text-center text-white/50 animate-pulse mt-12">
          <button 
            onClick={() => scrollToSection('about')} 
            className="focus:outline-none"
            aria-label="Scroll to next section"
          >
            <div className="text-sm font-mono mb-1">$ cd ./about</div>
            <div className="text-xl">▼</div>
          </button>
        </div>
      </div>
    </section>
  );
}
