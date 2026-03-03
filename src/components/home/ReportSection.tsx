export function ReportSection() {
  return (
    <section id="documentation" className="bg-bg-base pt-20 pb-28">
      <div className="mx-auto max-w-[1000px] px-6 lg:px-0">
        <div className="flex flex-col">
          {/* Section Header */}
          <div className="mb-16 w-full">
            <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-accent-primary">Competition Details</div>
            <h2 className="max-w-[700px] text-[28px] font-bold leading-[1.2] tracking-[-0.03em] text-text-primary sm:text-[32px]">
              Q-Volution - Hackathon by <span className="text-accent-primary">Girls in Quantum</span>  Track A: Energy Grid Optimization
            </h2>
          </div>

          {/* Main Content Grid */}
          <div className="grid w-full gap-16 lg:grid-cols-[1fr_1.5fr] lg:items-center">
            {/* Left Column - Details */}
            <div className="space-y-10">
              {/* Goal Section */}
              <div className="relative pl-6">
                <div className="absolute left-0 top-0 h-full w-[1px] bg-border-subtle" />
                <h3 className="mb-2 text-[15px] font-bold tracking-tight text-text-primary">Goal</h3>
                <p className="text-[13px] leading-[1.6] text-text-secondary">
                  To increase the reliability of electricity distribution by
                  optimizing a key robustness metric called the "power
                  number".
                </p>
              </div>

              {/* Team Name Section */}
              <div className="pl-6">
                <h3 className="mb-2 text-[15px] font-bold tracking-tight text-text-primary">Team Name</h3>
                <p className="text-[13px] text-text-secondary font-medium">EleQtric</p>
              </div>

              {/* Team Members Section */}
              <div className="pl-6">
                <h3 className="mb-2 text-[15px] font-bold tracking-tight text-text-primary">Team Members</h3>
                <ul className="space-y-1 text-[13px] leading-[1.6] text-text-secondary">
                  <li>Saif Ullah</li>
                  <li>Ifrah</li>
                  <li>Rafia</li>
                  <li>Wasif ullah</li>
                  <li>Kiara S.A.M. Tahir</li>
                </ul>
              </div>
            </div>

            {/* Right Column - Hackathon Image */}
            <div className="relative flex justify-center">
              <img
                src="/regiti.png"
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
