import { Link } from "react-router-dom";
import { Logo } from "./Logo";

export function Footer() {
  const footerLinks = {
    "Solutions for": ["Enterprises", "Researchers", "Communities", "Quantum Experts"],
    Product: ["Platform", "Events", "Discussions", "Blog", "Job Board", "QAAS"],
    "About us": ["Our Team", "Press", "Contact"],
  };

  const socialLinks = [
    {
      name: "LinkedIn",
      href: "#",
      icon: (
        <svg className="h-4 w-4" viewBox="0 0 16 16" fill="currentColor">
          <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.174-.54.57-1.097 1.234-1.097.868 0 1.217.66 1.217 1.629v3.495h2.4V8.946c0-2.14-1.142-3.135-2.665-3.135-1.228 0-1.77.667-2.073 1.13h.02V6.169H9.08c.03.678 0 7.225 0 7.225h2.4z" />
        </svg>
      ),
    },
    {
      name: "GitHub",
      href: "#",
      icon: (
        <svg className="h-4 w-4" viewBox="0 0 16 16" fill="currentColor">
          <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
        </svg>
      ),
    },
    {
      name: "Twitter",
      href: "#",
      icon: (
        <svg className="h-4 w-4" viewBox="0 0 16 16" fill="currentColor">
          <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865l8.875 11.633Z" />
        </svg>
      ),
    },
    {
      name: "YouTube",
      href: "#",
      icon: (
        <svg className="h-4 w-4" viewBox="0 0 16 16" fill="currentColor">
          <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.007 2.007 0 0 1-1.415 1.42c-1.16.312-5.22.35-6.11.35h-.089c-.822-.003-4.987-.033-6.11-.335a2.01 2.01 0 0 1-1.415-1.42c-.101-.38-.172-.883-.22-1.402l-.01-.104-.022-.26-.008-.104c-.065-.914-.073-1.77-.074-1.957v-.075c.001-.194.01-1.108.082-2.06l.008-.105.009-.104c.05-.572.124-1.14.235-1.558A2.007 2.007 0 0 1 2.632 2.33c1.16-.312 5.22-.35 6.11-.35h.089zm-3.895 5.565v3.872l3.135-1.936-3.135-1.936z" />
        </svg>
      ),
    },
  ];

  return (
    <footer className="border-t border-white/[0.06] bg-[#060b16] py-12 lg:py-16">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-6 lg:gap-12">
          {/* Logo Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="mb-5 inline-block">
              <Logo size="md" />
            </Link>
            <p className="mb-6 text-[13px] leading-[1.6] text-gray-500 max-w-[260px]">
              Quantum Optimization for Energy Grid Resilience
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-gray-500 transition-colors hover:text-[#00d4ff] hover:border-[#00d4ff]/30"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="mb-3 text-[11px] font-semibold uppercase tracking-[0.05em] text-gray-400">
                {category}
              </h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-[13px] text-gray-500 transition-colors hover:text-[#00d4ff]"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Row */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/[0.06] pt-8 md:flex-row">
          <p className="text-[12px] text-gray-600">
            &copy; 2025 - Ele-Q-tric
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-[12px] text-gray-600 transition-colors hover:text-[#00d4ff]">
              Privacy Policy
            </a>
            <a href="#" className="text-[12px] text-gray-600 transition-colors hover:text-[#00d4ff]">
              Terms &amp; Conditions
            </a>
            <a href="#" className="text-[12px] text-gray-600 transition-colors hover:text-[#00d4ff]">
              Legal Notice
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
