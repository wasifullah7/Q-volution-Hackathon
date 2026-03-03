export function ReportSection() {
  return (
    <section id="documentation" className="bg-[#060b16] pt-20 pb-28">
      <div className="mx-auto max-w-[1000px] px-6 lg:px-0">
        <div className="flex flex-col">
          {/* Section Header */}
          <div className="mb-16 w-full">
            <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#00d4ff]">Competition Details</div>
            <h2 className="max-w-[700px] text-[28px] font-bold leading-[1.2] tracking-[-0.03em] text-white sm:text-[32px]">
              Q-Volution - Hackathon by <span className="text-[#00d4ff]">Girls in Quantum</span> - Track A: Energy Grid Optimization
            </h2>
          </div>

          {/* Main Content Grid */}
          <div className="grid w-full gap-16 lg:grid-cols-[1fr_1.5fr] lg:items-center">
            {/* Left Column - Details */}
            <div className="space-y-10">
              {/* Goal Section */}
              <div className="relative pl-6">
                <div className="absolute left-0 top-0 h-full w-[1px] bg-white/10" />
                <h3 className="mb-2 text-[15px] font-bold tracking-tight text-white">Goal</h3>
                <p className="text-[13px] leading-[1.6] text-gray-400">
                  To increase the reliability of electricity distribution by
                  optimizing a key robustness metric called the "power
                  number".
                </p>
              </div>

              {/* Team Name Section */}
              <div className="pl-6">
                <h3 className="mb-2 text-[15px] font-bold tracking-tight text-white">Team Name</h3>
                <p className="text-[13px] text-gray-400 font-medium">EleQtric</p>
              </div>

              {/* Team Members Section */}
              <div className="pl-6">
                <h3 className="mb-2 text-[15px] font-bold tracking-tight text-white">Team Members</h3>
                <ul className="space-y-1 text-[13px] leading-[1.6] text-gray-400">
                  <li>Maha Saif Ullah</li>
                  <li>Hazeera Diba</li>
                  <li>Kelly Pena</li>
                  <li>Kiara S.A.M. Tahir</li>
                </ul>
              </div>
            </div>

            {/* Right Column - Hackathon Image */}
            <div className="relative flex justify-center">
              <img
                src="/aqoragraph.png"
                alt="Q-Hackathon Track A: Energy Grid Optimization - Rigetti"
                className="w-full h-auto block opacity-90 transition-opacity hover:opacity-100 rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
