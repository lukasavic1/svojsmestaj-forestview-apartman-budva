"use client";

import { useRef, useState } from "react";
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
  fillHeight = false,
}: {
  beach: (typeof beaches)[number];
  featured?: boolean;
  fillHeight?: boolean;
}) {
  return (
    <article
      className={`group relative overflow-hidden rounded-3xl ${
        fillHeight
          ? "h-full min-h-0"
          : featured
            ? "min-h-[22rem] sm:min-h-[32rem]"
            : "min-h-[20rem]"
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
        <p className={`mt-2 text-cream/85 ${featured ? "max-w-lg text-base sm:text-lg" : "line-clamp-3 text-sm"}`}>
          {beach.body}
        </p>
      </div>
    </article>
  );
}

export function BeachesSection() {
  const [active, setActive] = useState(0);
  const [featured, ...rest] = beaches;
  const scrollerRef = useRef<HTMLDivElement>(null);
  const ignoreScroll = useRef(false);

  const goTo = (index: number) => {
    const scroller = scrollerRef.current;
    const card = scroller?.children[index] as HTMLElement | undefined;
    if (!scroller || !card) return;
    setActive(index);
    ignoreScroll.current = true;
    scroller.scrollTo({ left: card.offsetLeft, behavior: "smooth" });
    window.setTimeout(() => {
      ignoreScroll.current = false;
    }, 450);
  };

  const onCarouselScroll = () => {
    if (ignoreScroll.current) return;
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const cards = Array.from(scroller.children) as HTMLElement[];
    const mid = scroller.scrollLeft + scroller.clientWidth / 2;
    let best = 0;
    let bestDist = Infinity;
    cards.forEach((card, i) => {
      const center = card.offsetLeft + card.offsetWidth / 2;
      const dist = Math.abs(center - mid);
      if (dist < bestDist) {
        bestDist = dist;
        best = i;
      }
    });
    setActive(best);
  };

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
          <p className="hidden max-w-sm items-start gap-2 rounded-3xl border border-gold/30 bg-white/5 px-4 py-3 text-sm text-cream/80 backdrop-blur-md sm:inline-flex">
            <Waves className="mt-0.5 size-4 shrink-0 text-gold" />
            {copy.beaches.itinerary}
          </p>
        </div>

        <div className="mt-8 min-w-0 md:hidden">
          <div className="grid grid-cols-5 gap-1">
            {beaches.map((beach, i) => (
              <button
                key={beach.id}
                type="button"
                onClick={() => goTo(i)}
                aria-pressed={i === active}
                className={`min-w-0 rounded-2xl border px-1 py-2 text-center transition ${
                  i === active
                    ? "border-gold bg-gold text-forest"
                    : "border-gold/30 bg-white/5 text-cream/80"
                }`}
              >
                <span className="block truncate text-[0.58rem] font-semibold tracking-[0.04em] uppercase">
                  {beach.shortName}
                </span>
                <span className={`mt-0.5 block text-[0.52rem] tracking-wide ${i === active ? "text-forest/70" : "text-gold/80"}`}>
                  {beach.distance}
                </span>
              </button>
            ))}
          </div>

          <div
            ref={scrollerRef}
            onScroll={onCarouselScroll}
            className="mt-4 flex h-[22rem] w-full min-w-0 snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {beaches.map((beach) => (
              <div key={beach.id} className="h-full min-w-0 shrink-0 snap-start [flex:0_0_calc(100%-0.75rem)]">
                <BeachCard beach={beach} fillHeight />
              </div>
            ))}
          </div>

          <div className="mt-3 flex justify-center gap-1.5">
            {beaches.map((beach, i) => (
              <button
                key={beach.id}
                type="button"
                aria-label={beach.name}
                onClick={() => goTo(i)}
                className={`h-1.5 rounded-full transition-all ${
                  i === active ? "w-6 bg-gold" : "w-1.5 bg-cream/30"
                }`}
              />
            ))}
          </div>
        </div>

        <motion.ol
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-8% 0px" }}
          className="mt-10 hidden grid-cols-5 gap-3 md:grid"
        >
          {beaches.map((beach, i) => (
            <motion.li
              key={beach.id}
              variants={fadeInUp}
              className="relative rounded-2xl border border-gold/20 bg-white/5 px-4 py-3"
            >
              <span className="font-heading text-2xl leading-none text-gold/80">{String(i + 1).padStart(2, "0")}</span>
              <p className="mt-2 font-heading text-lg leading-tight text-cream">{beach.name}</p>
              <p className="mt-1 inline-flex items-center gap-1 text-[0.7rem] tracking-[0.12em] text-gold uppercase">
                <Footprints className="size-3" />
                {beach.distance}
              </p>
              {i < beaches.length - 1 ? (
                <ArrowDownRight className="absolute top-3 right-2 size-4 text-gold/40 lg:rotate-[-20deg]" />
              ) : null}
            </motion.li>
          ))}
        </motion.ol>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-8% 0px" }}
          className="mt-8 hidden md:block"
        >
          <BeachCard beach={featured} featured />
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-8% 0px" }}
          className="mt-6 hidden grid-cols-2 gap-5 md:grid"
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
