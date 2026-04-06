import React, { useState, useEffect } from 'react';
import { awards } from '@/data/awards';

export function AwardsSection() {
  const [inView, setInView] = useState(false);
  const [typingIndex, setTypingIndex] = useState(0);
  const commandText = 'cat /etc/awards.log';
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setInView(true);
          
          // Simulate typing effect for command
          let index = 0;
          const interval = setInterval(() => {
            if (index <= commandText.length) {
              setTypingIndex(index);
              index++;
            } else {
              clearInterval(interval);
            }
          }, 100);
          
          return () => clearInterval(interval);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById('awards');
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);
  
  return (
    <section id="awards" style={{backgroundColor: '#060606'}} className="py-16 md:py-20 bg-black border-t border-white/10 relative overflow-hidden">
      {/* Terminal-like header */}
      <div className="max-w-screen-lg mx-auto px-4 md:px-8 relative z-10">
        <div className="mb-12">
          <div className="flex items-center text-white mb-2">
            <span className="terminal-text mr-2">~/portfolio $</span>
            <span className="terminal-font text-white text-lg">cd awards/</span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-white border-b border-white/20 pb-2 mb-6">
            AWARDS<span className="animate-blink">_</span>
          </h2>
        </div>
        
        {/* Awards as a terminal output */}
        <div className="border border-white/20 bg-black rounded mb-8">
          {/* Terminal header */}
          <div className="border-b border-white/20 bg-white/5 px-4 py-2 flex justify-between items-center">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="text-white/60 text-xs font-mono">awards.log</div>
          </div>
          
          {/* Terminal content */}
          <div className="p-4 font-mono text-sm">
            <div className="flex mb-6">
              <span className="text-green-400 mr-2">user@portfolio:~/awards$</span> 
              <span className="text-white">{typingIndex > 0 ? commandText.substring(0, typingIndex) : ''}</span>
              {typingIndex < commandText.length && <span className="animate-blink">|</span>}
            </div>
            
            {typingIndex >= commandText.length && (
              <div className="space-y-6">
                <div className="text-white/70 text-xs mb-4 border-b border-white/10 pb-2">
                  # AWARDS AND CERTIFICATIONS LOG
                  <br />
                  # Displaying {awards.length} entries
                  <br />
                  # Last updated: {new Date().toLocaleDateString()}
                </div>
                
                {awards.map((award, index) => (
                  <div 
                    key={award.id} 
                    className="border border-white/10 p-4 animate-fadeIn" 
                    style={{ animationDelay: `${0.2 + index * 0.1}s` }}
                  >
                    <div className="flex items-center mb-2">
                      <span className="w-6 h-6 flex items-center justify-center bg-white/5 rounded border border-white/10 mr-2">
                        <i className="fas fa-trophy text-yellow-400 text-xs"></i>
                      </span>
                      <span className="text-green-400 font-bold">{award.title}</span>
                      <span className="ml-auto text-white/50 text-xs">{award.year}</span>
                    </div>
                    
                    <div className="pl-8 border-l border-white/10 ml-3">
                      <div className="text-white/80 text-sm mb-2">
                        {award.description}
                      </div>
                      
                      {award.details && (
                        <div className="mt-2 bg-white/5 p-2 border-l-2 border-green-400/50 text-xs text-white/70">
                          <span className="text-green-400 block mb-1">// Additional information:</span>
                          {award.details}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                
                {/* Final command line */}
                <div className="mt-6 pt-2 flex border-t border-white/10">
                  <span className="text-green-400 mr-2">user@portfolio:~/awards$</span>
                  <span className="animate-blink">_</span>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Bottom section */}
        <div className="mt-6 text-center">
          <div className="inline-block border border-white/20 px-4 py-2 text-white/60 font-mono text-xs">
            $ grep "achievement" --color /var/log/career.log
          </div>
        </div>
      </div>
    </section>
  );
}
