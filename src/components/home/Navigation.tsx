import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { label: "Home", href: "/", active: location.pathname === "/" },
    { label: "Dashboard", href: "/dashboard", active: location.pathname === "/dashboard" },
    { label: "Solutions", href: "#solutions", active: false },
    { label: "About", href: "#about", active: false },
  ];

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/[0.04] bg-[#060b16]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-[1400px] items-center justify-between px-6 lg:px-10">
        {/* Logo */}
        <div className="flex w-32 items-center">
          <Link to="/">
            <img src="/logo.png" alt="Ele(Q)tric" className="h-[18px] w-auto" />
          </Link>
        </div>

        {/* Desktop Navigation - Centered */}
        <nav className="hidden flex-1 items-center justify-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              className={`text-[13px] font-medium transition-colors ${
                link.active
                  ? "text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA Button - Pill Shape */}
        <div className="hidden w-32 justify-end md:flex">
          <Link
            to="/dashboard"
            className="flex items-center gap-2 rounded-full bg-white px-5 py-1.5 text-[12px] font-bold text-black transition-all hover:bg-gray-100"
          >
            Try the Prototype
            <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="none">
              <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="flex h-8 w-8 items-center justify-center text-white md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <div className="flex flex-col gap-1">
            <span className={`h-[1.5px] w-5 bg-current transition-transform ${mobileMenuOpen ? "translate-y-[2.5px] rotate-45" : ""}`} />
            <span className={`h-[1.5px] w-5 bg-current transition-opacity ${mobileMenuOpen ? "opacity-0" : ""}`} />
            <span className={`h-[1.5px] w-5 bg-current transition-transform ${mobileMenuOpen ? "-translate-y-[2.5px] -rotate-45" : ""}`} />
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="border-t border-white/[0.04] bg-[#060b16] px-6 py-4 md:hidden">
          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className={`py-2 text-[13px] ${link.active ? "text-white" : "text-gray-400"}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/dashboard"
              className="mt-2 flex items-center justify-center gap-1.5 rounded-full bg-white py-2 text-[12px] font-semibold text-black"
              onClick={() => setMobileMenuOpen(false)}
            >
              Try the Prototype
              <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="none">
                <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
