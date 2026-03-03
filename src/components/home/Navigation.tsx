import { Link } from "react-router-dom";
import { useState } from "react";
import { Search, Moon, Sun } from "lucide-react";
import { Logo } from "./Logo";
import { useTheme } from "@/context/ThemeContext";

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const navLinks = [
    { label: "Documentation", href: "/documentation" },
    { label: "Accuracy/Technical Metrics", href: "/accuracy" },
    { label: "Creativity/Novelty", href: "#creativity" },
    { label: "Use of Rigetti Features", href: "#rigetti" },
  ];

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-border-subtle bg-bg-surface-1/80 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-[1400px] items-center justify-between px-6 lg:px-10">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/">
            <Logo size="sm" />
          </Link>
        </div>

        {/* Desktop Navigation - Centered */}
        <nav className="hidden flex-1 items-center justify-center gap-7 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-[12px] font-medium text-text-secondary transition-colors hover:text-text-primary"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Side - Search + Theme Toggle + CTA */}
        <div className="hidden items-center gap-3 md:flex">
          <button className="flex h-8 w-8 items-center justify-center text-text-secondary transition-colors hover:text-text-primary">
            <Search className="h-4 w-4" />
          </button>
          <button
            onClick={toggleTheme}
            className="flex h-8 w-8 items-center justify-center rounded-md text-text-secondary transition-colors hover:bg-bg-surface-2 hover:text-text-primary"
            title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            {theme === "dark" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          </button>
          <a
            href="#contact"
            className="flex items-center gap-1.5 rounded-md border border-accent-primary px-4 py-1.5 text-[12px] font-semibold text-accent-primary transition-all hover:bg-accent-primary/10"
          >
            Contact Us
            <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="none">
              <path d="M4 12L12 4M12 4H6M12 4V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={toggleTheme}
            className="flex h-8 w-8 items-center justify-center rounded-md text-text-secondary transition-colors hover:text-text-primary"
          >
            {theme === "dark" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          </button>
          <button
            className="flex h-8 w-8 items-center justify-center text-text-primary md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <div className="flex flex-col gap-1">
              <span className={`h-[1.5px] w-5 bg-current transition-transform ${mobileMenuOpen ? "translate-y-[2.5px] rotate-45" : ""}`} />
              <span className={`h-[1.5px] w-5 bg-current transition-opacity ${mobileMenuOpen ? "opacity-0" : ""}`} />
              <span className={`h-[1.5px] w-5 bg-current transition-transform ${mobileMenuOpen ? "-translate-y-[2.5px] -rotate-45" : ""}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="border-t border-border-subtle bg-bg-surface-1 px-6 py-4 md:hidden">
          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="py-2 text-[13px] text-text-secondary"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              className="mt-2 flex items-center justify-center gap-1.5 rounded-md border border-accent-primary py-2 text-[12px] font-semibold text-accent-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact Us
              <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="none">
                <path d="M4 12L12 4M12 4H6M12 4V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
