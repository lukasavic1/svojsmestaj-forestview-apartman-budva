"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { gallery } from "@/data/media";
import { copy } from "@/data/copy";
import { fadeInUp, stagger } from "@/lib/motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GalleryLightbox } from "@/components/ui/GalleryLightbox";

const MOBILE_PREVIEW = 5;

export function GallerySection() {
  const [open, setOpen] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
  const extra = Math.max(0, gallery.length - MOBILE_PREVIEW);

  const openAt = (index: number) => {
    setStartIndex(index);
    setOpen(true);
  };

  return (
    <section id="galerija" className="px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-[1240px]">
        <SectionHeading kicker={copy.gallery.kicker} heading={copy.gallery.heading} lead={copy.gallery.lead} />

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-6% 0px" }}
          className="mt-8 grid grid-cols-2 gap-2 md:hidden"
        >
          {gallery.slice(0, MOBILE_PREVIEW).map((photo, i) => {
            const isMoreTile = i === MOBILE_PREVIEW - 1 && extra > 0;
            return (
              <motion.button
                key={photo.src}
                type="button"
                variants={fadeInUp}
                onClick={() => openAt(isMoreTile ? MOBILE_PREVIEW : i)}
                className={`group relative overflow-hidden rounded-2xl text-left shadow-sm ${
                  i === 0 ? "col-span-2 min-h-48" : "min-h-[7.5rem]"
                }`}
                aria-label={isMoreTile ? copy.gallery.more.replace("{n}", String(extra)) : `${copy.gallery.open}: ${photo.alt}`}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes={i === 0 ? "100vw" : "50vw"}
                  className="object-cover"
                />
                {i === 0 ? (
                  <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-forest/80 to-transparent p-3 text-xs text-cream">
                    {photo.alt}
                  </span>
                ) : null}
                {isMoreTile ? (
                  <span className="absolute inset-0 grid place-items-center bg-forest/65 backdrop-blur-[2px]">
                    <span className="rounded-full border border-gold/50 bg-forest/80 px-3 py-1.5 text-[0.68rem] font-semibold tracking-[0.14em] text-gold uppercase">
                      {copy.gallery.more.replace("{n}", String(extra))}
                    </span>
                  </span>
                ) : null}
              </motion.button>
            );
          })}
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-6% 0px" }}
          className="mt-10 hidden grid-cols-6 gap-4 md:grid"
        >
          {gallery.map((photo, i) => (
            <motion.button
              key={photo.src}
              type="button"
              variants={fadeInUp}
              onClick={() => openAt(i)}
              className={`group relative overflow-hidden rounded-3xl text-left shadow-sm ${
                i < 2 ? "col-span-3 min-h-[22rem]" : "col-span-2 min-h-56"
              }`}
              aria-label={`${copy.gallery.open}: ${photo.alt}`}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes={i < 2 ? "50vw" : "33vw"}
                className="object-cover transition duration-700 group-hover:scale-[1.04]"
              />
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-forest/80 to-transparent p-3 text-sm text-cream opacity-0 transition md:translate-y-2 md:group-hover:translate-y-0 md:group-hover:opacity-100">
                {photo.alt}
              </span>
            </motion.button>
          ))}
        </motion.div>
      </div>
      <GalleryLightbox
        open={open}
        title={copy.gallery.heading}
        photos={gallery}
        startIndex={startIndex}
        onClose={() => setOpen(false)}
      />
    </section>
  );
}
