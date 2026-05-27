'use client';

import { useEffect, useRef } from 'react';

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const emailRef = useRef<HTMLAnchorElement>(null);
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
            if (emailRef.current) {
              emailRef.current.style.transitionDelay = '150ms';
              emailRef.current.classList.remove('reveal-hidden');
              emailRef.current.classList.add('reveal-visible');
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
      <div className="w-full max-w-[1200px] mx-auto flex flex-col h-full justify-center section-content">
        <div className="text-[9px] uppercase text-[rgba(12,14,19,0.32)] tracking-[0.16em]">
          Get in touch
        </div>
        
        <div ref={headingRef} className="reveal-hidden mt-[16px]">
          <h2 className="text-[32px] md:text-[42px] font-medium text-[#0c0e13] leading-[1.2]">
            Selective engagements.
            <br />
            Serious conversations.
          </h2>
        </div>
        
        <a 
          ref={emailRef} 
          href="mailto:hello@yourname.com" 
          className="reveal-hidden inline-block self-start mt-[36px] text-[16px] md:text-[18px] text-[rgba(12,14,19,0.50)] border-b border-[rgba(12,14,19,0.22)] pb-1 transition-colors duration-200 hover:text-[#0c0e13] hover:border-[#0c0e13]"
        >
          hello@yourname.com
        </a>
        
      </div>
    </section>
  );
}
