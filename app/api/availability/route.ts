import { NextResponse } from "next/server";
import { emptyAvailability } from "@/lib/availability";
import { fetchGoogleAvailability, isGoogleCalendarConfigured } from "@/lib/google-calendar";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!isGoogleCalendarConfigured()) {
    return NextResponse.json(
      { ...emptyAvailability(), source: "mock" },
      { headers: { "Cache-Control": "no-store" } },
    );
  }

  try {
    const availability = await fetchGoogleAvailability();
    return NextResponse.json(availability, {
      headers: { "Cache-Control": "private, max-age=60" },
    });
  } catch (error) {
    console.error("[availability]", error instanceof Error ? error.message : error);
    return NextResponse.json({ error: "calendar_unavailable" }, { status: 503 });
  }
}
