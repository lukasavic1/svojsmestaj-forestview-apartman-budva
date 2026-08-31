import fs from "node:fs";
import path from "node:path";

const html = fs.readFileSync("scripts/_booking-dump.html", "utf8");
const outDir = "public/images/apartman";
fs.mkdirSync(outDir, { recursive: true });

const map = new Map();
const re =
  /https?:\/\/(?:cf|r-xx|q-xx)\.bstatic\.com\/xdata\/images\/hotel\/(?:max\d+(?:x\d+)?|square\d+|\d+x\d+)\/(\d+)\.(?:jpg|webp)\?k=([a-f0-9]+)/gi;
let match;
while ((match = re.exec(html))) {
  if (!map.has(match[1])) map.set(match[1], match[2]);
}

const altById = new Map();
const altRe =
  /max(?:\d+x\d+|\d+)\/(\d+)\.jpg\?k=[a-f0-9]+&(?:amp;)?o=(?:&(?:amp;)?hp=1)?["']?\s+alt="([^"]+)"/gi;
while ((match = altRe.exec(html))) {
  if (!altById.has(match[1])) altById.set(match[1], match[2].replace(/\s+/g, " ").trim());
}

const names = {
  906568712: "kitchen-1",
  906568728: "bedroom-1",
  906568689: "bathroom-1",
  906568715: "kitchen-2",
  906568705: "living-1",
  906568719: "bedroom-2",
  906568695: "bathroom-2",
  906568683: "bedroom-3",
  906568722: "living-2",
  906568508: "terrace-1",
  906568709: "exterior-1",
};

const saved = [];
let i = 0;
for (const [id, k] of map) {
  const name = names[id] || `photo-${++i}`;
  const url = `https://cf.bstatic.com/xdata/images/hotel/max1280x900/${id}.jpg?k=${k}&o=`;
  const dest = path.join(outDir, `${name}.jpg`);
  const res = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36",
      Referer: "https://www.booking.com/",
      Accept: "image/jpeg,image/webp,image/*,*/*;q=0.8",
    },
  });
  if (!res.ok) {
    console.log("fail", name, id, res.status);
    continue;
  }
  const buf = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(dest, buf);
  console.log("saved", name.padEnd(14), id, String(buf.length).padStart(8), altById.get(id) || "");
  saved.push({
    name,
    id,
    size: buf.length,
    alt: altById.get(id) || "",
    src: `/images/apartman/${name}.jpg`,
  });
}

fs.writeFileSync("scripts/booking-photos.json", JSON.stringify({ saved }, null, 2));
console.log("total", saved.length);
