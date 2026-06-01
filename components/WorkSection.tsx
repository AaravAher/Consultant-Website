'use client';

import { useEffect, useRef } from 'react';

const ENGAGEMENTS = [
  <span key="1">Leading communications strategy and execution for a major private-equity-backed M&amp;A integration.</span>,
  <span key="2">Anchoring market-entry and regulatory positioning for SharkNinja&apos;s expansion into India.</span>,
  <span key="3">Building the US customer narrative and trust positioning for an Agritech AI company.</span>,
  <span key="4">Advising a PE-backed tech company on customer storytelling for large US customers. <span style={{ color: 'rgba(12,14,19,0.38)', fontSize: '0.9em' }}>(NDA)</span></span>,
  <span key="5">Supporting a fashion-tech AI company on investor communications and fundraising narratives. <span style={{ color: 'rgba(12,14,19,0.38)', fontSize: '0.9em' }}>(NDA)</span></span>,
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
    <section id="work" ref={sectionRef} className="bg-[#ece5d4] px-6 md:px-[36px] pt-12 md:pt-16 pb-20 md:pb-[100px] flex flex-col page-snap-container">
      <div className="w-full max-w-[1200px] mx-auto flex flex-col section-content">
        <h3 className="text-[18px] md:text-[22px] font-medium text-[#0c0e13] mb-6">
          Ongoing Engagements
        </h3>
        <div className="w-full max-w-[900px] flex flex-col border-t border-[rgba(12,14,19,0.09)]">
          {ENGAGEMENTS.map((engagement, index) => (
            <div 
              key={index} 
              ref={(el) => { rowsRef.current[index] = el; }}
              className={`work-entry reveal-hidden px-6 -mx-6 block py-[22px] border-b border-[rgba(12,14,19,0.09)] relative`}
            >
              <p className="w-full max-w-full pl-0 m-0 text-[14px] text-[rgba(12,14,19,0.60)] leading-[1.6] font-[400]">
                {engagement}
              </p>
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
