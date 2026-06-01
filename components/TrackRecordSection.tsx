'use client';
import { useEffect } from 'react';

export default function TrackRecordSection() {
  useEffect(() => {
    if (window.matchMedia('(max-width: 767px)').matches) return;

    const grid  = document.querySelector('.track-record-grid');
    if (!grid) return;
    const cards = grid.querySelectorAll('.track-card-light, .track-card-featured');

    const handleMouseEnter = (card: Element) => {
      cards.forEach(c => {
        c.classList.toggle('card-dimmed', c !== card);
        c.classList.toggle('card-active',  c === card);
      });
    };

    const handleMouseLeave = () => {
      cards.forEach(c => c.classList.remove('card-active', 'card-dimmed'));
    };

    cards.forEach(card => {
      card.addEventListener('mouseenter', () => handleMouseEnter(card));
    });

    grid.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      cards.forEach(card => {
        // Just remove all classes on unmount to be safe
        card.classList.remove('card-active', 'card-dimmed');
      });
      grid.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);
  return (
    <section id="track-record" className="bg-[#ece5d4] pt-[80px] pb-[100px] flex flex-col">
      <div className="w-full mx-auto flex flex-col section-content">
        
        {/* Header Section */}
        <div className="px-6 md:px-[48px] max-w-[1100px] mx-auto w-full">
          <div className="text-[11px] uppercase text-[rgba(12,14,19,0.32)] tracking-[0.14em]">
            SELECTED WORK
          </div>
          <h2 className="text-[28px] md:text-[38px] font-medium text-[#0c0e13] leading-[1.2] max-w-[600px] mt-4 mb-4">
            The work that shaped the practice.
          </h2>
          <p className="text-[clamp(15px,1.6vw,18px)] text-[rgba(12,14,19,0.60)] leading-[1.6] max-w-[640px] mb-[52px]">
            The work that shaped how I think about communications today spans three decades across journalism, corporate leadership and strategic advisory.
          </p>
        </div>

        {/* Card Grid */}
        <div className="track-record-grid px-6 md:px-[48px]">
          
          {/* Left Card: Tata Motors */}
          <div className="track-card-light">
            <div>
              <div className="card-name-row">
                <span className="co-name text-[20px] font-medium text-[#0c0e13]">Tata Motors</span>
                <img src="/Consultant-Website/logos/tata-motors.svg" alt="Tata Motors" className="card-logo" />
              </div>
              <div className="text-[12px] font-[400] text-[rgba(12,14,19,0.42)] tracking-[0.04em]">Corporate brand strategy · India</div>
              <div className="h-[1px] bg-[rgba(12,14,19,0.08)] my-[20px]" />
            </div>
            
            <div className="text-[13px] text-[rgba(12,14,19,0.60)] leading-[1.65] mb-[24px]">
              Part of the team that repositioned Tata Motors during a critical turnaround, building the design-led, technology-forward narrative that helped support growth and the company's transition towards electric mobility.
            </div>
            
            <div className="mt-auto flex flex-col">
              <div className="achievement-row">
                <span className="stat-num text-[#4d7fa8]">22%</span> year-on-year sales growth
              </div>
              <div className="achievement-row">
                First Auto Expo, Feb 2014 — stabilised market share
              </div>
              <div className="achievement-row">
                <span className="stat-num text-[#4d7fa8]">17%</span> sales growth with Tiago
              </div>
              <div className="achievement-row">
                Outperformed industry; positioned for EV market leadership
              </div>
            </div>
          </div>

          {/* Center Card: Amazon */}
          <div className="track-card-featured order-first md:order-none">
            <div>
              <div className="card-name-row">
                <span className="co-name text-[20px] font-medium text-[#ffffff]">Amazon</span>
                <img src="/Consultant-Website/logos/amazon.svg" alt="Amazon" className="card-logo" />
              </div>
              <div className="text-[12px] font-[400] text-[rgba(255,255,255,0.42)] tracking-[0.04em]">Director · 8+ years · India, APAC, EU &amp; LatAm</div>
              <div className="h-[1px] bg-[rgba(255,255,255,0.10)] my-[20px]" />
            </div>
            
            <div className="text-[13px] text-[rgba(255,255,255,0.62)] leading-[1.65] mb-[24px]">
              Built the India reputation narrative during a period of rapid growth, helping shape engagement with customers, policymakers, regulators, investors and partners. Created the Smbhav platform for SMBs and helped establish Amazon as India's most trusted and largest online marketplace.
            </div>
            
            <div className="mt-auto flex flex-col">
              <div className="achievement-row">
                Helped ensure draft regulations that could have posed existential risks to the business never came into effect
              </div>
              <div className="achievement-row">
                Amazon became India's most trusted and largest online marketplace
              </div>
            </div>
          </div>

          {/* Right Card: Dell */}
          <div className="track-card-light">
            <div>
              <div className="card-name-row">
                <span className="co-name text-[20px] font-medium text-[#0c0e13]">Dell</span>
                <img src="/Consultant-Website/logos/dell.svg" alt="Dell" className="card-logo" />
              </div>
              <div className="text-[12px] font-[400] text-[rgba(12,14,19,0.42)] tracking-[0.04em]">Brand strategy · India market</div>
              <div className="h-[1px] bg-[rgba(12,14,19,0.08)] my-[20px]" />
            </div>
            
            <div className="text-[13px] text-[rgba(12,14,19,0.60)] leading-[1.65] mb-[24px]">
              Built a locally relevant India narrative that helped take Dell from challenger brand to market leader across enterprise, consumer and SMB segments.
            </div>
            
            <div className="mt-auto flex flex-col">
              <div className="achievement-row">
                Doubled SMB market share
              </div>
              <div className="achievement-row">
                Overall PC market leader in India
              </div>
              <div className="achievement-row">
                From challenger to #1 across segments
              </div>
              <div className="achievement-row">
                Global launch of "Take Your Own Path" campaign from India
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
