import { useState } from 'react';
import { certifications } from '@/data/certifications';

export function CertificationsSection() {
  const [expanded, setExpanded] = useState<string | null>('aws-saa');

  return (
    <section id="certifications" className="py-16 md:py-24 bg-black section-fade-in">
      <div className="max-w-screen-lg mx-auto px-4 md:px-8">

        {/* Terminal header */}
        <div className="mb-8 border border-white/10 bg-white/[0.02] rounded overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/10">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="ml-2 font-mono text-xs text-white/30">certs.sh</span>
          </div>
          <div className="px-4 py-3 flex items-center gap-3">
            <span className="font-mono text-sm text-green-400">user@portfolio:~$</span>
            <span className="font-mono text-sm text-white/70">ls -la certifications/</span>
          </div>
        </div>

        {/* Section heading */}
        <div className="mb-10">
          <div className="font-mono text-sm mb-3" style={{ color: 'var(--term-green)', opacity: 0.65 }}>
            ~/portfolio $ cd certifications/
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
            CERTIFICATIONS_
          </h2>
          <p className="font-mono text-white/40 text-sm">
            {certifications.length} certification{certifications.length !== 1 ? 's' : ''} found
          </p>
        </div>

        {/* Cert cards */}
        <div className="space-y-4">
          {certifications.map(cert => {
            const isOpen = expanded === cert.id;
            return (
              <div
                key={cert.id}
                className="border border-white/10 bg-white/[0.02] rounded overflow-hidden transition-all duration-300"
              >
                {/* Card header */}
                <button
                  onClick={() => setExpanded(isOpen ? null : cert.id)}
                  className="w-full text-left px-5 py-4 flex items-center gap-4 hover:bg-white/[0.03] transition-colors"
                >
                  <div className="text-2xl" style={{ color: cert.color }}>
                    <i className={cert.faIcon} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-mono text-white font-bold text-sm truncate">
                      {cert.name}
                    </div>
                    <div className="font-mono text-white/40 text-xs mt-0.5">
                      {cert.issuer} &nbsp;·&nbsp; {cert.date}
                    </div>
                  </div>
                  <div
                    className="font-mono text-xs px-2 py-0.5 border rounded"
                    style={{ color: 'var(--term-green)', borderColor: 'var(--term-green)', opacity: 0.7 }}
                  >
                    CERTIFIED
                  </div>
                  <span className="font-mono text-white/30 text-sm ml-2">
                    {isOpen ? '▲' : '▼'}
                  </span>
                </button>

                {/* Expanded content */}
                {isOpen && (
                  <div className="border-t border-white/10 px-5 py-4">
                    <div className="font-mono text-xs mb-3" style={{ color: 'var(--term-green)', opacity: 0.6 }}>
                      $ cat {cert.id}.json
                    </div>

                    <div className="font-mono text-xs text-white/50 bg-black/40 border border-white/5 rounded p-3 mb-4 leading-relaxed">
                      <span className="text-white/30">{'{'}</span>
                      <div className="pl-4">
                        <div><span className="text-green-400">"certification"</span>: <span className="text-white/70">"{cert.name}"</span>,</div>
                        <div><span className="text-green-400">"issuer"</span>: <span className="text-white/70">"{cert.issuer}"</span>,</div>
                        <div><span className="text-green-400">"date"</span>: <span className="text-white/70">"{cert.date}"</span>,</div>
                        <div><span className="text-green-400">"status"</span>: <span style={{ color: 'var(--term-green)' }}>"ACTIVE"</span></div>
                      </div>
                      <span className="text-white/30">{'}'}</span>
                    </div>

                    <div className="font-mono text-xs mb-2 text-white/40">
                      // Skills validated:
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {cert.skills.map(skill => (
                        <span
                          key={skill}
                          className="font-mono text-xs px-2 py-0.5 border border-white/10 text-white/60 bg-white/[0.03]"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom prompt */}
        <div className="mt-8 font-mono text-xs text-white/25 flex items-center gap-2">
          <span style={{ color: 'var(--term-green)', opacity: 0.5 }}>user@portfolio:~/certifications$</span>
          <span className="animate-blink">▌</span>
        </div>
      </div>
    </section>
  );
}
