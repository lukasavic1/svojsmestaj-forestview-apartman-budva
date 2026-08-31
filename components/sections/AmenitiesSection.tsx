"use client";

import { motion } from "framer-motion";
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
  return (
    <section id="pogodnosti" className="bg-warm/50 px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-[1240px]">
        <SectionHeading
          kicker={copy.amenities.kicker}
          heading={copy.amenities.heading}
          lead={copy.amenities.lead}
        />
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-8% 0px" }}
          className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
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
