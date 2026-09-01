import { NextResponse } from "next/server";
import { Resend } from "resend";
import { site } from "@/data/site";
import { nightsBetween, parseIsoDate, rangeHasBookedNight } from "@/lib/calendar";
import { fetchGoogleAvailability, isGoogleCalendarConfigured } from "@/lib/google-calendar";
import {
  hostInquiryHtml,
  hostInquirySubject,
  hostInquiryText,
  type HostInquiry,
} from "@/lib/inquiry-email";

export const dynamic = "force-dynamic";

function env(name: string) {
  return process.env[name]?.trim() ?? "";
}

function asInquiry(body: unknown): HostInquiry | null {
  if (!body || typeof body !== "object") return null;
  const data = body as Record<string, unknown>;
  const name = typeof data.name === "string" ? data.name.trim() : "";
  const phone = typeof data.phone === "string" ? data.phone.trim() : "";
  const checkIn = typeof data.checkIn === "string" ? data.checkIn.trim() : "";
  const checkOut = typeof data.checkOut === "string" ? data.checkOut.trim() : "";
  const guests = typeof data.guests === "number" ? data.guests : Number(data.guests);
  const message = typeof data.message === "string" ? data.message.trim() : "";

  if (name.length < 2 || name.length > 120) return null;
  if (phone.length < 6 || phone.length > 40) return null;
  if (!parseIsoDate(checkIn) || !parseIsoDate(checkOut)) return null;
  if (!Number.isInteger(guests) || guests < 1 || guests > site.capacity) return null;
  if (nightsBetween(checkIn, checkOut) < site.minNights) return null;
  if (message.length > 2000) return null;

  return { name, phone, checkIn, checkOut, guests, message };
}

export async function POST(request: Request) {
  const apiKey = env("RESEND_API_KEY");
  const hostEmail = env("HOST_EMAIL");
  const from = env("RESEND_FROM") || "Forest View Budva <onboarding@resend.dev>";

  if (!apiKey || !hostEmail) {
    console.error("[inquiry] Missing RESEND_API_KEY or HOST_EMAIL");
    return NextResponse.json({ error: "mail_unconfigured" }, { status: 503 });
  }

  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const inquiry = asInquiry(raw);
  if (!inquiry) {
    return NextResponse.json({ error: "invalid_inquiry" }, { status: 400 });
  }

  if (isGoogleCalendarConfigured()) {
    try {
      const availability = await fetchGoogleAvailability();
      if (rangeHasBookedNight(availability.booked, inquiry.checkIn, inquiry.checkOut)) {
        return NextResponse.json({ error: "range_blocked" }, { status: 409 });
      }
    } catch (error) {
      console.error("[inquiry] availability", error instanceof Error ? error.message : error);
    }
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to: hostEmail,
      subject: hostInquirySubject(inquiry),
      html: hostInquiryHtml(inquiry),
      text: hostInquiryText(inquiry),
    });

    if (error) {
      console.error("[inquiry] resend", error.message);
      return NextResponse.json({ error: "mail_failed" }, { status: 502 });
    }
  } catch (error) {
    console.error("[inquiry]", error instanceof Error ? error.message : error);
    return NextResponse.json({ error: "mail_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
