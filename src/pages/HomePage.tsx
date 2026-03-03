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
    <div className="min-h-screen bg-[#060b16]">
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
