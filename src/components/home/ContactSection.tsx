export function ContactSection() {
  return (
    <section className="bg-[#060b16] py-16 lg:py-24">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left Column */}
          <div>
            <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.05em] text-[#00d4ff]">
              GET IN TOUCH
            </div>
            <h2 className="mb-4 text-[26px] font-semibold leading-[1.2] text-white sm:text-[30px] lg:text-[32px]">
              Drive Quantum Innovation With Us
            </h2>
            <p className="mb-6 text-[14px] leading-[1.7] text-gray-400">
              Ready to explore how quantum computing can transform your energy operations?
              Let's discuss your specific challenges and how Ele(Q)tric can help.
            </p>
            <a 
              href="mailto:hello@eleqtric.com" 
              className="text-[14px] text-[#00d4ff] transition-colors hover:text-[#00c4ec] hover:underline"
            >
              hello@eleqtric.com
            </a>
          </div>

          {/* Right Column - Form */}
          <div className="rounded-xl border border-white/[0.08] bg-[#111118] p-6 lg:p-8">
            <h3 className="mb-6 text-[18px] font-semibold text-white">
              Request a Demo
            </h3>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="mb-1.5 block text-[12px] font-medium text-gray-400">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full rounded-md border border-white/[0.08] bg-[#0a0a0f] px-3 py-2.5 text-[13px] text-white placeholder:text-gray-600 focus:border-[#00d4ff]/50 focus:outline-none focus:ring-1 focus:ring-[#00d4ff]/20"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-[12px] font-medium text-gray-400">
                  Work Email
                </label>
                <input
                  type="email"
                  placeholder="john@company.com"
                  className="w-full rounded-md border border-white/[0.08] bg-[#0a0a0f] px-3 py-2.5 text-[13px] text-white placeholder:text-gray-600 focus:border-[#00d4ff]/50 focus:outline-none focus:ring-1 focus:ring-[#00d4ff]/20"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-[12px] font-medium text-gray-400">
                  Company
                </label>
                <input
                  type="text"
                  placeholder="Your Company"
                  className="w-full rounded-md border border-white/[0.08] bg-[#0a0a0f] px-3 py-2.5 text-[13px] text-white placeholder:text-gray-600 focus:border-[#00d4ff]/50 focus:outline-none focus:ring-1 focus:ring-[#00d4ff]/20"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-[12px] font-medium text-gray-400">
                  Message
                </label>
                <textarea
                  rows={3}
                  placeholder="Tell us about your project..."
                  className="w-full resize-none rounded-md border border-white/[0.08] bg-[#0a0a0f] px-3 py-2.5 text-[13px] text-white placeholder:text-gray-600 focus:border-[#00d4ff]/50 focus:outline-none focus:ring-1 focus:ring-[#00d4ff]/20"
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-md bg-[#00d4ff] py-2.5 text-[13px] font-semibold text-black transition-all hover:bg-[#00c4ec]"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
