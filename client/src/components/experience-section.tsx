import React, { useState, useEffect } from "react";
import { experiences } from "@/data/experience";

export function ExperienceSection() {
  const [inView, setInView] = useState(false);
  const [currentExp, setCurrentExp] = useState(experiences[0]?.id || 1);
  const [typingIndex, setTypingIndex] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setInView(true);

          // Simulate typing effect for command
          let index = 0;
          const interval = setInterval(() => {
            setTypingIndex((prev) => {
              if (prev < 30) {
                // arbitrary max length for typing animation
                return prev + 1;
              } else {
                clearInterval(interval);
                return prev;
              }
            });
            index++;
          }, 50);

          return () => clearInterval(interval);
        }
      },
      { threshold: 0.1 },
    );

    const section = document.getElementById("experience");
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
    <section
      id="experience"
      style={{ backgroundColor: "#060606" }}
      className="py-16 md:py-20 bg-black border-t border-white/10 relative overflow-hidden"
    >
      {/* Terminal-like header */}
      <div className="max-w-screen-lg mx-auto px-4 md:px-8 relative z-10">
        <div className="mb-12">
          <div className="flex items-center text-white mb-2">
            <span className="terminal-text mr-2">~/portfolio $</span>
            <span className="terminal-font text-white text-lg">
              cd experience/
            </span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-white border-b border-white/20 pb-2 mb-6">
            EXPERIENCE<span className="animate-blink">_</span>
          </h2>
        </div>

        {/* Experience Section as a terminal app */}
        <div className="border border-white/20 bg-black rounded mb-8">
          {/* Terminal header */}
          <div className="border-b border-white/20 bg-white/5 px-4 py-2 flex justify-between items-center">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="text-white/60 text-xs font-mono">
              experience.log
            </div>
          </div>

          {/* Terminal tabs as a command line selector */}
          <div className="p-4 border-b border-white/10 font-mono text-sm">
            <div className="flex">
              <span className="text-green-400 mr-2">user@portfolio:~/exp$</span>
              <span className="text-white">
                {typingIndex >= 15
                  ? "tail -f experience.log"
                  : "tail -f experience.log".substring(0, typingIndex)}
              </span>
              {typingIndex < 15 && <span className="animate-blink">|</span>}
            </div>

            {typingIndex >= 15 && (
              <div className="mt-4 border border-white/10 p-2 bg-black/30 overflow-x-auto">
                <div className="flex space-x-2">
                  {experiences.map((exp) => (
                    <button
                      key={exp.id}
                      onClick={() => setCurrentExp(exp.id)}
                      className={`px-3 py-1 font-mono text-xs whitespace-nowrap transition-colors ${
                        currentExp === exp.id
                          ? "bg-white/10 text-green-400 border-l-2 border-green-400"
                          : "text-white/60 hover:bg-white/5"
                      }`}
                    >
                      {exp.company.replace(/\s+/g, "_").toLowerCase()}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Experience content area */}
          <div className="p-4 h-96 overflow-y-auto font-mono text-sm">
            {typingIndex >= 15 &&
              experiences
                .filter((exp) => exp.id === currentExp)
                .map((exp) => (
                  <div key={exp.id} className="animate-fadeIn mb-8">
                    {/* Job header as command output */}
                    <div className="mb-4 border-b border-white/10 pb-2">
                      <div className="text-white/40 text-xs mb-1">
                        [JOB_ENTRY]
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-white">
                        <div className="flex items-center">
                          <span className="text-white/60 mr-2">TITLE:</span>
                          <span className="text-green-400">{exp.title}</span>
                        </div>
                        <div className="flex items-center">
                          <span className="text-white/60 mr-2">COMPANY:</span>
                          <span className="text-white">{exp.company}</span>
                        </div>
                        <div className="flex items-center">
                          <span className="text-white/60 mr-2">PERIOD:</span>
                          <span className="text-white">{exp.period}</span>
                        </div>
                        <div className="flex items-center">
                          <span className="text-white/60 mr-2">LOCATION:</span>
                          <span className="text-white">{exp.location}</span>
                        </div>
                      </div>
                    </div>

                    {/* Job responsibilities as command results */}
                    <div className="mb-4">
                      <div className="text-white mb-2">
                        <span className="text-green-400 mr-2">$</span>
                        <span>cat responsibilities.md</span>
                      </div>

                      <div className="ml-4 border-l border-white/20 pl-4">
                        {exp.responsibilities.map((resp, idx) => (
                          <div key={idx} className="mb-3 group">
                            <div className="flex items-baseline">
                              <span className="text-green-400 mr-2">•</span>
                              <span className="text-white/90 group-hover:text-white transition-colors">
                                {resp}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Tech stack */}
                    <div className="mb-4">
                      <div className="text-white mb-2">
                        <span className="text-green-400 mr-2">$</span>
                        <span>grep -i "tech" stack.txt</span>
                      </div>

                      <div className="flex flex-wrap gap-2 ml-4 mt-2">
                        {[
                          "React",
                          "Node.js",
                          "TypeScript",
                          "Docker",
                          "Git",
                        ].map((tech, idx) => (
                          <span
                            key={idx}
                            className="bg-white/5 border border-white/20 px-2 py-1 text-xs text-white/80"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="text-white/40 text-xs mt-6 pb-2 border-b border-white/10">
                      --- End of log entry ---
                    </div>
                  </div>
                ))}

            {typingIndex >= 15 && (
              <div className="flex mt-4">
                <span className="text-green-400 mr-2">
                  user@portfolio:~/exp$
                </span>
                <span className="animate-blink">_</span>
              </div>
            )}
          </div>
        </div>

        {/* Experience footer with LinkedIn link */}
        <div className="mt-6 text-center">
          <a
            href="https://www.linkedin.com/in/baladhithyat"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block border border-white/20 px-4 py-2 text-white hover:bg-white/10 transition-colors font-mono text-sm"
          >
            $ xdg-open linkedin.profile
          </a>
        </div>
      </div>
    </section>
  );
}
