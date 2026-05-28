'use client';

import { useEffect, useRef } from 'react';

const SCENARIOS = [
  { 
    trigger: 'MARKET ENTRY', 
    desc: "You're entering a new market next quarter and don't know how to talk to regulators.",
    backBody: "I map the regulatory and stakeholder landscape first, then build the narrative that earns you permission to operate — before you launch, not after."
  },
  { 
    trigger: 'IPO READINESS', 
    desc: "You're 18 months from IPO and your story doesn't hold.",
    backBody: "The story has to work for investors, analysts, and employees simultaneously. I build that unified narrative and stress-test it before the roadshow begins."
  },
  { 
    trigger: 'LEADERSHIP TRANSITION', 
    desc: "You've just brought in a new CEO and the internal narrative is fractured.",
    backBody: "Internal alignment comes before external announcement. I build the communications architecture that lets the new leader land with credibility — internally first, then out."
  },
  { 
    trigger: 'FUNDRAISING', 
    desc: "You're a founder who needs investors to understand why you exist, not just what you sell.",
    backBody: "Purpose and proof have to coexist in the same sentence. I shape the founding story and investor narrative so the \"why\" is never in doubt — and the \"what\" follows naturally."
  },
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
              When to call.
            </h2>
          </div>

          {/* Grid */}
          <div className="engage-grid">
            {SCENARIOS.map((sc, index) => (
              <div 
                key={index}
                ref={(el) => { cardsRef.current[index] = el; }}
                className="engage-cell engage-flip-wrap reveal-hidden h-[340px] md:h-[360px]"
                onClick={(e) => e.currentTarget.classList.toggle('flipped')}
              >
                <div className="engage-flip-card">
                  <div className="engage-face engage-front">
                    <span className="engage-num">0{index + 1}</span>
                    <p className="engage-title engage-trigger">{sc.trigger}</p>
                    <p className="engage-desc">{sc.desc}</p>
                  </div>
                  <div className="engage-face engage-back">
                    <p className="engage-back-label">{sc.trigger}</p>
                    <p className="engage-back-body">{sc.backBody}</p>
                    <div>
                      <a href="#contact" className="engage-back-cta">Let&apos;s talk &rarr;</a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Closing Line */}
          <p className="engage-quote text-[16px] text-[rgba(12,14,19,0.50)] font-[400] italic">
            &ldquo;If communication can remove a business roadblock, that&apos;s when we should talk.&rdquo;
          </p>

      </div>
    </section>
  );
}
