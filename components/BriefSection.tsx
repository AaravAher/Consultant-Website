export default function BriefSection() {
  const differentiators = [
    {
      left: "A media plan built around coverage targets and press-hit counts",
      rightLabel: "STRATEGY FIRST",
      rightDesc: "Strategy first. Start with the business problem, then build the communications around it."
    },
    {
      left: "External campaigns launched before internal alignment exists",
      rightLabel: "LEADERSHIP ALIGNMENT",
      rightDesc: "Leadership alignment before anything goes external, including buy-in across stakeholders who don't always agree."
    },
    {
      left: "A separate PR retainer sitting outside the core business budget",
      rightLabel: "BUDGET OWNERSHIP",
      rightDesc: "The full communications function managed within realistic budgets, owned as a business line."
    },
    {
      left: "An in-house team executing without specialist input or oversight",
      rightLabel: "VENDOR OVERSIGHT",
      rightDesc: "The right specialist vendors brought in when needed, with oversight so execution stays sharp."
    },
    {
      left: "Coverage reports with no connection to business outcomes",
      rightLabel: "MEASUREMENT",
      rightDesc: "Clear measurement frameworks, so you know what's working and what isn't."
    }
  ];

  const whoIWorkWith = [
    "Global companies entering or recalibrating for India",
    "Founders navigating scale, pivots or investor pressure",
    "Listed and pre-IPO companies building investor narratives",
    "Organisations in transition or transformation",
    "PE firms and boards"
  ];

  return (
    <section id="revwire" className="bg-[#ece5d4] pt-[80px] pb-[100px] flex flex-col justify-center">
      <div className="w-full max-w-[1100px] mx-auto flex flex-col section-content px-6 md:px-[48px]">
        
        {/* Header */}
        <div className="text-[11px] uppercase text-[rgba(12,14,19,0.30)] tracking-[0.14em]">
          WHAT IS REVWIRE?
        </div>
        
        <h2 className="text-[28px] md:text-[38px] lg:text-[44px] font-[500] text-[#0c0e13] leading-[1.2] mt-4">
          A business function with a seat at the leadership table
        </h2>
        
        <div className="text-[14px] text-[rgba(12,14,19,0.55)] leading-[1.7] max-w-[560px] mt-8 mb-[52px] flex flex-col gap-4">
          <p>RevWire is an independent strategic communications advisory practice for situations where business strategy and stakeholder perception intersect.</p>
          <p>I work with founders, leadership teams, boards and investors during moments that matter most: market entry, investor scrutiny, transformation, leadership transition, M&amp;A situations, fundraising, crisis and growth.</p>
          <p>The focus is never communications for its own sake. It is using narrative, stakeholder alignment and trust to help organisations move business priorities forward.</p>
          <p>When a brief needs specialist depth across policy, public affairs, investor relations, media and research, RevWire brings expertise in, while remaining senior-led and strategy-first.</p>
        </div>

        {/* Contrast Table */}
        <div className="contrast-table">
          <div className="contrast-header">
            <div className="col-head col-head-left">The usual approach</div>
            <div className="col-head-divider"></div>
            <div className="col-head col-head-right">How Revwire works</div>
          </div>

          {differentiators.map((item, idx) => (
            <div key={idx} className="contrast-row">
              <div className="cell-left"><span className="contrast-left">{item.left}</span></div>
              <div className="cell-divider">
                <div className="spine-dot"></div>
              </div>
              <div className="cell-right">
                <div className="differentiator-label">{item.rightLabel}</div>
                <div className="differentiator-desc">{item.rightDesc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Who I Work With Pills */}
        <div className="wiww-section">
          <p className="wiww-label">AREAS OF EXPERTISE</p>
          <div className="wiww-list">

            <div className="wiww-pill">
              <div className="wiww-pill-row">
                <span className="wiww-num">01</span>
                <span className="wiww-text">Strategic Situations</span>
              </div>
              <span className="wiww-desc">M&amp;A &middot; Regulatory Positioning &middot; Crisis Management &middot; IPO &middot; Post-IPO Narratives</span>
            </div>

            <div className="wiww-pill">
              <div className="wiww-pill-row">
                <span className="wiww-num">02</span>
                <span className="wiww-text">Leadership &amp; Influence</span>
              </div>
              <span className="wiww-desc">Executive Communications &middot; Leadership Visibility &middot; Stakeholder Influence &middot; Executive Narrative Development</span>
            </div>

            <div className="wiww-pill">
              <div className="wiww-pill-row">
                <span className="wiww-num">03</span>
                <span className="wiww-text">Communications Operating Systems</span>
              </div>
              <span className="wiww-desc">Governance &middot; Workflows &middot; Team Design &middot; Measurement Frameworks</span>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
