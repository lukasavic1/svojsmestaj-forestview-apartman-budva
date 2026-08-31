import fs from "node:fs";
import path from "node:path";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const OUT_DIR = path.join(ROOT, "public", "images", "apartman");
const META_PATH = path.join(ROOT, "scripts", "booking-meta.json");
const LISTING =
  process.env.BOOKING_URL ||
  "https://www.booking.com/hotel/me/forest-view-modern.sr.html";
const CHROME =
  process.env.CHROME_PATH ||
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

function run(cmd, args, timeoutMs = 90000) {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, args, { windowsHide: true });
    let stdout = "";
    let stderr = "";
    const timer = setTimeout(() => {
      child.kill();
      reject(new Error(`timeout: ${cmd}`));
    }, timeoutMs);
    child.stdout.on("data", (d) => {
      stdout += d.toString("utf8");
    });
    child.stderr.on("data", (d) => {
      stderr += d.toString("utf8");
    });
    child.on("close", (code) => {
      clearTimeout(timer);
      if (code !== 0 && !stdout) reject(new Error(stderr || `exit ${code}`));
      else resolve({ stdout, stderr, code });
    });
  });
}

function toHiRes(url) {
  return url
    .replace(/max\d+x\d+/g, "max1280x900")
    .replace(/\/square\d+\//g, "/max1280x900/");
}

function unique(urls) {
  const seen = new Set();
  const out = [];
  for (const raw of urls) {
    if (!raw || !/bstatic\.com\/xdata\/images\/hotel/.test(raw)) continue;
    const clean = toHiRes(raw.split("&amp;").join("&"));
    const key = clean.replace(/\?.*$/, "");
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(clean);
  }
  return out;
}

function extractFromHtml(html) {
  const urls = [];
  const re =
    /https?:\/\/(?:cf|q|t-cf)\.bstatic\.com\/xdata\/images\/hotel\/[^"'\\\s>]+/gi;
  let m;
  while ((m = re.exec(html))) urls.push(m[0].replace(/\\u0026/g, "&").replace(/\\+/g, ""));
  const title = (html.match(/<title>([^<]+)<\/title>/i) || [])[1] || "";
  const score =
    (html.match(/"rawScore"\s*:\s*([0-9.]+)/) ||
      html.match(/"averageScore"\s*:\s*([0-9.]+)/) ||
      html.match(/>([0-9]\.[0-9])<\/span>/))?.[1] || null;
  const reviewCount =
    (html.match(/"reviewCount"\s*:\s*(\d+)/) ||
      html.match(/(\d+)\s+recenz/i))?.[1] || null;
  return { title, score, reviewCount, images: unique(urls) };
}

async function download(url, dest) {
  const res = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36",
      Referer: "https://www.booking.com/",
      Accept: "image/avif,image/webp,image/apng,image/*,*/*;q=0.8",
    },
  });
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < 8000) throw new Error(`too small ${buf.length} ${url}`);
  fs.writeFileSync(dest, buf);
  return buf.length;
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const dumpPath = path.join(ROOT, "scripts", "_booking-dump.html");
  console.log("dumping", LISTING);
  try {
    const { stdout } = await run(
      CHROME,
      [
        "--headless=new",
        "--disable-gpu",
        "--no-first-run",
        "--disable-extensions",
        "--virtual-time-budget=25000",
        "--dump-dom",
        LISTING,
      ],
      70000
    );
    fs.writeFileSync(dumpPath, stdout, "utf8");
    console.log("dump bytes", stdout.length);
  } catch (err) {
    console.error("chrome dump failed", err.message);
  }

  const html = fs.existsSync(dumpPath) ? fs.readFileSync(dumpPath, "utf8") : "";
  const meta = extractFromHtml(html);
  console.log("title", meta.title);
  console.log("score", meta.score, "reviews", meta.reviewCount);
  console.log("images found", meta.images.length);
  meta.images.slice(0, 8).forEach((u) => console.log(" ", u.slice(0, 120)));

  fs.writeFileSync(META_PATH, JSON.stringify(meta, null, 2));

  if (meta.images.length === 0) {
    process.exitCode = 2;
    console.error("NO_IMAGES");
    return;
  }

  const names = [
    "terrace-1",
    "living-1",
    "kitchen-1",
    "bedroom-1",
    "terrace-2",
    "bathroom-1",
    "bedroom-2",
    "exterior-1",
    "living-2",
    "dining-1",
    "kitchen-2",
    "forest-1",
  ];

  const saved = [];
  for (let i = 0; i < Math.min(meta.images.length, names.length); i++) {
    const dest = path.join(OUT_DIR, `${names[i]}.jpg`);
    try {
      const size = await download(meta.images[i], dest);
      console.log("saved", names[i], size);
      saved.push({ name: names[i], size, src: `/images/apartman/${names[i]}.jpg` });
    } catch (err) {
      console.error("fail", names[i], err.message);
    }
  }
  meta.saved = saved;
  fs.writeFileSync(META_PATH, JSON.stringify(meta, null, 2));
  if (saved.length === 0) process.exitCode = 2;
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
