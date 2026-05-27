'use client';

import { useState } from 'react';
import { useScrollSnap } from '@/hooks/useScrollSnap';

const NAV_LINKS = [
  { label: 'About', index: 1 },
  { label: 'Experience', index: 2 },
  { label: 'Work', index: 4 }, // CommVisual is index 3, Work is 4
];

export default function Nav() {
  const activeSection = useScrollSnap();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (targetIndex: number) => {
    setMobileMenuOpen(false);

    const executeScroll = () => {
      const start = window.scrollY;
      const isMobile = window.innerWidth < 768;
      
      let target = targetIndex * window.innerHeight;
      if (isMobile) {
        const sections = document.querySelectorAll('section');
        if (sections[targetIndex]) {
          target = (sections[targetIndex] as HTMLElement).offsetTop;
        }
      }

      const duration = 420;
      const startTime = performance.now();

      function ease(t: number) {
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      }

      function step(now: number) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        window.scrollTo(0, start + (target - start) * ease(progress));
        if (progress < 1) requestAnimationFrame(step);
      }

      requestAnimationFrame(step);
    };

    executeScroll();
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full h-[80px] z-[300] bg-[rgba(10,12,17,0.97)] backdrop-blur-[14px] border-b border-[rgba(255,255,255,0.12)] flex items-center justify-between px-6 md:px-12">
        <div className="text-[18px] font-medium tracking-[0.10em] text-[#ffffff] cursor-pointer" onClick={() => scrollToSection(0)}>
          Revwire.ai
        </div>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.index;
            return (
              <button
                key={link.label}
                onClick={() => scrollToSection(link.index)}
                className={`text-[14px] tracking-[0.05em] transition-colors duration-180 ease-out py-1 ${
                  isActive
                    ? 'text-[var(--color-accent-steel)] border-b border-[var(--color-accent-steel)]'
                    : 'text-[rgba(255,255,255,0.62)] border-b border-transparent hover:text-[#ffffff] hover:border-[rgba(255,255,255,0.18)]'
                }`}
              >
                {link.label}
              </button>
            );
          })}
          <button
            onClick={() => scrollToSection(5)} // Contact is index 5
            className={`text-[14px] font-medium tracking-[0.05em] transition-all duration-180 border rounded-[5px] px-[20px] py-[10px] ml-2 ${
              activeSection === 5
                ? 'text-[#ffffff] border-[rgba(255,255,255,0.7)] bg-[rgba(255,255,255,0.06)]'
                : 'text-[rgba(255,255,255,0.62)] border-[rgba(255,255,255,0.4)] hover:text-[#ffffff] hover:border-[rgba(255,255,255,0.7)] hover:bg-[rgba(255,255,255,0.06)]'
            }`}
          >
            Get in touch
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button 
          className="md:hidden flex flex-col gap-[5px] p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <div className="w-[20px] h-[1px] bg-[rgba(255,255,255,0.62)]" />
          <div className="w-[20px] h-[1px] bg-[rgba(255,255,255,0.62)]" />
          <div className="w-[20px] h-[1px] bg-[rgba(255,255,255,0.62)]" />
        </button>
      </nav>

      {/* Mobile Overlay Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[350] bg-[rgba(10,12,17,0.98)] flex flex-col items-center justify-center gap-8">
          <button 
            className="absolute top-4 right-6 p-2 text-[rgba(255,255,255,0.62)]"
            onClick={() => setMobileMenuOpen(false)}
          >
            Close
          </button>
          
          <button onClick={() => scrollToSection(0)} className="text-[24px] text-[rgba(255,255,255,0.62)] hover:text-[#ffffff]">Home</button>
          {NAV_LINKS.map((link) => (
            <button
              key={link.label}
              onClick={() => scrollToSection(link.index)}
              className="text-[24px] text-[rgba(255,255,255,0.62)] hover:text-[#ffffff]"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => scrollToSection(5)}
            className="text-[24px] text-[var(--color-accent-steel)]"
          >
            Get in touch
          </button>
        </div>
      )}
    </>
  );
}
