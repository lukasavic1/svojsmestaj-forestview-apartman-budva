"use client";

import { useEffect, useMemo, useState } from "react";
import type { AvailabilityPayload, YearMonth } from "@/types/calendar";
import {
  asMonthIndex,
  compareIso,
  daysInMonth,
  isDayBooked,
  isInRange,
  isRangeEndpoint,
  mondayOffset,
  nightsBetween,
  rangeHasBookedNight,
  shiftMonth,
  toIsoDate,
  todayIso,
} from "@/lib/calendar";
import { copy } from "@/data/copy";
import { site } from "@/data/site";

type Props = {
  availability: AvailabilityPayload;
  checkIn: string | null;
  checkOut: string | null;
  onChange: (checkIn: string | null, checkOut: string | null) => void;
};

function MonthGrid({
  year,
  month,
  availability,
  checkIn,
  checkOut,
  today,
  labelledBy,
  onPick,
}: {
  year: number;
  month: number;
  availability: AvailabilityPayload;
  checkIn: string | null;
  checkOut: string | null;
  today: string;
  labelledBy: string;
  onPick: (iso: string, booked: boolean) => void;
}) {
  const totalDays = daysInMonth(year, month);
  const offset = mondayOffset(year, month);
  const trailing = 42 - offset - totalDays;

  return (
    <div>
      <h3 id={labelledBy} className="mb-3 font-heading text-xl text-ink">
        {copy.calendar.months[month]} {year}.
      </h3>
      <div className="grid grid-cols-7 gap-1.5" role="grid" aria-labelledby={labelledBy}>
        {copy.calendar.days.map((d, i) => (
          <div
            className="pb-1 text-center text-[0.68rem] font-semibold tracking-wide text-muted uppercase"
            role="columnheader"
            key={`${labelledBy}-${d}-${i}`}
          >
            {d}
          </div>
        ))}
        {Array.from({ length: offset }, (_, i) => (
          <div key={`${labelledBy}-e-${i}`} className="min-h-11 sm:min-h-12" />
        ))}
        {Array.from({ length: totalDays }, (_, i) => {
          const day = i + 1;
          const iso = toIsoDate(year, month, day);
          const booked = isDayBooked(availability.booked, year, month, day);
          const past = compareIso(iso, today) < 0;
          const disabled = booked || past;
          const inRange = isInRange(iso, checkIn, checkOut);
          const endpoint = isRangeEndpoint(iso, checkIn, checkOut);

          return (
            <button
              key={iso}
              type="button"
              role="gridcell"
              disabled={disabled}
              aria-label={`${day}. ${copy.calendar.months[month]} — ${
                booked ? copy.calendar.busy : copy.calendar.free
              }`}
              onClick={() => onPick(iso, booked)}
              className={`grid min-h-11 w-full place-items-center rounded-xl text-sm font-semibold transition sm:min-h-12 ${
                booked
                  ? "cursor-not-allowed bg-slate-100 text-slate-400 line-through"
                  : past
                    ? "cursor-not-allowed text-slate-300"
                    : endpoint
                      ? "bg-forest text-white shadow-sm"
                      : inRange
                        ? "bg-forest/10 text-forest"
                        : "border border-emerald-200 bg-emerald-50 text-emerald-900 hover:bg-emerald-100"
              }`}
            >
              {day}
            </button>
          );
        })}
        {Array.from({ length: Math.max(0, trailing) }, (_, i) => (
          <div key={`${labelledBy}-t-${i}`} className="min-h-11 sm:min-h-12" />
        ))}
      </div>
    </div>
  );
}

