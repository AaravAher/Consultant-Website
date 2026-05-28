export default function TrackRecordSection() {
  return (
    <section id="track-record" className="bg-[#ece5d4] pt-[80px] pb-[100px] flex flex-col">
      <div className="w-full mx-auto flex flex-col section-content">
        
        {/* Header Section */}
        <div className="px-6 md:px-[48px] max-w-[1100px] mx-auto w-full">
          <div className="text-[11px] uppercase text-[rgba(12,14,19,0.32)] tracking-[0.14em]">
            TRACK RECORD
          </div>
          <h2 className="text-[28px] md:text-[38px] font-medium text-[#0c0e13] leading-[1.2] max-w-[600px] mt-4 mb-[52px]">
            The work that shaped the practice.
          </h2>
        </div>

        {/* Card Grid */}
        <div className="track-record-grid px-6 md:px-[48px]">
          
          {/* Left Card: Tata Motors */}
          <div className="track-card-light">
            <div>
              <div className="text-[20px] font-medium text-[#0c0e13]">Tata Motors</div>
              <div className="text-[12px] font-[400] text-[rgba(12,14,19,0.42)] tracking-[0.04em]">Corporate brand strategy · India</div>
              <div className="h-[1px] bg-[rgba(12,14,19,0.08)] my-[20px]" />
            </div>
            
            <div className="text-[13px] text-[rgba(12,14,19,0.60)] leading-[1.65] mb-[24px]">
              Led the corporate brand reinvention during a period of freefall. Built the design-first, tech-forward, electric mobility narrative that repositioned the company for a new era.
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
              <div className="text-[20px] font-medium text-[#ffffff]">Amazon</div>
              <div className="text-[12px] font-[400] text-[rgba(255,255,255,0.42)] tracking-[0.04em]">Director · 8+ years · India, APAC, EU &amp; LatAm</div>
              <div className="h-[1px] bg-[rgba(255,255,255,0.10)] my-[20px]" />
            </div>
            
            <div className="text-[13px] text-[rgba(255,255,255,0.62)] leading-[1.65] mb-[24px]">
              Helped reshape how India saw online commerce. Built the India reputation narrative, created the Smbhav SMB platform, turned Great Indian Festival into a nationwide moment, and helped homegrown D2C brands scale into household names.
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
              <div className="text-[20px] font-medium text-[#0c0e13]">Dell</div>
              <div className="text-[12px] font-[400] text-[rgba(12,14,19,0.42)] tracking-[0.04em]">Brand strategy · India market</div>
              <div className="h-[1px] bg-[rgba(12,14,19,0.08)] my-[20px]" />
            </div>
            
            <div className="text-[13px] text-[rgba(12,14,19,0.60)] leading-[1.65] mb-[24px]">
              Built a locally relevant India narrative that helped the brand become the #1 large enterprise, consumer and SMB brand.
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
