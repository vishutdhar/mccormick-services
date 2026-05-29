import { Hero } from "@/components/sections/hero";
import { Services } from "@/components/sections/services";
import { Why } from "@/components/sections/why";
import { Gallery } from "@/components/sections/gallery";
import { CtaBand } from "@/components/sections/cta-band";
import { ServiceArea } from "@/components/sections/service-area";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";
import { ScrollReveal } from "@/components/scroll-reveal";
import { ScrollTopOnLoad } from "@/components/scroll-top-on-load";
import { SiteHeader } from "@/components/site-header";
import { LeadTracking } from "@/components/lead-tracking";
import { MobileCallBar } from "@/components/mobile-call-bar";

export default function Page() {
  return (
    <>
      <ScrollTopOnLoad />
      <ScrollReveal />
      <LeadTracking />
      <a
        href="#top"
        className="skip-link bg-brand-forest text-white px-4 py-2 rounded"
      >
        Skip to main content
      </a>
      <SiteHeader />
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
