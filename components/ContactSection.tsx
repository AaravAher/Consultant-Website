'use client';

import { useEffect, useRef } from 'react';

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (headingRef.current) {
              headingRef.current.classList.remove('reveal-hidden');
              headingRef.current.classList.add('reveal-visible');
            }
            if (linksRef.current) {
              linksRef.current.style.transitionDelay = '150ms';
              linksRef.current.classList.remove('reveal-hidden');
              linksRef.current.classList.add('reveal-visible');
            }
            if (footerRef.current) {
              footerRef.current.style.transitionDelay = '300ms';
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
    <section id="contact" ref={sectionRef} className="bg-[#ece5d4] px-6 md:px-[36px] py-12 md:py-[80px] flex flex-col justify-center min-h-screen page-snap-container relative">
      <div className="w-full max-w-[1200px] mx-auto flex flex-col h-full justify-center section-content pt-20">
        <div className="text-[9px] uppercase text-[rgba(12,14,19,0.32)] tracking-[0.16em]">
          CONTACT
        </div>
        
        <div ref={headingRef} className="reveal-hidden mt-6 mb-12">
          <h2 className="text-[32px] md:text-[44px] font-medium text-[#0c0e13] leading-[1.2] max-w-[600px]">
            Let's explore how communication<br />can move your business forward.
          </h2>
        </div>
        
        <div ref={linksRef} className="reveal-hidden flex flex-col gap-6 md:gap-8 max-w-[400px]">
          <a 
            href="mailto:minarishah@outlook.com" 
            className="inline-flex flex-col gap-2 group self-start"
          >
            <span className="text-[11px] uppercase text-[rgba(12,14,19,0.32)] tracking-[0.12em] font-[500]">Email</span>
            <span className="text-[16px] md:text-[18px] text-[#0c0e13] border-b border-[rgba(12,14,19,0.22)] pb-1 transition-colors duration-200 group-hover:border-[#0c0e13]">
              minarishah@outlook.com
            </span>
          </a>

          <a 
            href="https://linkedin.com/in/minari-shah" 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex flex-col gap-2 group self-start"
          >
            <span className="text-[11px] uppercase text-[rgba(12,14,19,0.32)] tracking-[0.12em] font-[500]">LinkedIn</span>
            <span className="text-[16px] md:text-[18px] text-[#0c0e13] border-b border-[rgba(12,14,19,0.22)] pb-1 transition-colors duration-200 group-hover:border-[#0c0e13]">
              linkedin.com/in/minari-shah
            </span>
          </a>
        </div>
      </div>
      
      <div 
        ref={footerRef} 
        className="reveal-hidden absolute bottom-12 left-0 right-0 text-center"
      >
        <div className="text-[12px] text-[rgba(12,14,19,0.38)] tracking-[0.12em] uppercase font-[400]">
          Rooted in insight. Focused on impact.
        </div>
      </div>
    </section>
  );
}
