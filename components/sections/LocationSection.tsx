"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Bus, Castle, MapPin, ShoppingBag, Umbrella, Car } from "lucide-react";
import { distances } from "@/data/content";
import { copy } from "@/data/copy";
import { site } from "@/data/site";
import { fadeInUp, stagger } from "@/lib/motion";
import { SectionHeading } from "@/components/ui/SectionHeading";

const ICONS = {
  beach: Umbrella,
  shop: ShoppingBag,
  bus: Bus,
  castle: Castle,
} as const;

export function LocationSection() {
  return (
    <section id="lokacija" className="px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
      <div className="mx-auto grid max-w-[1240px] gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
        <div>
          <SectionHeading
            kicker={copy.location.kicker}
            heading={copy.location.heading}
            lead={copy.location.lead}
          />
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mt-8 grid gap-3 sm:grid-cols-2"
          >
            {distances.map((item) => {
              const Icon = ICONS[item.icon];
              return (
                <motion.div
                  key={item.id}
                  variants={fadeInUp}
                  className="rounded-3xl border border-forest/8 bg-white/75 p-4 shadow-sm backdrop-blur-md"
                >
                  <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-forest px-3 py-1 text-[0.62rem] font-semibold tracking-[0.14em] text-gold uppercase">
                    <Icon className="size-3.5" />
                    {item.title}
                  </span>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{item.body}</p>
                </motion.div>
              );
            })}
          </motion.div>

          <div className="mt-6 rounded-3xl border border-gold/40 bg-gradient-to-br from-forest to-sage p-6 text-cream shadow-lg">
            <p className="flex items-center gap-2 font-heading text-2xl text-gold">
              <Car className="size-5" />
              {copy.location.driverTitle}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-cream/85">{copy.location.driverBody}</p>
          </div>

          <div className="mt-6 flex items-start gap-3 text-sm text-muted">
            <MapPin className="mt-0.5 size-4 shrink-0 text-gold" />
            <div>
              <p className="text-[0.68rem] tracking-[0.16em] text-sage uppercase">{copy.location.addressLabel}</p>
              <p className="mt-1 text-ink">
                {site.location.street}
                <br />
                {site.location.postalCode} {site.location.city}, {site.location.country}
              </p>
              <a
                href={site.location.mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-flex items-center gap-1 text-forest hover:text-gold"
              >
                {copy.location.directions}
                <ArrowUpRight className="size-4" />
              </a>
            </div>
          </div>
        </div>
        <div className="overflow-hidden rounded-[2rem] shadow-xl shadow-forest/15 ring-1 ring-forest/10">
          <iframe
            title={copy.location.heading}
            src={site.location.mapsEmbed}
            className="h-[340px] w-full border-0 sm:h-[420px] lg:h-[640px]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}
