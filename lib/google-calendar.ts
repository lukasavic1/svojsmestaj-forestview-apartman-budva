import "server-only";

import { google } from "googleapis";
import { bookedKey } from "@/lib/calendar";
import { AVAILABILITY_MONTHS, availabilityWindow } from "@/lib/availability";
import type { AvailabilityPayload } from "@/types/calendar";

const TIME_ZONE = "Europe/Podgorica";
const PLACEHOLDER_EMAIL = "your-service-account@";
const PLACEHOLDER_CALENDAR = "your_personal_calendar";

type Day = { year: number; month: number; day: number };

export function isGoogleCalendarConfigured(): boolean {
  const email = process.env.GOOGLE_CLIENT_EMAIL?.trim() ?? "";
  const key = process.env.GOOGLE_PRIVATE_KEY?.trim() ?? "";
  const calendarId = process.env.GOOGLE_CALENDAR_ID?.trim() ?? "";
  if (!email || !key || !calendarId) return false;
  if (email.includes(PLACEHOLDER_EMAIL)) return false;
  if (calendarId.includes(PLACEHOLDER_CALENDAR)) return false;
  return key.includes("BEGIN PRIVATE KEY");
}

function privateKey(): string {
  let key = process.env.GOOGLE_PRIVATE_KEY ?? "";
  key = key.trim();
  if ((key.startsWith('"') && key.endsWith('"')) || (key.startsWith("'") && key.endsWith("'"))) {
    key = key.slice(1, -1);
  }
  return key.replace(/\\n/g, "\n");
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

export async function fetchGoogleAvailability(unitId = "forest-view"): Promise<AvailabilityPayload> {
  const calendarId = process.env.GOOGLE_CALENDAR_ID!.trim();
  const auth = new google.auth.JWT({
    email: process.env.GOOGLE_CLIENT_EMAIL!.trim(),
    key: privateKey(),
    scopes: ["https://www.googleapis.com/auth/calendar.readonly"],
  });
  const calendar = google.calendar({ version: "v3", auth });
  const { first, last } = availabilityWindow(AVAILABILITY_MONTHS);

  const booked: Record<string, number[]> = {};
  const chunkStart = new Date(first.year, first.month, 1);
  const windowEnd = new Date(last.year, last.month + 1, 1);

  while (chunkStart < windowEnd) {
    const chunkEnd = new Date(chunkStart.getFullYear(), chunkStart.getMonth() + 2, 1);
    const timeMax = chunkEnd < windowEnd ? chunkEnd : windowEnd;

    const response = await calendar.freebusy.query({
      requestBody: {
        timeMin: chunkStart.toISOString(),
        timeMax: timeMax.toISOString(),
        timeZone: TIME_ZONE,
        items: [{ id: calendarId }],
      },
    });

    const cal = response.data.calendars?.[calendarId];
    if (cal?.errors?.length) {
      const reason = cal.errors.map((item) => item.reason).filter(Boolean).join(", ");
      throw new Error(reason || "Google Calendar freebusy error");
    }

    for (const slot of cal?.busy ?? []) {
      if (!slot.start || !slot.end) continue;
      markBusyInterval(booked, slot.start, slot.end);
    }

    chunkStart.setTime(timeMax.getTime());
  }

  for (const key of Object.keys(booked)) {
    booked[key].sort((a, b) => a - b);
  }

  return { unitId, fullyBooked: false, booked, first, last, source: "google" };
}
