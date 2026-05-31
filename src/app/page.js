import Banner from "@/components/Banner";
import FeaturesSection from "@/components/Features";
import JobDiscovery from "@/components/JobDiscovery";
import NextRole from "@/components/NextRole";
import PricingSection from "@/components/PricingSection";
import Image from "next/image";

export default function Home() {
  return (
    <div className=" bg-zinc-50 font-sans dark:bg-black">
      <Banner></Banner>
      <JobDiscovery></JobDiscovery>
      <FeaturesSection></FeaturesSection>
      <PricingSection></PricingSection>
      <NextRole></NextRole>
    </div>
  );
}
