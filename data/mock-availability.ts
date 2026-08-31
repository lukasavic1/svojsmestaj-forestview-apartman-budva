import { bookedKey } from "@/lib/calendar";
import { availabilityWindow } from "@/lib/availability";
import type { AvailabilityPayload } from "@/types/calendar";

function seed(id: string): number {
  let h = 0;
  for (let i = 0; i < id.length; i += 1) h = (h * 33 + id.charCodeAt(i)) >>> 0;
  return h;
}

export function getMockAvailability(unitId = "forest-view"): AvailabilityPayload {
  const { first, last } = availabilityWindow(8);
  const s = seed(unitId);
  const booked: Record<string, number[]> = {};

  for (let m = 0; m < 8; m += 1) {
    const cursor = new Date(first.year, first.month + m, 1);
    const year = cursor.getFullYear();
    const month = cursor.getMonth();
    const dim = new Date(year, month + 1, 0).getDate();
    const days: number[] = [];
    const startA = 4 + ((s + m * 7) % 8);
    const lenA = 2 + ((s + m) % 3);
    const startB = 18 + ((s + m * 5) % 5);
    const lenB = 2 + ((s + m * 3) % 3);
    for (let d = startA; d < startA + lenA && d <= dim; d += 1) days.push(d);
    for (let d = startB; d < startB + lenB && d <= dim; d += 1) days.push(d);
    booked[bookedKey(year, month)] = days;
  }

  return { unitId, fullyBooked: false, booked, first, last };
}
