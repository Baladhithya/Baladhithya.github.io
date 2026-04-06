import { useState, useEffect, useCallback } from "react";

interface GitHubData {
  repos: number;
  followers: number;
  following: number;
  stars: number;
  loading: boolean;
}

const ASCII_ART = [
  " ██████╗ ████████╗",
  " ██╔══██╗╚══██╔══╝",
  " ██████╔╝   ██║   ",
  " ██╔══██╗   ██║   ",
  " ██████╔╝   ██║   ",
  " ╚═════╝    ╚═╝   ",
  "",
  " baladhithya_t    ",
  " ──────────────── ",
];

const BOOT_LINES = [
  "Initializing portfolio kernel...",
  "Loading modules: [react] [typescript] [vite]",
  "Mounting filesystem: /home/baladhithya/portfolio",
  "Fetching GitHub statistics...",
  "Connecting to live data streams...",
  "All systems operational.",
];

export const COLOR_BLOCKS = [
  "#1a1a1a",
  "#cc0000",
  "#4e9a06",
  "#c4a000",
  "#3465a4",
  "#75507b",
  "#06989a",
  "#d3d7cf",
  "#555753",
  "#ef2929",
  "#8ae234",
  "#fce94f",
  "#729fcf",
  "#ad7fa8",
  "#34e2e2",
  "#eeeeec",
];

function LiveClock() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const pad = (n: number) => String(n).padStart(2, "0");
  const h = pad(time.getHours());
  const m = pad(time.getMinutes());
  const s = pad(time.getSeconds());
  const day = time.toLocaleDateString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <span>
      <span style={{ color: "var(--term-green)" }}>
        {h}:{m}:{s}
      </span>
      <span className="splash-muted ml-2 text-xs">({day})</span>
    </span>
  );
}

function InfoRow({
  label,
  value,
  delay,
}: {
  label: string;
  value: React.ReactNode;
  delay: number;
}) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  return (
    <div
      className="flex gap-0 font-mono text-xs sm:text-sm leading-6 transition-all duration-300"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateX(0)" : "translateX(-8px)",
      }}
    >
      <span
        style={{ color: "var(--term-green)" }}
        className="min-w-[110px] shrink-0"
      >
        {label}:
      </span>
      <span className="splash-text">{value}</span>
    </div>
  );
}

interface SplashScreenProps {
  onDismiss: () => void;
  onColorSelect: (color: string) => void;
  selectedColor: string;
}

