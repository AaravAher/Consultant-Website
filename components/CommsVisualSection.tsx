'use client';

import { useEffect, useRef, useState } from 'react';

// CountUp component
function StatBlock({ value, label, shouldAnimate }: { value: number, label: string, shouldAnimate: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!shouldAnimate) return;

    let startTime: number | null = null;
    const duration = 1200;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      
      // easeOutExpo
      const easeProgress = progress === duration ? 1 : 1 - Math.pow(2, -10 * progress / duration);
      
      if (progress < duration) {
        setCount(Math.floor(easeProgress * value));
        requestAnimationFrame(animate);
      } else {
        setCount(value);
      }
    };

    requestAnimationFrame(animate);
  }, [shouldAnimate, value]);

  return (
    <div className="flex flex-col">
      <div className="text-[36px] md:text-[40px] font-medium text-[#4d7fa8] leading-none tracking-[-0.01em]">
        {count}{value === 6 ? '' : '+'}
      </div>
      <div className="text-[10px] text-[rgba(12,14,19,0.32)] uppercase tracking-[0.08em] mt-3 leading-[1.5]">
        {label}
      </div>
    </div>
  );
}

function AudioWaveform() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let t = 0;
    
    let width = canvas.offsetWidth;
    let height = canvas.offsetHeight;

    const resize = () => {
      width = canvas.parentElement?.offsetWidth || 300;
      height = canvas.parentElement?.offsetHeight || 300;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener('resize', resize);
    resize();

    const layers = [
      { amp: 20, freq: 0.022, speed: 0.55, color: 'rgba(77,127,168,0.65)',  lineWidth: 1.4 },
      { amp: 12, freq: 0.036, speed: 0.85, color: 'rgba(42,127,110,0.45)',  lineWidth: 1.0 },
      { amp: 6,  freq: 0.055, speed: 1.20, color: 'rgba(12,14,19,0.18)',    lineWidth: 0.7 },
    ];

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = '#e4dcc8'; // matches background alt
      ctx.fillRect(0, 0, width, height);

      // Faint center baseline
      ctx.strokeStyle = 'rgba(12,14,19,0.07)';
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.moveTo(0, height / 2);
      ctx.lineTo(width, height / 2);
      ctx.stroke();

      // Draw each layer
      layers.forEach((layer) => {
        ctx.strokeStyle = layer.color;
        ctx.lineWidth = layer.lineWidth;
        ctx.beginPath();
        
        for (let x = 0; x <= width; x++) {
          const y = (height / 2) + Math.sin(x * layer.freq + t * layer.speed) * layer.amp + Math.sin(x * layer.freq * 1.6 + t * layer.speed * 0.6) * layer.amp * 0.35;
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      });

      t += 0.04;
      animationFrameId = requestAnimationFrame(draw);
    };

    animationFrameId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="relative w-full h-[300px] mx-auto md:mx-0">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />
    </div>
  );
}

export default function CommsVisualSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.35,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="bg-[#e4dcc8] px-6 md:px-[36px] py-12 md:py-[60px] flex flex-col justify-center page-snap-container">
      <div className="w-full max-w-[1200px] mx-auto flex flex-col h-full justify-center section-content">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8 items-center">
          
          {/* Left Column */}
          <div className={`transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[18px]'}`}>
            <div className="text-[9px] uppercase text-[rgba(12,14,19,0.32)] tracking-[0.16em]">
              Reach
            </div>
            
            <h2 className="text-[28px] md:text-[36px] font-medium text-[#0c0e13] leading-[1.2] max-w-[420px] mt-6">
              The right message, to the right people, at the right moment.
            </h2>
            
            <div className="flex gap-[42px] mt-10">
              <StatBlock value={20} label="Years of practice" shouldAnimate={isVisible} />
              <StatBlock value={40} label="Engagements" shouldAnimate={isVisible} />
              <StatBlock value={6} label="Sectors" shouldAnimate={isVisible} />
            </div>
          </div>
          
          {/* Right Column */}
          <div className={`flex justify-center md:justify-end w-full transition-all duration-700 ease-out delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[18px]'}`}>
            <AudioWaveform />
          </div>
          
        </div>
      </div>
    </section>
  );
}
