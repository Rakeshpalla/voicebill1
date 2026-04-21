import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProblemSection from "@/components/ProblemSection";
import ProcessSection from "@/components/ProcessSection";
import SocialProofSection from "@/components/SocialProofSection";
import FounderSection from "@/components/FounderSection";
import FooterSection from "@/components/FooterSection";

export default function Home() {
  return (
    <main>
      <Navbar />

      <div id="hero">
        <HeroSection />
      </div>

      <div id="problem">
        <ProblemSection />
      </div>

      <div id="process">
        <ProcessSection />
      </div>

      <div id="social-proof">
        <SocialProofSection />
      </div>

      <div id="waitlist">
        <FounderSection />
      </div>

      <FooterSection />
    </main>
  );
}
