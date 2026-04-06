import { useEffect, useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { personalInfo } from '@/data/personal-info';
import { scrollToSection } from '@/lib/utils';
import { ResumeModal } from '@/components/resume-modal';

const ASCII_ART = `
 ██████╗  █████╗ ██╗      █████╗ 
 ██╔══██╗██╔══██╗██║     ██╔══██╗
 ██████╔╝███████║██║     ███████║
 ██╔══██╗██╔══██║██║     ██╔══██║
 ██████╔╝██║  ██║███████╗██║  ██║
 ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝`.trim();

// Generates a short mechanical click via Web Audio API
function playClick(enabled: boolean) {
  if (!enabled) return;
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const buf = ctx.createBuffer(1, Math.floor(ctx.sampleRate * 0.035), ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / d.length, 2.5);
    const src = ctx.createBufferSource();
    src.buffer = buf;
    const g = ctx.createGain();
    g.gain.value = 0.07;
    src.connect(g);
    g.connect(ctx.destination);
    src.start();
  } catch {}
}

interface HeroSectionProps {
  soundEnabled: boolean;
}

export function HeroSection({ soundEnabled }: HeroSectionProps) {
  const [asciiDone, setAsciiDone] = useState(false);
  const [visible, setVisible] = useState(false);
  const [typingIndex, setTypingIndex] = useState(0);
  const [showResume, setShowResume] = useState(false);
  const soundRef = useRef(soundEnabled);
  soundRef.current = soundEnabled;

  // Phase 1: show ASCII art briefly
  useEffect(() => {
    const t1 = setTimeout(() => setAsciiDone(true), 1400);
    return () => clearTimeout(t1);
  }, []);

  // Phase 2: fade in hero content after ASCII
  useEffect(() => {
    if (!asciiDone) return;
    const t = setTimeout(() => setVisible(true), 150);
    return () => clearTimeout(t);
  }, [asciiDone]);

  // Phase 3: type the title with click sounds
  useEffect(() => {
    if (!visible) return;
    const interval = setInterval(() => {
      setTypingIndex(prev => {
        if (prev < personalInfo.title.length) {
          playClick(soundRef.current);
          return prev + 1;
        }
        clearInterval(interval);
        return prev;
      });
    }, 55);
    return () => clearInterval(interval);
  }, [visible]);

  return (
    <>
      {showResume && <ResumeModal onClose={() => setShowResume(false)} />}

      <section id="hero" className="pt-16 md:pt-20 min-h-screen flex items-center bg-black relative overflow-hidden">
        {/* Scanlines */}
        <div className="absolute inset-0 pointer-events-none z-10 opacity-20"
          style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,255,255,0.03) 3px, rgba(255,255,255,0.03) 4px)' }}
        />

        <div className="max-w-screen-lg mx-auto px-4 md:px-8 w-full relative z-20">

          {/* ASCII art splash — shown briefly, then fades out */}
          <div
            className={`mb-8 transition-all duration-700 overflow-x-auto hide-scrollbar ${asciiDone ? 'opacity-0 -translate-y-2 h-0 mb-0' : 'opacity-100 translate-y-0'}`}
          >
            <pre
              className="font-mono text-[10px] sm:text-xs leading-tight select-none"
              style={{ color: 'var(--term-green)', opacity: 0.75 }}
            >
              {ASCII_ART}
            </pre>
          </div>

          {/* Session status */}
          <div className={`mb-10 font-mono text-xs text-white/30 flex items-center gap-3 transition-all duration-500 ${visible ? 'opacity-100' : 'opacity-0'}`}>
            <span style={{ color: 'var(--term-green)', opacity: 0.5 }}>●</span>
            <span>
              session active &nbsp;·&nbsp; /home/baladhithya/portfolio &nbsp;·&nbsp;{' '}
              try the <span className="text-white/50">konami code</span> for a secret
            </span>
          </div>

          {/* Prompt + name */}
          <div
            className={`mb-10 transition-all duration-600 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            style={{ transitionDelay: '80ms' }}
          >
            <div className="font-mono text-sm mb-3" style={{ color: 'var(--term-green)', opacity: 0.65 }}>
              ~/portfolio $ whoami
            </div>

            <h1 className="text-3xl md:text-5xl font-bold text-white mb-3 tracking-tight">
              {personalInfo.name}
              <span className="inline-block w-[3px] h-8 md:h-12 ml-2 animate-blink align-middle" style={{ backgroundColor: 'var(--term-green)' }} />
            </h1>

            <div className="h-7 mb-5">
              <p className="font-mono text-white/70 text-base md:text-lg">
                <span style={{ color: 'var(--term-green)', opacity: 0.8 }}>{'> '}</span>
                {personalInfo.title.substring(0, typingIndex)}
                {typingIndex < personalInfo.title.length && <span className="animate-blink">|</span>}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-5 text-white/40 font-mono text-sm">
              <a href={`mailto:${personalInfo.email}`} className="hover:text-white/80 transition-colors flex items-center gap-1.5">
                <i className="fas fa-envelope" style={{ color: 'var(--term-green)', opacity: 0.6 }} />
                {personalInfo.email}
              </a>
              <span className="flex items-center gap-1.5">
                <i className="fas fa-map-marker-alt" style={{ color: 'var(--term-green)', opacity: 0.6 }} />
                {personalInfo.location}
              </span>
            </div>
          </div>

          {/* Bio + actions */}
          <div
            className={`transition-all duration-600 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            style={{ transitionDelay: '200ms' }}
          >
            <div className="font-mono text-sm mb-2" style={{ color: 'var(--term-green)', opacity: 0.65 }}>
              ~/portfolio $ cat bio.txt
            </div>

            <div className="border border-white/10 bg-white/[0.02] p-4 rounded font-mono text-white/70 text-sm leading-relaxed mb-6">
              {personalInfo.bio}
            </div>

            <div className="flex flex-wrap gap-3">
              <Button
                onClick={() => setShowResume(true)}
                variant="outline"
                className="border-white/20 text-white/80 hover:bg-white hover:text-black hover:border-white transition-all font-mono text-sm"
              >
                $ cat resume.pdf
              </Button>
              <Button
                onClick={() => scrollToSection('contact')}
                variant="outline"
                className="font-mono text-sm transition-all"
                style={{ borderColor: 'var(--term-green-dim, rgba(0,255,65,0.35))', color: 'var(--term-green)' }}
              >
                $ ./contact.sh
              </Button>
            </div>
          </div>

          {/* Scroll indicator */}
          <div
            className={`mt-16 flex flex-col items-center gap-1 transition-all duration-600 ${visible ? 'opacity-100' : 'opacity-0'}`}
            style={{ transitionDelay: '400ms' }}
          >
            <span className="font-mono text-white/25 text-xs tracking-widest">$ cd ./about</span>
            <div className="animate-bounce-arrow flex flex-col items-center gap-0.5 mt-1">
              <div className="w-px h-5 bg-gradient-to-b from-transparent to-white/20" />
              <button
                onClick={() => scrollToSection('about')}
                className="text-white/25 transition-colors focus:outline-none"
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--term-green)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.25)')}
                aria-label="Scroll to about"
              >
                <svg width="16" height="10" viewBox="0 0 16 10" fill="none">
                  <path d="M1 1L8 8L15 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
