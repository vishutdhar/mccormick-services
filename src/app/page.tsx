import { Hero } from "@/components/sections/hero";
import { Services } from "@/components/sections/services";
import { Why } from "@/components/sections/why";
import { Gallery } from "@/components/sections/gallery";
import { CtaBand } from "@/components/sections/cta-band";
import { ServiceArea } from "@/components/sections/service-area";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";
import { MobileCallBar } from "@/components/mobile-call-bar";
import { ScrollReveal } from "@/components/scroll-reveal";

export default function Page() {
  return (
    <>
      <ScrollReveal />
      <a
        href="#top"
        className="skip-link bg-brand-forest text-white px-4 py-2 rounded"
      >
        Skip to main content
      </a>
      <main className="flex-1">
        <Hero />
        <Services />
        <Why />
        <Gallery />
        <CtaBand />
        <ServiceArea />
        <Contact />
      </main>
      <Footer />
      <MobileCallBar />
    </>
  );
}
