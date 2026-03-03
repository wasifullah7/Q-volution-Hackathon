import { Link } from "react-router-dom";

export function CTASection() {
  return (
    <section className="relative overflow-hidden bg-[#060b16] py-20 lg:py-28">
      {/* Background gradients */}
      <div className="absolute inset-0">
        <div className="absolute left-1/4 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-[#00d4ff]/[0.12] blur-[100px]" />
        <div className="absolute right-1/4 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-purple-500/[0.06] blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-[800px] px-6 lg:px-8 text-center">
        <h2 className="mb-4 text-[26px] font-semibold leading-[1.2] text-white sm:text-[30px] lg:text-[34px]">
          Ready to test out our quantum solution?
        </h2>
        <p className="mb-8 text-[14px] leading-[1.6] text-gray-400">
          Get started with our quantum optimization platform and transform your energy grid operations.
        </p>
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 rounded-md bg-[#00d4ff] px-6 py-3 text-[14px] font-semibold text-black transition-all hover:bg-[#00c4ec]"
        >
          Try Dashboard
          <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none">
            <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>
    </section>
  );
}
