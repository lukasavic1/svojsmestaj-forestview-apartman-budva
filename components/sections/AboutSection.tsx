"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { media } from "@/data/media";
import { copy } from "@/data/copy";
import { site } from "@/data/site";
import { fadeInUp } from "@/lib/motion";
import { SectionHeading } from "@/components/ui/SectionHeading";

const MOSAIC = media.about.mosaic;

export function AboutSection() {
  return (
    <section id="o-apartmanu" className="px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
      <div className="mx-auto grid max-w-[1240px] items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 gap-3 sm:gap-4"
        >
          <div className="relative col-span-2 aspect-[16/11] overflow-hidden rounded-3xl shadow-xl shadow-forest/10">
            <Image
              src={MOSAIC[0]}
              alt="Terasa sa pogledom na zelenilo"
              fill
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="object-cover"
            />
          </div>
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl">
            <Image src={MOSAIC[1]} alt="Dnevni boravak" fill sizes="(max-width: 1024px) 50vw, 25vw" className="object-cover" />
          </div>
          <div className="relative -mt-8 aspect-[4/5] overflow-hidden rounded-3xl shadow-lg sm:-mt-12">
            <Image
              src={MOSAIC[2]}
              alt="Otvoreni dnevni boravak sa trpezarijom i modernom kuhinjom"
              fill
              sizes="(max-width: 1024px) 50vw, 25vw"
              className="object-cover"
            />
          </div>
        </motion.div>

        <motion.article
          variants={fadeInUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="rounded-3xl border border-white/80 bg-white/85 p-6 shadow-[0_20px_50px_rgba(27,59,43,0.08)] sm:p-9"
        >
          <SectionHeading kicker={copy.about.kicker} heading={copy.about.heading} />
          <div className="mt-6 space-y-4 text-[0.98rem] leading-relaxed text-ink/80">
            {copy.about.body.map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
          </div>
          <p className="mt-7 text-[0.68rem] tracking-[0.18em] text-sage uppercase">Dubovica · Budva</p>
          <p className="mt-1 font-heading text-xl text-forest">{site.legalName}</p>
        </motion.article>
      </div>
    </section>
  );
}
