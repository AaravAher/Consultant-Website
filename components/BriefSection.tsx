export default function BriefSection() {
  const differentiators = [
    {
      left: "A media plan built around coverage targets and press hit counts",
      rightLabel: "Strategy first",
      rightDesc: "Start with the business problem and build the communications strategy around it"
    },
    {
      left: "External-facing campaigns launched before internal alignment exists",
      rightLabel: "Leadership alignment",
      rightDesc: "Align leadership internally before going external — getting buy-in across stakeholders who don't always agree"
    },
    {
      left: "Separate PR retainer sitting outside the core business budget",
      rightLabel: "Budget ownership",
      rightDesc: "Managing the full communications function within realistic budgets"
    },
    {
      left: "In-house team executing without specialist input or oversight",
      rightLabel: "Vendor oversight",
      rightDesc: "Bringing in the right specialist vendors when needed, with oversight so execution stays sharp"
    },
    {
      left: "Coverage reports with no connection to business outcomes",
      rightLabel: "Measurement",
      rightDesc: "Clear measurement frameworks so you know what's working and what isn't"
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
          THE BRIEF
        </div>
        
        <h2 className="text-[28px] md:text-[38px] lg:text-[44px] font-[500] text-[#0c0e13] leading-[1.2] mt-4">
          This is a business function.<br />Not a support function.
        </h2>
        
        <div className="text-[14px] text-[rgba(12,14,19,0.55)] leading-[1.7] max-w-[560px] mt-8 mb-[52px]">
          My job is not to write press releases or get you media hits. It's to identify the business problem that communication must solve — which stakeholders need to align, what narrative moves them, and how to get it to them.
        </div>

        {/* Contrast Table */}
        <div className="contrast-table">
          <div className="contrast-header">
            <div className="col-head col-head-left">What you usually get</div>
            <div className="col-head-divider"></div>
            <div className="col-head col-head-right">What this is</div>
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
          <p className="wiww-label">WHO I WORK WITH</p>
          <div className="wiww-list">

            <div className="wiww-pill">
              <span className="wiww-num">01</span>
              <span className="wiww-text">Global companies entering or recalibrating for India</span>
              <span className="wiww-desc">Market entry &middot; brand repositioning</span>
            </div>

            <div className="wiww-pill">
              <span className="wiww-num">02</span>
              <span className="wiww-text">Founders navigating scale, pivots or investor pressure</span>
              <span className="wiww-desc">Series A &rarr; growth &middot; narrative shaping</span>
            </div>

            <div className="wiww-pill">
              <span className="wiww-num">03</span>
              <span className="wiww-text">Listed and pre-IPO companies building investor narratives</span>
              <span className="wiww-desc">Roadshow prep &middot; financial communications</span>
            </div>

            <div className="wiww-pill">
              <span className="wiww-num">04</span>
              <span className="wiww-text">Organisations in transition or transformation</span>
              <span className="wiww-desc">Restructure &middot; relaunch &middot; M&amp;A</span>
            </div>

            <div className="wiww-pill">
              <span className="wiww-num">05</span>
              <span className="wiww-text">PE firms and boards</span>
              <span className="wiww-desc">Portfolio communications &middot; governance</span>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
