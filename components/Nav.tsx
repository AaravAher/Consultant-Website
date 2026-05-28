'use client';

import { useState } from 'react';
import { useScrollSnap } from '@/hooks/useScrollSnap';
import { revealHeroContent } from '@/utils/revealHero';

const NAV_LINKS = [
  { label: 'The Brief', id: 'brief', index: 1 },
  { label: 'Track Record', id: 'track-record', index: 2 },
  { label: 'Work', id: 'work', index: 5 },
];

export default function Nav() {
  const activeSection = useScrollSnap();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    
    if (id === 'home') {
      const hero = document.getElementById('hero');
      if (hero) {
        hero.style.transition = 'transform 0ms, opacity 0ms';
        hero.style.transform = '';
        hero.style.opacity = '1';
      }
      
      revealHeroContent();
      
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const section = document.getElementById(id);
    if (!section) return;
    const top = section.getBoundingClientRect().top + window.scrollY - 68;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full h-[80px] z-[9999] bg-[rgba(10,12,17,0.97)] backdrop-blur-[14px] border-b border-[rgba(255,255,255,0.12)] flex items-center justify-between px-6 md:px-12">
        <a 
          href="#" 
          id="nav-home-link" 
          aria-label="Return to top" 
          className="text-[15px] font-medium tracking-[0.10em] text-[#ffffff] cursor-pointer hover:opacity-75 transition-opacity duration-180 ease-out no-underline" 
          onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}
        >
          Revwire.ai
        </a>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.index;
            return (
              <button
                key={link.label}
                onClick={() => scrollToSection(link.id)}
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
            onClick={() => scrollToSection('contact')}
            className={`text-[14px] font-medium tracking-[0.05em] transition-all duration-180 border rounded-[5px] px-[20px] py-[10px] ml-2 ${
              activeSection === 6
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
          
          <button onClick={() => scrollToSection('home')} className="text-[24px] text-[rgba(255,255,255,0.62)] hover:text-[#ffffff]">Home</button>
          {NAV_LINKS.map((link) => (
            <button
              key={link.label}
              onClick={() => scrollToSection(link.id)}
              className="text-[24px] text-[rgba(255,255,255,0.62)] hover:text-[#ffffff]"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => scrollToSection('contact')}
            className="text-[24px] text-[var(--color-accent-steel)]"
          >
            Get in touch
          </button>
        </div>
      )}
    </>
  );
}
