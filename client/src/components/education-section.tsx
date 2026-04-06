import React, { useState, useEffect } from 'react';
import { education } from '@/data/education';

export function EducationSection() {
  const [inView, setInView] = useState(false);
  const [selectedItem, setSelectedItem] = useState(education[0]?.id || 1);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById('education');
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
    <section id="education" style={{backgroundColor: '#060606'}} className="py-16 md:py-20 bg-black border-t border-white/10 relative overflow-hidden">
      {/* Terminal-like header */}
      <div className="max-w-screen-lg mx-auto px-4 md:px-8 relative z-10">
        <div className="mb-12">
          <div className="flex items-center text-white mb-2">
            <span className="terminal-text mr-2">~/portfolio $</span>
            <span className="terminal-font text-white text-lg">cd education/</span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-white border-b border-white/20 pb-2 mb-6">
            EDUCATION<span className="animate-blink">_</span>
          </h2>
        </div>
        
        {/* Education view as a terminal window */}
        <div className="border border-white/20 bg-black rounded mb-8">
          {/* Terminal header */}
          <div className="border-b border-white/20 bg-white/5 px-4 py-2 flex justify-between items-center">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="text-white/60 text-xs font-mono">education.sh</div>
          </div>
          
          {/* Command navigation */}
          <div className="p-4 border-b border-white/10 bg-black font-mono text-white/70 text-sm">
            <span>$ ls -la education/</span>
            <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-2">
              {education.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setSelectedItem(item.id)}
                  className={`text-left px-3 py-1.5 border border-white/20 transition-colors ${
                    selectedItem === item.id ? 'bg-white/10 text-green-400' : 'hover:bg-white/5'
                  }`}
                >
                  {item.id === 1 ? 
                    <i className="fas fa-university mr-2"></i> : 
                    <i className="fas fa-school mr-2"></i>
                  }
                  {item.institution.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>
          
          {/* Content area */}
          <div className="p-4 h-96 overflow-y-auto font-mono">
            {education
              .filter(item => item.id === selectedItem)
              .map(item => (
                <div key={item.id} className={`animate-fadeIn`}>
                  <div className="flex mb-4">
                    <span className="text-green-400 mr-2">user@portfolio:~/education$</span>
                    <span className="text-white">cat {item.institution.toLowerCase().replace(/\s+/g, '_')}.txt</span>
                  </div>
                  
                  <div className="pl-4 border-l-2 border-white/20 space-y-4 mb-6">
                    <div className="grid grid-cols-2 gap-2 text-white/80">
                      <div className="text-white/50">INSTITUTION:</div>
                      <div className="text-white">{item.institution}</div>
                      
                      <div className="text-white/50">DEGREE:</div>
                      <div className="text-white">{item.degree}</div>
                      
                      <div className="text-white/50">PERIOD:</div>
                      <div className="text-white">{item.period}</div>
                      
                      <div className="text-white/50">LOCATION:</div>
                      <div className="text-white">{item.location}</div>
                    </div>
                    
                    <div className="text-white/80 py-1">
                      <p className="mb-2 text-white/50">DESCRIPTION:</p>
                      <p className="pl-2 text-white">{item.description}</p>
                    </div>
                    
                    {item.additionalInfo && (
                      <div className="text-white/80 py-1">
                        <p className="mb-2 text-white/50">ADDITIONAL INFO:</p>
                        <p className="pl-2 text-white">{item.additionalInfo}</p>
                      </div>
                    )}
                    
                    {item.courses && (
                      <div className="text-white/80 py-1">
                        <p className="mb-2 text-white/50">KEY COURSES:</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pl-2">
                          {item.courses.map((course, idx) => (
                            <div 
                              key={idx} 
                              className="flex items-center"
                            >
                              <span className="text-green-400 mr-2">&gt;</span>
                              <span className="text-white">{course}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="font-mono text-white/60 mt-4 flex">
                    <span className="text-green-400 mr-2">user@portfolio:~/education$</span>
                    <span className="animate-blink">_</span>
                  </div>
                </div>
              ))}
          </div>
        </div>
        
        {/* Education prompt */}
        <div className={`mt-6 text-center ${inView ? 'animate-fadeIn' : 'opacity-0'}`}>
          <div className="inline-block border border-white/20 px-4 py-2 text-white/70 font-mono text-sm">
            $ echo "Continuous learning is my primary objective"
          </div>
        </div>
      </div>
    </section>
  );
}
