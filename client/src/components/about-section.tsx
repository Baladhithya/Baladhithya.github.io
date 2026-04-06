import React, { useState, useEffect } from 'react';
import { personalInfo } from '@/data/personal-info';

export function AboutSection() {
  const [inView, setInView] = useState(false);
  const [commandIndex, setCommandIndex] = useState(0);
  
  const commands = [
    { command: 'cd about/', output: 'Switching to directory: about/' },
    { command: 'ls -la', output: 'Total 4 items: [README.md] [skills.json] [contact.sh] [details.txt]' },
    { command: 'cat details.txt', output: 'Loading personal information...' },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setInView(true);
          
          // Simulate terminal commands typing
          const timer = setInterval(() => {
            setCommandIndex(prev => {
              if (prev < commands.length - 1) {
                return prev + 1;
              } else {
                clearInterval(timer);
                return prev;
              }
            });
          }, 1500);
          
          return () => clearInterval(timer);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById('about');
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

  const contactItems = [
    { icon: 'map-marker-alt', label: 'LOCATION', value: personalInfo.location.split(',')[0] + ', ' + personalInfo.location.split(',')[1] },
    { icon: 'phone', label: 'PHONE', value: personalInfo.phone },
    { icon: 'envelope', label: 'EMAIL', value: personalInfo.email, link: `mailto:${personalInfo.email}` },
    { icon: 'graduation-cap', label: 'EDUCATION', value: 'B.Tech in Computer Science & Engineering' },
    { icon: 'github', label: 'GITHUB', value: 'github.com', link: personalInfo.github, isExternal: true },
    { icon: 'linkedin', label: 'LINKEDIN', value: 'linkedin.com', link: personalInfo.linkedin, isExternal: true }
  ];

  return (
    <section id="about" className="py-16 md:py-20 relative overflow-hidden bg-black border-t border-white/10">
      {/* Terminal-like header */}
      <div className="max-w-screen-lg mx-auto px-4 md:px-8 relative z-10">
        <div className="mb-12">
          <div className="flex items-center text-white mb-2">
            <span className="terminal-text mr-2">~/portfolio $</span>
            <span className="terminal-font text-white text-lg">about</span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-white border-b border-white/20 pb-2 mb-6">
            ABOUT<span className="animate-blink">_</span>
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Terminal style about column */}
          <div className={`${inView ? 'animate-fadeIn' : 'opacity-0'}`} style={{animationDelay: '0.2s'}}>
            <div className="border border-white/20 bg-black rounded mb-6 font-mono text-sm text-white">
              <div className="border-b border-white/20 bg-white/5 px-4 py-2 flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="text-white/60 text-xs">terminal</div>
              </div>
              
              <div className="p-4 h-80 overflow-y-auto font-mono">
                {commands.slice(0, commandIndex + 1).map((cmd, index) => (
                  <div key={index} className="mb-4">
                    <div className="flex">
                      <span className="text-green-400 mr-2">user@portfolio:~$</span>
                      <span className="text-white">{cmd.command}</span>
                    </div>
                    <div className="text-white/80 mt-1 pl-4">{cmd.output}</div>
                    
                    {index === commands.length - 1 && (
                      <div className="mt-4 pl-4">
                        {personalInfo.about.map((paragraph, idx) => (
                          <p key={idx} className="text-white/90 mb-4 leading-relaxed">
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <span className="animate-blink text-white">_</span>
              </div>
            </div>
            
          </div>
          
          {/* Personal details card */}
          <div className={`border border-white/20 bg-black/40 p-6 ${inView ? 'animate-fadeIn' : 'opacity-0'}`} style={{animationDelay: '0.4s'}}>
            <div className="border-b border-white/20 pb-3 mb-6">
              <div className="flex items-center mb-1">
                <span className="inline-block w-2 h-2 bg-white mr-2"></span>
                <h3 className="text-white text-lg font-mono">CONTACT_INFO</h3>
              </div>
              <div className="text-white/60 text-xs font-mono pl-4">
                personal_details.config
              </div>
            </div>
            
            <div className="space-y-4">
              {contactItems.map((item, index) => (
                <div 
                  key={index} 
                  className={`font-mono text-sm border-b border-white/10 pb-3 ${inView ? 'animate-fadeIn' : 'opacity-0'}`}
                  style={{animationDelay: `${0.5 + index * 0.1}s`}}
                >
                  <div className="text-white/60 mb-1">
                    [{item.label}]
                  </div>
                  <div>
                    {item.link ? (
                      <a 
                        href={item.link} 
                        className="text-white hover:text-green-400 transition-colors flex items-center"
                        target={item.isExternal ? "_blank" : undefined}
                        rel={item.isExternal ? "noopener noreferrer" : undefined}
                      >
                        <i className={`fa${item.icon.includes('github') || item.icon.includes('linkedin') ? 'b' : 's'} fa-${item.icon} mr-2 text-green-400`}></i>
                        {item.value}
                        {item.isExternal && <span className="ml-1 text-xs text-white/40">[external]</span>}
                      </a>
                    ) : (
                      <div className="text-white flex items-center">
                        <i className={`fa${item.icon.includes('github') || item.icon.includes('linkedin') ? 'b' : 's'} fa-${item.icon} mr-2 text-green-400`}></i>
                        {item.value}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            <div className={`mt-8 ${inView ? 'animate-fadeIn' : 'opacity-0'}`} style={{animationDelay: '0.9s'}}>
              <a 
                href="/resume.pdf" 
                target="_blank"
                className="block w-full border border-white/50 bg-black hover:bg-white hover:text-black text-white py-3 font-mono text-center transition-colors"
              >
                $ ./download_resume.sh
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
