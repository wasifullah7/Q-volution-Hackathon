import { Link } from "react-router-dom";

export function StatsSection() {
  const stats = [
    { value: "99%", label: "Accurate" },
    { value: "10x", label: "Faster" },
    { value: "5%", label: "More Sustainable" },
    { value: "12%", label: "More Efficient" },
  ];

  return (
    <section id="accuracy" className="relative overflow-hidden bg-[#060b16] py-24 lg:py-32">
      {/* Gradient Lighting Effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#0a1628_0%,#060b16_100%)] opacity-50" />

      <div className="relative z-10 mx-auto max-w-[1000px] px-6 lg:px-0">
        {/* Section Header */}
        <div className="mb-20 text-left">
          <div className="mb-4 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#4a4a6a]">Our solution</div>
          <h2 className="text-[32px] font-bold leading-[1.2] tracking-[-0.03em] text-white sm:text-[36px]">
            Ele(Q)tric introduces <span className="text-[#00d4ff]">Quantum Preconditioning</span> via <span className="text-[#00d4ff]">graph decomposition.</span>
          </h2>
        </div>

        {/* Stats and Details Grid */}
        <div className="grid gap-20 lg:grid-cols-2">
          {/* Left Column - Stats Grid */}
          <div className="grid grid-cols-2 gap-x-12 gap-y-16">
            {stats.map((stat, index) => (
              <div key={index} className="space-y-2">
                <div className="text-[48px] font-bold leading-none tracking-tight text-[#00d4ff]">
                  {stat.value}
                </div>
                <p className="text-[14px] font-medium text-white">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          {/* Right Column - Solution Details */}
          <div className="space-y-10 lg:pt-2">
            <div className="space-y-6">
              <h3 className="text-[18px] font-bold text-white">Our Solution</h3>
              <p className="text-[14px] leading-[1.7] text-gray-400">
                For South Carolina our quantum preconditioned QAOA solution achieves 99% accuracy, matching simulated annealing, runs <span className="text-white font-medium">10x faster</span> through light-cone decomposition, outperforms the classical BM3 SDP baseline by 51%, and delivers a <span className="text-white font-medium">5% more sustainable</span> energy partition.
              </p>
              <p className="text-[14px] leading-[1.7] text-gray-400">
                Demonstrating a giant quantum advantage for real world problems like power grid optimization.
              </p>
            </div>

            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 rounded-md border border-[#00d4ff] px-6 py-3 text-[14px] font-bold text-[#00d4ff] transition-all hover:bg-[#00d4ff]/10"
            >
              Try out Our Solution in Real Time
              <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none">
                <path d="M4 12L12 4M12 4H6M12 4V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
