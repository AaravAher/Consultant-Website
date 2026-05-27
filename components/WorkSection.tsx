'use client';

import { useEffect, useRef } from 'react';

const ENGAGEMENTS = [
  { client: 'Global financial institution', type: 'Crisis response' },
  { client: 'National media organization', type: 'Reputation strategy' },
  { client: 'Technology executive', type: 'Public positioning' },
  { client: 'Healthcare provider network', type: 'Stakeholder communications' },
  { client: 'Government body', type: 'Media counsel' },
  { client: 'Consumer brand', type: 'Issues management' },
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
        threshold: 0.35,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="bg-[#ece5d4] px-6 md:px-[36px] py-12 md:py-[60px] flex flex-col justify-center min-h-[100vh] page-snap-container">
      <div className="w-full max-w-[1200px] mx-auto h-full flex flex-col justify-center section-content">
        <div className="text-[9px] uppercase text-[rgba(12,14,19,0.32)] tracking-[0.16em]">
          Selected work
        </div>
        
        <div className="mt-7 md:mt-[28px] w-full max-w-[800px] flex flex-col">
          {ENGAGEMENTS.map((engagement, index) => (
            <div 
              key={index} 
              ref={(el) => { rowsRef.current[index] = el; }}
              className={`reveal-hidden flex justify-between items-center py-[24px] border-b border-[rgba(12,14,19,0.09)]`}
            >
              <div className="text-[15px] md:text-[18px] text-[#0c0e13]">
                {engagement.client}
              </div>
              <div className="text-[11px] md:text-[13px] text-[rgba(12,14,19,0.32)] text-right pl-4">
                {engagement.type}
              </div>
            </div>
          ))}
          
        </div>
      </div>
    </section>
  );
}
