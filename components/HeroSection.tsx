'use client';

import { useEffect, useRef, useState } from 'react';
import { revealHeroContent } from '@/utils/revealHero';

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    const wrapper = document.getElementById('hero-scroll-wrapper');
    const hero = document.getElementById('hero');
    if (!wrapper || !hero) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const heroH = window.innerHeight;
    let lastScrollY = window.scrollY;
    let isReturningToTop = false;

    function onScroll() {
      const scrollY = window.scrollY;
      const scrollingUp = scrollY < lastScrollY;

      // Guard: if a smooth scroll-to-top is already in progress, ignore events
      if (isReturningToTop) {
        lastScrollY = scrollY;
        return;
      }

      // Scroll-UP crossing back into hero territory: skip the dead zone
      if (scrollingUp && lastScrollY >= heroH && scrollY < heroH) {
        isReturningToTop = true;
        // Reset hero to full visibility immediately before scrolling
        hero!.style.transition = 'transform 0ms, opacity 0ms';
        hero!.style.transform = '';
        hero!.style.opacity = '1';
        hero!.style.willChange = 'auto';

        revealHeroContent();

        window.scrollTo({ top: 0, behavior: 'smooth' });

        // Release the guard after the smooth scroll completes (~600ms)
        setTimeout(() => {
          isReturningToTop = false;
        }, 700);

        lastScrollY = scrollY;
        return;
      }

      lastScrollY = scrollY;

      // Hero fully exited downward — freeze at final state
      if (scrollY >= heroH) {
        hero!.style.transition = 'none';
        hero!.style.transform = 'scale(0.86) translateZ(-130px)';
        hero!.style.opacity = '0';
        hero!.style.willChange = 'auto';
        return;
      }

      // Active animation zone (scrolling down, 0 → heroH)
      const progress = scrollY / heroH;
      const eased = progress * progress;

      hero!.style.transition = 'none';
      hero!.style.willChange = 'transform, opacity';
      hero!.style.transform = `scale(${1 - eased * 0.14}) translateZ(${-(eased * 130)}px)`;
      hero!.style.opacity = String(Math.max(0, 1 - eased * 1.1));
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

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
    <section id="hero" className="relative w-full bg-[#0c0e13] flex flex-col justify-center overflow-hidden" style={{ position: 'sticky', top: 0, height: '100vh', willChange: 'transform, opacity' }}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0 opacity-100 scale-[1.2] origin-[65%_42%]"
      />
      
      <div className="relative z-10 px-6 md:px-12 pb-12 md:pb-24 pointer-events-none">
        <div className={`transition-all duration-[750ms] ease-out delay-150 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="text-[14px] font-[400] uppercase tracking-[0.18em] text-[rgba(255,255,255,0.45)]">
            Minari Shah
          </div>
          <div className="text-[13px] font-[400] tracking-[0.10em] mt-2 mb-8 text-[rgba(255,255,255,0.32)]">
            Fractional CCO &nbsp;&middot;&nbsp; Strategic Communications
          </div>
        </div>
        
        <h1 className="text-[clamp(22px,3vw,38px)] font-bold leading-[1.35] tracking-tight max-w-[800px]">
          <div className="overflow-hidden">
            <span className={`block text-[rgba(255,255,255,0.6)] transition-all duration-[750ms] ease-out delay-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              Most Companies call in communications
            </span>
          </div>
          <div className="overflow-hidden">
            <span className={`block text-[rgba(255,255,255,0.6)] transition-all duration-[750ms] ease-out delay-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              for coverage.
            </span>
          </div>
          <div className="overflow-hidden mt-1 md:mt-2">
            <span className={`block text-white transition-all duration-[750ms] ease-out delay-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              I get called in when they have
            </span>
          </div>
          <div className="overflow-hidden">
            <span className={`block text-white transition-all duration-[750ms] ease-out delay-[800ms] ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              a business problem.
            </span>
          </div>
        </h1>

        <div className={`mt-12 flex items-center gap-4 transition-all duration-[750ms] ease-out delay-[950ms] ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="w-[32px] h-[2px] bg-[rgba(255,255,255,0.40)]" />
          <span className="text-[12px] uppercase text-[rgba(255,255,255,0.40)] tracking-[0.16em]">
            Scroll to explore
          </span>
        </div>
        
        <div className={`transition-all duration-[750ms] ease-out delay-[1100ms] ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="hero-chips">
            <span className="hero-chip">Growth</span>
            <span className="hero-chip">Trust</span>
            <span className="hero-chip">Alignment</span>
            <span className="hero-chip">Investor confidence</span>
            <span className="hero-chip">Market access</span>
          </div>
          <div className="hero-problem-text">
            <p className="hero-problem-line1">Those are the problems.</p>
            <p className="hero-problem-line2">And that&apos;s where I work.</p>
          </div>
        </div>
      </div>

      <div className="hero-ticker" aria-hidden="true">
        <div className="hero-ticker-track">
          <span>Market entry</span><span className="hero-ticker-sep">·</span>
          <span>IPO narrative</span><span className="hero-ticker-sep">·</span>
          <span>Crisis communications</span><span className="hero-ticker-sep">·</span>
          <span>Investor storytelling</span><span className="hero-ticker-sep">·</span>
          <span>Leadership alignment</span><span className="hero-ticker-sep">·</span>
          <span>Board communications</span><span className="hero-ticker-sep">·</span>
          <span>Change management</span><span className="hero-ticker-sep">·</span>
          <span>Market entry</span><span className="hero-ticker-sep">·</span>
          <span>IPO narrative</span><span className="hero-ticker-sep">·</span>
          <span>Crisis communications</span><span className="hero-ticker-sep">·</span>
          <span>Investor storytelling</span><span className="hero-ticker-sep">·</span>
          <span>Leadership alignment</span><span className="hero-ticker-sep">·</span>
          <span>Board communications</span><span className="hero-ticker-sep">·</span>
          <span>Change management</span><span className="hero-ticker-sep">·</span>
          <span>Market entry</span><span className="hero-ticker-sep">·</span>
          <span>IPO narrative</span><span className="hero-ticker-sep">·</span>
          <span>Crisis communications</span><span className="hero-ticker-sep">·</span>
          <span>Investor storytelling</span><span className="hero-ticker-sep">·</span>
          <span>Leadership alignment</span><span className="hero-ticker-sep">·</span>
          <span>Board communications</span><span className="hero-ticker-sep">·</span>
          <span>Change management</span><span className="hero-ticker-sep">·</span>
        </div>
      </div>
    </section>
  );
}
