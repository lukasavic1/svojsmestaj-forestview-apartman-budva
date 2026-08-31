"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { easeOutExpo } from "@/lib/motion";
import { useIsClient } from "@/hooks/useIsClient";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";

type ModalProps = {
  open: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
  closeLabel: string;
  titleHidden?: boolean;
  wide?: boolean;
};

export function Modal({
  open,
  title,
  onClose,
  children,
  closeLabel,
  titleHidden = false,
  wide = false,
}: ModalProps) {
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const mounted = useIsClient();
  const [present, setPresent] = useState(open);
  if (open && !present) setPresent(true);
  useBodyScrollLock(open);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!mounted || !present) return null;

  return createPortal(
    <div
      className={`fixed inset-0 z-[100] flex items-end justify-center sm:items-center sm:p-6 ${
        open ? "" : "pointer-events-none"
      }`}
      aria-hidden={!open}
    >
      <motion.button
        type="button"
        aria-label={closeLabel}
        initial={false}
        animate={{ opacity: open ? 1 : 0 }}
        transition={{ duration: 0.15 }}
        className="absolute inset-0 bg-forest-deep/50"
        onClick={onClose}
        tabIndex={open ? 0 : -1}
      />
      <motion.div
        role="dialog"
        aria-modal={open}
        inert={!open ? true : undefined}
        aria-labelledby={titleId}
        initial={false}
        animate={{ opacity: open ? 1 : 0, y: open ? 0 : 10 }}
        transition={{ duration: 0.18, ease: easeOutExpo }}
        className={`relative z-10 flex max-h-[92dvh] w-full min-h-0 flex-col overflow-hidden rounded-t-3xl bg-cream shadow-xl shadow-forest/20 sm:rounded-3xl ${
          wide ? "sm:max-w-5xl" : "sm:max-w-xl"
        }`}
      >
        <div className="flex shrink-0 items-center justify-between gap-4 border-b border-forest/8 px-5 py-4 sm:px-7">
          <h2 id={titleId} className={`font-heading text-2xl text-ink ${titleHidden ? "sr-only" : ""}`}>
            {title}
          </h2>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label={closeLabel}
            className="inline-flex size-11 items-center justify-center rounded-full text-ink/70 transition hover:bg-white hover:text-ink"
          >
            <X className="size-5" />
          </button>
        </div>
        <div data-modal-scroll className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
          {children}
        </div>
      </motion.div>
    </div>,
    document.body
  );
}
