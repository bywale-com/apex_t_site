import { Footer } from "../components/layout/Footer";
import { Navbar } from "../components/layout/Navbar";
import { CTASection } from "../components/sections/CTASection";
import { Hero } from "../components/sections/Hero";
import { Insights } from "../components/sections/Insights";
import { PainPoints } from "../components/sections/PainPoints";
import { SocialProof } from "../components/sections/SocialProof";
import { SoftwareStrip } from "../components/sections/SoftwareStrip";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <PainPoints />
      <SoftwareStrip />
      <SocialProof />
      <Insights />
      <CTASection />
      <Footer />
    </>
  );
}
