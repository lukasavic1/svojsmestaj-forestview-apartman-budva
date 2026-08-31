export const site = {
  name: "Forest View Budva",
  legalName: "Forest View Modern Apartment Budva",
  tagline: "Doživite Budvu, odmorite u miru – Vaša zelena oaza u Dubovici",
  subTagline:
    "Prostran dvosoban stan sa dvije terase, okružen šumom i prirodnom svježinom. Potpuno opremljen modernim uređajima, smješten u zgradi sa zajedničkim parkingom – savršen izbor za porodice i parove.",
  hosts: "Domaćini Forest View",
  sizeSqm: 75,
  bedrooms: 2,
  capacity: 4,
  location: {
    street: "Zgrada Prosvjete lamela 3, sprat 2, stan 202, Dubovica bb.",
    locality: "Dubovica",
    city: "Budva",
    postalCode: "85310",
    country: "Crna Gora",
    countryCode: "ME",
    lat: 42.295162,
    lng: 18.83806,
    mapsUrl: "https://maps.google.com/?q=42.295162,18.838060",
    mapsEmbed:
      "https://www.google.com/maps?q=42.295162,18.838060&hl=sr&z=16&output=embed",
  },
  checkIn: "12:00",
  checkOut: "10:00",
  minNights: 2,
  rating: {
    score: 4.8,
    bookingScore: 9.6,
    count: 47,
    label: "Izvanredno",
  },
  contact: {
    /** Zamijeni stvarnim brojem domaćina prije lansiranja. */
    phoneDisplay: "+382 67 000 000",
    whatsappRaw: "38267000000",
  },
  social: {
    instagram: "https://www.instagram.com/svojsmestaj",
    facebook: "https://www.facebook.com/svojsmestaj",
  },
  seo: {
    title: "Forest View Modern Apartment Budva | Zelena Oaza u Dubovici",
    description:
      "Dvosoban stan 75 m² u Dubovici, Budva — dvije terase u hladu šume, klima, Netflix, mašina za veš i suđe, besplatan parking. 1,7 km od Slovenske plaže. Rezervišite direktno.",
  },
} as const;
