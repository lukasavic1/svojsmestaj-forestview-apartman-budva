import type { AvailabilityPayload, YearMonth } from "@/types/calendar";

export const AVAILABILITY_MONTHS = 12;

export function availabilityWindow(months = AVAILABILITY_MONTHS): {
  first: YearMonth;
  last: YearMonth;
} {
  const now = new Date();
  const first = { year: now.getFullYear(), month: now.getMonth() };
  const lastDate = new Date(now.getFullYear(), now.getMonth() + months - 1, 1);
  return {
    first,
    last: { year: lastDate.getFullYear(), month: lastDate.getMonth() },
  };
}

export function emptyAvailability(unitId = "forest-view"): AvailabilityPayload {
  const { first, last } = availabilityWindow();
  return { unitId, fullyBooked: false, booked: {}, first, last };
}
