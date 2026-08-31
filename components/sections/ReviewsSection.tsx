"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { BadgeCheck, ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { reviews } from "@/data/content";
import { copy } from "@/data/copy";
import { site } from "@/data/site";
import { fadeInUp, stagger } from "@/lib/motion";
import { useSwipeIndex } from "@/hooks/useSwipeIndex";
import { SectionHeading } from "@/components/ui/SectionHeading";

const PAGE_SIZE = 3;

function flagEmoji(code?: string) {
  if (!code) return "";
  if (code === "XK") return "🇽🇰";
  return [...code.toUpperCase()]
    .map((char) => String.fromCodePoint(127397 + char.charCodeAt(0)))
    .join("");
}

function ReviewCard({ review }: { review: (typeof reviews)[number] }) {
  const initial = review.name.slice(0, 1).toUpperCase();

  return (
    <motion.article
      variants={fadeInUp}
      className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-forest/8 bg-white/80 p-6 shadow-lg shadow-forest/6"
    >
      <Quote className="pointer-events-none absolute top-5 right-5 size-10 text-gold/25" />
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="grid size-12 place-items-center rounded-full bg-forest font-heading text-lg text-gold">
            {initial}
          </span>
          <div>
            <p className="flex items-center gap-1.5 font-semibold text-ink">
              {review.name}
              <span className="text-base leading-none" aria-hidden="true">
                {flagEmoji(review.country)}
              </span>
            </p>
            <p className="text-xs text-muted">{review.date}</p>
          </div>
        </div>
        <span className="shrink-0 rounded-full border border-gold/40 bg-forest px-3 py-1 text-xs font-bold text-gold">
          {review.rating.toFixed(1)} / 10
        </span>
      </div>
      <p className="mt-5 max-w-[36ch] flex-1 text-[0.95rem] leading-relaxed text-ink/85">“{review.quote}”</p>
      <p className="mt-5 inline-flex items-center gap-1.5 text-[0.68rem] font-semibold tracking-[0.08em] text-sage uppercase">
        <BadgeCheck className="size-3.5" />
        {copy.reviews.verified}
      </p>
    </motion.article>
  );
}

export function ReviewsSection() {
  const [page, setPage] = useState(0);
  const desktopRef = useRef<HTMLDivElement>(null);
  const pages = Math.ceil(reviews.length / PAGE_SIZE);
  const visible = useMemo(
    () => reviews.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE),
    [page]
  );

  const step = useCallback((dir: 1 | -1) => setPage((i) => (i + dir + pages) % pages), [pages]);

  useSwipeIndex(desktopRef, { count: pages, onSwipe: step });

  return (
    <section id="recenzije" className="bg-warm/50 px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-[1240px]">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading kicker={copy.reviews.kicker} heading={copy.reviews.heading} lead={copy.reviews.lead} />
          <div className="shrink-0 rounded-3xl bg-forest px-7 py-6 text-cream shadow-xl shadow-forest/25">
            <p className="text-[0.68rem] font-semibold tracking-[0.16em] text-gold uppercase">Booking.com</p>
            <p className="mt-1 font-heading text-5xl text-gold">
              {site.rating.bookingScore}
              <span className="ml-1 text-lg text-cream/70">/ 10</span>
            </p>
            <div className="mt-2 flex gap-1 text-gold">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-4 fill-current" />
              ))}
            </div>
            <p className="mt-2 text-sm font-semibold tracking-wide text-cream">{copy.reviews.badge}</p>
            <p className="mt-2 max-w-[16rem] text-xs leading-relaxed text-cream/65">
              {copy.reviews.basedOn.replace("{n}", String(site.rating.count))}
            </p>
          </div>
        </div>

        <div className="mt-10 flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory lg:hidden">
          {reviews.map((review) => (
            <div key={review.id} className="w-[min(85vw,22rem)] shrink-0 snap-start">
              <ReviewCard review={review} />
            </div>
          ))}
        </div>

        <div ref={desktopRef} className="relative mt-10 hidden lg:block">
          <motion.div
            key={page}
            variants={stagger}
            initial="hidden"
            animate="show"
            className="grid gap-6 lg:grid-cols-3"
          >
            {visible.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </motion.div>
          <button
            type="button"
            aria-label={copy.reviews.prev}
            onClick={() => step(-1)}
            className="absolute top-1/2 -left-3 z-10 grid size-12 -translate-y-1/2 cursor-pointer place-items-center rounded-full border-2 border-gold bg-white text-forest shadow-lg shadow-forest/20 transition hover:scale-105 hover:bg-forest hover:text-gold active:scale-95 xl:-left-5"
          >
            <ChevronLeft className="size-5" strokeWidth={2.4} />
          </button>
          <button
            type="button"
            aria-label={copy.reviews.next}
            onClick={() => step(1)}
            className="absolute top-1/2 -right-3 z-10 grid size-12 -translate-y-1/2 cursor-pointer place-items-center rounded-full border-2 border-gold bg-forest text-gold shadow-lg shadow-forest/25 transition hover:scale-105 hover:bg-sage active:scale-95 xl:-right-5"
          >
            <ChevronRight className="size-5" strokeWidth={2.4} />
          </button>
        </div>

        <div className="mt-8 hidden items-center justify-center gap-3 lg:flex">
          {Array.from({ length: pages }).map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`${copy.reviews.next} ${i + 1}`}
              onClick={() => setPage(i)}
              className={`h-2.5 cursor-pointer rounded-full transition-all ${
                i === page ? "w-8 bg-forest" : "w-2.5 bg-forest/25 hover:bg-forest/50"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
