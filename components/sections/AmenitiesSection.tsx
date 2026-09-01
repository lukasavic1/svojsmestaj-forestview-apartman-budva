"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Baby,
  Car,
  Snowflake,
  Trees,
  Tv,
  UtensilsCrossed,
  VolumeX,
  WashingMachine,
  Wifi,
} from "lucide-react";
import { amenities } from "@/data/content";
import { copy } from "@/data/copy";
import { fadeInUp, stagger } from "@/lib/motion";
import { SectionHeading } from "@/components/ui/SectionHeading";

const ICONS = {
  trees: Trees,
  snowflake: Snowflake,
  utensils: UtensilsCrossed,
  washing: WashingMachine,
  tv: Tv,
  car: Car,
  quiet: VolumeX,
  wifi: Wifi,
  family: Baby,
} as const;

export function AmenitiesSection() {
  const [activeId, setActiveId] = useState<(typeof amenities)[number]["id"]>(amenities[0].id);
  const active = amenities.find((item) => item.id === activeId) ?? amenities[0];
  const ActiveIcon = ICONS[active.icon];

  return (
    <section id="pogodnosti" className="bg-warm/50 px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-[1240px]">
        <SectionHeading
          kicker={copy.amenities.kicker}
          heading={copy.amenities.heading}
          lead={copy.amenities.lead}
        />

        <div className="mt-8 md:hidden">
          <div className="grid grid-cols-3 gap-2">
            {amenities.map((item) => {
              const Icon = ICONS[item.icon];
              const selected = item.id === activeId;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveId(item.id)}
                  aria-pressed={selected}
                  className={`flex min-h-[5.75rem] flex-col items-center justify-center gap-2 rounded-2xl border px-2 py-3 text-center transition ${
                    selected
                      ? "border-gold bg-forest text-gold shadow-lg shadow-forest/20"
                      : "border-forest/10 bg-white/80 text-forest"
                  }`}
                >
                  <Icon className="size-5" />
                  <span className={`line-clamp-2 text-[0.62rem] leading-tight font-semibold ${selected ? "text-cream" : "text-forest"}`}>
                    {item.title}
                  </span>
                </button>
              );
            })}
          </div>
          <article className="relative mt-3 h-[7.75rem] overflow-hidden rounded-2xl border border-gold/30 bg-gradient-to-br from-forest to-forest-deep text-cream shadow-lg shadow-forest/15">
            <AnimatePresence initial={false}>
              <motion.div
                key={active.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.16 }}
                className="absolute inset-0 flex items-start gap-2.5 px-3.5 py-3"
              >
                <span className="grid size-9 shrink-0 place-items-center rounded-xl border border-gold/40 bg-gold/15 text-gold">
                  <ActiveIcon className="size-4" />
                </span>
                <div className="min-w-0">
                  <h3 className="line-clamp-1 font-heading text-base leading-snug text-cream">{active.title}</h3>
                  <p className="mt-1 line-clamp-3 text-[0.8rem] leading-relaxed text-cream/80">{active.body}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </article>
        </div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-8% 0px" }}
          className="mt-10 hidden gap-4 md:grid md:grid-cols-2 lg:grid-cols-3"
        >
          {amenities.map((item) => {
            const Icon = ICONS[item.icon];
            return (
              <motion.article
                key={item.id}
                variants={fadeInUp}
                whileHover={{ y: -8, scale: 1.03, rotateX: 5, rotateY: -4 }}
                transition={{ type: "spring", stiffness: 280, damping: 18 }}
                className="group rounded-3xl border border-forest/8 bg-white/80 p-6 shadow-sm shadow-forest/5 backdrop-blur-sm"
                style={{ transformPerspective: 900 }}
              >
                <span className="grid size-12 place-items-center rounded-2xl border border-gold/35 bg-forest text-gold transition group-hover:bg-gold group-hover:text-forest">
                  <Icon className="size-5" />
                </span>
                <h3 className="mt-4 font-heading text-xl text-forest">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.body}</p>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
