import { site } from "@/data/site";
import { siteConfig } from "@/config/site";
import { media } from "@/data/media";

export function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "VacationRental",
    name: site.legalName,
    description: site.seo.description,
    url: siteConfig.url,
    telephone: site.contact.phoneDisplay,
    image: media.hero,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.location.street,
      addressLocality: site.location.locality,
      addressRegion: site.location.city,
      postalCode: site.location.postalCode,
      addressCountry: site.location.countryCode,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.location.lat,
      longitude: site.location.lng,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: site.rating.bookingScore,
      bestRating: 10,
      ratingCount: site.rating.count,
    },
    checkinTime: site.checkIn,
    checkoutTime: site.checkOut,
    occupancy: {
      "@type": "QuantitativeValue",
      maxValue: site.capacity,
    },
    amenityFeature: [
      { "@type": "LocationFeatureSpecification", name: "Free parking" },
      { "@type": "LocationFeatureSpecification", name: "Air conditioning" },
      { "@type": "LocationFeatureSpecification", name: "Forest view terraces" },
      { "@type": "LocationFeatureSpecification", name: "Netflix" },
      { "@type": "LocationFeatureSpecification", name: "Dishwasher" },
      { "@type": "LocationFeatureSpecification", name: "Washing machine" },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
