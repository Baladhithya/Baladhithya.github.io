import React, { useState, useEffect } from 'react';
import { projects } from '@/data/projects';

export function ProjectsSection() {
  const [visibleProjects, setVisibleProjects] = useState(3);
  const [activeFilter, setActiveFilter] = useState('all');
  const [inView, setInView] = useState(false);
  const [typingCommand, setTypingCommand] = useState('');
  const commandText = 'ls -la ~/projects';
  
  // Extract unique technologies
  const allTechnologies = projects.flatMap(project => project.technologies);
  const uniqueTechnologies = allTechnologies.filter((tech, index) => allTechnologies.indexOf(tech) === index);
  
  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.technologies.includes(activeFilter));

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

    const section = document.getElementById('projects');
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);
  
  const loadMoreProjects = () => {
    setVisibleProjects(prev => Math.min(prev + 3, filteredProjects.length));
  };

  return (
    <section id="projects" className="py-16 md:py-20 bg-black border-t border-white/10 relative overflow-hidden">
      {/* Terminal-like header */}
      <div className="max-w-screen-lg mx-auto px-4 md:px-8 relative z-10">
        <div className="mb-12">
          <div className="flex items-center text-white mb-2">
            <span className="terminal-text mr-2">~/portfolio $</span>
            <span className="terminal-font text-white text-lg">cd projects/</span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-white border-b border-white/20 pb-2 mb-6">
            PROJECTS<span className="animate-blink">_</span>
          </h2>
        </div>
        
        {/* Command line */}
        <div className="border border-white/20 bg-black rounded overflow-hidden mb-8">
          {/* Terminal header */}
          <div className="border-b border-white/20 bg-white/5 px-4 py-2 flex justify-between items-center">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="text-white/60 text-xs font-mono">projects.sh</div>
          </div>
          
          {/* Command input */}
          <div className="p-4 font-mono text-sm text-white/80">
            <div className="flex mb-4">
              <span className="text-green-400 mr-2">user@portfolio:~/projects$</span>
              <span>{typingCommand}</span>
              {typingCommand === commandText ? null : <span className="animate-blink">|</span>}
            </div>
            
            {typingCommand === commandText && (
              <>
                {/* Command output */}
                <div className="mb-6">
                  <div className="text-white/70 mb-4">total {projects.length}</div>
                  
                  {/* Project filters as command options */}
                  <div className="mb-6 overflow-x-auto border border-white/10 bg-black/30 p-2">
                    <div className="flex items-center">
                      <span className="text-white/70 mr-2">FILTER:</span>
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => setActiveFilter('all')}
                          className={`px-3 py-1 font-mono text-xs transition-colors ${
                            activeFilter === 'all' 
                              ? 'bg-green-400/10 text-green-400 border border-green-400/30' 
                              : 'text-white/60 hover:bg-white/10 border border-white/20'
                          }`}
                        >
                          all
                        </button>
                        
                        {uniqueTechnologies.slice(0, 6).map((tech) => (
                          <button 
                            key={tech}
                            onClick={() => setActiveFilter(tech)}
                            className={`px-3 py-1 font-mono text-xs transition-colors ${
                              activeFilter === tech 
                                ? 'bg-green-400/10 text-green-400 border border-green-400/30' 
                                : 'text-white/60 hover:bg-white/10 border border-white/20'
                            }`}
                          >
                            {tech.toLowerCase().replace(/\s+/g, '-')}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {/* Projects list as command output */}
                  <div className="space-y-6">
                    {filteredProjects.slice(0, visibleProjects).map((project, index) => (
                      <div key={project.id} className="border border-white/10 bg-black/30 p-4 animate-fadeIn" style={{animationDelay: `${0.1 * index}s`}}>
                        <div className="mb-2 flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center">
                              <span className="text-green-400 font-bold">{project.title}</span>
                              <span className="ml-2 px-2 py-0.5 text-xs bg-white/10 text-white/70 font-mono">{project.date}</span>
                            </div>
                            <div className="mt-1 text-white/80 text-sm">
                              {project.description}
                            </div>
                          </div>
                        </div>
                        
                        {/* Tech stack */}
                        <div className="mb-3">
                          <div className="text-white/50 text-xs font-mono mb-1">TECH_STACK:</div>
                          <div className="flex flex-wrap gap-2">
                            {project.technologies.map((tech, idx) => (
                              <span 
                                key={idx} 
                                className="inline-block px-2 py-0.5 text-xs font-mono bg-black border border-white/20 text-white/80"
                              >
                                {tech.toLowerCase()}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        {/* Links section */}
                        <div className="border-t border-white/10 pt-2 flex flex-wrap gap-3 mt-3">
                          <a 
                            href={project.githubLink} 
                            className="inline-flex items-center text-xs text-green-400 hover:text-green-300 transition-colors"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <i className="fab fa-github mr-1"></i> $ git clone {project.title.toLowerCase().replace(/\s+/g, '-')}
                          </a>
                          
                          {project.demoLink && (
                            <a 
                              href={project.demoLink} 
                              className="inline-flex items-center text-xs text-green-400 hover:text-green-300 transition-colors"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <i className="fas fa-external-link-alt mr-1"></i> $ open demo
                            </a>
                          )}
                          
                          {project.paperLink && (
                            <a 
                              href={project.paperLink} 
                              className="inline-flex items-center text-xs text-green-400 hover:text-green-300 transition-colors"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <i className="fas fa-file-alt mr-1"></i> $ cat paper.pdf
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Load more */}
                  {visibleProjects < filteredProjects.length && (
                    <div className="mt-4 text-white/80 font-mono text-xs">
                      <span>Type</span>
                      <button
                        onClick={loadMoreProjects}
                        className="mx-2 text-green-400 hover:underline"
                      >
                        "more -f projects.log"
                      </button>
                      <span>to load more projects</span>
                    </div>
                  )}
                  
                  {/* Final command prompt */}
                  <div className="mt-6 border-t border-white/10 pt-4 flex">
                    <span className="text-green-400 mr-2">user@portfolio:~/projects$</span>
                    <span className="animate-blink">_</span>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
        
        {/* GitHub link */}
        <div className="mt-6 text-center">
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-block border border-white/20 px-4 py-2 text-white/70 hover:bg-white/10 transition-colors font-mono text-sm"
          >
            $ explorer https://github.com/username
          </a>
        </div>
      </div>
    </section>
  );
}
