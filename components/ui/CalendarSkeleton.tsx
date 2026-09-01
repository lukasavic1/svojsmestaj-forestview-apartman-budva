import { copy } from "@/data/copy";

export function CalendarSkeleton() {
  return (
    <div
      className="relative w-full overflow-hidden rounded-3xl border border-slate-200/70 bg-white/80 p-4 sm:p-6"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <span className="sr-only">{copy.calendar.loading}</span>

      <div className="mb-4 flex items-center justify-end gap-2">
        <span className="size-10 rounded-full border border-forest/10 bg-forest/[0.04]" />
        <span className="size-10 rounded-full border border-forest/10 bg-forest/[0.04]" />
      </div>

      <div className="mb-4 h-11 animate-pulse rounded-xl border border-gold/40 bg-gold/10" />

      <div className="mb-3 h-7 w-44 animate-pulse rounded-lg bg-forest/10" />
      <div className="grid grid-cols-7 gap-1.5">
        {copy.calendar.days.map((day) => (
          <div
            key={day}
            className="pb-1 text-center text-[0.68rem] font-semibold tracking-wide text-muted/50 uppercase"
          >
            {day}
          </div>
        ))}
        {Array.from({ length: 42 }, (_, i) => (
          <div
            key={i}
            className="min-h-11 animate-pulse rounded-xl bg-forest/[0.06] sm:min-h-12"
            style={{ animationDelay: `${(i % 7) * 70}ms` }}
          />
        ))}
      </div>

      <div className="mt-5 flex flex-wrap gap-5 text-xs text-muted/50">
        <span className="inline-flex items-center gap-1.5">
          <i className="size-3 rounded-md bg-emerald-50" aria-hidden="true" />
          {copy.calendar.free}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <i className="size-3 rounded-md bg-slate-100" aria-hidden="true" />
          {copy.calendar.busy}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <i className="size-3 rounded-md bg-forest/40" aria-hidden="true" />
          {copy.calendar.selected}
        </span>
      </div>

      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center rounded-3xl bg-white/55 backdrop-blur-[2px]">
        <span className="relative grid size-12 place-items-center">
          <span className="absolute inset-0 rounded-full border-2 border-forest/10" />
          <span className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-gold border-r-gold/40" />
        </span>
        <p className="mt-3 text-sm font-semibold text-forest">{copy.calendar.loading}</p>
        <p className="mt-1 text-xs tracking-wide text-muted">{copy.calendar.loadingHint}</p>
      </div>
    </div>
  );
}
