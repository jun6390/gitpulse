import HeroSection from "@/components/HeroSection";
import HomeCtaSection from "@/components/HomeCtaSection";
import HomeFeatureSection from "@/components/HomeFeatureSection";
import HomeIntroSection from "@/components/HomeIntroSection";
import ScrollTopButton from "@/components/ScrollTopButton";

const Page = () => {
  return (
    <>
      <HeroSection />
      <HomeIntroSection />
      <HomeFeatureSection />
      <HomeCtaSection />
      <ScrollTopButton />
    </>
  );
};

export default Page;
