import { HeroSection } from "@/components/hero-section";
import { SearchForm } from "@/components/search-form";
import { LinkedInSection } from "@/components/linkedin-section";
import { Footer } from "@/components/footer";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-science-pattern">
      <HeroSection />
      <SearchForm />
      <LinkedInSection />
      <Footer />
    </main>
  );
}
