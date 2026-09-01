import "server-only";

import ical, { type VEvent } from "node-ical";
import { bookedKey } from "@/lib/calendar";
import { AVAILABILITY_MONTHS, availabilityWindow } from "@/lib/availability";
import type { AvailabilityPayload } from "@/types/calendar";

const TIME_ZONE = "Europe/Podgorica";
const PLACEHOLDER_ICS = "your-secret-ical";

type Day = { year: number; month: number; day: number };

function env(name: string): string {
  return process.env[name]?.trim() ?? "";
}

export function isGoogleCalendarConfigured(): boolean {
  const url = env("CALENDAR_ICS_URL");
  if (!url || url.includes(PLACEHOLDER_ICS)) return false;
  return url.startsWith("https://");
}

function ymdInZone(iso: string): Day {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: TIME_ZONE,
    year: "numeric",
    month: "numeric",
    day: "numeric",
  }).formatToParts(new Date(iso));
  const num = (type: Intl.DateTimeFormatPartTypes) =>
    Number(parts.find((part) => part.type === type)?.value);
  return { year: num("year"), month: num("month") - 1, day: num("day") };
}

function addUtcDays(day: Day, delta: number): Day {
  const next = new Date(Date.UTC(day.year, day.month, day.day + delta));
  return { year: next.getUTCFullYear(), month: next.getUTCMonth(), day: next.getUTCDate() };
}

function cmpDay(a: Day, b: Day): number {
  if (a.year !== b.year) return a.year - b.year;
  if (a.month !== b.month) return a.month - b.month;
  return a.day - b.day;
}

function markDay(booked: Record<string, number[]>, day: Day) {
  const key = bookedKey(day.year, day.month);
  const list = booked[key] ?? [];
  if (!list.includes(day.day)) {
    list.push(day.day);
    booked[key] = list;
  }
}

/** Inclusive start date, exclusive end date (Google all-day / checkout-morning). Same-day blocks that day. */
export function markBusyInterval(booked: Record<string, number[]>, startIso: string, endIso: string) {
  const start = ymdInZone(startIso);
  const end = ymdInZone(endIso);
  if (cmpDay(start, end) >= 0) {
    markDay(booked, start);
    return;
  }
  for (let cursor = start; cmpDay(cursor, end) < 0; cursor = addUtcDays(cursor, 1)) {
    markDay(booked, cursor);
  }
}

function pad(value: number) {
  return String(value).padStart(2, "0");
}

function allDayNoonUtc(date: Date) {
  return `${date.getUTCFullYear()}-${pad(date.getUTCMonth() + 1)}-${pad(date.getUTCDate())}T12:00:00.000Z`;
}

function occurrenceIso(start: Date, end: Date, allDay: boolean) {
  if (allDay) return { start: allDayNoonUtc(start), end: allDayNoonUtc(end) };
  return { start: start.toISOString(), end: end.toISOString() };
}

function isBusyEvent(event: VEvent) {
  if (event.type !== "VEVENT") return false;
  if (event.status === "CANCELLED") return false;
  if (event.transparency === "TRANSPARENT") return false;
  return Boolean(event.start);
}

export async function fetchGoogleAvailability(unitId = "forest-view"): Promise<AvailabilityPayload> {
  const icsUrl = env("CALENDAR_ICS_URL");
  const { first, last } = availabilityWindow(AVAILABILITY_MONTHS);
  const windowStart = new Date(first.year, first.month, 1);
  const windowEnd = new Date(last.year, last.month + 1, 1);

  let response: Response;
  try {
    response = await fetch(icsUrl, {
      cache: "no-store",
      headers: { "User-Agent": "SvojSmestajCalendar/1.0" },
      signal: AbortSignal.timeout(15000),
    });
  } catch {
    throw new Error("Could not download the calendar iCal feed.");
  }

  if (!response.ok) {
    throw new Error(`Calendar iCal feed returned ${response.status}. Check CALENDAR_ICS_URL.`);
  }

  const body = await response.text();
  if (!body.includes("BEGIN:VCALENDAR")) {
    throw new Error("CALENDAR_ICS_URL did not return an iCal calendar. Use the secret iCal address from Google Calendar.");
  }

  const parsed = ical.parseICS(body);
  const booked: Record<string, number[]> = {};

  for (const item of Object.values(parsed)) {
    if (!item || item.type !== "VEVENT") continue;
    const event = item as VEvent;
    if (event.recurrenceid) continue;
    if (!isBusyEvent(event)) continue;

    const instances = ical.expandRecurringEvent(event, {
      from: windowStart,
      to: windowEnd,
      expandOngoing: true,
    });

    for (const instance of instances) {
      if (!isBusyEvent(instance.event)) continue;
      const allDay = instance.isFullDay;
      if (!allDay) {
        const startDay = ymdInZone(instance.start.toISOString());
        const endDay = ymdInZone(instance.end.toISOString());
        if (cmpDay(endDay, startDay) <= 0) continue;
      }
      const iso = occurrenceIso(instance.start, instance.end, allDay);
      markBusyInterval(booked, iso.start, iso.end);
    }
  }

  for (const key of Object.keys(booked)) {
    booked[key].sort((a, b) => a - b);
  }

  return { unitId, fullyBooked: false, booked, first, last, source: "google" };
}
