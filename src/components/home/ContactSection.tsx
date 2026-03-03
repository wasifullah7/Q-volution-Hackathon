export function ContactSection() {
  return (
    <section id="contact" className="bg-[#060b16] py-16 lg:py-24">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20 lg:items-center">
          {/* Left Column */}
          <div>
            <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.05em] text-[#00d4ff]">
              GET IN TOUCH
            </div>
            <h2 className="mb-4 text-[26px] font-bold leading-[1.2] text-white sm:text-[30px] lg:text-[32px]">
              Drive Quantum Innovation With Us
            </h2>
            <p className="text-[14px] leading-[1.7] text-gray-400 max-w-[340px]">
              Work with Team Ele(Q)tric to gain a competitive edge, attract top talent, and stay informed on industry trends.
            </p>
          </div>

          {/* Right Column - Form */}
          <div className="rounded-xl border border-white/[0.08] bg-[#111118] p-6 lg:p-8">
            <h3 className="mb-6 text-[18px] font-bold text-white">
              Send Us a Message
            </h3>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full rounded-md border border-gray-300/20 bg-white/90 px-4 py-3 text-[13px] text-gray-800 placeholder:text-gray-400 focus:border-[#00d4ff] focus:outline-none focus:ring-1 focus:ring-[#00d4ff]/30"
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full rounded-md border border-gray-300/20 bg-white/90 px-4 py-3 text-[13px] text-gray-800 placeholder:text-gray-400 focus:border-[#00d4ff] focus:outline-none focus:ring-1 focus:ring-[#00d4ff]/30"
                />
              </div>
              <div>
                <textarea
                  rows={4}
                  placeholder="Message"
                  className="w-full resize-none rounded-md border border-gray-300/20 bg-white/90 px-4 py-3 text-[13px] text-gray-800 placeholder:text-gray-400 focus:border-[#00d4ff] focus:outline-none focus:ring-1 focus:ring-[#00d4ff]/30"
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-md bg-gradient-to-r from-[#00d4ff] to-[#00f0ff] py-3 text-[14px] font-semibold text-black transition-all hover:opacity-90"
              >
                Get in Touch
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
