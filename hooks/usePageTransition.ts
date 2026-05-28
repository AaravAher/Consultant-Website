'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    triggerNavTransition?: (onMidpoint: () => void) => void;
  }
}

export function usePageTransition() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Attach global trigger for Nav (no flash anymore, just scroll)
    window.triggerNavTransition = (onMidpoint: () => void) => {
      onMidpoint();
    };

    // IntersectionObserver for natural scroll snapping (threshold 0.15)
    const sections = document.querySelectorAll('section');
    if (!sections.length) return;

    const revealSectionContent = (target: Element) => {
      const contentElements = target.querySelectorAll('.section-content');
      contentElements.forEach((el) => {
        el.classList.add('revealed');
      });

      if (target.id === 'brief') {
        const rows = target.querySelectorAll('.contrast-row');
        rows.forEach((row, i) => {
          (row as HTMLElement).style.opacity = '0';
          (row as HTMLElement).style.transform = 'translateY(8px)';
          (row as HTMLElement).style.transition = 'opacity 360ms ease-out, transform 360ms ease-out';
          setTimeout(() => {
            (row as HTMLElement).style.opacity = '1';
            (row as HTMLElement).style.transform = 'translateY(0)';
            setTimeout(() => {
              (row as HTMLElement).style.transform = '';
            }, 400);
          }, 80 + i * 60);
        });
      }
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          revealSectionContent(entry.target);
        }
      });
    }, { threshold: 0.15 });

    sections.forEach((section) => sectionObserver.observe(section));

    return () => {
      if (window.triggerNavTransition) delete window.triggerNavTransition;
      sectionObserver.disconnect();
    };
  }, []);
}
