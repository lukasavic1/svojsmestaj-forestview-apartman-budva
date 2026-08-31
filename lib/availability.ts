import type { YearMonth } from "@/types/calendar";

export function availabilityWindow(months = 12): {
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
