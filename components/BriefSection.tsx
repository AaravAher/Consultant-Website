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
    <section id="brief" className="bg-[#ece5d4] pt-[80px] pb-[100px] flex flex-col justify-center">
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
              <div className="cell-left">{item.left}</div>
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
        <div className="who-section">
          <div className="who-tag">
            WHO I WORK WITH
          </div>
          <div className="who-pills">
            {whoIWorkWith.map((item, idx) => (
              <div key={idx} className="who-pill">
                {item}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
