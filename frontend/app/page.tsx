import HeroSection from "@/components/shared/HeroSection";
import FeatureCards from "@/components/shared/FeatureCards";

export default function Home() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <FeatureCards />
      {/* Additional sections can be added here */}
    </div>
  );
}