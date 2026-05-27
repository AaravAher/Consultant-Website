import Nav from '@/components/Nav';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ExperienceSection from '@/components/ExperienceSection';
import CommsVisualSection from '@/components/CommsVisualSection';
import WorkSection from '@/components/WorkSection';
import ContactSection from '@/components/ContactSection';

export default function Home() {
  return (
    <main>
      <Nav />
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <CommsVisualSection />
      <WorkSection />
      <ContactSection />
    </main>
  );
}
