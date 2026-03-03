import { Link } from "react-router-dom";

export function CTASection() {
  return (
    <section className="relative overflow-hidden bg-[#060b16] py-24 lg:py-32">
      <div className="mx-auto max-w-[1000px] px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-xl border border-white/[0.08] bg-[#0a101d]/40 px-8 py-20 text-center shadow-2xl">
          {/* Internal Grid Background */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)
              `,
              backgroundSize: '32px 32px'
            }}
          />

          {/* Internal Glow Effect */}
          <div className="absolute left-1/2 top-0 h-[200px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#00d4ff]/[0.15] blur-[60px]" />

          <div className="relative z-10">
            <h2 className="mb-4 text-[24px] font-bold tracking-tight text-white sm:text-[32px]">
              Ready to test out our quantum solution?
            </h2>
            <p className="mb-10 text-[15px] text-gray-400">
              Be the first one to push quantum change and join us.
            </p>

            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 rounded-md border border-[#00d4ff] px-8 py-3 text-[15px] font-bold text-[#00d4ff] transition-all hover:bg-[#00d4ff]/10 hover:scale-[1.02]"
            >
              Try the Prototype
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