export function RangeCalendar({ availability, checkIn, checkOut, onChange }: Props) {
  const [cursor, setCursor] = useState<YearMonth>(availability.first);
  const [error, setError] = useState<string | null>(null);
  const today = todayIso();

  useEffect(() => {
    setCursor(availability.first);
    setError(null);
  }, [availability.unitId, availability.first.year, availability.first.month]);

  const nextMonth = shiftMonth(cursor, 1);
  const atFirst =
    asMonthIndex(cursor.year, cursor.month) <=
    asMonthIndex(availability.first.year, availability.first.month);
  const atLast =
    asMonthIndex(cursor.year, cursor.month) >=
    asMonthIndex(availability.last.year, availability.last.month);
  const showSecond =
    asMonthIndex(nextMonth.year, nextMonth.month) <=
    asMonthIndex(availability.last.year, availability.last.month);

  const hint = useMemo(() => {
    if (error) return error;
    if (!checkIn) return copy.calendar.selectCheckIn;
    if (!checkOut) return copy.calendar.selectCheckOut;
    return copy.calendar.rangeSet;
  }, [checkIn, checkOut, error]);

  const pick = (iso: string, booked: boolean) => {
    if (booked || compareIso(iso, today) < 0) return;

    if (!checkIn || (checkIn && checkOut)) {
      onChange(iso, null);
      setError(null);
      return;
    }

    if (compareIso(iso, checkIn) <= 0) {
      onChange(iso, null);
      setError(null);
      return;
    }

    if (rangeHasBookedNight(availability.booked, checkIn, iso)) {
      setError(copy.calendar.rangeBlocked);
      return;
    }

    if (nightsBetween(checkIn, iso) < site.minNights) {
      setError(copy.calendar.minStay);
      return;
    }

    onChange(checkIn, iso);
    setError(null);
  };

  return (
    <div className="w-full rounded-3xl border border-slate-200/70 bg-white/80 p-4 sm:p-6">
      <div className="mb-4 flex items-center justify-end gap-2">
        <button
          type="button"
          onClick={() => setCursor(shiftMonth(cursor, -1))}
          disabled={atFirst}
          aria-label={copy.calendar.prevMonth}
          className="grid size-10 place-items-center rounded-full border border-forest/10 text-lg text-ink disabled:opacity-30"
        >
          ‹
        </button>
        <button
          type="button"
          onClick={() => setCursor(shiftMonth(cursor, 1))}
          disabled={atLast}
          aria-label={copy.calendar.nextMonth}
          className="grid size-10 place-items-center rounded-full border border-forest/10 text-lg text-ink disabled:opacity-30"
        >
          ›
        </button>
      </div>

      <p
        className={`mb-4 min-h-[2.75rem] rounded-xl border px-3 py-2 text-sm font-medium ${
          error
            ? "border-red-400 bg-red-50 text-red-800"
            : "border-gold/60 bg-gold/12 text-ink"
        }`}
        role={error ? "alert" : undefined}
      >
        {hint}
      </p>

      <div className="grid gap-8 lg:grid-cols-2">
        <MonthGrid
          year={cursor.year}
          month={cursor.month}
          availability={availability}
          checkIn={checkIn}
          checkOut={checkOut}
          today={today}
          labelledBy="range-cal-month-a"
          onPick={pick}
        />
        {showSecond ? (
          <div className="hidden lg:block">
            <MonthGrid
              year={nextMonth.year}
              month={nextMonth.month}
              availability={availability}
              checkIn={checkIn}
              checkOut={checkOut}
              today={today}
              labelledBy="range-cal-month-b"
              onPick={pick}
            />
          </div>
        ) : null}
      </div>

      <div className="mt-5 flex flex-wrap gap-5 text-xs text-muted">
        <span className="inline-flex items-center gap-1.5">
          <i className="size-3 rounded-md border border-emerald-200 bg-emerald-50" aria-hidden="true" />
          {copy.calendar.free}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <i className="size-3 rounded-md bg-slate-100" aria-hidden="true" />
          {copy.calendar.busy}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <i className="size-3 rounded-md bg-forest" aria-hidden="true" />
          {copy.calendar.selected}
        </span>
      </div>

      <div className="mt-3 min-h-5">
        {checkIn || checkOut ? (
          <button
            type="button"
            className="text-xs font-semibold tracking-wide text-forest uppercase underline-offset-2 hover:underline"
            onClick={() => {
              onChange(null, null);
              setError(null);
            }}
          >
            {copy.calendar.clearDates}
          </button>
        ) : null}
      </div>
    </div>
  );
}
