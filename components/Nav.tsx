'use client';

import { useState, useEffect } from 'react';
import { revealHeroContent } from '@/utils/revealHero';

const NAV_LINKS = [
  { label: 'What is Revwire?', id: 'revwire' },
  { label: 'When to Engage', id: 'engage' },
  { label: 'How We Work Together', id: 'work-together' },
  { label: 'Selected Work', id: 'track-record' },
  { label: 'About Minari', id: 'about' },
];

export default function Nav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const sectionIds = [
      'revwire', 'engage', 'work-together', 'track-record', 'about', 'contact'
    ];
    const navLinks = document.querySelectorAll('.nav-link[data-section]');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            navLinks.forEach(link => link.classList.remove('nav-active'));
            const active = document.querySelector(
              `.nav-link[data-section="${entry.target.id}"]`
            );
            if (active) active.classList.add('nav-active');
          }
        });
      },
      {
        rootMargin: '-38% 0px -38% 0px',
        threshold: 0
      }
    );

    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string, e?: React.MouseEvent) => {
    if (e) e.preventDefault();
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
      <nav className="fixed top-0 left-0 w-full h-[80px] z-[9999] bg-[rgba(10,12,17,0.97)] backdrop-blur-[14px] border-b border-[rgba(255,255,255,0.12)] flex items-center justify-between px-6 md:px-12 site-nav">
        <a 
          href="#" 
          className="nav-logo text-[15px] font-medium tracking-[0.10em] text-[#ffffff] cursor-pointer hover:opacity-75 transition-opacity duration-180 ease-out no-underline" 
          onClick={(e) => scrollToSection('home', e)}
        >
          Revwire.ai
        </a>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <ul className="nav-links">
            {NAV_LINKS.map((link) => (
              <li key={link.id}>
                <a 
                  href={`#${link.id}`} 
                  className="nav-link" 
                  data-section={link.id}
                  onClick={(e) => scrollToSection(link.id, e)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a 
            href="#contact" 
            className="nav-cta nav-link" 
            data-section="contact"
            onClick={(e) => scrollToSection('contact', e)}
          >
            Contact
          </a>
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
          
          <button onClick={(e) => scrollToSection('home', e)} className="text-[24px] text-[rgba(255,255,255,0.62)] hover:text-[#ffffff]">Home</button>
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
            Contact
          </button>
        </div>
      )}
    </>
  );
}
