"use client";

import { motion } from "framer-motion";
import {
  BedDouble,
  Car,
  CalendarCheck,
  Leaf,
  Ruler,
  Sparkles,
  Star,
  Trees,
  Tv,
  Umbrella,
  Wifi,
  Wind,
} from "lucide-react";
import { site } from "@/data/site";
import { copy } from "@/data/copy";
import { heroFeatures, heroRibbon } from "@/data/content";
import { fadeInUp, stagger } from "@/lib/motion";
import { useSite } from "@/components/providers/SiteProvider";

const FEATURE_ICONS = {
  shade: Trees,
  evenings: Wind,
  parking: Car,
  entertainment: Tv,
} as const;

const RIBBON_ICONS = {
  size: Ruler,
  rooms: BedDouble,
  beach: Umbrella,
  wifi: Wifi,
} as const;

function ForestPattern() {
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.12]"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <pattern id="hero-forest" width="72" height="84" patternUnits="userSpaceOnUse">
          <path
            d="M36 8c8 10 12 18 12 28S44 54 36 62C28 54 24 46 24 36S28 18 36 8Z"
            fill="none"
            stroke="#C5A880"
            strokeWidth="1.1"
          />
          <path d="M36 20v42" stroke="#C5A880" strokeWidth="0.8" />
          <path
            d="M12 48c4 6 7 11 7 16s-3 8-7 12c-4-4-7-7-7-12s3-10 7-16Z"
            fill="none"
            stroke="#C5A880"
            strokeWidth="0.9"
          />
          <path
            d="M60 46c4 6 7 11 7 16s-3 8-7 12c-4-4-7-7-7-12s3-10 7-16Z"
            fill="none"
            stroke="#C5A880"
            strokeWidth="0.9"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#hero-forest)" />
    </svg>
  );
}

export function HeroSection() {
  const { openBooking } = useSite();

  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 right-[-8%] h-80 w-80 rounded-full bg-sage/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-24 left-[-6%] h-72 w-72 rounded-full bg-gold/10 blur-3xl"
      />

      <div className="mx-auto grid max-w-[1240px] items-center gap-10 px-4 pt-24 pb-10 sm:px-6 sm:pt-28 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:px-8 lg:pt-32 lg:pb-14">
        <motion.div variants={stagger} initial="hidden" animate="show" className="relative z-10">
          <motion.span
            variants={fadeInUp}
            className="inline-flex items-center gap-2 rounded-full border border-gold/35 bg-white/70 px-4 py-1.5 text-[0.7rem] font-semibold tracking-[0.16em] text-forest uppercase shadow-sm backdrop-blur-md"
          >
            <Leaf className="size-3.5 text-gold" />
            {copy.hero.badge}
          </motion.span>
          <motion.h1
            variants={fadeInUp}
            className="mt-6 font-heading text-4xl leading-[1.12] font-medium tracking-tight text-forest text-balance sm:text-5xl"
          >
            {site.tagline}
          </motion.h1>
          <motion.p variants={fadeInUp} className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            {copy.hero.lead}
          </motion.p>
          <motion.div variants={fadeInUp} className="mt-8 max-w-xl">
            <div className="grid grid-cols-[1.2fr_0.8fr] overflow-hidden rounded-2xl border border-gold/35 bg-white shadow-md shadow-forest/10 sm:hidden">
              <button
                type="button"
                onClick={openBooking}
                className="btn-emerald-gold inline-flex min-h-14 items-center justify-center gap-1.5 rounded-none px-2 text-center text-[0.65rem] leading-tight font-semibold tracking-[0.06em] uppercase shadow-none [box-shadow:none]"
              >
                <CalendarCheck className="size-4 shrink-0" />
                {copy.hero.ctaPrimary}
              </button>
              <a
                href="#pogodnosti"
                className="inline-flex min-h-14 items-center justify-center gap-1.5 border-l border-gold/25 bg-cream px-3 text-[0.68rem] font-semibold tracking-[0.08em] text-forest uppercase"
              >
                <Sparkles className="size-3.5 shrink-0 text-gold" />
                {copy.hero.ctaSecondaryShort}
              </a>
            </div>
            <div className="hidden sm:flex sm:flex-row sm:items-center sm:gap-3">
              <motion.button
                type="button"
                onClick={openBooking}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="btn-emerald-gold gold-glow inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-7 text-[0.78rem] font-semibold tracking-[0.14em] uppercase"
              >
                <CalendarCheck className="size-4" />
                {copy.hero.ctaPrimary}
              </motion.button>
              <a
                href="#pogodnosti"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-sage/50 px-7 text-[0.78rem] font-semibold tracking-[0.14em] text-forest uppercase transition hover:border-gold hover:bg-white"
              >
                {copy.hero.ctaSecondary}
              </a>
            </div>
          </motion.div>
        </motion.div>

        <motion.div variants={fadeInUp} initial="hidden" animate="show">
          <motion.article
            whileHover={{ y: -6 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-forest to-forest-deep p-8 text-cream shadow-2xl shadow-forest/30 md:p-10"
          >
          <ForestPattern />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-16 -right-10 h-44 w-44 rounded-full bg-gold/15 blur-3xl"
          />
          <div className="relative">
            <p className="inline-flex items-center gap-2 rounded-full border border-gold/45 bg-gold/15 px-3.5 py-1.5 text-[0.68rem] font-semibold tracking-[0.12em] text-gold uppercase">
              <Star className="size-3.5 fill-current" />
              {copy.hero.ratingBadge}
            </p>
            <ul className="mt-8 space-y-2">
              {heroFeatures.map((item) => {
                const Icon = FEATURE_ICONS[item.id];
                return (
                  <li key={item.id}>
                    <div className="group flex gap-4 rounded-2xl border border-transparent px-3 py-3 transition hover:border-gold/25 hover:bg-white/5">
                      <span className="grid size-11 shrink-0 place-items-center rounded-2xl border border-gold/35 bg-white/5 text-gold transition group-hover:bg-gold group-hover:text-forest">
                        <Icon className="size-5" />
                      </span>
                      <span>
                        <span className="block font-heading text-lg text-cream">{item.title}</span>
                        <span className="mt-0.5 block text-sm text-cream/70">{item.body}</span>
                      </span>
                    </div>
                  </li>
                );
              })}
            </ul>
            <p className="mt-8 rounded-2xl border border-gold/20 bg-white/5 px-4 py-3 text-sm leading-relaxed text-cream/80">
              {copy.hero.cardFooter}
            </p>
          </div>
          </motion.article>
        </motion.div>
      </div>

      <motion.div
        variants={fadeInUp}
        initial="hidden"
        animate="show"
        className="border-y border-gold/20 bg-forest"
      >
        <div className="mx-auto grid max-w-[1240px] grid-cols-2 gap-px bg-gold/15 sm:grid-cols-4">
          {heroRibbon.map((item) => {
            const Icon = RIBBON_ICONS[item.id];
            return (
              <div
                key={item.id}
                className="flex items-center gap-3 bg-forest px-4 py-4 sm:justify-center sm:px-6 sm:py-5"
              >
                <span className="grid size-9 shrink-0 place-items-center rounded-full border border-gold/40 text-gold">
                  <Icon className="size-4" />
                </span>
                <p className="text-[0.72rem] font-semibold tracking-[0.08em] text-cream uppercase sm:text-[0.78rem]">
                  {item.label}
                </p>
              </div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
