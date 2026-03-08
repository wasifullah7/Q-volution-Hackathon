export function ContactSection() {
  return (
    <section id="contact" className="bg-bg-base py-16 lg:py-24">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20 lg:items-center">
          <div>
            <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.05em] text-accent-primary">
              GET IN TOUCH
            </div>
            <h2 className="mb-4 text-[26px] font-bold leading-[1.2] text-text-primary sm:text-[30px] lg:text-[32px]">
              Drive Quantum Innovation With Us
            </h2>
            <p className="text-[14px] leading-[1.7] text-text-secondary max-w-[340px]">
              Work with Team Ele(Q)tric to gain a competitive edge, attract top talent, and stay informed on industry trends.
            </p>
          </div>

          <div className="rounded-xl border border-border-subtle bg-bg-surface-1 p-6 lg:p-8">
            <h3 className="mb-6 text-[18px] font-bold text-text-primary">
              Send Us a Message
            </h3>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full rounded-md border border-border-default bg-bg-surface-2 px-4 py-3 text-[13px] text-text-primary placeholder:text-text-tertiary focus:border-accent-primary focus:outline-none focus:ring-1 focus:ring-accent-primary/30"
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full rounded-md border border-border-default bg-bg-surface-2 px-4 py-3 text-[13px] text-text-primary placeholder:text-text-tertiary focus:border-accent-primary focus:outline-none focus:ring-1 focus:ring-accent-primary/30"
                />
              </div>
              <div>
                <textarea
                  rows={4}
                  placeholder="Message"
                  className="w-full resize-none rounded-md border border-border-default bg-bg-surface-2 px-4 py-3 text-[13px] text-text-primary placeholder:text-text-tertiary focus:border-accent-primary focus:outline-none focus:ring-1 focus:ring-accent-primary/30"
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-md bg-gradient-to-r from-accent-primary to-accent-primary-hover py-3 text-[14px] font-semibold text-bg-base transition-all hover:opacity-90"
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
