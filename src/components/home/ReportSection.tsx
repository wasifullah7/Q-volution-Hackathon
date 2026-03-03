export function ReportSection() {
  return (
    <section className="bg-[#060b16] pt-20 pb-28">
      <div className="mx-auto max-w-[1000px] px-6 lg:px-0">
        <div className="flex flex-col">
          {/* Section Header */}
          <div className="mb-16 w-full">
            <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#4a4a6a]">Competition</div>
            <h2 className="text-[28px] font-bold leading-[1.2] tracking-[-0.03em] text-white sm:text-[32px]">
              |⚡ &gt; | Aqora | Rigetti (Ankaa-3 QPU) | Energy Grid Optimization Hackathon
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
                  section".
                </p>
              </div>

              {/* Team Name Section */}
              <div className="pl-6">
                <h3 className="mb-2 text-[15px] font-bold tracking-tight text-white">Team Name</h3>
                <p className="text-[13px] text-gray-400 font-medium">Ele-Q-tric</p>
              </div>

              {/* Team Members Section */}
              <div className="pl-6">
                <h3 className="mb-2 text-[15px] font-bold tracking-tight text-white">Team Members</h3>
                <p className="text-[13px] leading-[1.6] text-gray-400">
                  Global Team of Dev and Designer having multiple disciplinary backgrounds.
                </p>
              </div>

              {/* Host Section */}
              <div className="pl-6">
                <h3 className="mb-3 text-[15px] font-bold tracking-tight text-white">Host</h3>
                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#0a2a30]/30 border border-[#00d4ff]/10 transition-colors hover:bg-[#0a2a30]/50">
                  <img src="/logo.png" alt="Host Logo" className="h-3.5 w-auto" />
                </div>
              </div>
            </div>

            {/* Right Column - Visualization (Image Only) */}
            <div className="relative flex justify-center">
              <img 
                src="/aqoragraph.png" 
                alt="Aqora Hackathon Details" 
                className="w-full h-auto block opacity-90 transition-opacity hover:opacity-100"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
