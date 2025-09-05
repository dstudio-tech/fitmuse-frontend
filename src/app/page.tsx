import InitAOS from "@/components/InitAOS";
import Hero from "@/sections/Hero";
import Gallery from "@/sections/Gallery";
import CallToAction from "@/sections/CallToAction";
import StarsGallery from "@/sections/StarsGallery";

export default function Home() {
  return (
    <>
      <InitAOS />
      <main>
        <Hero />
        <Gallery />
        <CallToAction />
        <StarsGallery />
      </main>
    </>
  );
}
