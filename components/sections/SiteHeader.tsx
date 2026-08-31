"use client";

import { useCallback, useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useIsClient } from "@/hooks/useIsClient";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";
import { useSite } from "@/components/providers/SiteProvider";
import { LeafMark } from "@/components/ui/LeafMark";
import { copy } from "@/data/copy";
import { site } from "@/data/site";

function subscribeScroll(onStoreChange: () => void) {
  window.addEventListener("scroll", onStoreChange, { passive: true });
  return () => window.removeEventListener("scroll", onStoreChange);
}

const NAV = [
  { href: "#o-apartmanu", label: copy.nav.about },
  { href: "#pogodnosti", label: copy.nav.amenities },
  { href: "#galerija", label: copy.nav.gallery },
  { href: "#plaze", label: copy.nav.beaches },
  { href: "#lokacija", label: copy.nav.location },
  { href: "#recenzije", label: copy.nav.reviews },
  { href: "#kontakt", label: copy.nav.contact },
] as const;

export function SiteHeader() {
  const { openBooking } = useSite();
  const mounted = useIsClient();
  const stuck = useSyncExternalStore(
    subscribeScroll,
    () => window.scrollY > 18,
    () => false
  );
  const [menuOpen, setMenuOpen] = useState(false);
  const menuId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  useBodyScrollLock(menuOpen);

  useEffect(() => {
    if (!menuOpen) return;
    closeRef.current?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        stuck
          ? "border-b border-forest/10 bg-cream/80 shadow-[0_12px_40px_rgba(27,59,43,0.08)] backdrop-blur-xl"
          : "bg-cream/55 backdrop-blur-md"
      }`}
    >
      <div className="mx-auto flex h-[4.5rem] w-full max-w-[1240px] items-center justify-between gap-3 px-4 sm:h-[4.75rem] sm:px-6 lg:px-8">
        <a href="#top" className="group flex min-w-0 items-center gap-3">
          <LeafMark className="size-10 shrink-0 transition group-hover:scale-105" />
          <span className="min-w-0">
            <span className="block truncate font-heading text-[1.22rem] leading-none tracking-tight text-forest sm:text-[1.38rem]">
              {site.name}
            </span>
            <span className="mt-1 block text-[0.62rem] tracking-[0.2em] text-sage uppercase">
              Dubovica · Crna Gora
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-4 2xl:gap-6 xl:flex" aria-label="Primary">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-[0.72rem] font-semibold tracking-[0.14em] text-ink/65 uppercase transition hover:text-forest"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <motion.button
            type="button"
            onClick={openBooking}
            className="btn-emerald-gold gold-glow hidden h-11 items-center rounded-full px-5 text-[0.68rem] font-semibold tracking-[0.16em] uppercase md:inline-flex"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.98 }}
            animate={{
              boxShadow: [
                "0 0 0 1px rgba(212,175,55,0.45), 0 8px 22px rgba(27,59,43,0.16)",
                "0 0 0 1px rgba(212,175,55,0.8), 0 10px 28px rgba(212,175,55,0.28)",
                "0 0 0 1px rgba(212,175,55,0.45), 0 8px 22px rgba(27,59,43,0.16)",
              ],
            }}
            transition={{ repeat: Infinity, duration: 3.4, repeatDelay: 1.4 }}
          >
            {copy.nav.book}
          </motion.button>
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-full text-forest xl:hidden"
            aria-expanded={menuOpen}
            aria-controls={menuId}
            aria-label={copy.nav.menu}
            onClick={() => setMenuOpen(true)}
          >
            <Menu className="size-6" />
          </button>
        </div>
      </div>

      {mounted
        ? createPortal(
            <AnimatePresence>
              {menuOpen ? (
                <motion.div
                  id={menuId}
                  className="fixed inset-0 z-[70] bg-forest text-cream xl:hidden"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="flex h-[4.5rem] items-center justify-between px-4">
                    <span className="inline-flex items-center gap-2 font-heading text-xl">
                      <LeafMark className="size-9" />
                      {site.name}
                    </span>
                    <button
                      ref={closeRef}
                      type="button"
                      aria-label={copy.nav.close}
                      onClick={closeMenu}
                      className="grid size-11 place-items-center"
                    >
                      <X className="size-6" />
                    </button>
                  </div>
                  <nav className="flex flex-col gap-1 px-6 pt-6">
                    {NAV.map((item, i) => (
                      <motion.a
                        key={item.href}
                        href={item.href}
                        onClick={closeMenu}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.05 * i }}
                        className="border-b border-white/10 py-4 font-heading text-3xl"
                      >
                        {item.label}
                      </motion.a>
                    ))}
                  </nav>
                  <div className="mt-8 px-6">
                    <button
                      type="button"
                      onClick={() => {
                        closeMenu();
                        openBooking();
                      }}
                      className="btn-emerald-gold gold-glow inline-flex h-12 w-full items-center justify-center rounded-full font-semibold tracking-[0.16em] uppercase"
                    >
                      {copy.nav.book}
                    </button>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>,
            document.body
          )
        : null}
    </header>
  );
}
