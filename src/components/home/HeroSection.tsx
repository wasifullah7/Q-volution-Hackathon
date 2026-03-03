import { Link } from "react-router-dom";

export function HeroSection() {
  return (
    <section className="relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden bg-[#060b16] pt-20">
      {/* Grid Background */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px'
        }}
      />

      {/* Cyan glow behind dashboard */}
      <div className="absolute bottom-0 left-1/2 h-[600px] w-[1000px] -translate-x-1/2 translate-y-1/2 rounded-full bg-[#00d4ff]/[0.12] blur-[120px]" />

      <div className="relative z-10 mx-auto flex w-full max-w-[1400px] flex-col items-center px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          {/* Heading */}
          <h1 className="mb-6 max-w-[900px] text-[42px] font-bold leading-[1.1] tracking-[-0.03em] text-white sm:text-[56px] md:text-[64px] lg:text-[72px]">
            Quantum Optimization
            <br />
            for a more resilient energy grid
          </h1>

          {/* Subtext - single flowing paragraph, no forced breaks */}
          <p className="mb-10 max-w-[700px] text-center text-[15px] leading-relaxed text-gray-400">
            Scaling Maximum Power Energy Section with QAOA (Quantum Approximate Optimization Algorithm) and Quantum Preconditioning.
          </p>

          {/* CTA Button - Cyan Pill */}
          <div className="mb-20">
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 rounded-full bg-[#00d4ff] px-10 py-3.5 text-[15px] font-bold text-black transition-all hover:bg-[#00c4ec] hover:scale-[1.02] shadow-[0_0_20px_rgba(0,212,255,0.3)]"
            >
              Try the Prototype
              <svg className="h-4 w-4 translate-x-0.5" viewBox="0 0 16 16" fill="none">
                <path d="M4 12L12 4M12 4H6M12 4V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>

          {/* Dashboard Preview Image */}
          <div
            className="relative w-full max-w-[1200px] overflow-hidden bg-[#0d0d12] shadow-[0_0_120px_-20px_rgba(0,212,255,0.15)]"
            style={{
              borderRadius: '16px 16px 0 0',
              border: '1px solid rgba(255,255,255,0.1)',
              borderBottom: 'none',
              marginBottom: '0',
              aspectRatio: '16/7.1',
            }}
          >
            <img
              src="/dashboard.png"
              alt="Quantum Dashboard Preview"
              className="absolute top-0 left-0 block h-auto w-full"
              style={{
                transform: 'translateY(-5%)'
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
