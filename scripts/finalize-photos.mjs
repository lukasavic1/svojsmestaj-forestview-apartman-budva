import fs from "node:fs";
import path from "node:path";

const html = fs.readFileSync("scripts/_booking-dump.html", "utf8");
const outDir = "public/images/apartman";
fs.mkdirSync(outDir, { recursive: true });

const map = new Map();
const re =
  /https?:\/\/(?:cf|r-xx)\.bstatic\.com\/xdata\/images\/hotel\/(?:max\d+(?:x\d+)?|square\d+)\/(\d+)\.jpg\?k=([a-f0-9]+)/gi;
let match;
while ((match = re.exec(html))) {
  if (!map.has(match[1])) map.set(match[1], match[2]);
}

const names = {
  906568705: "terrace-1",
  906568715: "living-1",
  906568722: "living-2",
  906568712: "entrance-1",
  906568728: "bedroom-1",
  906568719: "bedroom-2",
  906568683: "bedroom-3",
  906568508: "bedroom-4",
  906568689: "bathroom-1",
  906568695: "bathroom-2",
  906568709: "bathroom-3",
};

const sizes = ["max2400", "max1280x900", "max1024x768"];

for (const [id, k] of map) {
  const name = names[id];
  if (!name) continue;
  let best = null;
  for (const size of sizes) {
    const url = `https://cf.bstatic.com/xdata/images/hotel/${size}/${id}.jpg?k=${k}&o=`;
    const res = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36",
        Referer: "https://www.booking.com/",
        Accept: "image/jpeg,image/*,*/*;q=0.8",
      },
    });
    if (!res.ok) continue;
    const buf = Buffer.from(await res.arrayBuffer());
    if (buf.length < 12000) continue;
    if (!best || buf.length > best.length) best = { buf, size, length: buf.length };
  }
  if (!best) {
    console.log("skip", name, id);
    continue;
  }
  fs.writeFileSync(path.join(outDir, `${name}.jpg`), best.buf);
  console.log("ok", name.padEnd(12), best.size.padEnd(14), best.length);
}

const keep = new Set(Object.values(names).map((n) => `${n}.jpg`));
for (const file of fs.readdirSync(outDir)) {
  if (!keep.has(file)) {
    fs.unlinkSync(path.join(outDir, file));
    console.log("removed", file);
  }
}
