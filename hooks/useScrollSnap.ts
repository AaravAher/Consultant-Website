'use client';

import { useState, useEffect } from 'react';

export function useScrollSnap() {
  const [activeSection, setActiveSection] = useState<number>(-1);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const sections = Array.from(document.querySelectorAll('section'));
    if (!sections.length) return;

    function onScroll() {
      if (window.scrollY < window.innerHeight * 0.5) {
        setActiveSection(-1);
      }
    }
    
    window.addEventListener('scroll', onScroll, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = sections.indexOf(entry.target as HTMLElement);
            if (index > 0 && window.scrollY >= window.innerHeight * 0.4) {
              setActiveSection(index);
            }
          }
        });
      },
      {
        threshold: 0.4,
      }
    );

    sections.slice(1).forEach((section) => observer.observe(section));
    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      observer.disconnect();
    };
  }, []);

  return activeSection;
}
