'use client';

import { usePageTransition } from '@/hooks/usePageTransition';
import { useCursorGlow } from '@/hooks/useCursorGlow';
import Nav from '@/components/Nav';
import HeroSection from '@/components/HeroSection';
import BriefSection from '@/components/BriefSection';
import TrackRecordSection from '@/components/TrackRecordSection';
import CredentialTicker from '@/components/CredentialTicker';
import EngageSection from '@/components/EngageSection';
import CommsVisualSection from '@/components/CommsVisualSection';
import WorkSection from '@/components/WorkSection';
import ContactSection from '@/components/ContactSection';
import AvailabilityBadge from '@/components/AvailabilityBadge';

export default function Home() {
  usePageTransition();
  useCursorGlow();

  return (
    <>
      <Nav />
      <main style={{ perspective: '1100px', perspectiveOrigin: '50% 35%' }}>
        <div id="hero-scroll-wrapper" style={{ position: 'relative', height: '200vh' }}>
          <HeroSection />
        </div>
        <BriefSection />
        <EngageSection />
        <CommsVisualSection />
        <TrackRecordSection />
        <CredentialTicker />
        <WorkSection />
        <section id="about"></section>
        <ContactSection />
      </main>
      <AvailabilityBadge />
    </>
  );
}