export function SplashScreen({
  onDismiss,
  onColorSelect,
  selectedColor,
}: SplashScreenProps) {
  const [bootLine, setBootLine] = useState(0);
  const [showMain, setShowMain] = useState(false);
  const [exiting, setExiting] = useState(false);
  const [github, setGithub] = useState<GitHubData>({
    repos: 0,
    followers: 0,
    following: 0,
    stars: 0,
    loading: true,
  });

  // Boot sequence
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setBootLine(i);
      if (i >= BOOT_LINES.length) {
        clearInterval(interval);
        setTimeout(() => setShowMain(true), 300);
      }
    }, 320);
    return () => clearInterval(interval);
  }, []);

  // Fetch GitHub data
  useEffect(() => {
    const username = "Baladhithya";
    Promise.all([
      fetch(`https://api.github.com/users/${username}`).then((r) => r.json()),
      fetch(`https://api.github.com/users/${username}/repos?per_page=100`).then(
        (r) => r.json(),
      ),
    ])
      .then(([user, repos]) => {
        const stars = Array.isArray(repos)
          ? repos.reduce(
              (acc: number, r: any) => acc + (r.stargazers_count || 0),
              0,
            )
          : 0;
        setGithub({
          repos: user.public_repos || 0,
          followers: user.followers || 0,
          following: user.following || 0,
          stars,
          loading: false,
        });
      })
      .catch(() => {
        setGithub((g) => ({ ...g, loading: false }));
      });
  }, []);

  const dismiss = useCallback(() => {
    if (exiting) return;
    setExiting(true);
    setTimeout(onDismiss, 600);
  }, [exiting, onDismiss]);

  // Any key press dismisses
  useEffect(() => {
    const onKey = () => dismiss();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [dismiss]);

  const stat = (n: number) =>
    github.loading ? (
      <span className="animate-pulse splash-muted">fetching...</span>
    ) : (
      <span>{n}</span>
    );

  return (
    // Clicking the outer backdrop dismisses
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center cursor-pointer transition-opacity duration-500 splash-root ${exiting ? "opacity-0" : "opacity-100"}`}
      onClick={dismiss}
    >
      {/* CRT scanlines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,255,255,0.03) 3px, rgba(255,255,255,0.03) 4px)",
        }}
      />

      {/* Terminal window — clicking inside also dismisses, except color blocks */}
      <div
        className="relative w-full max-w-4xl mx-4 border splash-border rounded overflow-hidden shadow-2xl"
        style={{ maxHeight: "92vh" }}
        onClick={dismiss}
      >
        {/* Title bar */}
        <div className="flex items-center justify-between px-4 py-2 splash-titlebar border-b splash-border">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <span className="font-mono text-xs splash-muted">
            baladhithya@portfolio:~
          </span>
          <span className="font-mono text-xs splash-muted">bash</span>
        </div>

        <div
          className="p-4 sm:p-6 overflow-y-auto"
          style={{ maxHeight: "calc(92vh - 44px)" }}
        >
          {/* Boot lines */}
          <div className="mb-4 space-y-0.5">
            {BOOT_LINES.slice(0, bootLine).map((line, i) => (
              <div
                key={i}
                className="font-mono text-xs flex items-center gap-2 splash-text opacity-60"
              >
                <span style={{ color: "var(--term-green)" }}>
                  [{String(i + 1).padStart(2, "0")}]
                </span>
                <span>{line}</span>
                {i === bootLine - 1 && bootLine < BOOT_LINES.length && (
                  <span className="animate-blink">▌</span>
                )}
                {i === bootLine - 1 && bootLine >= BOOT_LINES.length && (
                  <span style={{ color: "var(--term-green)" }}>✓</span>
                )}
              </div>
            ))}
          </div>

          {/* Main panel */}
          {showMain && (
            <div className="flex flex-col sm:flex-row gap-6 sm:gap-10 animate-fadeIn">
              {/* Left: ASCII + color picker */}
              <div className="shrink-0">
                <pre
                  className="font-mono text-xs leading-5 select-none"
                  style={{ color: "var(--term-green)" }}
                >
                  {ASCII_ART.join("\n")}
                </pre>

                {/* Color picker label */}
                <div className="mt-3 mb-1 font-mono text-xs splash-muted">
                  pick accent color:
                </div>

                {/* Color blocks — clicking these sets accent, NOT dismisses */}
                <div className="flex flex-wrap gap-[3px] max-w-[176px]">
                  {COLOR_BLOCKS.map((color) => {
                    const isSelected = color === selectedColor;
                    return (
                      <button
                        key={color}
                        title={color}
                        onClick={(e) => {
                          e.stopPropagation(); // prevent dismiss
                          onColorSelect(color);
                        }}
                        className="w-[38px] h-[22px] transition-all duration-150 focus:outline-none"
                        style={{
                          backgroundColor: color,
                          outline: isSelected
                            ? "2px solid var(--term-green)"
                            : "2px solid transparent",
                          outlineOffset: "1px",
                          transform: isSelected ? "scale(1.15)" : "scale(1)",
                          zIndex: isSelected ? 2 : 1,
                          position: "relative",
                        }}
                        aria-label={`Set accent color to ${color}`}
                      />
                    );
                  })}
                </div>

                {/* Selected color display */}
                <div className="mt-2 font-mono text-xs flex items-center gap-2 splash-muted">
                  <span
                    className="inline-block w-3 h-3 rounded-sm border border-white/20"
                    style={{ backgroundColor: selectedColor }}
                  />
                  <span>{selectedColor}</span>
                </div>
              </div>

              {/* Right: Info */}
              <div className="flex-1 min-w-0">
                <div
                  className="font-mono text-sm sm:text-base mb-1 splash-text"
                  style={{
                    opacity: showMain ? 1 : 0,
                    transition: "opacity 0.3s 50ms",
                  }}
                >
                  <span
                    style={{ color: "var(--term-green)" }}
                    className="font-bold"
                  >
                    baladhithya
                  </span>
                  <span className="splash-muted">@</span>
                  <span className="font-bold splash-text">portfolio</span>
                </div>
                <div
                  className="font-mono text-xs splash-muted mb-3"
                  style={{
                    opacity: showMain ? 1 : 0,
                    transition: "opacity 0.3s 0.1s",
                  }}
                >
                  {"─".repeat(28)}
                </div>

                <div className="space-y-0.5">
                  <InfoRow
                    label="Who I am"
                    delay={100}
                    value="Final-year CSE student who likes building useful things"
                  />
                  <InfoRow
                    label="Currently"
                    delay={180}
                    value="Finishing B.Tech at VIT Vellore"
                  />
                  <InfoRow
                    label="I work with"
                    delay={260}
                    value="React, Node, TypeScript, Python"
                  />
                  <InfoRow
                    label="Interests"
                    delay={340}
                    value="AI, systems, and scalable products"
                  />
                  <InfoRow
                    label="Projects"
                    delay={420}
                    value="AI models, full-stack apps, experimental ideas"
                  />
                  <InfoRow
                    label="Based in"
                    delay={500}
                    value="Tamil Nadu, India"
                  />
                  <InfoRow
                    label="Reach me"
                    delay={580}
                    value="baladhithyat@gmail.com"
                  />
                  <InfoRow
                    label="GitHub"
                    delay={660}
                    value={
                      <a
                        href="https://github.com/Baladhithya"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        style={{ color: "var(--term-green)" }}
                        className="hover:underline"
                      >
                        github.com/Baladhithya
                      </a>
                    }
                  />
                  <InfoRow
                    label="Repos"
                    delay={740}
                    value={stat(github.repos)}
                  />
                  <InfoRow
                    label="Stars"
                    delay={800}
                    value={stat(github.stars)}
                  />
                  <InfoRow
                    label="Followers"
                    delay={860}
                    value={stat(github.followers)}
                  />
                  <InfoRow label="Time" delay={920} value={<LiveClock />} />
                </div>

                {/* Enter prompt */}
                <div
                  className="mt-6 font-mono text-xs splash-muted flex items-center gap-2"
                  style={{
                    opacity: showMain ? 1 : 0,
                    transition: "opacity 0.5s 1.2s",
                  }}
                >
                  <span style={{ color: "var(--term-green)" }}>$</span>
                  <span>Press any key or click to enter</span>
                  <span className="animate-blink">▌</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <p className="mt-4 font-mono text-xs splash-muted opacity-40 animate-pulse select-none pointer-events-none">
        Click anywhere · press any key to continue
      </p>
    </div>
  );
}
