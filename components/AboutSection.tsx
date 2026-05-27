'use client';

import { useEffect, useRef } from 'react';

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && contentRef.current) {
            contentRef.current.classList.remove('reveal-hidden');
            contentRef.current.classList.add('reveal-visible');
            // Unobserve after revealing
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
    <section ref={sectionRef} className="bg-[#ece5d4] px-6 md:px-[36px] py-12 md:py-[60px] flex flex-col justify-center page-snap-container">
      <div className="w-full max-w-[1200px] mx-auto h-full flex flex-col justify-center section-content">
        <div className="text-[9px] uppercase text-[rgba(12,14,19,0.32)] tracking-[0.16em]">
          About
        </div>
        
        <div ref={contentRef} className="reveal-hidden mt-6 md:mt-10 md:w-[65%]">
          <h2 className="text-[28px] md:text-[36px] font-medium text-[#0c0e13] leading-[1.28] max-w-[700px]">
            Most communications fail not from lack of message — but lack of clarity about what the message is actually for.
          </h2>
          
          <div className="text-[14px] text-[rgba(12,14,19,0.50)] leading-[1.88] max-w-[600px] mt-8 flex flex-col gap-4">
            <p>
              I work with a small number of clients at any one time. That's deliberate. It means when something breaks — and in communications, things break — you get my full attention, not a layer of analysts. I've spent two decades advising organizations through the moments that define how they're remembered.
            </p>
          </div>
          
        </div>
      </div>
    </section>
  );
}
