import type { Photo } from "@/types/photo";

const img = (name: string) => `/images/apartman/${name}.jpg`;

export const media = {
  hero: [img("terrace-1"), img("living-1"), img("bedroom-1")],
  about: {
    mosaic: [img("terrace-1"), img("living-2"), img("living-1")],
  },
} as const;

export const gallery: Photo[] = [
  {
    src: img("terrace-1"),
    alt: "Terasa u prirodnom hladu — rattan sjedišta i zelenilo Dubovice",
    span: "tall",
  },
  {
    src: img("living-1"),
    alt: "Otvoreni dnevni boravak sa trpezarijom i modernom kuhinjom",
    span: "wide",
  },
  {
    src: img("living-2"),
    alt: "Klimatizovan dnevni boravak sa ugaonom garniturom",
  },
  {
    src: img("bedroom-1"),
    alt: "Glavna spavaća soba sa izlazom na terasu",
    span: "tall",
  },
  {
    src: img("bedroom-2"),
    alt: "Glavna spavaća soba — ogledalo i udoban bračni krevet",
  },
  {
    src: img("bedroom-3"),
    alt: "Druga spavaća soba sa razvlačenjem i izlazom na terasu",
    span: "tall",
  },
  {
    src: img("bedroom-4"),
    alt: "Druga spavaća soba — ogledalo i izlaz u kupatilo",
  },
  {
    src: img("entrance-1"),
    alt: "Ulaz u stan 202 — pogled ka dnevnom boravku",
  },
  {
    src: img("bathroom-1"),
    alt: "Kupatilo sa mašinom za veš i hodnik stana",
    span: "tall",
  },
  {
    src: img("bathroom-3"),
    alt: "Tuš kabina sa staklenim vratima",
  },
  {
    src: img("bathroom-2"),
    alt: "Gostinsko kupatilo",
  },
];
