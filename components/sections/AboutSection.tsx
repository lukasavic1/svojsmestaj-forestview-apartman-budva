"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Baby, Snowflake, Ruler } from "lucide-react";
import { media } from "@/data/media";
import { copy } from "@/data/copy";
import { site } from "@/data/site";
import { easeOutExpo, fadeInUp } from "@/lib/motion";
import { SectionHeading } from "@/components/ui/SectionHeading";

const MOSAIC = media.about.mosaic;

const MOSAIC_ALTS = [
  "Terasa sa pogledom na zelenilo",
  "Dnevni boravak",
  "Otvoreni dnevni boravak sa trpezarijom i modernom kuhinjom",
] as const;

const PILL_ICONS = {
  size: Ruler,
  family: Baby,
  comfort: Snowflake,
} as const;

function Highlight({ children }: { children: string }) {
  return <strong className="font-semibold text-forest">{children}</strong>;
}

function AboutCopy({ className, reveal = false }: { className?: string; reveal?: boolean }) {
  const paragraphs = [
    <p key="p1">
      Dobrodošli u naš prostrani dvosobni stan smješten u jednom od najljepših rezidencijalnih naselja u Budvi —{" "}
      <Highlight>Dubovici</Highlight>. Ako želite da uživate u svemu što Budva nudi, a da nakon uzbudljivog dana na plaži
      pobjegnete od <Highlight>ulične buke, betona i ljetnje žege</Highlight>, naš stan je savršen izbor za vas.
    </p>,
    <p key="p2">
      Stan je u potpunosti opremljen za komforan i bezbrižan boravak{" "}
      <Highlight>porodica sa djecom ili parova</Highlight> koji planiraju duži odmor. Dnevni boravak je klimatizovan i
      idealan za popodnevno opuštanje, a stan posjeduje čak{" "}
      <Highlight>dva televizora sa kablovskom i Netflixom</Highlight> za vaše omiljene filmove i serije.
    </p>,
    <p key="p3">{copy.about.body[2]}</p>,
  ];

  if (!reveal) {
    return <div className={className}>{paragraphs}</div>;
  }

  return (
    <div className={className}>
      {paragraphs.map((paragraph, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.55, margin: "0px 0px -12% 0px" }}
          transition={{ duration: 0.85, ease: easeOutExpo, delay: i * 0.12 }}
        >
          {paragraph}
        </motion.div>
      ))}
    </div>
  );
}

function LocationMark({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <div className="mt-5">
        <p className="text-[0.65rem] tracking-[0.16em] text-sage uppercase">Dubovica · Budva</p>
        <p className="mt-0.5 font-heading text-base leading-snug text-forest">{site.legalName}</p>
      </div>
    );
  }

  return (
    <div className="mt-7 w-fit max-w-full rounded-2xl border border-champagne/35 bg-forest/[0.05] px-3.5 py-2">
      <p className="text-[0.62rem] tracking-[0.16em] text-sage uppercase">Dubovica · Budva</p>
      <p className="mt-0.5 font-heading text-sm text-forest">{site.legalName}</p>
    </div>
  );
}

export function AboutSection() {
  const [activePhoto, setActivePhoto] = useState(0);
  const scrollerRef = useRef<HTMLDivElement>(null);

  const goToPhoto = (index: number) => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    setActivePhoto(index);
    scroller.scrollTo({ left: index * scroller.clientWidth, behavior: "smooth" });
  };

  const onPhotoScroll = () => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const next = Math.round(scroller.scrollLeft / Math.max(scroller.clientWidth, 1));
    setActivePhoto(Math.min(MOSAIC.length - 1, Math.max(0, next)));
  };

  return (
    <section id="o-apartmanu" className="px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-[1240px]">
        <div className="md:hidden">
          <SectionHeading kicker={copy.about.kicker} heading={copy.about.heading} />

          <div className="relative mt-6 overflow-hidden rounded-2xl shadow-xl shadow-forest/10">
            <div
              ref={scrollerRef}
              onScroll={onPhotoScroll}
              className="flex aspect-[16/10] snap-x snap-mandatory overflow-x-auto overflow-y-hidden overscroll-x-contain touch-pan-x [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {MOSAIC.map((src, i) => (
                <div key={src} className="relative h-full min-w-full shrink-0 snap-start [flex:0_0_100%]">
                  <Image
                    src={src}
                    alt={MOSAIC_ALTS[i]}
                    fill
                    draggable={false}
                    sizes="100vw"
                    className="pointer-events-none object-cover"
                  />
                </div>
              ))}
            </div>
            <span className="absolute top-3 left-3 rounded-full border border-gold/50 bg-forest/80 px-3 py-1 text-[0.62rem] font-semibold tracking-[0.14em] text-gold uppercase backdrop-blur-md">
              {copy.about.badge}
            </span>
            <div className="pointer-events-none absolute inset-x-0 bottom-3 flex justify-center gap-1.5">
              {MOSAIC.map((src, i) => (
                <button
                  key={src}
                  type="button"
                  aria-label={MOSAIC_ALTS[i]}
                  onClick={() => goToPhoto(i)}
                  className={`pointer-events-auto h-1.5 rounded-full transition-all ${
                    i === activePhoto ? "w-5 bg-gold" : "w-1.5 bg-cream/70"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {copy.about.pills.map((pill) => {
              const Icon = PILL_ICONS[pill.id];
              return (
                <span
                  key={pill.id}
                  className="inline-flex items-center gap-1.5 rounded-full border border-champagne/45 bg-cream px-3 py-1.5 text-[0.68rem] font-semibold text-forest shadow-sm"
                >
                  <Icon className="size-3.5 text-champagne" />
                  {pill.label}
                </span>
              );
            })}
          </div>

          <AboutCopy reveal className="mt-5 space-y-4 text-[0.95rem] leading-relaxed text-ink/80" />

          <LocationMark compact />
        </div>

        <div className="hidden items-center gap-10 md:grid lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-3 sm:gap-4"
          >
            <div className="relative col-span-2 aspect-[16/11] overflow-hidden rounded-3xl shadow-xl shadow-forest/10">
              <Image src={MOSAIC[0]} alt={MOSAIC_ALTS[0]} fill sizes="(max-width: 1024px) 100vw, 55vw" className="object-cover" />
            </div>
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl">
              <Image src={MOSAIC[1]} alt={MOSAIC_ALTS[1]} fill sizes="(max-width: 1024px) 50vw, 25vw" className="object-cover" />
            </div>
            <div className="relative -mt-8 aspect-[4/5] overflow-hidden rounded-3xl shadow-lg sm:-mt-12">
              <Image src={MOSAIC[2]} alt={MOSAIC_ALTS[2]} fill sizes="(max-width: 1024px) 50vw, 25vw" className="object-cover" />
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
            <AboutCopy className="mt-6 space-y-4 text-[0.98rem] leading-relaxed text-ink/80" />
            <LocationMark />
          </motion.article>
        </div>
      </div>
    </section>
  );
}
