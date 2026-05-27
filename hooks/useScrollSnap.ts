'use client';

import { useState, useEffect } from 'react';

export function useScrollSnap() {
  const [activeSection, setActiveSection] = useState<number>(0);

  useEffect(() => {
    // Only run on client
    if (typeof window === 'undefined') return;

    const sections = Array.from(document.querySelectorAll('section'));
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            const index = sections.indexOf(entry.target as HTMLElement);
            if (index !== -1) {
              setActiveSection(index);
            }
          }
        });
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.51, // Triggers when slightly more than half is visible
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
      observer.disconnect();
    };
  }, []);

  return activeSection;
}
