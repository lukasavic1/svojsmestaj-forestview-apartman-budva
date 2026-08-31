"use client";

import { AboutSection } from "@/components/sections/AboutSection";
import { AmenitiesSection } from "@/components/sections/AmenitiesSection";
import { ContactFaqSection } from "@/components/sections/ContactFaqSection";
import { GallerySection } from "@/components/sections/GallerySection";
import { BeachesSection } from "@/components/sections/BeachesSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { LocationSection } from "@/components/sections/LocationSection";
import { ReviewsSection } from "@/components/sections/ReviewsSection";
import { SiteChrome } from "@/components/SiteChrome";

export function PropertySite() {
  return (
    <SiteChrome>
      <main>
        <HeroSection />
        <AboutSection />
        <AmenitiesSection />
        <GallerySection />
        <BeachesSection />
        <LocationSection />
        <ReviewsSection />
        <ContactFaqSection />
      </main>
    </SiteChrome>
  );
}
