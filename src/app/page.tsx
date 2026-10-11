import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Capabilities } from "@/components/Capabilities";
import { Toolkit } from "@/components/Toolkit";
import { Experience } from "@/components/Experience";
import { Credentials } from "@/components/Credentials";
import { Work } from "@/components/Work";
import { Methodology } from "@/components/Methodology";
import { Contact } from "@/components/Contact";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <Hero />
        <About />
        <Capabilities />
        <Toolkit />
        <Experience />
        <Credentials />
        <Work />
        <Methodology />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
