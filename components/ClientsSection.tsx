'use client';

import { useEffect, useRef } from 'react';

export default function ClientsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Disabled to isolate the blank page issue
  }, []);

  return (
    <section 
      id="clients" 
      ref={sectionRef}
      style={{ 
        background: '#ece5d4', 
        minHeight: '100vh', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        padding: '80px 80px 64px' 
      }}
    >
      <div className="section-content w-full max-w-[1000px] mx-auto flex flex-col items-start">
        <h2 className="clients-heading">Who I Work With</h2>

        <div className="clients-orbital-wrap self-center w-full mt-12" style={{ maxWidth: '1000px' }}>
          <svg className="clients-svg w-full" viewBox="0 0 780 560" xmlns="http://www.w3.org/2000/svg" aria-label="Orbital diagram showing the seven types of organisations Revwire works with">

            {/* Ghost inner ring */}
            <circle cx="390" cy="300" r="118" fill="none" stroke="rgba(12,14,19,0.05)" strokeWidth="1"/>
            {/* Main dashed orbit ring */}
            <circle cx="390" cy="300" r="160" fill="none" stroke="rgba(12,14,19,0.18)" strokeWidth="0.8" strokeDasharray="3 5"/>

            {/* Spoke lines from center to each dot */}
            <line x1="390" y1="300" x2="390" y2="140" stroke="rgba(12,14,19,0.07)" strokeWidth="0.8"/>
            <line x1="390" y1="300" x2="515.1" y2="200.2" stroke="rgba(12,14,19,0.07)" strokeWidth="0.8"/>
            <line x1="390" y1="300" x2="545.9" y2="335.6" stroke="rgba(12,14,19,0.07)" strokeWidth="0.8"/>
            <line x1="390" y1="300" x2="459.4" y2="444.3" stroke="rgba(12,14,19,0.07)" strokeWidth="0.8"/>
            <line x1="390" y1="300" x2="320.6" y2="444.3" stroke="rgba(12,14,19,0.07)" strokeWidth="0.8"/>
            <line x1="390" y1="300" x2="234.1" y2="335.6" stroke="rgba(12,14,19,0.07)" strokeWidth="0.8"/>
            <line x1="390" y1="300" x2="264.9" y2="200.2" stroke="rgba(12,14,19,0.07)" strokeWidth="0.8"/>

            {/* Center circle */}
            <circle cx="390" cy="300" r="56" fill="#111827"/>
            <text x="390" y="296" textAnchor="middle" fontFamily="inherit" fontSize="13" fontWeight="600" fill="rgba(255,255,255,0.92)">Revwire.ai</text>
            <text x="390" y="313" textAnchor="middle" fontFamily="inherit" fontSize="9.5" fill="rgba(255,255,255,0.40)" letterSpacing="0.06em">ADVISORY</text>

            {/* ─── Node 1: PE-backed companies — top ─── */}
            <g className="clients-node" data-index="0">
              <circle cx="390" cy="140" r="5" fill="#4d7fa8" stroke="#ece5d4" strokeWidth="2.5" className="clients-dot"/>
              <text x="390" y="112" textAnchor="middle" fontFamily="inherit" fontSize="13" fontWeight="500" fill="#0c0e13" className="clients-node-text">PE-backed</text>
              <text x="390" y="128" textAnchor="middle" fontFamily="inherit" fontSize="13" fontWeight="500" fill="#0c0e13" className="clients-node-text">companies</text>
            </g>

            {/* ─── Node 2: Founder-led scaleups — upper right ─── */}
            <g className="clients-node" data-index="1">
              <circle cx="515.1" cy="200.2" r="5" fill="#4d7fa8" stroke="#ece5d4" strokeWidth="2.5" className="clients-dot"/>
              <text x="537" y="190" textAnchor="start" fontFamily="inherit" fontSize="13" fontWeight="500" fill="#0c0e13" className="clients-node-text">Founder-led</text>
              <text x="537" y="206" textAnchor="start" fontFamily="inherit" fontSize="13" fontWeight="500" fill="#0c0e13" className="clients-node-text">scaleups</text>
            </g>

            {/* ─── Node 3: Global firms entering India — right ─── */}
            <g className="clients-node" data-index="2">
              <circle cx="545.9" cy="335.6" r="5" fill="#4d7fa8" stroke="#ece5d4" strokeWidth="2.5" className="clients-dot"/>
              <text x="565" y="326" textAnchor="start" fontFamily="inherit" fontSize="13" fontWeight="500" fill="#0c0e13" className="clients-node-text">Global firms</text>
              <text x="565" y="342" textAnchor="start" fontFamily="inherit" fontSize="13" fontWeight="500" fill="#0c0e13" className="clients-node-text">entering India</text>
            </g>

            {/* ─── Node 4: Pre-IPO organisations — lower right ─── */}
            <g className="clients-node" data-index="3">
              <circle cx="459.4" cy="444.3" r="5" fill="#4d7fa8" stroke="#ece5d4" strokeWidth="2.5" className="clients-dot"/>
              <text x="459.4" y="466" textAnchor="middle" fontFamily="inherit" fontSize="13" fontWeight="500" fill="#0c0e13" className="clients-node-text">Pre-IPO</text>
              <text x="459.4" y="482" textAnchor="middle" fontFamily="inherit" fontSize="13" fontWeight="500" fill="#0c0e13" className="clients-node-text">organisations</text>
            </g>

            {/* ─── Node 5: Businesses undergoing transformation — lower left ─── */}
            <g className="clients-node" data-index="4">
              <circle cx="320.6" cy="444.3" r="5" fill="#4d7fa8" stroke="#ece5d4" strokeWidth="2.5" className="clients-dot"/>
              <text x="320.6" y="466" textAnchor="middle" fontFamily="inherit" fontSize="13" fontWeight="500" fill="#0c0e13" className="clients-node-text">Businesses undergoing</text>
              <text x="320.6" y="482" textAnchor="middle" fontFamily="inherit" fontSize="13" fontWeight="500" fill="#0c0e13" className="clients-node-text">transformation</text>
            </g>

            {/* ─── Node 6: AI & deep-tech companies — left ─── */}
            <g className="clients-node" data-index="5">
              <circle cx="234.1" cy="335.6" r="5" fill="#4d7fa8" stroke="#ece5d4" strokeWidth="2.5" className="clients-dot"/>
              <text x="214" y="326" textAnchor="end" fontFamily="inherit" fontSize="13" fontWeight="500" fill="#0c0e13" className="clients-node-text">AI &amp; deep-tech</text>
              <text x="214" y="342" textAnchor="end" fontFamily="inherit" fontSize="13" fontWeight="500" fill="#0c0e13" className="clients-node-text">companies</text>
            </g>

            {/* ─── Node 7: Consumer brands facing perception shifts — upper left ─── */}
            <g className="clients-node" data-index="6">
              <circle cx="264.9" cy="200.2" r="5" fill="#4d7fa8" stroke="#ece5d4" strokeWidth="2.5" className="clients-dot"/>
              <text x="244" y="185" textAnchor="end" fontFamily="inherit" fontSize="13" fontWeight="500" fill="#0c0e13" className="clients-node-text">Consumer brands</text>
              <text x="244" y="201" textAnchor="end" fontFamily="inherit" fontSize="13" fontWeight="500" fill="#0c0e13" className="clients-node-text">facing perception shifts</text>
            </g>

          </svg>
        </div>
      </div>

    </section>
  );
}
