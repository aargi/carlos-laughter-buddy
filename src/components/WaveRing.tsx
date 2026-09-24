import { useEffect, useRef } from "react";

export type WaveSource = { get: () => AnalyserNode | null; color: string };

/** Circular "sound thread" drawn around an avatar, reacting to live audio. */
export function WaveRing({ sources, size }: { sources: WaveSource[]; size: number }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const srcRef = useRef(sources);
  srcRef.current = sources;

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const g = canvas.getContext("2d");
    if (!g) return;
    const dpr = window.devicePixelRatio || 1;
    const W = size * 1.5;
    canvas.width = W * dpr;
    canvas.height = W * dpr;
    g.scale(dpr, dpr);
    const buf = new Uint8Array(512);
    const smooth: number[][] = [];
    let raf = 0;
    const POINTS = 96;
    const draw = (time: number) => {
      g.clearRect(0, 0, W, W);
      const cx = W / 2;
      const base = size / 2 + 6;
      srcRef.current.forEach((s, si) => {
        const an = s.get();
        const vals = (smooth[si] ??= new Array(POINTS).fill(0));
        let energy = 0;
        if (an) {
          an.getByteTimeDomainData(buf);
          const n = an.fftSize;
          for (let i = 0; i < POINTS; i++) {
            const v = Math.abs((buf[Math.floor((i / POINTS) * n)]! - 128) / 128);
            vals[i] = vals[i]! * 0.6 + v * 0.4;
            energy += vals[i]!;
          }
        } else {
          for (let i = 0; i < POINTS; i++) vals[i] = vals[i]! * 0.85;
        }
        energy /= POINTS;
        const amp = size * 0.28;
        g.beginPath();
        for (let i = 0; i <= POINTS; i++) {
          const k = i % POINTS;
          // symmetric so the ring closes smoothly
          const v = (vals[k]! + vals[(POINTS - k) % POINTS]!) / 2;
          const idle = Math.sin(time / 600 + i * 0.35 + si) * 1.2;
          const r = base + si * 4 + idle + v * amp;
          const a = (k / POINTS) * Math.PI * 2 - Math.PI / 2;
          const x = cx + Math.cos(a) * r;
          const y = cx + Math.sin(a) * r;
          if (i === 0) g.moveTo(x, y);
          else g.lineTo(x, y);
        }
        g.closePath();
        g.strokeStyle = s.color;
        g.globalAlpha = 0.45 + Math.min(0.55, energy * 6);
        g.lineWidth = 2 + Math.min(3, energy * 20);
        g.shadowColor = s.color;
        g.shadowBlur = 8 + energy * 60;
        g.stroke();
      });
      g.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, [size]);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      style={{ width: size * 1.5, height: size * 1.5 }}
    />
  );
}
