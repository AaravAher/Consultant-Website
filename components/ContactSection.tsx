'use client';

export default function ContactSection() {
  return (
    <section id="contact">
      <svg
        className="contact-rings"
        viewBox="0 0 800 800"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <circle cx="400" cy="400" r="90"  fill="none" stroke="rgba(12,14,19,0.055)" strokeWidth="0.5"/>
        <circle cx="400" cy="400" r="170" fill="none" stroke="rgba(12,14,19,0.042)" strokeWidth="0.5"/>
        <circle cx="400" cy="400" r="260" fill="none" stroke="rgba(12,14,19,0.032)" strokeWidth="0.5"/>
        <circle cx="400" cy="400" r="360" fill="none" stroke="rgba(12,14,19,0.022)" strokeWidth="0.5"/>
        <circle cx="400" cy="400" r="470" fill="none" stroke="rgba(12,14,19,0.014)" strokeWidth="0.5"/>
      </svg>
      <div className="contact-inner section-content">
        <div className="contact-headline">Let's talk.</div>
        <p className="contact-sub">Book a Strategic Consultation</p>
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
