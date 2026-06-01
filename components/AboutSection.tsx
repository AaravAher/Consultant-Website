'use client';
import { useRef, useEffect } from 'react';

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    if (contentRef.current) {
      observer.observe(contentRef.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="bg-[#ece5d4] min-h-[100vh] flex flex-col justify-center pt-[80px] pb-[56px] md:pb-[72px] px-[24px] md:px-[80px]">
      <div className="about-grid section-content" ref={contentRef}>
        
        {/* Left column: portrait + name */}
        <div className="about-left">
          <div className="about-photo-wrap">
            <img
              src="/photo/minari.jpg"
              alt="Minari Shah, Founder of Revwire.ai"
              className="about-photo"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                if (e.currentTarget.nextElementSibling) {
                  (e.currentTarget.nextElementSibling as HTMLElement).style.display = 'flex';
                }
              }}
            />
            {/* Fallback placeholder shown if image is missing */}
            <div className="about-photo-placeholder" style={{ display: 'none' }}>
              <span className="about-photo-placeholder-label">Photo</span>
            </div>
          </div>
          <p className="about-name">Minari Shah</p>
          <p className="about-name-sub">Founder, Revwire.ai</p>
        </div>

        {/* Right column: heading + body copy */}
        <div className="about-right">
          <h2 className="about-heading">About</h2>
          
          <p className="about-body">For more than three decades, I&apos;ve worked at the intersection of business strategy, stakeholder trust and communications.</p>
          
          <p className="about-body">My career spans journalism, corporate leadership and strategic advisory roles across companies including Amazon, Tata Motors, HSBC and Dell. Over the last 18 years, I have led communications teams across India, Asia-Pacific and global markets, helping organisations navigate growth, transformation, market entry, policy scrutiny, leadership transitions and reputation-critical moments.</p>
          
          <blockquote className="about-pullquote">Communications creates the most value when it helps move the business forward.</blockquote>
          
          <p className="about-body">Today, through RevWire, I advise founders, leadership teams, boards and investors on the narratives, stakeholder relationships and trust-building strategies that underpin long-term growth.</p>
          
          <p className="about-body">Alongside client work, I mentor women leaders and founders, and remain deeply interested in the future of communications, leadership influence, employee engagement and measurement.</p>
          
          <p className="about-edu">MA International Studies, Jawaharlal Nehru University &nbsp;·&nbsp; BA History, Stella Maris College</p>
        </div>

      </div>
    </section>
  );
}
