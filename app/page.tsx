// import Hero from "../components/Hero";
import { HeroParallax } from "@/components/ui/hero-parallax";
import SignatureStrengths  from "../components/strategic-focus";
import VisionMissionSection from "../components/VisionMissionSection";
import CallToAction from "@/components/Call-Toaction";
import PrimeCapitalInfo from "@/components/PrimeCapitalInfo";

export default function Home() {
  const products = [
    { title: "Banteyrga", link: "#", thumbnail: "/banteyrga.png" },
    { title: "Behailu", link: "#", thumbnail: "/behailu.png" },
    { title: "Board Directors", link: "#", thumbnail: "/grouppic.jpg" },
    { title: "Habib", link: "#", thumbnail: "/habib.png" },
    { title: "Kalkidan", link: "#", thumbnail: "/kalkidan.png" },
    { title: "Mukemil", link: "#", thumbnail: "/mukemil.png" },
    { title: "Tewdros", link: "#", thumbnail: "/tewdros.png" },
    { title: "Banteyrga", link: "#", thumbnail: "/banteyrga.png" },
    { title: "Kalkidan", link: "#", thumbnail: "/kalkidan.png" },
    { title: "Board Directors", link: "#", thumbnail: "/grouppic.jpg" },
    { title: "Habib", link: "#", thumbnail: "/habib.png" },
  ];
  return (
    <main className="min-h-screen w-full bg-white">
      <HeroParallax products={products} />
      <PrimeCapitalInfo  />
      <SignatureStrengths />
      <VisionMissionSection />
      <CallToAction />
    </main>
  );
}
