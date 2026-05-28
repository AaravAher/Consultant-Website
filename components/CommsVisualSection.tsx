'use client';

import { useEffect } from 'react';

const ENGAGEMENT_MODELS = [
  {
    label: "FRACTIONAL CCO",
    desc: "Ongoing strategic communications leadership embedded in your team.",
    services: "Narrative & strategy architecture · Media & analyst relations · Social media & owned channels · C-Suite communications & thought leadership · Internal communications strategy · Measurement & impact goals"
  },
  {
    label: "SPECIAL SITUATIONS",
    desc: "Focused engagement for high-stakes moments.",
    services: "M&A and investor relations · Crisis and risk management · Market entry & scale-up communications · Business transformation & change management · Pre-/post-IPO narrative development · Investor decks & financial storytelling · Board communications support"
  },
  {
    label: "PROJECT-BASED",
    desc: "Fixed-scope engagements and leadership workshops.",
    services: "CXO Communications Workshops (90-min leadership bootcamp) · Fixed period 12–18 month build-outs · Audit & gap identification · Strategic narrative & positioning · Stakeholder mapping & execution · Practical messaging playbook"
  }
];

export default function CommsVisualSection() {
  useEffect(() => {
    const track = document.getElementById('hwwTrack');
    const dots = document.querySelectorAll('.hww-dot');
    const section = document.getElementById('how-we-work');
    if (!track || !section) return;

    const panelCount = 3;
    let current = 0;
    let startX = 0;
    let startY = 0;
    let locked = false;

    function goTo(index: number) {
      current = Math.max(0, Math.min(panelCount - 1, index));
      track!.style.transform = `translateX(-${current * (100 / panelCount)}%)`;
      dots.forEach((d, i) => d.classList.toggle('active', i === current));
    }

    dots.forEach((dot) => {
      dot.addEventListener('click', () => goTo(parseInt((dot as HTMLElement).dataset.index || '0')));
    });

    const handleTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      locked = false;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (locked) return;
      const dx = e.changedTouches[0].clientX - startX;
      const dy = e.changedTouches[0].clientY - startY;
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 44) {
        goTo(dx < 0 ? current + 1 : current - 1);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      const dx = Math.abs(e.touches[0].clientX - startX);
      const dy = Math.abs(e.touches[0].clientY - startY);
      if (dy > dx) locked = true;
    };

    section.addEventListener('touchstart', handleTouchStart as any, { passive: true });
    section.addEventListener('touchend', handleTouchEnd as any, { passive: true });
    section.addEventListener('touchmove', handleTouchMove as any, { passive: true });

    let isDragging = false;
    const handleMouseDown = (e: MouseEvent) => {
      startX = e.clientX;
      isDragging = true;
    };
    const handleMouseUp = (e: MouseEvent) => {
      if (!isDragging) return;
      isDragging = false;
      const dx = e.clientX - startX;
      if (Math.abs(dx) > 60) goTo(dx < 0 ? current + 1 : current - 1);
    };

    section.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    const handleKeyDown = (e: KeyboardEvent) => {
      const rect = section.getBoundingClientRect();
      if (rect.top > window.innerHeight || rect.bottom < 0) return;
      if (e.key === 'ArrowRight') { e.preventDefault(); goTo(current + 1); }
      if (e.key === 'ArrowLeft')  { e.preventDefault(); goTo(current - 1); }
    };
    document.addEventListener('keydown', handleKeyDown);

    const canvases = track.querySelectorAll('.hww-wave') as NodeListOf<HTMLCanvasElement>;
    const layers = [
      { amp: 18, freq: 0.022, speed: 0.55, color: 'rgba(77,127,168,0.55)',  lw: 1.4 },
      { amp: 10, freq: 0.036, speed: 0.85, color: 'rgba(42,127,110,0.38)',  lw: 1.0 },
      { amp: 5,  freq: 0.055, speed: 1.20, color: 'rgba(12,14,19,0.14)',    lw: 0.7 },
    ];
    let t = 0;
    let animId: number;

    function drawWaves() {
      t += 0.04;
      canvases.forEach((canvas) => {
        const W = canvas.offsetWidth * devicePixelRatio;
        const H = canvas.offsetHeight * devicePixelRatio;
        if (canvas.width !== W) { canvas.width = W; canvas.height = H; }
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        ctx.clearRect(0, 0, W, H);

        ctx.beginPath();
        ctx.moveTo(0, H / 2);
        ctx.lineTo(W, H / 2);
        ctx.strokeStyle = 'rgba(12,14,19,0.06)';
        ctx.lineWidth = 0.5 * devicePixelRatio;
        ctx.stroke();

        layers.forEach(({ amp, freq, speed, color, lw }) => {
          ctx.beginPath();
          // Step by 3 pixels to massively reduce iterations and path complexity without losing visual quality
          for (let x = 0; x <= W; x += 3) {
            const xn = x / devicePixelRatio;
            const y = H / 2
              + Math.sin(xn * freq + t * speed) * amp * devicePixelRatio
              + Math.sin(xn * freq * 1.6 + t * speed * 0.6) * amp * 0.35 * devicePixelRatio;
            x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
          }
          ctx.strokeStyle = color;
          ctx.lineWidth = lw * devicePixelRatio;
          ctx.stroke();
        });
      });
      animId = requestAnimationFrame(drawWaves);
    }

    drawWaves();
    goTo(0);

    return () => {
      section.removeEventListener('touchstart', handleTouchStart as any);
      section.removeEventListener('touchend', handleTouchEnd as any);
      section.removeEventListener('touchmove', handleTouchMove as any);
      section.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('keydown', handleKeyDown);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <section id="how-we-work">
      <div className="hww-header">
        <div className="section-tag text-[9px] uppercase text-[rgba(12,14,19,0.32)] tracking-[0.16em]">ENGAGEMENT MODELS</div>
        <div className="hww-headline">How we work together.</div>
      </div>
      
      <div className="hww-carousel-outer">
        <div className="hww-carousel-track" id="hwwTrack">
          {ENGAGEMENT_MODELS.map((model, idx) => (
            <div key={idx} className="hww-panel">
              <div className="hww-model-label">{model.label}</div>
              <canvas className="hww-wave"></canvas>
              <div className="hww-panel-content">
                <div className="hww-desc">{model.desc}</div>
                <div className="hww-services">{model.services}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="hww-bottom">
        <div className="hww-dots">
          {ENGAGEMENT_MODELS.map((_, idx) => (
            <button key={idx} className={`hww-dot ${idx === 0 ? 'active' : ''}`} data-index={idx} aria-label={`Go to panel ${idx + 1}`}></button>
          ))}
        </div>
        <div className="hww-geo">
          Geographic depth: India & Asia-Pacific &nbsp;|&nbsp;
          Cross-cultural, multi-market strategy across APAC, EU & LatAm
        </div>
      </div>
    </section>
  );
}
