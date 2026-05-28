'use client';

import { useEffect, useRef } from 'react';

const ENGAGEMENTS = [
  {
    tag: 'AGRITECH AI · NDA',
    title: 'Customer Narrative for Frontier Labs',
    desc: 'Built the US farmer-facing positioning and story for an AgriTech AI company. Shaped the customer-facing story for a PE-backed AI startup pitching to large frontier labs in the US.'
  },
  {
    tag: 'SHARKNINJA',
    title: 'Turnkey M&A Integration Communications',
    desc: 'Leading strategy and execution for a large M&A integration communications mandate. Project in progress.'
  },
  {
    tag: 'WARBURG PINCUS',
    title: 'India Market Entry & Regulatory Narrative',
    desc: 'Anchoring the market entry story and leading the regulatory narrative — from bringing in specialists like APCO through to full narrative planning.'
  },
  {
    tag: 'RECENT ENGAGEMENTS',
    title: 'Agritech & Fashion Tech AI',
    desc: 'Working with an agritech AI startup to shape its narrative for US customers, and with a fashion tech AI startup on investor storytelling for fundraising.'
  },
];

export default function WorkSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const rowsRef = useRef<(HTMLDivElement | null)[]>([]);
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            rowsRef.current.forEach((row, index) => {
              if (row) {
                row.style.transitionDelay = `${index * 80}ms`;
                row.style.transitionDuration = '600ms';
                row.classList.remove('reveal-hidden');
                row.classList.add('reveal-visible');
              }
            });
            if (footerRef.current) {
              footerRef.current.style.transitionDelay = `${ENGAGEMENTS.length * 80 + 100}ms`;
              footerRef.current.style.transitionDuration = '600ms';
              footerRef.current.classList.remove('reveal-hidden');
              footerRef.current.classList.add('reveal-visible');
            }
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
    <section id="work" ref={sectionRef} className="bg-[#ece5d4] px-6 md:px-[36px] py-12 md:py-[80px] flex flex-col justify-center min-h-screen page-snap-container">
      <div className="w-full max-w-[1200px] mx-auto h-full flex flex-col justify-center section-content">
        <div className="text-[9px] uppercase text-[rgba(12,14,19,0.32)] tracking-[0.16em]">
          SELECTED WORK
        </div>
        
        <div className="text-[14px] text-[rgba(12,14,19,0.50)] mt-6 mb-10 max-w-[600px] font-[400]">
          Current ongoing engagements across AgriTech, AI, private equity, and consumer products.
        </div>
        
        <div className="w-full max-w-[900px] flex flex-col border-t border-[rgba(12,14,19,0.09)]">
          {ENGAGEMENTS.map((engagement, index) => (
            <div 
              key={index} 
              ref={(el) => { rowsRef.current[index] = el; }}
              className={`reveal-hidden flex flex-col md:flex-row gap-2 md:gap-12 py-[24px] border-b border-[rgba(12,14,19,0.09)]`}
            >
              <div className="md:w-[220px] shrink-0 pt-1">
                <div className="text-[11px] font-[500] text-[#0c0e13] tracking-[0.08em] uppercase">
                  {engagement.tag}
                </div>
              </div>
              <div className="flex flex-col flex-1">
                <div className="text-[18px] md:text-[20px] font-medium text-[#0c0e13] leading-[1.3] mb-2">
                  {engagement.title}
                </div>
                <div className="text-[14px] text-[rgba(12,14,19,0.50)] leading-[1.6] font-[400]">
                  {engagement.desc}
                </div>
              </div>
            </div>
          ))}
          
          <div ref={footerRef} className="reveal-hidden mt-8">
            <div className="text-[12px] text-[rgba(12,14,19,0.32)] font-light italic">
              Further work and case details available on request.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
