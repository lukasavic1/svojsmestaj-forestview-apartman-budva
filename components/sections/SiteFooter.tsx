"use client";

import { MapPin, Phone } from "lucide-react";
import { FacebookIcon, InstagramIcon } from "@/components/ui/SocialIcons";
import { LeafMark } from "@/components/ui/LeafMark";
import { site } from "@/data/site";
import { copy } from "@/data/copy";
import { telHref, viberHref, whatsappHref } from "@/lib/whatsapp";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-forest text-cream">
      <div className="mx-auto grid max-w-[1240px] gap-10 px-4 py-16 sm:px-6 lg:grid-cols-3 lg:px-8">
        <div>
          <p className="inline-flex items-center gap-2 font-heading text-2xl text-gold">
            <LeafMark className="size-9" />
            {site.name}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-cream/70">{copy.footer.tagline}</p>
        </div>
        <div>
          <p className="text-[0.7rem] font-semibold tracking-[0.16em] text-gold uppercase">{copy.footer.contact}</p>
          <a href={telHref()} className="mt-4 flex items-center gap-2 text-sm hover:text-gold">
            <Phone className="size-4" />
            {site.contact.phoneDisplay}
          </a>
          <a href={whatsappHref()} className="mt-2 block text-sm text-cream/70 hover:text-gold">
            WhatsApp
          </a>
          <a href={viberHref()} className="mt-2 block text-sm text-cream/70 hover:text-gold">
            Viber
          </a>
          <a
            href={site.location.mapsUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-3 flex items-start gap-2 text-sm text-cream/70 hover:text-gold"
          >
            <MapPin className="mt-0.5 size-4 shrink-0" />
            {site.location.street}
          </a>
        </div>
        <div>
          <p className="text-[0.7rem] font-semibold tracking-[0.16em] text-gold uppercase">{copy.footer.stay}</p>
          <p className="mt-4 text-sm text-cream/70">
            {copy.footer.checkIn}: {site.checkIn}
          </p>
          <p className="mt-2 text-sm text-cream/70">
            {copy.footer.checkOut}: {site.checkOut}
          </p>
          <a
            href={site.location.mapsUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-block text-sm text-gold hover:text-cream"
          >
            {copy.footer.directions}
          </a>
          <div className="mt-5 flex gap-3">
            <a
              href={site.social.instagram}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="grid size-11 place-items-center rounded-full border border-gold/30 hover:border-gold hover:text-gold"
            >
              <InstagramIcon className="size-4" />
            </a>
            <a
              href={site.social.facebook}
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="grid size-11 place-items-center rounded-full border border-gold/30 hover:border-gold hover:text-gold"
            >
              <FacebookIcon className="size-4" />
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-6 text-center text-xs text-cream/45 sm:px-6">
        © {year} {site.legalName}. {copy.footer.rights}
      </div>
    </footer>
  );
}
