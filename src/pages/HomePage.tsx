import {
  Navigation,
  HeroSection,
  ProblemSection,
  ReportSection,
  StatsSection,
  CTASection,
  ContactSection,
  Footer,
} from "@/components/home";

export function HomePage() {
  return (
    <div className="min-h-screen bg-bg-base">
      <Navigation />
      <main>
        <HeroSection />
        <ReportSection />
        <ProblemSection />
        <StatsSection />
        <CTASection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
