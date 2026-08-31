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
  const address = `${site.location.street}, ${site.location.postalCode} ${site.location.city}`;

  return (
    <section id="lokacija" className="overflow-x-clip px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-[1240px]">
        <SectionHeading
          kicker={copy.location.kicker}
          heading={copy.location.heading}
          lead={copy.location.lead}
        />

        <div className="mt-8 grid min-w-0 gap-5 lg:grid-cols-2 lg:items-stretch">
          <div className="relative aspect-[4/3] min-w-0 overflow-hidden rounded-[1.75rem] shadow-xl shadow-forest/15 ring-1 ring-forest/10 lg:order-2 lg:aspect-auto lg:min-h-[28rem]">
            <iframe
              title={copy.location.heading}
              src={site.location.mapsEmbed}
              className="absolute inset-0 h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <div className="flex min-w-0 flex-col gap-4 lg:order-1">
            <a
              href={site.location.mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-emerald-gold inline-flex h-12 w-full min-w-0 items-center justify-center gap-2 rounded-full px-4 text-[0.72rem] font-semibold tracking-[0.12em] uppercase lg:hidden"
            >
              <MapPin className="size-4 shrink-0" />
              <span className="truncate">{copy.location.directions}</span>
              <ArrowUpRight className="size-4 shrink-0" />
            </a>

            <div className="min-w-0 overflow-hidden rounded-3xl border border-forest/8 bg-white/80 lg:hidden">
              {distances.map((item, i) => {
                const Icon = ICONS[item.icon];
                return (
                  <div
                    key={item.id}
                    className={`flex gap-3 p-3.5 ${i < distances.length - 1 ? "border-b border-forest/8" : ""}`}
                  >
                    <span className="grid size-9 shrink-0 place-items-center rounded-xl border border-gold/40 bg-forest text-gold">
                      <Icon className="size-4" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-[0.72rem] font-semibold tracking-[0.12em] text-forest uppercase">
                        {item.title}
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-muted">{item.body}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="hidden grid-cols-2 gap-3 lg:grid"
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

            <div className="min-w-0 rounded-3xl border border-gold/40 bg-gradient-to-br from-forest to-sage p-4 text-cream shadow-lg sm:p-6">
              <p className="flex items-start gap-2 font-heading text-lg leading-snug text-gold sm:text-2xl">
                <Car className="mt-1 size-5 shrink-0" />
                <span className="min-w-0 text-balance">{copy.location.driverTitle}</span>
              </p>
              <p className="mt-2 text-sm leading-relaxed text-pretty text-cream/85">{copy.location.driverBody}</p>
            </div>

            <div className="flex min-w-0 items-start gap-3 text-sm text-muted">
              <MapPin className="mt-0.5 size-4 shrink-0 text-gold" />
              <div className="min-w-0">
                <p className="text-[0.68rem] tracking-[0.16em] text-sage uppercase">{copy.location.addressLabel}</p>
                <p className="mt-1 text-pretty text-ink">{address}</p>
                <a
                  href={site.location.mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 hidden items-center gap-1 text-forest hover:text-gold lg:inline-flex"
                >
                  {copy.location.directions}
                  <ArrowUpRight className="size-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
