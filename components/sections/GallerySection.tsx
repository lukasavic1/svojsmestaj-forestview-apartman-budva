"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { gallery } from "@/data/media";
import { copy } from "@/data/copy";
import { fadeInUp, stagger } from "@/lib/motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GalleryLightbox } from "@/components/ui/GalleryLightbox";

export function GallerySection() {
  const [open, setOpen] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
  const featured = gallery.slice(0, 2);
  const rest = gallery.slice(2);

  return (
    <section id="galerija" className="px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-[1240px]">
        <SectionHeading kicker={copy.gallery.kicker} heading={copy.gallery.heading} lead={copy.gallery.lead} />
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-6% 0px" }}
          className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-6 md:gap-4"
        >
          {featured.map((photo, i) => (
            <motion.button
              key={photo.src}
              type="button"
              variants={fadeInUp}
              onClick={() => {
                setStartIndex(i);
                setOpen(true);
              }}
              className="group relative col-span-2 min-h-52 overflow-hidden rounded-3xl text-left shadow-sm md:col-span-3 md:min-h-[22rem]"
              aria-label={`${copy.gallery.open}: ${photo.alt}`}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition duration-700 group-hover:scale-[1.04]"
              />
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-forest/80 to-transparent p-3 text-xs text-cream md:text-sm">
                {photo.alt}
              </span>
            </motion.button>
          ))}
          {rest.map((photo, i) => (
            <motion.button
              key={photo.src}
              type="button"
              variants={fadeInUp}
              onClick={() => {
                setStartIndex(i + featured.length);
                setOpen(true);
              }}
              className="group relative min-h-44 overflow-hidden rounded-3xl text-left shadow-sm last:col-span-2 md:col-span-2 md:min-h-56"
              aria-label={`${copy.gallery.open}: ${photo.alt}`}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                className="object-cover transition duration-700 group-hover:scale-[1.04]"
              />
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-forest/80 to-transparent p-3 text-xs text-cream opacity-100 transition md:translate-y-2 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100">
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
