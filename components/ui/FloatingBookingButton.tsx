"use client";

import { Leaf } from "lucide-react";
import { motion } from "framer-motion";
import { useSite } from "@/components/providers/SiteProvider";
import { copy } from "@/data/copy";

export function FloatingBookingButton() {
  const { openBooking, bookingOpen } = useSite();

  if (bookingOpen) return null;

  return (
    <motion.button
      type="button"
      onClick={openBooking}
      aria-label={copy.booking.fab}
      className="btn-emerald-gold fixed right-5 bottom-[max(1.25rem,env(safe-area-inset-bottom))] z-40 inline-flex items-center gap-1.5 rounded-full px-4 py-2.5 text-[0.68rem] font-semibold tracking-[0.14em] uppercase"
      whileHover={{ scale: 1.05 }}
    >
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-full border border-gold"
        animate={{ scale: [1, 1.35, 1.35], opacity: [0.7, 0, 0] }}
        transition={{ repeat: Infinity, duration: 2.4, ease: "easeOut" }}
      />
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-full border border-gold/70"
        animate={{ scale: [1, 1.22, 1.22], opacity: [0.55, 0, 0] }}
        transition={{ repeat: Infinity, duration: 2.4, delay: 0.45, ease: "easeOut" }}
      />
      <span className="grid size-6 place-items-center rounded-full bg-gold text-forest">
        <Leaf className="size-3.5 fill-current" />
      </span>
      {copy.booking.fab}
    </motion.button>
  );
}
