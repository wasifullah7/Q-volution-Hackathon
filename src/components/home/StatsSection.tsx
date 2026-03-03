import { Link } from "react-router-dom";

export function StatsSection() {
  const stats = [
    { value: "13M", label: "Qiskit downloads" },
    { value: "69%", label: "Developers prefer Qiskit as primary SDK, according to the Unitary Foundation" },
    { value: "83x", label: "Faster transilation time, according to Unitary Foundation" },
    { value: "7K+", label: "Dependent projects" },
  ];

  return (
    <section className="bg-[#060b16] py-24 lg:py-32">
      <div className="mx-auto max-w-[1000px] px-6 lg:px-0">
        {/* Section Header */}
        <div className="mb-20 text-left">
          <div className="mb-4 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#4a4a6a]">Our solution</div>
          <h2 className="text-[32px] font-bold leading-[1.2] tracking-[-0.03em] text-white sm:text-[36px]">
            Ele-Q-tric introduces <span className="text-[#00d4ff]">Quantum Preconditioning</span> via <span className="text-[#00d4ff]">graph decomposition.</span>
          </h2>
        </div>

        {/* Stats and Details Grid */}
        <div className="grid gap-20 lg:grid-cols-2">
          {/* Left Column - Stats Grid */}
          <div className="grid grid-cols-2 gap-x-12 gap-y-16">
            {stats.map((stat, index) => (
              <div key={index} className="space-y-3">
                <div className="text-[48px] font-bold leading-none tracking-tight text-white opacity-90">
                  {stat.value}
                </div>
                <p className="text-[12px] leading-[1.5] text-gray-500 max-w-[180px]">
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
                Precondition the full grid into smaller subgraphs, run QAOA per subgraph, then stitch + refine the partial solutions to optimize the global Power Energy Section.
              </p>
              <p className="text-[14px] leading-[1.7] text-gray-400">
                To elevate computation and validate performance on real hardware, we execute QAOA workloads on Rigetti's Ankaa-3 QPU.
              </p>
            </div>

            <Link
              to="#"
              className="inline-flex items-center gap-2 rounded-md bg-[#00d4ff] px-6 py-3 text-[14px] font-bold text-black transition-all hover:bg-[#00c4ec]"
            >
              Read Full Documentation
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
