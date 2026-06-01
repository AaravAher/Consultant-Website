'use client';

import { useEffect } from 'react';

export default function CommsVisualSection() {
  useEffect(() => {
    const track = document.getElementById('hwwTrack');
    const dots = document.querySelectorAll('.hww-dot');
    const section = document.getElementById('work-together');
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

    // Block-letter arrow buttons
    document.querySelectorAll('.hww-arrow-right').forEach(btn => {
      btn.addEventListener('click', () => goTo(current + 1));
    });
    document.querySelectorAll('.hww-arrow-left').forEach(btn => {
      btn.addEventListener('click', () => goTo(current - 1));
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

    const layers = [
      { amp: 18, freq: 0.022, speed: 0.55, color: 'rgba(77,127,168,0.55)',  lw: 1.4 },
      { amp: 10, freq: 0.036, speed: 0.85, color: 'rgba(42,127,110,0.38)',  lw: 1.0 },
      { amp: 5,  freq: 0.055, speed: 1.20, color: 'rgba(12,14,19,0.14)',    lw: 0.7 },
    ];
    let t = 0;
    let animId: number;

    function drawWaves() {
      t += 0.04;
      const currentCanvases = track!.querySelectorAll('.hww-wave') as NodeListOf<HTMLCanvasElement>;
      const dpr = window.devicePixelRatio || 1;

      currentCanvases.forEach((canvas, panelIndex) => {
        const W = canvas.offsetWidth * dpr;
        const H = canvas.offsetHeight * dpr;
        if (canvas.width !== W || canvas.height !== H) {
          canvas.width = W;
          canvas.height = H;
        }
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        ctx.clearRect(0, 0, W, H);

        /* Baseline */
        ctx.beginPath();
        ctx.moveTo(0, H / 2);
        ctx.lineTo(W, H / 2);
        ctx.strokeStyle = 'rgba(12,14,19,0.06)';
        ctx.lineWidth = 0.5 * dpr;
        ctx.stroke();

        /* Wave layers — xOffset shifts each panel's wave to be continuous */
        const panelWidthPx = canvas.offsetWidth;   /* physical CSS px width */
        const xOffset      = panelIndex * panelWidthPx;

        layers.forEach(({ amp, freq, speed, color, lw }) => {
          ctx.beginPath();
          // Step by 3 pixels to massively reduce iterations and path complexity without losing visual quality
          for (let x = 0; x <= W; x += 3) {
            /* Use (x / dpr + xOffset) so wave is continuous across panels */
            const xn = x / dpr + xOffset;
            const y = H / 2
              + Math.sin(xn * freq + t * speed) * amp * dpr
              + Math.sin(xn * freq * 1.6 + t * speed * 0.6) * amp * 0.35 * dpr;
            x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
          }
          ctx.strokeStyle = color;
          ctx.lineWidth = lw * dpr;
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
    <section id="work-together">
      <div className="hww-header">
        <div className="section-tag text-[9px] uppercase text-[rgba(12,14,19,0.32)] tracking-[0.16em]">ENGAGEMENT MODELS</div>
        <div className="hww-headline">How we work together.</div>
      </div>
      
      <div className="hww-carousel-outer">
        <div className="hww-carousel-track" id="hwwTrack">
          
          {/* Panel 1 */}
          <div className="hww-panel">
            <p className="hww-model-label">Fractional CCO</p>
            <p className="hww-model-sub">When communications needs leadership, not just execution.</p>

            <canvas className="hww-wave"></canvas>

            <div className="hww-panel-content">
              <div className="hww-two-col">

                <div className="hww-col">
                  <p className="hww-col-heading">Best suited for</p>
                  <ul className="hww-list">
                    <li>Scaling companies without a senior communications leader</li>
                    <li>PE-backed businesses navigating change</li>
                    <li>Leadership transitions</li>
                    <li>Pre-IPO and post-IPO companies</li>
                    <li>Organisations building long-term reputation and stakeholder trust</li>
                    <li>Companies requiring regular CEO, investor and employee communications</li>
                  </ul>
                </div>

                <div className="hww-col">
                  <p className="hww-col-heading">What it looks like</p>
                  <ul className="hww-list">
                    <li>Embedded strategic advisor</li>
                    <li>Leadership team participation</li>
                    <li>Narrative and stakeholder strategy</li>
                    <li>Agency and vendor oversight</li>
                    <li>Ongoing coaching and governance</li>
                  </ul>
                </div>

              </div>
            </div>

            <div className="hww-panel-arrows hww-arrows-right">
              <button className="hww-arrow hww-arrow-right" aria-label="Next panel">
                <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 10 L24 24 L10 38 L10 30 L16 24 L10 18 Z" fill="currentColor"/>
                  <path d="M24 10 L38 24 L24 38 L24 30 L30 24 L24 18 Z" fill="currentColor"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Panel 2 */}
          <div className="hww-panel">
            <p className="hww-model-label">When you need a specific outcome delivered.</p>
            <p className="hww-model-sub">For organisations facing a defined business moment that requires focused strategic communications support.</p>

            <canvas className="hww-wave"></canvas>

            <div className="hww-panel-content">
              <div className="hww-two-col">

                <div className="hww-col">
                  <p className="hww-col-heading">Best suited for</p>
                  <ul className="hww-list">
                    <li>Market entry</li>
                    <li>IPO narrative development</li>
                    <li>Leadership transition communications</li>
                    <li>M&amp;A integration</li>
                    <li>Crisis preparedness</li>
                    <li>Reputation audits</li>
                    <li>Stakeholder mapping</li>
                    <li>Investor story development</li>
                    <li>Internal transformation programmes</li>
                  </ul>
                </div>

                <div className="hww-col">
                  <p className="hww-col-heading">What it looks like</p>
                  <ul className="hww-list">
                    <li>Fixed scope</li>
                    <li>Defined timeline</li>
                    <li>Strategic recommendations</li>
                    <li>Playbooks, messaging and execution roadmap</li>
                    <li>Knowledge transfer to internal teams</li>
                  </ul>
                </div>

              </div>
            </div>

            <div className="hww-panel-arrows hww-arrows-both">
              <button className="hww-arrow hww-arrow-left" aria-label="Previous panel">
                <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M24 10 L10 24 L24 38 L24 30 L18 24 L24 18 Z" fill="currentColor"/>
                  <path d="M38 10 L24 24 L38 38 L38 30 L32 24 L38 18 Z" fill="currentColor"/>
                </svg>
              </button>
              <button className="hww-arrow hww-arrow-right" aria-label="Next panel">
                <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 10 L24 24 L10 38 L10 30 L16 24 L10 18 Z" fill="currentColor"/>
                  <path d="M24 10 L38 24 L24 38 L24 30 L30 24 L24 18 Z" fill="currentColor"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Panel 3 */}
          <div className="hww-panel">
            <p className="hww-model-label">Special Situations Advisory</p>
            <p className="hww-model-sub">For organisations looking for specific projects that handle unique circumstances.</p>

            <canvas className="hww-wave"></canvas>

            <div className="hww-panel-content">
              <div className="hww-three-col">

                <div className="hww-col">
                  <p className="hww-col-heading">M&amp;A &amp; Regulatory</p>
                  <ul className="hww-list">
                    <li>M&amp;A communications</li>
                    <li>Regulatory positioning</li>
                    <li>Crisis &amp; issues management</li>
                    <li>Investor storytelling</li>
                    <li>IPO narrative readiness</li>
                  </ul>
                </div>

                <div className="hww-col">
                  <p className="hww-col-heading">CXO Workshops</p>
                  <ul className="hww-list">
                    <li>Leadership communications bootcamps</li>
                    <li>PR as business strategy</li>
                    <li>Stakeholder influence</li>
                    <li>Executive narrative development</li>
                  </ul>
                </div>

                <div className="hww-col">
                  <p className="hww-col-heading">Project-Based</p>
                  <ul className="hww-list">
                    <li>Communications operating systems</li>
                    <li>Governance &amp; workflows</li>
                    <li>Team design</li>
                    <li>Measurement frameworks</li>
                  </ul>
                </div>

              </div>
            </div>

            <div className="hww-panel-arrows hww-arrows-left">
              <button className="hww-arrow hww-arrow-left" aria-label="Previous panel">
                <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M24 10 L10 24 L24 38 L24 30 L18 24 L24 18 Z" fill="currentColor"/>
                  <path d="M38 10 L24 24 L38 38 L38 30 L32 24 L38 18 Z" fill="currentColor"/>
                </svg>
              </button>
            </div>
          </div>

        </div>
      </div>
      
      <div className="hww-bottom">
        <div className="hww-dots">
          {[0, 1, 2].map((idx) => (
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
