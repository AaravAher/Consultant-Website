'use client';

import { useEffect, useRef } from 'react';

const EXPERIENCES = [
  {
    year: '2019 – Present',
    role: 'Independent PR Counsel',
    type: 'Private practice',
    desc: 'Advising a select portfolio of private clients on high-stakes communications, reputation management, and strategic positioning.',
  },
  {
    year: '2013 – 2019',
    role: 'Director of Communications',
    type: 'Major institution',
    desc: 'Led global corporate communications and crisis response for a multinational organization, managing media relations across 12 markets.',
  },
  {
    year: '2007 – 2013',
    role: 'Senior Communications Advisor',
    type: 'Government & public sector',
    desc: 'Provided direct strategic counsel to senior officials on policy rollouts, crisis mitigation, and public affairs campaigns.',
  },
];

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const rowsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            rowsRef.current.forEach((row, index) => {
              if (row) {
                // Apply staggered delay
                row.style.transitionDelay = `${index * 120}ms`;
                row.classList.remove('reveal-hidden');
                row.classList.add('reveal-visible');
              }
            });
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
          Experience
        </div>
        
        <div className="mt-7 md:mt-[28px] w-full max-w-[800px]">
          {EXPERIENCES.map((exp, index) => (
            <div 
              key={index} 
              ref={(el) => { rowsRef.current[index] = el; }}
              className={`reveal-hidden grid grid-cols-1 md:grid-cols-[100px_auto] gap-4 md:gap-8 py-6 ${
                index === 0 ? 'border-y' : 'border-b'
              } border-[rgba(12,14,19,0.09)]`}
            >
              <div className="text-[#b89358] text-[10px] tracking-[0.05em] leading-[1.6]">
                {exp.year}
              </div>
              <div className="flex flex-col">
                <div className="text-[14px] md:text-[16px] font-medium text-[#0c0e13]">
                  {exp.role}
                </div>
                <div className="text-[12px] text-[rgba(12,14,19,0.32)] mt-[3px] tracking-[0.03em]">
                  {exp.type}
                </div>
                <div className="text-[13px] md:text-[14px] text-[rgba(12,14,19,0.50)] leading-[1.7] mt-[8px]">
                  {exp.desc}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
