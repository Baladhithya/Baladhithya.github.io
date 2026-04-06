import { useCallback, useRef } from 'react';

let audioCtx: AudioContext | null = null;

function getAudioCtx(): AudioContext | null {
  try {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return audioCtx;
  } catch {
    return null;
  }
}

function playKeyClick(volume = 0.08) {
  const ctx = getAudioCtx();
  if (!ctx) return;

  const bufferSize = Math.floor(ctx.sampleRate * 0.04);
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);

  for (let i = 0; i < bufferSize; i++) {
    const t = i / bufferSize;
    data[i] = (Math.random() * 2 - 1) * Math.pow(1 - t, 3);
  }

  const source = ctx.createBufferSource();
  source.buffer = buffer;

  const gainNode = ctx.createGain();
  gainNode.gain.setValueAtTime(volume, ctx.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);

  const filter = ctx.createBiquadFilter();
  filter.type = 'highpass';
  filter.frequency.value = 800;

  source.connect(filter);
  filter.connect(gainNode);
  gainNode.connect(ctx.destination);
  source.start();
}

export function useSound() {
  const enabledRef = useRef<boolean>(() => {
    try { return localStorage.getItem('portfolio-sound') !== 'false'; } catch { return false; }
  } as unknown as boolean);

  const isEnabled = useCallback(() => {
    return enabledRef.current;
  }, []);

  const setEnabled = useCallback((val: boolean) => {
    enabledRef.current = val;
    try { localStorage.setItem('portfolio-sound', String(val)); } catch {}
  }, []);

  const click = useCallback(() => {
    if (enabledRef.current) playKeyClick();
  }, []);

  return { click, isEnabled, setEnabled };
}
