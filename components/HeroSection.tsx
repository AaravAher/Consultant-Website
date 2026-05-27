'use client';

import { useEffect, useRef, useState } from 'react';

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
    // Particle network animation
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    // Check for prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener('resize', resize);
    resize();

    const drawRoundedRect = (ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) => {
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.lineTo(x + w - r, y);
      ctx.arcTo(x + w, y, x + w, y + r, r);
      ctx.lineTo(x + w, y + h - r);
      ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
      ctx.lineTo(x + r, y + h);
      ctx.arcTo(x, y + h, x, y + h - r, r);
      ctx.lineTo(x, y + r);
      ctx.arcTo(x, y, x + r, y, r);
      ctx.closePath();
    };

    const draw = (timestamp: number) => {
      ctx.clearRect(0, 0, width, height);

      // Microphone properties
      const MX = width * 0.65;
      const MY = height * 0.42;
      const CW = 30; // capsule width
      const CH = 58; // capsule height
      const CR = 15; // capsule radius
      
      const originX = MX;
      const originY = MY - CH / 2;

      // Draw Waves
      const maxR = Math.max(width, height) * 0.9;
      for (let i = 0; i < 6; i++) {
        const phase = ((timestamp / 6666) + i / 6) % 1;
        const r = 36 + phase * (maxR - 36);
        const alpha = Math.pow(1 - phase, 2.2) * 0.48;
        
        ctx.strokeStyle = `rgba(77, 127, 168, ${alpha})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(originX, originY, r, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Draw Microphone Capsule
      ctx.strokeStyle = 'rgba(160, 190, 220, 0.78)';
      ctx.lineWidth = 1.2;
      drawRoundedRect(ctx, MX - CW/2, MY - CH/2, CW, CH, CR);
      ctx.stroke();

      // Draw Grille Lines
      ctx.strokeStyle = 'rgba(160, 190, 220, 0.28)';
      ctx.lineWidth = 0.6;
      const grillePadY = 5;
      const grillePadX = 5;
      const grilleSpace = (CH - grillePadY * 2) / 4; // 5 lines means 4 spaces
      for (let i = 0; i < 5; i++) {
        const gy = (MY - CH/2) + grillePadY + i * grilleSpace;
        ctx.beginPath();
        ctx.moveTo(MX - CW/2 + grillePadX, gy);
        ctx.lineTo(MX + CW/2 - grillePadX, gy);
        ctx.stroke();
      }

      // Draw Stem
      ctx.strokeStyle = 'rgba(160, 190, 220, 0.62)';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(MX, MY + CH/2);
      ctx.lineTo(MX, MY + CH/2 + 30);
      ctx.stroke();

      // Draw Base Joint
      ctx.fillStyle = 'rgba(160, 190, 220, 0.55)';
      ctx.beginPath();
      ctx.arc(MX, MY + CH/2 + 30, 2.5, 0, Math.PI * 2);
      ctx.fill();

      // Draw Base Bar
      ctx.strokeStyle = 'rgba(160, 190, 220, 0.55)';
      ctx.lineWidth = 1.2;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(MX - 22, MY + CH/2 + 30 + 10);
      ctx.lineTo(MX + 22, MY + CH/2 + 30 + 10);
      ctx.stroke();
      ctx.lineCap = 'butt'; // reset

      animationFrameId = requestAnimationFrame(draw);
    };

    animationFrameId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section className="relative w-full h-screen bg-[#0c0e13] flex flex-col justify-center overflow-hidden page-snap-container">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0 opacity-100"
      />
      
      <div className="relative z-10 px-6 md:px-12 pb-12 md:pb-24 pointer-events-none">
        <div className="text-[16px] md:text-[20px] font-bold uppercase tracking-[0.16em] mb-6 text-[rgba(255,255,255,0.55)]">
          Communications & PR Counsel
        </div>
        
        <h1 className="text-[48px] md:text-[72px] lg:text-[84px] font-bold leading-[1.05] tracking-tight">
          <div className="overflow-hidden">
            <span className={`block text-white transition-all duration-[750ms] ease-out delay-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              I help organizations
            </span>
          </div>
          <div className="overflow-hidden">
            <span className={`block text-white transition-all duration-[750ms] ease-out delay-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              communicate clearly.
            </span>
          </div>
          <div className="overflow-hidden mt-2 md:mt-4">
            <span className={`block text-[rgba(255,255,255,0.6)] transition-all duration-[750ms] ease-out delay-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              When it matters most.
            </span>
          </div>
        </h1>

        <div className={`mt-12 flex items-center gap-4 transition-all duration-[750ms] ease-out delay-[900ms] ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="w-[32px] h-[2px] bg-[rgba(255,255,255,0.40)]" />
          <span className="text-[12px] uppercase text-[rgba(255,255,255,0.40)] tracking-[0.16em]">
            Minari Shah
          </span>
        </div>
      </div>
    </section>
  );
}
