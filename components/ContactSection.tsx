'use client';

export default function ContactSection() {
  return (
    <section id="contact">
      <div className="contact-inner section-content">
        <div className="contact-headline">Let's talk.</div>
        <div className="contact-links">
          <a href="mailto:minarishah@outlook.com" className="contact-link">
            minarishah@outlook.com
          </a>
          <span className="contact-sep">·</span>
          <a href="https://linkedin.com/in/minari-shah"
             target="_blank" rel="noopener noreferrer" className="contact-link">
            linkedin.com/in/minari-shah
          </a>
        </div>
        <div className="contact-tagline">Rooted in insight. Focused on impact.</div>
      </div>
    </section>
  );
}
