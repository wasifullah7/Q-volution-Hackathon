import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Navigation } from "./Navigation";
import { CTASection } from "./CTASection";
import { ContactSection } from "./ContactSection";
import { Footer } from "./Footer";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export function SiteLayout() {
  return (
    <div className="min-h-screen bg-bg-base">
      <ScrollToTop />
      <Navigation />
      <main>
        <Outlet />
        <CTASection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
