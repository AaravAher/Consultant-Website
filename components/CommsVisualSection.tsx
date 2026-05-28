'use client';

import { useEffect, useRef, useState } from 'react';

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
    <div className="relative w-full h-[300px] lg:h-[400px] mx-auto md:mx-0">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />
    </div>
  );
}

const ENGAGEMENT_MODELS = [
  {
    label: "FRACTIONAL CCO",
    desc: "Ongoing strategic communications leadership embedded in your team.",
    services: "Narrative & strategy architecture · Media & analyst relations · Social media & owned channels strategy · C-Suite communications & thought leadership · Internal communications strategy · Measurement metrics & impact goals"
  },
  {
    label: "SPECIAL SITUATIONS",
    desc: "Focused engagement for high-stakes moments.",
    services: "M&A and investor relations · Crisis and risk management · Market entry & scale-up communications · Business transformation & change management · Pre-/post-IPO narrative development · Investor decks, fact sheets, financial storytelling · Board communications support"
  },
  {
    label: "PROJECT-BASED",
    desc: "Fixed-scope engagements and leadership workshops.",
    services: "CXO Communications Workshops (90-min leadership bootcamp) · Fixed period 12–18 month build-outs · Audit & gap identification · Strategic narrative & positioning · Stakeholder mapping & execution · Customised strategy blueprint · Practical messaging playbook"
  }
];

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
        threshold: 0.15,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="how-we-work" ref={sectionRef} className="bg-[#e4dcc8] px-6 md:px-[36px] py-12 md:py-[80px] flex flex-col justify-center min-h-screen page-snap-container">
      <div className="w-full max-w-[1200px] mx-auto flex flex-col h-full justify-center section-content">
        
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-12 lg:gap-16 items-center">
          
          {/* Left Column */}
          <div className={`transition-all duration-700 ease-out flex flex-col ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[18px]'}`}>
            <div className="text-[9px] uppercase text-[rgba(12,14,19,0.32)] tracking-[0.16em]">
              ENGAGEMENT MODELS
            </div>
            
            <h2 className="text-[32px] md:text-[44px] font-medium text-[#0c0e13] leading-[1.2] mt-6 mb-10">
              How we work together.
            </h2>
            
            <div className="flex flex-col border-t border-[rgba(12,14,19,0.09)]">
              {ENGAGEMENT_MODELS.map((model, idx) => (
                <div key={idx} className="py-6 border-b border-[rgba(12,14,19,0.09)] flex flex-col">
                  <div className="text-[12px] font-[500] text-[#0c0e13] tracking-[0.05em] uppercase mb-1">
                    {model.label}
                  </div>
                  <div className="text-[14px] text-[rgba(12,14,19,0.75)] font-[400] mb-3">
                    {model.desc}
                  </div>
                  <div className="text-[12px] text-[rgba(12,14,19,0.50)] font-[400] leading-[1.6]">
                    {model.services}
                  </div>
                </div>
              ))}
            </div>

            <div className="text-[11px] text-[rgba(12,14,19,0.38)] tracking-[0.04em] mt-8 uppercase">
              Geographic depth: India & Asia-Pacific  |  Cross-cultural, multi-market strategy across APAC, EU & LatAm
            </div>
          </div>
          
          {/* Right Column */}
          <div className={`flex justify-center w-full transition-all duration-700 ease-out delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[18px]'}`}>
            <AudioWaveform />
          </div>
          
        </div>
      </div>
    </section>
  );
}
