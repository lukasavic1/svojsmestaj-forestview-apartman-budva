"use client";

import type { ReactNode } from "react";
import { SiteProvider } from "@/components/providers/SiteProvider";
import { BookingModal } from "@/components/sections/BookingModal";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { SiteHeader } from "@/components/sections/SiteHeader";
import { FloatingBookingButton } from "@/components/ui/FloatingBookingButton";

export function SiteChrome({ children }: { children: ReactNode }) {
  return (
    <SiteProvider>
      <div id="top" className="min-h-dvh bg-cream">
        <SiteHeader />
        {children}
        <SiteFooter />
        <FloatingBookingButton />
        <BookingModal />
      </div>
    </SiteProvider>
  );
}
