import React, { useState, useEffect } from 'react';
import { skills } from '@/data/skills';

export function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState<number | null>(1);
  const [inView, setInView] = useState(false);
  const [typingCommand, setTypingCommand] = useState('');
  const commandText = 'ls -la skills/';

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setInView(true);
          
          // Simulate typing command
          let index = 0;
          const interval = setInterval(() => {
            if (index <= commandText.length) {
              setTypingCommand(commandText.substring(0, index));
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

    const section = document.getElementById('skills');
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
    <section id="skills" className="py-16 md:py-20 bg-black border-t border-white/10 relative overflow-hidden">
      {/* Terminal-like header */}
      <div className="max-w-screen-lg mx-auto px-4 md:px-8 relative z-10">
        <div className="mb-12">
          <div className="flex items-center text-white mb-2">
            <span className="terminal-text mr-2">~/portfolio $</span>
            <span className="terminal-font text-white text-lg">cd skills/</span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-white border-b border-white/20 pb-2 mb-6">
            TECHNICAL_SKILLS<span className="animate-blink">_</span>
          </h2>
        </div>
        
        {/* Command line interface for skills */}
        <div className="border border-white/20 bg-black rounded mb-8">
          {/* Terminal header */}
          <div className="border-b border-white/20 bg-white/5 px-4 py-2 flex justify-between items-center">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="text-white/60 text-xs font-mono">skills.sh</div>
          </div>
          
          {/* Command prompt */}
          <div className="p-4 font-mono text-sm text-white/80">
            <div className="flex mb-4">
              <span className="text-green-400 mr-2">user@portfolio:~/skills$</span>
              <span>{typingCommand}</span>
              {typingCommand === commandText ? null : <span className="animate-blink">|</span>}
            </div>
            
            {typingCommand === commandText && (
              <>
                {/* Category tabs as terminal commands */}
                <div className="border border-white/10 bg-black/30 p-2 mb-6 overflow-x-auto">
                  <div className="flex space-x-2">
                    {skills.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => setActiveCategory(category.id)}
                        className={`px-3 py-1.5 font-mono text-xs whitespace-nowrap transition-colors border ${
                          activeCategory === category.id 
                            ? 'border-green-400 text-green-400 bg-black' 
                            : 'border-white/20 text-white/60 hover:border-white/40'
                        }`}
                      >
                        {category.title.toUpperCase().replace(/\s+/g, '_')}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Active category content */}
                {skills
                  .filter(category => category.id === activeCategory)
                  .map((category) => (
                    <div key={category.id} className="animate-fadeIn">
                      <div className="flex mb-3">
                        <span className="text-green-400 mr-2">user@portfolio:~/skills$</span>
                        <span className="text-white">cat {category.title.toLowerCase().replace(/\s+/g, '_')}.json</span>
                      </div>
                      
                      {/* Output header */}
                      <div className="p-3 mb-2 border-b border-white/10 font-mono text-xs text-white/80">
                        <div className="flex items-center">
                          <i className={`fas fa-${category.icon} text-green-400 mr-2`}></i>
                          <span className="text-green-400">{category.title.toUpperCase()}</span>
                        </div>
                      </div>
                      
                      {/* JSON-like output for skills */}
                      <div className="p-3 bg-black/20 border border-white/10 font-mono text-xs text-white/80">
                        <div className="text-white">{'{'}</div>
                        <div className="ml-4 text-white">"skills": [</div>
                        {category.skills.map((skill, index) => (
                          <div key={index} className="ml-8 text-white">
                            {'{'}
                            <span className="text-green-400 ml-4">"name"</span>: 
                            <span className="text-yellow-300">{` "${skill.name}"`}</span>,
                            <span className="text-green-400 ml-4">"level"</span>: 
                            <span className="text-yellow-300">{` "${skill.level}/5"`}</span>
                            {index === category.skills.length - 1 ? '}' : '},'}
                          </div>
                        ))}
                        <div className="ml-4 text-white">]</div>
                        <div className="text-white">{'}'}</div>
                      </div>
                      
                      {/* Skill grid visualization */}
                      <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-3">
                        {category.skills.map((skill, index) => (
                          <div 
                            key={index}
                            className="p-2 border border-white/20 font-mono text-xs flex items-center justify-between text-white/90 hover:bg-white/5 transition-colors"
                          >
                            <div className="flex items-center">
                              <i className={`${skill.icon} text-green-400 mr-2`}></i>
                              <span>{skill.name}</span>
                            </div>
                            <div className="flex">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <div
                                  key={i}
                                  className={`w-2 h-2 ml-1 ${
                                    i < skill.level
                                      ? 'bg-green-400'
                                      : 'bg-white/20'
                                  }`}
                                ></div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
              </>
            )}
          </div>
        </div>
        
        {/* Skills prompt */}
        <div className="mt-6 text-center">
          <div className="inline-block border border-white/20 px-4 py-2 text-white/70 font-mono text-xs">
            $ whois developer | grep skills
          </div>
        </div>
      </div>
    </section>
  );
}
