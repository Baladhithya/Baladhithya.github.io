import React from 'react';
import { personalInfo } from '@/data/personal-info';
import { scrollToSection } from '@/lib/utils';

const navLinks = [
  { name: 'About', href: 'about' },
  { name: 'Education', href: 'education' },
  { name: 'Skills', href: 'skills' },
  { name: 'Experience', href: 'experience' },
  { name: 'Projects', href: 'projects' },
  { name: 'Contact', href: 'contact' }
];

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-black border-t border-white/10 text-white relative overflow-hidden py-8">
      <div className="max-w-screen-lg mx-auto px-4 md:px-6 lg:px-8 py-8 relative z-10">
        {/* Terminal header */}
        <div className="mb-6 border-b border-white/10 pb-4">
          <div className="flex items-center text-white mb-2">
            <span className="terminal-text text-green-400">user@portfolio:~$</span>
            <span className="terminal-font text-white ml-2">cat footer.txt</span>
          </div>
        </div>
        
        {/* Footer content in terminal style */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Column 1 - Name and Bio */}
          <div className="font-mono">
            <div className="text-green-400 font-bold mb-4">
              {personalInfo.name}
              <span className="text-white/60 ml-2 font-normal text-sm">// Developer</span>
            </div>
            
            <div className="text-white/80 text-sm mb-6 font-mono">
              Computer Science & Engineering student passionate about creating innovative technology solutions.
            </div>
            
            <div className="flex space-x-3">
              <a 
                href={personalInfo.linkedin} 
                className="px-3 py-1 border border-white/20 text-white/80 hover:text-green-400 hover:border-green-400/40 transition-colors duration-300 flex items-center text-sm"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <i className="fab fa-linkedin-in mr-2"></i>
                <span className="hidden sm:inline">LinkedIn</span>
              </a>
              <a 
                href={personalInfo.github} 
                className="px-3 py-1 border border-white/20 text-white/80 hover:text-green-400 hover:border-green-400/40 transition-colors duration-300 flex items-center text-sm"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <i className="fab fa-github mr-2"></i>
                <span className="hidden sm:inline">GitHub</span>
              </a>
              <a 
                href={`mailto:${personalInfo.email}`} 
                className="px-3 py-1 border border-white/20 text-white/80 hover:text-green-400 hover:border-green-400/40 transition-colors duration-300 flex items-center text-sm"
                aria-label="Email"
              >
                <i className="fas fa-envelope mr-2"></i>
                <span className="hidden sm:inline">Email</span>
              </a>
            </div>
          </div>
          
          {/* Column 2 - Quick Links */}
          <div className="font-mono">
            <div className="text-green-400 font-bold mb-4">
              Quick Links
              <span className="text-white/60 ml-2 font-normal text-sm">// Navigation</span>
            </div>
            
            <ul className="space-y-1 text-sm">
              {navLinks.map((link) => (
                <li key={link.href} className="transition-colors duration-300">
                  <a 
                    href={`#${link.href}`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.href);
                    }} 
                    className="text-white/80 hover:text-green-400 transition-colors flex items-center"
                  >
                    <span className="text-green-400 mr-2">$</span>
                    <span className="font-mono">cd {link.href.toLowerCase()}/</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Column 3 - Contact Info */}
          <div className="font-mono">
            <div className="text-green-400 font-bold mb-4">
              Contact Info
              <span className="text-white/60 ml-2 font-normal text-sm">// Get in touch</span>
            </div>
            
            <ul className="space-y-2 text-sm">
              <li className="flex items-start group">
                <span className="text-white/60 mr-2">Location:</span>
                <span className="text-white/90">{personalInfo.location}</span>
              </li>
              <li className="flex items-start group">
                <span className="text-white/60 mr-2">Phone:</span>
                <span className="text-white/90">{personalInfo.phone}</span>
              </li>
              <li className="flex items-start group">
                <span className="text-white/60 mr-2">Email:</span>
                <span className="text-white/90 break-all">{personalInfo.email}</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Footer copyright section */}
        <div className="border-t border-white/10 mt-8 pt-6 text-center font-mono text-sm">
          <div className="text-white/60 mb-4">
            <span className="text-green-400">user@portfolio:~$</span> echo "© {currentYear} {personalInfo.name}. All rights reserved."
          </div>
          
          <div className="text-white/50 text-xs">
            Designed with <span className="text-green-400">♥</span> and modern technologies
          </div>
          
          <div className="mt-6">
            <button 
              onClick={() => scrollToSection('hero')} 
              className="bg-black border border-white/20 px-4 py-1 text-white/80 hover:text-green-400 hover:border-green-400/40 transition-colors duration-300 text-sm font-mono"
              aria-label="Back to top"
            >
              $ cd /
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
