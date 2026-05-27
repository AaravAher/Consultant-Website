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

    // Inject overlay if it doesn't exist
    let overlay = document.getElementById('page-transition-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'page-transition-overlay';
      overlay.style.cssText = `
        position: fixed;
        inset: 0;
        z-index: 200;
        background: #0c0e13;
        opacity: 0;
        pointer-events: none;
        transition: opacity 160ms ease-in;
      `;
      document.body.appendChild(overlay);
    }

    // Attach global trigger for Nav
    window.triggerNavTransition = (onMidpoint: () => void) => {
      const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (isReducedMotion) {
        onMidpoint();
        return;
      }

      if (!overlay) return;
      overlay.style.transition = 'opacity 160ms ease-in';
      overlay.style.opacity = '0.42';
      
      setTimeout(() => {
        onMidpoint();
        if (overlay) {
          overlay.style.transition = 'opacity 280ms ease-out';
          overlay.style.opacity = '0';
        }
      }, 160);
    };

    // IntersectionObserver for natural scroll snapping (threshold 0.88)
    const sections = document.querySelectorAll('section');
    if (!sections.length) return;

    const revealSectionContent = (target: Element) => {
      const contentElements = target.querySelectorAll('.section-content');
      contentElements.forEach((el) => {
        // Delay addition of .revealed by 60ms so overlay is at peak
        setTimeout(() => {
          el.classList.add('revealed');
        }, 60);
      });
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
          if (!isReducedMotion && overlay) {
            // Flash overlay briefly
            overlay.style.transition = 'opacity 120ms ease-in';
            overlay.style.opacity = '0.28';
            setTimeout(() => {
              if (overlay) {
                overlay.style.transition = 'opacity 220ms ease-out';
                overlay.style.opacity = '0';
              }
            }, 120);
          }
          
          revealSectionContent(entry.target);
        }
      });
    }, { threshold: 0.88 });

    sections.forEach((section) => sectionObserver.observe(section));

    return () => {
      if (window.triggerNavTransition) delete window.triggerNavTransition;
      sectionObserver.disconnect();
    };
  }, []);
}
