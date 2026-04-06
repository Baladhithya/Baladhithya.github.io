import { useEffect, useState } from 'react';

const KONAMI = [
  'ArrowUp','ArrowUp','ArrowDown','ArrowDown',
  'ArrowLeft','ArrowRight','ArrowLeft','ArrowRight',
  'b','a',
];

const ASCII_HACK = `
 ██╗  ██╗ █████╗  ██████╗██╗  ██╗███████╗██████╗ 
 ██║  ██║██╔══██╗██╔════╝██║ ██╔╝██╔════╝██╔══██╗
 ███████║███████║██║     █████╔╝ █████╗  ██████╔╝
 ██╔══██║██╔══██║██║     ██╔═██╗ ██╔══╝  ██╔══██╗
 ██║  ██║██║  ██║╚██████╗██║  ██╗███████╗██║  ██║
 ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝
`.trim();

const LINES = [
  '> sudo access --level=root --user=visitor',
  '> Verifying credentials...',
  '> [UP UP DOWN DOWN LEFT RIGHT LEFT RIGHT B A] ✓',
  '> ACCESS GRANTED',
  '',
  '> whoami',
  '> You found the developer\'s secret.',
  '',
  '> cat fun_facts.txt',
  '  - Baladhithya debugs faster at 2am than 2pm.',
  '  - Has a running count of "just one more feature" moments: 847',
  '  - Coffee consumed per pull request: ~2.4 cups',
  '  - Favourite terminal command: git log --oneline --graph',
  '',
  '> sudo apt-get install baladhithya',
  '> Resolving dependencies: curiosity, problem-solving, coffee...',
  '> Installing... ██████████████████████ 100%',
  '> Done. 🎉 Welcome to the inner circle.',
  '',
  '> _',
];

export function KonamiEasterEgg() {
  const [active, setActive] = useState(false);
  const [visibleLines, setVisibleLines] = useState(0);
  const [keys, setKeys] = useState<string[]>([]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      setKeys(prev => {
        const next = [...prev, e.key].slice(-KONAMI.length);
        if (next.join(',') === KONAMI.join(',')) {
          setActive(true);
          return [];
        }
        return next;
      });
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  useEffect(() => {
    if (!active) { setVisibleLines(0); return; }
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setVisibleLines(i);
      if (i >= LINES.length) clearInterval(interval);
    }, 120);
    return () => clearInterval(interval);
  }, [active]);

  if (!active) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.96)' }}
      onClick={() => setActive(false)}
    >
      <div className="w-full max-w-2xl" onClick={e => e.stopPropagation()}>
        {/* Terminal window chrome */}
        <div className="border border-white/20 rounded overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-2 border-b border-white/10 bg-white/[0.03]">
            <span className="w-3 h-3 rounded-full bg-red-500" />
            <span className="w-3 h-3 rounded-full bg-yellow-500" />
            <span className="w-3 h-3 rounded-full bg-green-500" />
            <span className="flex-1 text-center font-mono text-xs text-white/30">secret.sh</span>
          </div>

          <div className="p-5 font-mono text-sm max-h-[80vh] overflow-y-auto hide-scrollbar">
            {/* ASCII art header */}
            <pre
              className="text-xs mb-6 leading-tight"
              style={{ color: 'var(--term-green)' }}
            >
              {ASCII_HACK}
            </pre>

            {/* Animated lines */}
            <div className="space-y-1">
              {LINES.slice(0, visibleLines).map((line, i) => (
                <div
                  key={i}
                  className={
                    line.startsWith('>')
                      ? 'text-white/90'
                      : line.startsWith('  -')
                      ? 'text-white/60 pl-2'
                      : ''
                  }
                  style={
                    line.includes('ACCESS GRANTED') || line.includes('Done')
                      ? { color: 'var(--term-green)' }
                      : line.startsWith('> ')
                      ? { color: 'var(--term-green)', opacity: 0.9 }
                      : {}
                  }
                >
                  {line || '\u00A0'}
                </div>
              ))}
              {visibleLines >= LINES.length && (
                <span className="animate-blink" style={{ color: 'var(--term-green)' }}>▌</span>
              )}
            </div>

            <button
              onClick={() => setActive(false)}
              className="mt-6 font-mono text-xs text-white/30 hover:text-white/60 transition-colors"
            >
              [ press ESC or click anywhere to exit ]
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
