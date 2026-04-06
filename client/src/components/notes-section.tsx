import { useState } from 'react';
import { notes } from '@/data/notes';

export function NotesSection() {
  const [selected, setSelected] = useState<string | null>(null);

  const active = notes.find(n => n.id === selected);

  return (
    <section id="notes" className="py-16 md:py-24 section-fade-in" style={{ backgroundColor: 'var(--bg-secondary, #060606)' }}>
      <div className="max-w-screen-lg mx-auto px-4 md:px-8">

        {/* Terminal header */}
        <div className="mb-8 border border-white/10 bg-white/[0.02] rounded overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/10">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="ml-2 font-mono text-xs text-white/30">notes/</span>
          </div>
          <div className="px-4 py-3 flex items-center gap-3">
            <span className="font-mono text-sm text-green-400">user@portfolio:~$</span>
            <span className="font-mono text-sm text-white/70">ls notes/</span>
          </div>
          <div className="px-4 pb-3 pl-8 font-mono text-xs text-white/40 space-y-0.5">
            {notes.map(n => (
              <div key={n.id}>
                <span style={{ color: 'var(--term-green)', opacity: 0.6 }}>-rw-r--r--</span>
                <span className="mx-3">1</span>
                <span className="mr-8">baladhithya</span>
                <button
                  onClick={() => setSelected(n.id === selected ? null : n.id)}
                  className="hover:text-white/80 transition-colors underline-offset-2"
                  style={n.id === selected ? { color: 'var(--term-green)' } : {}}
                >
                  {n.filename}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Section heading */}
        <div className="mb-8">
          <div className="font-mono text-sm mb-3" style={{ color: 'var(--term-green)', opacity: 0.65 }}>
            ~/portfolio $ cat notes/index.md
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">NOTES_</h2>
          <p className="font-mono text-white/40 text-sm">
            Things I've written down so I don't forget them.
          </p>
        </div>

        <div className={`grid gap-6 ${active ? 'md:grid-cols-5' : 'md:grid-cols-3'} transition-all duration-500`}>

          {/* File list */}
          <div className={`${active ? 'md:col-span-2' : 'md:col-span-3'} space-y-3`}>
            {notes.map(note => (
              <button
                key={note.id}
                onClick={() => setSelected(note.id === selected ? null : note.id)}
                className={`w-full text-left border rounded p-4 transition-all duration-200 ${
                  selected === note.id
                    ? 'border-green-400/50 bg-green-400/5'
                    : 'border-white/10 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/20'
                }`}
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <span className="font-mono text-white/80 text-sm font-bold leading-snug">
                    {note.title}
                  </span>
                  <span className="font-mono text-white/25 text-xs shrink-0">{note.readTime}</span>
                </div>
                <p className="font-mono text-white/45 text-xs leading-relaxed mb-3">
                  {note.preview}
                </p>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-white/25 text-xs">{note.date}</span>
                  <div className="flex gap-1.5 flex-wrap">
                    {note.tags.map(tag => (
                      <span
                        key={tag}
                        className="font-mono text-xs px-1.5 py-0.5 border border-white/10 text-white/40"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Reader pane */}
          {active && (
            <div className="md:col-span-3 border border-white/10 bg-white/[0.02] rounded overflow-hidden flex flex-col">
              {/* Reader header */}
              <div className="px-4 py-2.5 border-b border-white/10 flex items-center gap-3 bg-white/[0.02]">
                <span className="font-mono text-xs" style={{ color: 'var(--term-green)', opacity: 0.7 }}>
                  $ cat notes/{active.filename}
                </span>
                <button
                  onClick={() => setSelected(null)}
                  className="ml-auto font-mono text-xs text-white/25 hover:text-white/50 transition-colors"
                >
                  ✕
                </button>
              </div>

              <div className="p-5 overflow-y-auto max-h-[500px] hide-scrollbar space-y-4">
                <div>
                  <h3 className="font-mono text-white font-bold text-base mb-1">{active.title}</h3>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="font-mono text-white/30 text-xs">{active.date}</span>
                    <span className="font-mono text-white/20 text-xs">·</span>
                    <span className="font-mono text-white/30 text-xs">{active.readTime} read</span>
                  </div>
                  <div className="w-full h-px bg-white/10 mb-4" />
                </div>

                {active.content.map((para, i) => (
                  <p key={i} className="font-mono text-white/65 text-xs leading-relaxed">
                    {para}
                  </p>
                ))}

                <div className="pt-4 flex gap-1.5 flex-wrap">
                  {active.tags.map(tag => (
                    <span
                      key={tag}
                      className="font-mono text-xs px-2 py-0.5 border border-white/10 text-white/40"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bottom prompt */}
        <div className="mt-8 font-mono text-xs text-white/25 flex items-center gap-2">
          <span style={{ color: 'var(--term-green)', opacity: 0.5 }}>user@portfolio:~/notes$</span>
          <span className="animate-blink">▌</span>
        </div>
      </div>
    </section>
  );
}
