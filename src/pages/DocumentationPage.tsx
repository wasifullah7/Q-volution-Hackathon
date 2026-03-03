import {
  Navigation,
  CTASection,
  ContactSection,
  Footer,
} from "@/components/home";

export function DocumentationPage() {
  return (
    <div className="min-h-screen bg-bg-base">
      <Navigation />
      <main>
        {/* Documentation Hero */}
        <section className="relative overflow-hidden bg-bg-base pt-28 pb-20">
          {/* Right side gradient accent */}
          <div className="pointer-events-none absolute right-0 top-0 h-full w-[6px]">
            <div className="h-full w-full bg-gradient-to-b from-accent-primary via-accent-secondary to-data-4" />
          </div>

          <div className="mx-auto max-w-[1000px] px-6 lg:px-0">
            <div className="relative overflow-hidden rounded-xl border border-border-subtle bg-bg-surface-1/60 px-8 py-16 text-center shadow-2xl">
              {/* Grid Background */}
              <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                  backgroundImage: `
                    linear-gradient(to right, currentColor 1px, transparent 1px),
                    linear-gradient(to bottom, currentColor 1px, transparent 1px)
                  `,
                  backgroundSize: '32px 32px'
                }}
              />

              {/* Glow Effects */}
              <div className="absolute left-0 top-0 h-[200px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-primary/[0.1] blur-[60px]" />
              <div className="absolute right-0 top-0 h-[200px] w-[300px] translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-secondary/[0.08] blur-[60px]" />

              <div className="relative z-10">
                <h1 className="mb-4 text-[36px] font-bold leading-[1.1] tracking-[-0.03em] text-text-primary sm:text-[44px] md:text-[52px]">
                  Documentation
                  <br />
                  HTML file
                </h1>
                <p className="mx-auto mb-8 max-w-[560px] text-[14px] leading-relaxed text-text-secondary">
                  Scaling Maximum Power Energy Section with QAOA (Quantum Approximate Optimization Algorithm) and Quantum Preconditioning.
                </p>
                <a
                  href="/dashboard"
                  className="inline-flex items-center gap-2 rounded-full bg-accent-primary px-8 py-3 text-[14px] font-bold text-bg-base transition-all hover:opacity-90 hover:scale-[1.02] shadow-glow-primary"
                >
                  Try the Prototype
                  <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none">
                    <path d="M4 12L12 4M12 4H6M12 4V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Problem B Section */}
        <section className="bg-bg-base py-16 lg:py-24">
          <div className="mx-auto max-w-[1000px] px-6 lg:px-0">
            <div className="mb-3 text-[12px] font-semibold text-accent-primary">
              Problem B:
            </div>
            <h2 className="mb-6 text-[24px] font-bold leading-[1.2] tracking-[-0.02em] text-text-primary sm:text-[28px]">
              Problem B (main): QVM and Ankaa-3 - Real Quantum Hardware
            </h2>
            <a
              href="https://drive.google.com/file/d/11ygpZiXnwPqikvoAtgbNyezdHSna3k1y/view"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md bg-accent-primary px-5 py-2.5 text-[13px] font-bold text-bg-base transition-all hover:opacity-90"
            >
              Link to the Code
              <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="none">
                <path d="M4 12L12 4M12 4H6M12 4V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </section>

        {/* Problem A Section */}
        <section className="bg-bg-base py-16 lg:py-24">
          <div className="mx-auto max-w-[1000px] px-6 lg:px-0">
            <div className="mb-3 text-[12px] font-semibold text-accent-primary">
              Problem A:
            </div>
            <h2 className="mb-6 text-[24px] font-bold leading-[1.2] tracking-[-0.02em] text-text-primary sm:text-[28px]">
              Solved on Classical computer + QVM
            </h2>
            <a
              href="https://drive.google.com/file/d/1sAVb8GB12dp2r3oRjXwcAULWIey9NXEJ/view"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md bg-accent-primary px-5 py-2.5 text-[13px] font-bold text-bg-base transition-all hover:opacity-90"
            >
              Link to the Code
              <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="none">
                <path d="M4 12L12 4M12 4H6M12 4V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </section>

        {/* Key Learnings Section */}
        <section className="bg-bg-base py-16 lg:py-24">
          <div className="mx-auto max-w-[1000px] px-6 lg:px-0">
            <div className="mb-3 text-[12px] font-semibold text-accent-primary">
              Key Learnings
            </div>
            <h2 className="mb-6 text-[24px] font-bold leading-[1.2] tracking-[-0.02em] text-text-primary sm:text-[28px]">
              What Did We Learned ?
            </h2>
            <a
              href="https://drive.google.com/drive/folders/1nbC-SNzi8qO8GtUx5T2d0LAxbXDM0C7b"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md bg-accent-primary px-5 py-2.5 text-[13px] font-bold text-bg-base transition-all hover:opacity-90"
            >
              Read Full Documentation
              <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="none">
                <path d="M4 12L12 4M12 4H6M12 4V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </section>

        <CTASection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
