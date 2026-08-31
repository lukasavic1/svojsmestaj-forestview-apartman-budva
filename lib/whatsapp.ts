import { site } from "@/data/site";

export type InquiryPayload = {
  name: string;
  phone: string;
  checkIn?: string;
  checkOut?: string;
  guests?: number;
  message?: string;
};

export function whatsappHref(text?: string): string {
  const base = `https://wa.me/${site.contact.whatsappRaw}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

export function formatInquiryMessage(payload: InquiryPayload): string {
  const lines = [
    "Zdravo, želim da rezervišem boravak u Forest View Modern Apartment, Budva.",
    "",
    `Ime: ${payload.name}`,
    `Telefon: ${payload.phone}`,
  ];

  if (payload.checkIn) lines.push(`Prijava: ${payload.checkIn}`);
  if (payload.checkOut) lines.push(`Odjava: ${payload.checkOut}`);
  if (payload.guests) lines.push(`Gosti: ${payload.guests}`);
  if (payload.message?.trim()) lines.push(`Poruka: ${payload.message.trim()}`);

  return lines.join("\n");
}

export function telHref(): string {
  return `tel:+${site.contact.whatsappRaw}`;
}

export function viberHref(): string {
  return `viber://chat?number=%2B${site.contact.whatsappRaw}`;
}
