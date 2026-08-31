"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CalendarCheck, Images, Leaf } from "lucide-react";
import { media } from "@/data/media";
import { site } from "@/data/site";
import { copy } from "@/data/copy";
import { highlights } from "@/data/content";
import { easeOutExpo, fadeInUp, stagger } from "@/lib/motion";
import { useSite } from "@/components/providers/SiteProvider";

export function HeroSection() {
  const { openBooking } = useSite();
  const heroSrc = media.hero[0];

  return (
    <section className="relative overflow-hidden px-4 pt-24 pb-10 sm:px-6 sm:pt-28 lg:px-8 lg:pt-32 lg:pb-16">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 right-[-8%] h-80 w-80 rounded-full bg-sage/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-10 left-[-6%] h-72 w-72 rounded-full bg-gold/10 blur-3xl"
      />

      <div className="mx-auto grid max-w-[1240px] items-center gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:gap-12">
        <motion.div variants={stagger} initial="hidden" animate="show" className="relative z-10">
          <motion.span
            variants={fadeInUp}
            className="inline-flex items-center gap-2 rounded-full border border-gold/35 bg-white/55 px-4 py-1.5 text-[0.7rem] font-semibold tracking-[0.16em] text-forest uppercase shadow-sm backdrop-blur-md"
          >
            <Leaf className="size-3.5 text-gold" />
            🌲 {copy.hero.badge}
          </motion.span>
          <motion.h1
            variants={fadeInUp}
            className="mt-5 font-heading text-[2.2rem] leading-[1.12] tracking-tight text-forest text-balance sm:text-5xl lg:text-[3.35rem]"
          >
            {site.tagline}
          </motion.h1>
          <motion.p variants={fadeInUp} className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            {site.subTagline}
          </motion.p>
          <motion.div variants={fadeInUp} className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
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
              href="#galerija"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-sage bg-cream px-7 text-[0.78rem] font-semibold tracking-[0.14em] text-forest uppercase transition hover:bg-white"
            >
              <Images className="size-4" />
              {copy.hero.ctaSecondary}
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: easeOutExpo }}
          className="relative"
        >
          <div className="organic-frame relative aspect-[4/5] overflow-hidden shadow-[0_28px_70px_rgba(18,36,28,0.22)] sm:aspect-[5/6] lg:aspect-[4/5]">
            <Image
              src={heroSrc}
              alt="Terasa Forest View apartmana u Dubovici"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 52vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-forest/70 via-forest/10 to-transparent" />
            <div className="absolute top-4 left-4 rounded-full border border-white/25 bg-forest/45 px-3 py-1.5 text-[0.65rem] font-semibold tracking-[0.16em] text-gold uppercase backdrop-blur-md">
              Pogled na šumu
            </div>
            <div className="absolute right-4 bottom-4 left-4">
              <p className="font-heading text-2xl text-cream sm:text-3xl">Dvije terase u hladu</p>
              <p className="mt-1 text-sm text-cream/80">Jutarnja kafa. Večernje vino. Prirodna svježina.</p>
            </div>
          </div>
          <div className="absolute -bottom-5 -left-3 hidden rounded-3xl border border-gold/30 bg-cream/90 px-4 py-3 shadow-xl backdrop-blur-md sm:block">
            <p className="text-[0.62rem] font-semibold tracking-[0.18em] text-gold uppercase">Booking.com</p>
            <p className="font-heading text-2xl text-forest">
              {site.rating.bookingScore}
              <span className="ml-1 text-sm text-muted">/ 10</span>
            </p>
          </div>
        </motion.div>
      </div>

      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="mx-auto mt-12 flex max-w-[1240px] flex-wrap gap-2.5 lg:mt-16"
      >
        {highlights.map((item) => (
          <motion.div
            key={item.label}
            variants={fadeInUp}
            className="rounded-full border border-forest/10 bg-white/70 px-4 py-2.5 shadow-sm backdrop-blur-md"
          >
            <p className="text-[0.78rem] font-semibold tracking-wide text-forest">{item.label}</p>
            <p className="text-[0.65rem] text-muted">{item.detail}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
