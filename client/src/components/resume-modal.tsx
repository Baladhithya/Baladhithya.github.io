import { useEffect } from 'react';

interface ResumeModalProps {
  onClose: () => void;
}

const DRIVE_EMBED = 'https://drive.google.com/file/d/1crWWrhY8QPe9xI_yYHkSHk3LikpqI9tc/preview';

export function ResumeModal({ onClose }: ResumeModalProps) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[150] flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.92)' }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl h-[90vh] flex flex-col border border-white/20 rounded overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Terminal title bar */}
        <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/10 bg-white/[0.03] flex-shrink-0">
          <span className="w-3 h-3 rounded-full bg-red-500 cursor-pointer" onClick={onClose} title="Close" />
          <span className="w-3 h-3 rounded-full bg-yellow-500" />
          <span className="w-3 h-3 rounded-full bg-green-500" />
          <span className="flex-1 text-center font-mono text-xs text-white/30">resume.pdf</span>
          <button
            onClick={onClose}
            className="font-mono text-xs text-white/30 hover:text-white/70 transition-colors ml-2"
          >
            ✕
          </button>
        </div>

        {/* Command line */}
        <div className="px-4 py-2 bg-black border-b border-white/5 flex-shrink-0">
          <span className="font-mono text-xs" style={{ color: 'var(--term-green)', opacity: 0.7 }}>
            ~/portfolio $ cat resume.pdf
          </span>
        </div>

        {/* PDF embed */}
        <div className="flex-1 bg-black relative">
          <iframe
            src={DRIVE_EMBED}
            className="w-full h-full border-0"
            title="Resume"
            allow="autoplay"
          />
        </div>

        {/* Footer bar */}
        <div className="px-4 py-2 border-t border-white/10 bg-white/[0.02] flex items-center justify-between flex-shrink-0">
          <span className="font-mono text-xs text-white/30">Press ESC to close</span>
          <a
            href="https://drive.google.com/file/d/1crWWrhY8QPe9xI_yYHkSHk3LikpqI9tc/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs transition-colors hover:text-white/70 text-white/30"
          >
            $ open --external ↗
          </a>
        </div>
      </div>
    </div>
  );
}
