"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { MessageSquare, Phone, User, Users } from "lucide-react";
import { copy } from "@/data/copy";
import { site } from "@/data/site";
import { getMockAvailability } from "@/data/mock-availability";
import { formatLongDate, nightsBetween, rangeHasBookedNight } from "@/lib/calendar";
import { formatInquiryMessage } from "@/lib/whatsapp";
import { RangeCalendar } from "@/components/ui/RangeCalendar";
import type { BookingReceipt } from "./BookingSuccessModal";

const fieldClass =
  "h-12 w-full rounded-2xl border border-forest/10 bg-white py-3 pr-4 pl-11 text-sm text-ink outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/25";

const btnPrimary =
  "btn-emerald-gold inline-flex h-11 w-full items-center justify-center rounded-full px-3 text-[0.65rem] font-semibold tracking-[0.1em] uppercase disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-35 sm:h-12 sm:text-[0.72rem]";

const btnGhost =
  "inline-flex h-11 w-full items-center justify-center rounded-full border border-sage/40 px-3 text-[0.65rem] font-semibold tracking-[0.1em] text-forest uppercase transition hover:bg-cream sm:h-12 sm:text-[0.72rem]";

type Props = {
  onSubmitted: (receipt: BookingReceipt) => void;
  onCancel: () => void;
};

type Step = 1 | 2;

