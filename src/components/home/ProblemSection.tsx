export function ProblemSection() {
  return (
    <section className="relative overflow-hidden bg-[#060b16] pt-20 pb-32">
      {/* Gradient Lighting Effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#0a1628_0%,#060b16_100%)] opacity-50" />

      <div className="relative z-10 mx-auto max-w-[1000px] px-6 lg:px-0">
        <div className="flex flex-col">
          {/* Section Header */}
          <div className="mb-16 w-full">
            <div className="mb-4 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#00d4ff]">Problem Statement</div>
            <h2 className="max-w-[800px] text-[32px] font-bold leading-[1.2] tracking-[-0.03em] text-white sm:text-[36px]">
              In South Carolina , there was an average of <span className="text-[#00d4ff]">53 hours of blackouts</span> in 2024-
              nearly <span className="text-[#00d4ff] underline decoration-[#00d4ff]">5x</span> the national average.
            </h2>
          </div>

          {/* Main Content Grid */}
          <div className="grid w-full gap-16 lg:grid-cols-[1.2fr_1fr] lg:items-start">
            {/* Left Column - Details */}
            <div className="space-y-10">
              <div className="space-y-6">
                <h3 className="text-[18px] font-bold leading-tight text-white">
                  Optimizing the Power Energy Section becomes exponentially more difficult as the grid grows.
                </h3>
                <p className="text-[14px] leading-[1.6] text-gray-400">
                  As node count increases, the combinatorial search space expands rapidly, making high-quality solutions slow to compute in practice.
                </p>
                <p className="text-[14px] leading-[1.6] text-gray-400">
                  In addition, baseline approaches including standard QAOA configurations can become less accurate and less stable at scale: results may vary across runs, and optimization may converge inconsistently due to complex landscapes and limited computational budgets, potentially increasing blackout risk.
                </p>
              </div>

              <a
                href="#"
                className="inline-flex items-center gap-2 rounded-md bg-[#00d4ff] px-6 py-3 text-[14px] font-bold text-black transition-all hover:bg-[#00c4ec]"
              >
                Read Full Documentation
                <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none">
                  <path d="M4 12L12 4M12 4H6M12 4V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>

            {/* Right Column - SC Grid Image */}
            <div className="relative flex flex-col items-center lg:items-end">
              <div className="w-full max-w-[400px]">
                <img
                  src="/southcarilona.png"
                  alt="South Carolina Grid Map"
                  className="w-full h-auto block opacity-90 rounded-lg shadow-2xl"
                />
                <p className="mt-4 text-[11px] text-gray-600 text-center lg:text-right">
                  Source: <a href="https://felt.com/explore/us-electric-power-transmission-lines-south-carolina" target="_blank" rel="noopener noreferrer" className="underline cursor-pointer hover:text-gray-400">US Electric Power Transmission Lines in South Carolina</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
