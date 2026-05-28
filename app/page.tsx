'use client';

import { usePageTransition } from '@/hooks/usePageTransition';
import Nav from '@/components/Nav';
import HeroSection from '@/components/HeroSection';
import BriefSection from '@/components/BriefSection';
import TrackRecordSection from '@/components/TrackRecordSection';
import EngageSection from '@/components/EngageSection';
import CommsVisualSection from '@/components/CommsVisualSection';
import WorkSection from '@/components/WorkSection';
import ContactSection from '@/components/ContactSection';

export default function Home() {
  usePageTransition();

  return (
    <>
      <Nav />
      <main style={{ perspective: '1100px', perspectiveOrigin: '50% 35%' }}>
        <div id="hero-scroll-wrapper" style={{ position: 'relative', height: '200vh' }}>
          <HeroSection />
        </div>
        <BriefSection />
        <TrackRecordSection />
        <EngageSection />
        <CommsVisualSection />
        <WorkSection />
        <ContactSection />
      </main>
    </>
  );
}
