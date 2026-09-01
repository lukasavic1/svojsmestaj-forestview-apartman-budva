export const highlights = [
  { label: "75 m²", detail: "Prostran stan" },
  { label: "Dvosoban stan", detail: "Do 4 gosta" },
  { label: "2× Terase u hladu", detail: "Pogled na šumu" },
  { label: "Besplatan parking", detail: "Zajednički + pomoćni" },
  { label: "1,7 km od plaže", detail: "Slovenska plaža" },
] as const;

export const heroFeatures = [
  {
    id: "shade",
    title: "Šumska hladovina",
    body: "Dvije prostrane terase u prirodnom hladu",
  },
  {
    id: "evenings",
    title: "Prijatne večeri",
    body: "Svjež vazduh iznad ljetnje žege",
  },
  {
    id: "parking",
    title: "Siguran parking",
    body: "Zajednički parking zgrade i garaža",
  },
  {
    id: "entertainment",
    title: "Zabava",
    body: "2× TV, kablovska i besplatan Netflix",
  },
] as const;

export const heroRibbon = [
  { id: "size", label: "75 m² prostora" },
  { id: "rooms", label: "2 spavaće sobe" },
  { id: "beach", label: "1,7 km od Slovenske plaže" },
  { id: "wifi", label: "Optički WiFi & AC" },
] as const;

export const amenities = [
  {
    id: "terraces",
    icon: "trees" as const,
    title: "Dvije terase u prirodnom hladu",
    body: "Jedna za jutarnju kafu, druga za večernje vino.",
  },
  {
    id: "ac",
    icon: "snowflake" as const,
    title: "Klimatizovan prostor",
    body: "Klima u dnevnoj sobi brzo hladi stan nakon plaže.",
  },
  {
    id: "kitchen",
    icon: "utensils" as const,
    title: "Moderna kuhinja sa mašinom za suđe",
    body: "Potpuno opremljena kuhinja — mašina za suđe, bez pranja na odmoru.",
  },
  {
    id: "laundry",
    icon: "washing" as const,
    title: "Mašina za veš",
    body: "Praktično za porodice i duže ljetne boravke.",
  },
  {
    id: "tv",
    icon: "tv" as const,
    title: "Zabava za sve (2× TV + Netflix)",
    body: "Dva TV-a, kablovska i uključen Netflix.",
  },
  {
    id: "parking",
    icon: "car" as const,
    title: "Besplatne opcije za parking",
    body: "Garaža, parking zgrade i makadam 20 m od ulaza.",
  },
  {
    id: "quiet",
    icon: "quiet" as const,
    title: "Potpuni mir",
    body: "Gornji dio grada, bez ulične saobraćajne buke.",
  },
  {
    id: "wifi",
    icon: "wifi" as const,
    title: "Brzi optički WiFi",
    body: "Stabilan optički internet u cijelom stanu.",
  },
  {
    id: "family",
    icon: "family" as const,
    title: "Savršeno za porodice",
    body: "Dva spavaća prostora, veš, suđe i parking — za porodična putovanja.",
  },
] as const;

export const distances = [
  {
    id: "beach",
    icon: "beach" as const,
    title: "Slovenska plaža",
    body: "Oko 15 minuta laganog hoda (1,7 km nizbrdo) ili 3–4 minuta automobilom.",
  },
  {
    id: "shops",
    icon: "shop" as const,
    title: "Supermarketi i snabdijevanje",
    body: "Mega Market, Idea, lokalne pekare i apoteke na svega par minuta hoda.",
  },
  {
    id: "bus",
    icon: "bus" as const,
    title: "Glavna autobuska stanica",
    body: "Manje od 10 minuta hoda.",
  },
  {
    id: "oldtown",
    icon: "castle" as const,
    title: "Stari grad Budva",
    body: "Oko 20–25 minuta šetnje ili par minuta taksijem.",
  },
] as const;

