"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowDownRight, Footprints, Waves } from "lucide-react";
import { beaches } from "@/data/content";
import { copy } from "@/data/copy";
import { fadeInUp, stagger } from "@/lib/motion";
import { SectionHeading } from "@/components/ui/SectionHeading";

function BeachCard({
  beach,
  featured = false,
}: {
  beach: (typeof beaches)[number];
  featured?: boolean;
}) {
  return (
    <motion.article
      variants={fadeInUp}
      className={`group relative overflow-hidden rounded-3xl ${
        featured ? "min-h-[22rem] sm:min-h-[32rem]" : "min-h-[17rem] sm:min-h-[20rem]"
      }`}
    >
      <Image
        src={beach.src}
        alt={`${beach.name}, Budva`}
        fill
        sizes={featured ? "100vw" : "(max-width: 768px) 100vw, 50vw"}
        className="object-cover transition duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-forest/92 via-forest/30 to-transparent" />
      <div className="absolute top-4 left-4 flex flex-wrap gap-2">
        <span className="rounded-full border border-gold/50 bg-forest/70 px-3 py-1 text-[0.65rem] font-semibold tracking-[0.16em] text-gold uppercase backdrop-blur-md">
          {beach.distance}
        </span>
        <span className="rounded-full border border-white/25 bg-white/15 px-3 py-1 text-[0.65rem] font-semibold tracking-[0.12em] text-cream uppercase backdrop-blur-md">
          {beach.tag}
        </span>
      </div>
      <div className={`absolute inset-x-0 bottom-0 ${featured ? "p-6 sm:p-8" : "p-5"}`}>
        <p className="text-[0.7rem] font-semibold tracking-[0.18em] text-gold uppercase">{beach.vibe}</p>
        <h3 className={`mt-1 font-heading text-cream ${featured ? "text-3xl sm:text-5xl" : "text-2xl"}`}>
          {beach.name}
        </h3>
        <p className={`mt-2 text-cream/85 ${featured ? "max-w-lg text-base sm:text-lg" : "text-sm"}`}>
          {beach.body}
        </p>
      </div>
    </motion.article>
  );
}

export function BeachesSection() {
  const [featured, ...rest] = beaches;

  return (
    <section id="plaze" className="relative overflow-hidden bg-forest px-4 py-14 text-cream sm:px-6 lg:px-8 lg:py-20">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,0.16),transparent_62%)]"
      />
      <div className="relative mx-auto max-w-[1240px]">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            kicker={copy.beaches.kicker}
            heading={copy.beaches.heading}
            lead={copy.beaches.lead}
            light
          />
          <p className="inline-flex max-w-sm items-start gap-2 rounded-3xl border border-gold/30 bg-white/5 px-4 py-3 text-sm text-cream/80 backdrop-blur-md">
            <Waves className="mt-0.5 size-4 shrink-0 text-gold" />
            {copy.beaches.itinerary}
          </p>
        </div>

        <motion.ol
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-8% 0px" }}
          className="mt-10 grid grid-cols-2 gap-2 sm:grid-cols-5 sm:gap-3"
        >
          {beaches.map((beach, i) => (
            <motion.li
              key={beach.id}
              variants={fadeInUp}
              className="relative rounded-2xl border border-gold/20 bg-white/5 px-3 py-3 sm:px-4"
            >
              <span className="font-heading text-2xl leading-none text-gold/80">{String(i + 1).padStart(2, "0")}</span>
              <p className="mt-2 font-heading text-lg leading-tight text-cream">{beach.name}</p>
              <p className="mt-1 inline-flex items-center gap-1 text-[0.7rem] tracking-[0.12em] text-gold uppercase">
                <Footprints className="size-3" />
                {beach.distance}
              </p>
              {i < beaches.length - 1 ? (
                <ArrowDownRight className="absolute top-3 right-2 hidden size-4 text-gold/40 sm:block lg:rotate-[-20deg]" />
              ) : null}
            </motion.li>
          ))}
        </motion.ol>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-8% 0px" }}
          className="mt-8"
        >
          <BeachCard beach={featured} featured />
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-8% 0px" }}
          className="mt-3 grid gap-3 sm:mt-4 sm:grid-cols-2 sm:gap-4"
        >
          {rest.map((beach) => (
            <BeachCard key={beach.id} beach={beach} />
          ))}
        </motion.div>

        <p className="mt-6 text-center text-[0.65rem] tracking-wide text-cream/40">{copy.beaches.credit}</p>
      </div>
    </section>
  );
}
