"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown, Clock, MapPin, MessageCircle, Phone } from "lucide-react";
import { faqs } from "@/data/faq";
import { copy } from "@/data/copy";
import { site } from "@/data/site";
import { telHref, viberHref, whatsappHref } from "@/lib/whatsapp";
import { ViberIcon, WhatsAppIcon } from "@/components/ui/SocialIcons";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useSite } from "@/components/providers/SiteProvider";

export function ContactFaqSection() {
  const { openBooking } = useSite();
  const address = `${site.location.street}, ${site.location.city}`;

  return (
    <section id="kontakt" className="px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-[1240px]">
        <div className="grid items-stretch gap-8 lg:grid-cols-2">
          <div className="flex h-full min-w-0 flex-col rounded-3xl border border-forest/8 bg-white/80 p-6 shadow-xl shadow-forest/8 md:p-8">
            <SectionHeading kicker={copy.contact.kicker} heading={copy.contact.heading} lead={copy.contact.lead} />
            <p className="mt-6 text-[0.68rem] tracking-[0.18em] text-sage uppercase">{copy.contact.hostsLabel}</p>
            <p className="mt-1 font-heading text-2xl text-forest">{site.hosts}</p>

            <dl className="mt-6 space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-gold" />
                <div className="min-w-0">
                  <dt className="text-[0.68rem] font-semibold tracking-[0.12em] text-muted uppercase">
                    {copy.contact.addressLabel}
                  </dt>
                  <dd className="mt-1 text-ink">
                    <a href={site.location.mapsUrl} target="_blank" rel="noreferrer" className="hover:text-forest">
                      {address}
                    </a>
                  </dd>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="mt-0.5 size-4 shrink-0 text-gold" />
                <div>
                  <dt className="text-[0.68rem] font-semibold tracking-[0.12em] text-muted uppercase">
                    {copy.contact.phoneLabel}
                  </dt>
                  <dd className="mt-1">
                    <a href={telHref()} className="font-semibold text-ink hover:text-forest">
                      {site.contact.phoneDisplay}
                    </a>
                  </dd>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="mt-0.5 size-4 shrink-0 text-gold" />
                <div>
                  <dt className="text-[0.68rem] font-semibold tracking-[0.12em] text-muted uppercase">
                    {copy.contact.hoursLabel}
                  </dt>
                  <dd className="mt-1 text-ink">
                    {copy.contact.checkInLabel}: {site.checkIn}
                    <br />
                    {copy.contact.checkOutLabel}: {site.checkOut}
                  </dd>
                </div>
              </div>
            </dl>

            <p className="mt-6 inline-flex items-center gap-2 text-xs text-muted">
              <MessageCircle className="size-3.5" />
              WhatsApp i Viber — isti broj
            </p>
            <div className="mt-auto grid grid-cols-3 gap-2 pt-6">
              <a
                href={telHref()}
                className="btn-emerald-gold inline-flex h-12 min-w-0 items-center justify-center gap-1.5 rounded-full px-2 text-[0.58rem] font-semibold tracking-[0.08em] uppercase sm:text-[0.68rem]"
              >
                <Phone className="size-3.5 shrink-0" />
                <span className="truncate">{copy.contact.callCta}</span>
              </a>
              <a
                href={whatsappHref("Zdravo, interesuje me Forest View Apartman u Dubovici.")}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-12 min-w-0 items-center justify-center gap-1.5 rounded-full border border-gold/50 bg-sage px-2 text-[0.58rem] font-semibold tracking-[0.08em] text-cream uppercase hover:bg-forest sm:text-[0.68rem]"
              >
                <WhatsAppIcon className="size-3.5 shrink-0" />
                <span className="truncate">{copy.contact.whatsappCta}</span>
              </a>
              <a
                href={viberHref()}
                className="inline-flex h-12 min-w-0 items-center justify-center gap-1.5 rounded-full border border-sage bg-cream px-2 text-[0.58rem] font-semibold tracking-[0.08em] text-forest uppercase hover:bg-gold/15 sm:text-[0.68rem]"
              >
                <ViberIcon className="size-4 shrink-0" />
                <span className="truncate">{copy.contact.viberCta}</span>
              </a>
            </div>
            <button
              type="button"
              onClick={openBooking}
              className="mt-2 inline-flex h-12 w-full items-center justify-center rounded-full border border-sage text-[0.68rem] font-semibold tracking-[0.1em] text-forest uppercase hover:bg-gold/15"
            >
              {copy.nav.book}
            </button>
          </div>

          <div className="flex h-full min-w-0 flex-col rounded-3xl border border-forest/8 bg-white/80 p-6 shadow-xl shadow-forest/8 md:p-8">
            <p className="text-[0.72rem] font-semibold tracking-[0.22em] text-sage uppercase">{copy.contact.faqKicker}</p>
            <h3 className="mt-2 font-heading text-3xl text-forest md:text-4xl">{copy.contact.faqHeading}</h3>
            <p className="mt-2 text-sm text-muted">{copy.contact.faqLead}</p>
            <Accordion.Root type="multiple" className="mt-4 [overflow-anchor:none]">
              {faqs.map((item) => (
                <Accordion.Item key={item.id} value={item.id} className="border-b border-forest/10 [overflow-anchor:none]">
                  <Accordion.Header>
                    <Accordion.Trigger
                      className="group flex w-full items-start justify-between gap-4 py-3.5 text-left [overflow-anchor:none]"
                      onClick={() => {
                        const y = window.scrollY;
                        requestAnimationFrame(() => {
                          requestAnimationFrame(() => {
                            window.scrollTo({ top: y, left: 0, behavior: "instant" });
                          });
                        });
                      }}
                    >
                      <span className="font-heading text-[0.95rem] text-forest sm:text-lg">{item.question}</span>
                      <ChevronDown className="mt-1 size-5 shrink-0 text-gold transition-transform duration-300 ease-out group-data-[state=open]:rotate-180" />
                    </Accordion.Trigger>
                  </Accordion.Header>
                  <Accordion.Content
                    forceMount
                    className="grid transition-[grid-template-rows] duration-300 ease-out data-[state=closed]:grid-rows-[0fr] data-[state=open]:grid-rows-[1fr]"
                  >
                    <div className="min-h-0 overflow-hidden">
                      <p className="pb-3.5 text-sm leading-relaxed text-muted">{item.answer}</p>
                    </div>
                  </Accordion.Content>
                </Accordion.Item>
              ))}
            </Accordion.Root>
          </div>
        </div>
      </div>
    </section>
  );
}