export function BookingForm({ onSubmitted, onCancel }: Props) {
  const [step, setStep] = useState<Step>(1);
  const [checkIn, setCheckIn] = useState<string | null>(null);
  const [checkOut, setCheckOut] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [guests, setGuests] = useState(2);
  const [message, setMessage] = useState("");
  const [error, setError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const availability = getMockAvailability();

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [step]);

  const nights = checkIn && checkOut ? nightsBetween(checkIn, checkOut) : 0;
  const periodLabel =
    checkIn && checkOut
      ? `${formatLongDate(checkIn, copy.calendar.months)} — ${formatLongDate(checkOut, copy.calendar.months)}`
      : "";

  const canAdvanceDates = Boolean(checkIn && checkOut);
  const canSubmit =
    name.trim().length >= 2 && phone.trim().length >= 6 && guests >= 1 && guests <= site.capacity;

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!checkIn || !checkOut) {
      setStep(1);
      return;
    }
    if (rangeHasBookedNight(availability.booked, checkIn, checkOut)) {
      setError(copy.calendar.rangeBlocked);
      setStep(1);
      return;
    }
    if (!canSubmit) {
      setStep(2);
      return;
    }

    onSubmitted({
      apartmentName: site.legalName,
      period: periodLabel,
      guests,
      whatsappText: formatInquiryMessage({
        name: name.trim(),
        phone: phone.trim(),
        checkIn,
        checkOut,
        guests,
        message,
      }),
    });
  };

  const steps: { n: Step; label: string }[] = [
    { n: 1, label: copy.booking.stepDates },
    { n: 2, label: copy.booking.stepGuests },
  ];

  return (
    <form ref={formRef} onSubmit={onSubmit} className="flex min-h-full flex-col">
      <ol className="sticky top-0 z-20 grid w-full grid-cols-2 gap-2 border-b border-forest/8 bg-cream/95 px-3 py-2.5 backdrop-blur-md sm:px-6 sm:py-4">
        {steps.map((item) => {
          const active = step === item.n;
          const done = step > item.n;
          return (
            <li key={item.n} className="min-w-0">
              <button
                type="button"
                disabled={item.n > step}
                onClick={() => item.n < step && setStep(item.n)}
                className={`flex w-full min-w-0 items-center justify-center gap-2 rounded-full px-3 py-2.5 text-[0.65rem] font-semibold tracking-[0.12em] uppercase transition sm:text-[0.72rem] ${
                  active
                    ? "bg-forest text-gold shadow-sm"
                    : done
                      ? "bg-sage/15 text-forest"
                      : "bg-white text-muted"
                } disabled:cursor-default`}
              >
                <span
                  className={`grid size-5 shrink-0 place-items-center rounded-full text-[0.6rem] ${
                    active || done ? "bg-gold text-forest" : "bg-cream text-muted"
                  }`}
                >
                  {item.n}
                </span>
                <span className="truncate">{item.label}</span>
              </button>
            </li>
          );
        })}
      </ol>

      <div className="grid flex-1 gap-5 px-4 py-4 pb-2 sm:gap-6 sm:px-8 sm:py-6">
        {error ? (
          <p className="rounded-xl border border-red-400 bg-red-50 px-3 py-2 text-sm font-medium text-red-800" role="alert">
            {error}
          </p>
        ) : null}

        {step === 1 ? (
          <div>
            <RangeCalendar
              availability={availability}
              checkIn={checkIn}
              checkOut={checkOut}
              onChange={(start, end) => {
                setCheckIn(start);
                setCheckOut(end);
                setError(null);
              }}
            />
            {checkIn && checkOut ? (
              <div className="mt-5 rounded-2xl border border-gold/40 bg-gold/10 px-4 py-3">
                <p className="text-sm text-ink">
                  <span className="font-semibold">{copy.booking.selectedRange}:</span> {periodLabel} (
                  {nights} {nights === 1 ? copy.booking.night : copy.booking.nights})
                </p>
              </div>
            ) : null}
          </div>
        ) : null}

        {step === 2 ? (
          <div className="grid gap-4">
            <div className="rounded-2xl border border-gold/30 bg-gold/10 px-4 py-3 text-sm">
              <p className="font-semibold text-forest">{periodLabel}</p>
              <p className="mt-1 text-muted">
                {nights} {nights === 1 ? copy.booking.night : copy.booking.nights}
              </p>
            </div>
            <label className="block">
              <span className="mb-1.5 block text-[0.68rem] font-semibold tracking-[0.14em] text-muted uppercase">
                {copy.booking.name}
              </span>
              <span className="relative block">
                <User className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-gold" />
                <input className={fieldClass} autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} required />
              </span>
            </label>
            <label className="block">
              <span className="mb-1.5 block text-[0.68rem] font-semibold tracking-[0.14em] text-muted uppercase">
                {copy.booking.phone}
              </span>
              <span className="relative block">
                <Phone className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-gold" />
                <input
                  className={fieldClass}
                  type="tel"
                  autoComplete="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </span>
            </label>
            <label className="block">
              <span className="mb-1.5 block text-[0.68rem] font-semibold tracking-[0.14em] text-muted uppercase">
                {copy.booking.guests}
              </span>
              <span className="relative block">
                <Users className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-gold" />
                <input
                  className={fieldClass}
                  type="number"
                  min={1}
                  max={site.capacity}
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                />
              </span>
            </label>
            <label className="block">
              <span className="mb-1.5 block text-[0.68rem] font-semibold tracking-[0.14em] text-muted uppercase">
                {copy.booking.message}
              </span>
              <span className="relative block">
                <MessageSquare className="pointer-events-none absolute top-3.5 left-3.5 size-4 text-gold" />
                <textarea
                  rows={3}
                  placeholder={copy.booking.messageHint}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full rounded-2xl border border-forest/10 bg-white py-3 pr-4 pl-11 text-sm text-ink outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/25"
                />
              </span>
            </label>
          </div>
        ) : null}
      </div>

      <div className="sticky bottom-0 z-20 grid grid-cols-2 gap-2 border-t border-forest/8 bg-cream/95 px-4 py-3 backdrop-blur-md sm:px-8">
        {step === 1 ? (
          <>
            <button type="button" onClick={onCancel} className={btnGhost}>
              {copy.booking.cancel}
            </button>
            <button
              type="button"
              onClick={() => canAdvanceDates && setStep(2)}
              disabled={!canAdvanceDates}
              className={btnPrimary}
            >
              {copy.booking.next}
            </button>
          </>
        ) : (
          <>
            <button type="button" onClick={() => setStep(1)} className={btnGhost}>
              {copy.booking.back}
            </button>
            <button type="submit" disabled={!canSubmit} className={btnPrimary}>
              {copy.booking.submit}
            </button>
          </>
        )}
      </div>
    </form>
  );
}
