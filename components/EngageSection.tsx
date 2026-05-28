'use client';

import { useEffect, useRef } from 'react';

const SCENARIOS = [
  { trigger: 'Market entry', desc: "You're entering a new market next quarter and don't know how to talk to regulators." },
  { trigger: 'IPO readiness', desc: "You're 18 months from IPO and your story doesn't hold." },
  { trigger: 'Leadership transition', desc: "You've just brought in a new CEO and the internal narrative is fractured." },
  { trigger: 'Fundraising', desc: "You're a founder who needs investors to understand why you exist, not just what you sell." },
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
        
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
          
          {/* Left Column */}
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <div className="text-[9px] uppercase text-[rgba(12,14,19,0.32)] tracking-[0.16em]">
                SITUATIONS
              </div>
              <h2 className="text-[32px] md:text-[44px] font-medium text-[#0c0e13] leading-[1.2] mt-6">
                When to call.
              </h2>
            </div>
            
            <div className="hidden lg:block text-[16px] text-[rgba(12,14,19,0.50)] font-[400] italic max-w-[400px]">
              If communication can remove a business roadblock, that's when we should talk.
            </div>
          </div>

          {/* Right Column Grid */}
          <div className="flex-1 lg:max-w-[600px] grid grid-cols-1 sm:grid-cols-2 gap-4">
            {SCENARIOS.map((sc, index) => (
              <div 
                key={index}
                ref={(el) => { cardsRef.current[index] = el; }}
                className="reveal-hidden bg-[rgba(12,14,19,0.04)] border border-[rgba(12,14,19,0.09)] p-6 rounded-[4px] flex flex-col"
              >
                <div className="text-[12px] font-[500] text-[#4d7fa8] tracking-[0.08em] uppercase mb-3">
                  {sc.trigger}
                </div>
                <div className="text-[14px] text-[rgba(12,14,19,0.62)] font-[400] leading-[1.6]">
                  {sc.desc}
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Closing Line */}
          <div className="lg:hidden text-[16px] text-[rgba(12,14,19,0.50)] font-[400] italic mt-4">
            If communication can remove a business roadblock, that's when we should talk.
          </div>
          
        </div>

      </div>
    </section>
  );
}
