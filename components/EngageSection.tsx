'use client';

import { useEffect, useRef } from 'react';

const SCENARIOS = [
  {
    title: 'Global companies entering or recalibrating for India',
    backLabel: 'GLOBAL COMPANIES — INDIA',
    backBody: "Market entry, regulatory positioning and brand repositioning for reputation and stakeholder management for firms navigating India's complex competitive and policy landscape."
  },
  {
    title: 'Founders navigating scale, pivots or investor pressure',
    backLabel: 'FOUNDER POSITIONING & GROWTH NARRATIVES',
    backBody: 'Founders and D2C brands seeking to break through the clutter with sharper positioning, differentiated market narratives and stronger returns from marketing, communications and social investments.'
  },
  {
    title: 'Listed and pre-IPO companies building investor narratives',
    backLabel: 'IPO & INVESTOR NARRATIVE',
    backBody: 'Companies at inflection points, navigating scale, transformation, IPOs and post-IPO transitions, where investor confidence, stakeholder trust and reputation must evolve alongside business growth — with a unified story that investors, analysts and employees all need to believe.'
  },
  {
    title: 'Organisations in transition or transformation',
    backLabel: 'TRANSFORMATION & CHANGE',
    backBody: 'Restructure, relaunch, M&A integration and generational transitions that require communication to provide direction, stabilise culture and help stakeholders understand not just what is changing, but why it matters and what comes next.'
  },
  {
    title: 'PE firms and boards',
    backLabel: 'PE & BOARD COMMUNICATIONS',
    backBody: 'Portfolio communications, governance and enterprise-value creation across PE-backed businesses, requiring nuanced multi-stakeholder communication strategy and execution.'
  },
  {
    title: 'Leadership transitions & executive communications',
    backLabel: 'LEADERSHIP TRANSITIONS',
    backBody: 'New CEOs, founder succession, leadership restructuring or organisational change where confidence, alignment and clarity are critical. Build the narrative for leadership transitions, align employees and stakeholders behind the new direction, and support executive visibility with investors, customers, regulators and partners.'
  },
  {
    title: 'Reputation recovery & crisis navigation',
    backLabel: 'REPUTATION & CRISIS',
    backBody: 'Organisations facing reputational, regulatory or operational challenges that require clear stakeholder engagement, trust rebuilding and disciplined narrative management.'
  }
];

export default function EngageSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            cardsRef.current.forEach((card, index) => {
              if (card) {
                card.style.transitionDelay = `${index * 100}ms`;
                card.classList.remove('reveal-hidden');
                card.classList.add('reveal-visible');
              }
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="engage" ref={sectionRef} className="bg-[#ece5d4] px-6 md:px-[36px] py-12 md:py-[80px] flex flex-col justify-center min-h-screen page-snap-container">
      <div className="w-full max-w-[1200px] mx-auto h-full flex flex-col justify-center section-content">
        
          {/* Header */}
          <div className="flex flex-col">
            <div className="engage-label">
              SITUATIONS
            </div>
            <h2 className="text-[32px] md:text-[44px] font-medium text-[#0c0e13] leading-[1.2] mt-6">
              When should you call RevWire?
            </h2>
          </div>

          {/* Grid */}
          <div className="engage-grid">
            {SCENARIOS.map((sc, index) => (
              <div 
                key={index}
                ref={(el) => { cardsRef.current[index] = el; }}
                className="engage-flip-wrap reveal-hidden"
                onClick={(e) => e.currentTarget.classList.toggle('flipped')}
              >
                <div className="engage-flip-card">
                  <div className="engage-face engage-front">
                    <span className="engage-num">0{index + 1}</span>
                    <p className="engage-title">{sc.title}</p>
                  </div>
                  <div className="engage-face engage-back">
                    <p className="engage-back-label">{sc.backLabel}</p>
                    <p className="engage-back-body">{sc.backBody}</p>
                    <a href="#contact" className="engage-back-cta">Let&apos;s talk &rarr;</a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Closing Line */}
          <p className="engage-quote text-[16px] text-[rgba(12,14,19,0.50)] font-[400] italic mt-12">
            &ldquo;If communication can remove a business roadblock, that&apos;s when we should talk.&rdquo;
          </p>

      </div>
    </section>
  );
}