export const beaches = [
  {
    id: "slovenska",
    name: "Slovenska plaža",
    shortName: "Slovenska",
    distance: "1,7 km",
    tag: "Porodična klasika",
    vibe: "Najduži pijesak u gradu",
    body: "Šetnja, sladoled, prvi zalazak. Ovdje ljeto počinje — i završava laganim hodom nazad u Dubovicu.",
    src: "/images/plaze/slovenska.jpg",
    featured: true,
  },
  {
    id: "ricardova",
    name: "Plaža Ričardova glava",
    shortName: "Ričardova",
    distance: "2,3 km",
    tag: "Uz Stari grad",
    vibe: "Kupanje uz zidine",
    body: "Pijesak, kafa i more do stola. Jutarnji kupači znaju: ovo je Budva prije gužve.",
    src: "/images/plaze/ricardova.jpg",
  },
  {
    id: "pizana",
    name: "Plaža Pizana",
    shortName: "Pizana",
    distance: "2,4 km",
    tag: "Ispod citadele",
    vibe: "Džep pijeska uz kamen",
    body: "Najkraći put od starog grada do mora. Slamnati suncobrani, zidine iza leđa, otvoreno more ispred.",
    src: "/images/plaze/pizana.jpg",
  },
  {
    id: "mogren",
    name: "Plaža Mogren",
    shortName: "Mogren",
    distance: "2,5 km",
    tag: "Kroz tunel",
    vibe: "Dva zaliva, jedna razglednica",
    body: "Staza uz liticu, pa tunel kroz stijenu. Mogren I i Mogren II — Budva koju svi žele na fotografiji.",
    src: "/images/plaze/mogren.jpg",
  },
  {
    id: "dukley",
    name: "Plaža Dukley",
    shortName: "Dukley",
    distance: "2,5 km",
    tag: "Sunset lounge",
    vibe: "Istočni kraj Slovenske",
    body: "Lounge palube, tiha muzika i zalazak iza ostrva. Kad sunce padne, magistralom ste kući za par minuta.",
    src: "/images/plaze/dukley.jpg",
  },
] as const;

export const reviews = [
  {
    id: "r1",
    name: "Milica P.",
    country: "RS",
    date: "avgust 2025.",
    rating: 10,
    quote:
      "Terase u hladu šume su bile spas od ljetnje žege. Nakon cijelog dana na Slovenskoj plaži, vraćate se u pravi mir — bez buke, bez gužve. Stan je čist, moderna kuhinja sa mašinom za suđe je olakšala boravak sa djecom.",
  },
  {
    id: "r2",
    name: "Stefan K.",
    country: "ME",
    date: "jul 2025.",
    rating: 9.8,
    quote:
      "Lokacija je genijalna ako imate auto. Za par minuta ste na magistrali prema Jazu ili Bečićima, a uveče spavate kao da ste u planinskoj kući. Domaćini odgovaraju odmah na WhatsApp.",
  },
  {
    id: "r3",
    name: "Anna M.",
    country: "DE",
    date: "jun 2025.",
    rating: 9.6,
    quote:
      "Quiet forest surroundings, two shaded terraces, Netflix after the beach. The apartment is spacious, well equipped and much cooler in the evenings than the centre of Budva. We will return.",
  },
  {
    id: "r4",
    name: "Jelena R.",
    country: "BA",
    date: "septembar 2025.",
    rating: 10,
    quote:
      "Čistoća je na visokom nivou, posteljina mirisava, kupatilo novo. Parking iza zgrade i makadam 20 metara — nismo imali problem ni u sezoni. Preporuka za parove koji žele mir.",
  },
  {
    id: "r5",
    name: "Marko V.",
    country: "RS",
    date: "avgust 2025.",
    rating: 9.4,
    quote:
      "Dva televizora i Netflix su nas spasili kišnog popodneva. Kuhinja je stvarno kompletna, mašina za veš nezamjenjiva sa dvoje mališana. Večeri na terasi uz cvrčke — to je Budva koju tražimo.",
  },
  {
    id: "r6",
    name: "Elena T.",
    country: "RU",
    date: "maj 2025.",
    rating: 9.7,
    quote:
      "Oчень тихо, зелень вокруг, две террасы. До пляжа 15 минут пешком вниз. Хозяева быстро ответили и встретили с инструкцией по квартире. Отличное соотношение комфорта и спокойствия.",
  },
] as const;
