"use client";

import { useCallback, useState } from "react";
import { ChapterIndicator } from "@/components/motion/ChapterIndicator";
import { Preloader } from "@/components/motion/Preloader";
import { ScrollProgress } from "@/components/motion/ScrollProgress";
import { Navbar } from "@/components/navigation/Navbar";
import { Hero } from "@/components/sections/Hero";
import { LegacySection } from "@/components/sections/LegacySection";
import { PrinciplesSection } from "@/components/sections/PrinciplesSection";
import { CollectionSection } from "@/components/sections/CollectionSection";
import { PhilosophySection } from "@/components/sections/PhilosophySection";
import { AssociationsSection } from "@/components/sections/AssociationsSection";
import { PartnersSection } from "@/components/sections/PartnersSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { Footer } from "@/components/sections/Footer";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function PageExperience() {
  const reducedMotion = useReducedMotion();
  const [ready, setReady] = useState(false);
  const handleLoadComplete = useCallback(() => setReady(true), []);
  const isReady = ready || reducedMotion;

  return (
    <>
      {!reducedMotion && !ready && <Preloader onComplete={handleLoadComplete} />}
      <ScrollProgress />
      <ChapterIndicator />
      <Navbar ready={isReady} />
      <main>
        <Hero ready={isReady} />
        <LegacySection />
        <PrinciplesSection />
        <CollectionSection />
        <PhilosophySection />
        <AssociationsSection />
        <PartnersSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
