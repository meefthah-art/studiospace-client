import HeroSlider from "@/components/HeroSlider";
import FeaturedStudios from "@/components/FeaturedStudios";
import CategoryCards from "@/components/CategoryCards";
import HowBookingWorks from "@/components/HowBookingWorks";
import HostGuarantee from "@/components/HostGuarantee";

export default function Home() {
  return (
    <>
      <HeroSlider />
      <FeaturedStudios />
      <CategoryCards />
      <HowBookingWorks />
      <HostGuarantee />
    </>
  );
}
