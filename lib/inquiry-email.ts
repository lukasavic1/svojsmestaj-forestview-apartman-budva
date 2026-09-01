import { copy } from "@/data/copy";
import { site } from "@/data/site";
import { siteConfig } from "@/config/site";
import { formatLongDate, nightsBetween } from "@/lib/calendar";

export type HostInquiry = {
  name: string;
  phone: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  message: string;
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function digits(phone: string) {
  return phone.replace(/\D/g, "");
}

export function inquiryPeriodLabel(checkIn: string, checkOut: string) {
  return `${formatLongDate(checkIn, copy.calendar.months)} — ${formatLongDate(checkOut, copy.calendar.months)}`;
}

export function hostInquirySubject(inquiry: HostInquiry) {
  return `Novi upit · ${site.name} · ${inquiryPeriodLabel(inquiry.checkIn, inquiry.checkOut)}`;
}

export function hostInquiryText(inquiry: HostInquiry) {
  const nights = nightsBetween(inquiry.checkIn, inquiry.checkOut);
  const lines = [
    `Potencijalna rezervacija — ${site.legalName}`,
    "",
    "Ovo još nije potvrđena rezervacija. Kontaktirajte gosta i potvrdite termine.",
    "",
    `Gost: ${inquiry.name}`,
    `Telefon: ${inquiry.phone}`,
    `Gosti: ${inquiry.guests}`,
    `Prijava: ${formatLongDate(inquiry.checkIn, copy.calendar.months)} (${site.checkIn})`,
    `Odjava: ${formatLongDate(inquiry.checkOut, copy.calendar.months)} (${site.checkOut})`,
    `Noćenja: ${nights}`,
  ];
  if (inquiry.message) {
    lines.push("", `Poruka: ${inquiry.message}`);
  }
  lines.push("", siteConfig.url);
  return lines.join("\n");
}

export function hostInquiryHtml(inquiry: HostInquiry) {
  const nights = nightsBetween(inquiry.checkIn, inquiry.checkOut);
  const period = inquiryPeriodLabel(inquiry.checkIn, inquiry.checkOut);
  const phone = escapeHtml(inquiry.phone);
  const phoneHref = digits(inquiry.phone);
  const tel = phoneHref ? `tel:+${phoneHref.replace(/^00/, "")}` : "";
  const wa = phoneHref ? `https://wa.me/${phoneHref.replace(/^00/, "")}` : "";
  const note = inquiry.message
    ? `<tr>
        <td style="padding:18px 28px 8px;font-family:Georgia,'Times New Roman',serif;font-size:12px;letter-spacing:0.16em;text-transform:uppercase;color:#C5A880;">Poruka gosta</td>
      </tr>
      <tr>
        <td style="padding:0 28px 24px;font-family:'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:15px;line-height:1.6;color:#1B3B2B;">${escapeHtml(inquiry.message).replace(/\n/g, "<br/>")}</td>
      </tr>`
    : "";

  const row = (label: string, value: string) => `
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid #E8E2D6;width:38%;font-family:'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;color:#7A8478;">${label}</td>
      <td style="padding:10px 0;border-bottom:1px solid #E8E2D6;font-family:'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:15px;color:#1B3B2B;font-weight:600;">${value}</td>
    </tr>`;

  return `<!DOCTYPE html>
<html lang="sr">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>${escapeHtml(hostInquirySubject(inquiry))}</title>
</head>
<body style="margin:0;padding:0;background:#F3EFE8;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F3EFE8;padding:32px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#FAF8F5;border-radius:24px;overflow:hidden;border:1px solid #E4DDD0;">
          <tr>
            <td style="background:#1B3B2B;padding:28px 28px 24px;">
              <p style="margin:0 0 10px;font-family:'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:11px;letter-spacing:0.22em;text-transform:uppercase;color:#D4AF37;">Svoj Smještaj · Budva</p>
              <h1 style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:28px;line-height:1.25;font-weight:500;color:#FAF8F5;">Novi upit za boravak</h1>
              <p style="margin:12px 0 0;display:inline-block;padding:6px 12px;border-radius:999px;border:1px solid rgba(212,175,55,0.55);font-family:'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:#D4AF37;">Potencijalna rezervacija</p>
            </td>
          </tr>
          <tr>
            <td style="height:4px;background:linear-gradient(90deg,#C5A880,#D4AF37,#C5A880);font-size:0;line-height:0;">&nbsp;</td>
          </tr>
          <tr>
            <td style="padding:28px 28px 8px;">
              <p style="margin:0;font-family:'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:15px;line-height:1.65;color:#4A524C;">
                Gost je poslao upit preko sajta. <strong style="color:#1B3B2B;">Termin nije automatski zauzet</strong> — javite se gostu i potvrdite dostupnost.
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:16px 28px 8px;">
              <p style="margin:0 0 6px;font-family:Georgia,'Times New Roman',serif;font-size:13px;color:#C5A880;letter-spacing:0.12em;text-transform:uppercase;">${escapeHtml(site.legalName)}</p>
              <p style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:22px;line-height:1.35;color:#1B3B2B;">${escapeHtml(period)}</p>
              <p style="margin:8px 0 0;font-family:'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:14px;color:#7A8478;">${nights} ${nights === 1 ? "noćenje" : "noćenja"} · prijava ${site.checkIn} · odjava ${site.checkOut}</p>
            </td>
          </tr>
          <tr>
            <td style="padding:12px 28px 8px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                ${row("Gost", escapeHtml(inquiry.name))}
                ${row("Telefon", phone)}
                ${row("Broj gostiju", String(inquiry.guests))}
                ${row("Prijava", escapeHtml(formatLongDate(inquiry.checkIn, copy.calendar.months)))}
                ${row("Odjava", escapeHtml(formatLongDate(inquiry.checkOut, copy.calendar.months)))}
              </table>
            </td>
          </tr>
          ${note}
          <tr>
            <td style="padding:8px 28px 28px;">
              <table role="presentation" cellpadding="0" cellspacing="0">
                <tr>
                  ${
                    tel
                      ? `<td style="padding-right:10px;">
                    <a href="${tel}" style="display:inline-block;padding:14px 22px;border-radius:999px;background:#1B3B2B;color:#FAF8F5;text-decoration:none;font-family:'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:12px;letter-spacing:0.12em;text-transform:uppercase;font-weight:700;">Pozovi gosta</a>
                  </td>`
                      : ""
                  }
                  ${
                    wa
                      ? `<td>
                    <a href="${wa}" style="display:inline-block;padding:14px 22px;border-radius:999px;border:1px solid #D4AF37;color:#1B3B2B;text-decoration:none;font-family:'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:12px;letter-spacing:0.12em;text-transform:uppercase;font-weight:700;">WhatsApp</a>
                  </td>`
                      : ""
                  }
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:18px 28px 24px;background:#F4F0E8;border-top:1px solid #E4DDD0;">
              <p style="margin:0;font-family:'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:12px;line-height:1.6;color:#7A8478;">
                ${escapeHtml(site.location.street)} · ${escapeHtml(site.location.city)}<br/>
                <a href="${siteConfig.url}" style="color:#1B3B2B;">${siteConfig.url.replace(/^https:\/\//, "")}</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
