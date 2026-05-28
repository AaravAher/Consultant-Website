'use client';
import { useEffect } from 'react';

export function useCursorGlow() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const glowSections = [
      { id: 'brief',        base: '#ece5d4' },
      { id: 'track-record', base: '#ece5d4' },
      { id: 'engage',       base: '#ece5d4' },
      { id: 'how-we-work',  base: '#e4dcc8' },
      { id: 'work',         base: '#ece5d4' },
      { id: 'contact',      base: '#ece5d4' },
    ];

    glowSections.forEach(({ id, base }) => {
      const section = document.getElementById(id);
      if (!section) return;

      // Ensure the section can receive a background without disrupting layout
      section.style.backgroundOrigin = 'border-box';

      const handleMouseMove = (e: MouseEvent) => {
        const rect = section.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        section.style.background =
          `radial-gradient(circle 360px at ${x}px ${y}px, rgba(255,255,255,0.13) 0%, transparent 100%), ${base}`;
      };

      const handleMouseLeave = () => {
        section.style.background = base;
      };

      section.addEventListener('mousemove', handleMouseMove);
      section.addEventListener('mouseleave', handleMouseLeave);
      
      (section as any)._cleanupGlow = () => {
        section.removeEventListener('mousemove', handleMouseMove);
        section.removeEventListener('mouseleave', handleMouseLeave);
      };
    });

    return () => {
      glowSections.forEach(({ id }) => {
        const section = document.getElementById(id);
        if (section) (section as any)._cleanupGlow?.();
      });
    };
  }, []);
}
