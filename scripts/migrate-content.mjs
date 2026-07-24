import { createHash } from "node:crypto";
import { cp, mkdir, readFile, readdir, stat, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { basename, dirname, extname, join, resolve } from "node:path";
import { load } from "cheerio";

const projectRoot = resolve(import.meta.dirname, "..");
const sourceRoot = resolve(projectRoot, "..");
const outputData = join(projectRoot, "src/data/legacy-pages.json");
const migrationDir = join(projectRoot, "migration");
const assetOutput = join(projectRoot, "public/legacy-assets");

const retainedRoutes = new Set([
  "/",
  "/about/",
  "/blog/",
  "/contact/",
  "/privacy-policy/",
  "/products/",
  "/products/chemical-anchors/",
  "/products/epoxy-adhesive/",
  "/products/hanging-support/",
  "/products/mechanical-bolt/",
  "/projects/",
  "/quote/",
  "/services/",
  "/services/anchor/",
  "/services/coring/",
  "/services/floor-repair/",
  "/services/hilti-services/",
]);

const redirects = [
  ["/project/", "/projects/", 301, "Consolidate legacy project archive"],
  ["/category/นานาสาระงานก่อสร้าง/", "/blog/", 301, "Consolidate article archive"],
  ["/author/mon012/", "/blog/", 301, "Remove author archive"],
  ["/tag/hilti/", "/services/hilti-services/", 301, "Move tag to relevant service"],
  ["/tag/พุกเคมี/", "/products/chemical-anchors/", 301, "Move tag to relevant category"],
  ["/tag/พุกตะกั่ว/", "/products/mechanical-bolt/", 301, "Move tag to relevant category"],
  ["/project_category/บริการเจาะพื้นคอริ่ง-coring/", "/services/coring/", 301, "Move taxonomy to service"],
  ["/project_category/บริการเจาะติดตั้งพุกเค/", "/services/anchor/", 301, "Move taxonomy to service"],
  ["/project_category/บริการยิงโฟมและฉีด-epoxy/", "/services/floor-repair/", 301, "Move taxonomy to service"],
  ["/layout_type/layout/", "/", 301, "Remove Divi utility archive"],
  ["/layout_type/module/", "/", 301, "Remove Divi utility archive"],
  ["/layout_type/row/", "/", 301, "Remove Divi utility archive"],
  ["/module_width/regular/", "/", 301, "Remove Divi utility archive"],
  ["/scope/", "/", 301, "Remove WordPress utility route"],
];

const redirectPrefixes = new Map([
  ["/project_tag/", "/projects/"],
  ["/author/", "/blog/"],
  ["/category/", "/blog/"],
  ["/project_category/", "/projects/"],
  ["/tag/", "/blog/"],
  ["/layout_type/", "/"],
  ["/module_width/", "/"],
  ["/scope/", "/"],
]);

function clean(value = "") {
  return value
    .replace(/\u00a0/g, " ")
    .replace(/\s+/g, " ")
    .replace(/บริษัท เอสบีซีซี เอ็นจิเนียริ่ง แอนด์ ซัพพลาย จำกัด/g, "SBCC")
    .trim();
}

function csv(value) {
  return `"${String(value ?? "").replaceAll('"', '""')}"`;
}

function routeFromFile(file) {
  const relative = file.slice(sourceRoot.length).replaceAll("\\", "/");
  if (relative === "/index.html") return "/";
  return `${dirname(relative).replaceAll("\\", "/")}/`.replace(/\/+/g, "/");
}

function localPathFromImage(value) {
  if (!value) return null;
  let candidate = value;
  if (candidate.startsWith("data:image/svg+xml;base64,")) {
    try {
      const svg = Buffer.from(candidate.split(",")[1], "base64").toString("utf8");
      const encoded = svg.match(/data-u="([^"]+)"/)?.[1];
      if (encoded) candidate = decodeURIComponent(encoded);
    } catch {
      return null;
    }
  }
  try {
    const parsed = new URL(candidate, "https://sbcceng.co.th");
    const marker = "/wp-content/uploads/";
    const markerIndex = parsed.pathname.indexOf(marker);
    if (markerIndex === -1) return null;
    return decodeURIComponent(parsed.pathname.slice(markerIndex));
  } catch {
    return null;
  }
}

async function copyImage(sourcePath) {
  const absoluteSource = join(sourceRoot, sourcePath);
  if (!existsSync(absoluteSource)) return null;
  const extension = extname(sourcePath).toLowerCase();
  if (![".jpg", ".jpeg", ".png", ".webp", ".gif"].includes(extension)) return null;
  const digest = createHash("sha1").update(sourcePath).digest("hex").slice(0, 10);
  const fileName = `${digest}-${basename(sourcePath).replace(/[^\p{L}\p{N}._-]/gu, "-")}`;
  const destination = join(assetOutput, fileName);
  if (!existsSync(destination)) await cp(absoluteSource, destination);
  return `/legacy-assets/${fileName}`;
}

async function discoverHtmlFiles() {
  const sitemapFiles = ["page-sitemap.xml", "post-sitemap.xml", "project-sitemap.xml"];
  const routes = new Set();
  for (const file of sitemapFiles) {
    const xml = await readFile(join(sourceRoot, file), "utf8");
    for (const match of xml.matchAll(/<loc>(.*?)<\/loc>/g)) {
      const route = decodeURIComponent(new URL(match[1], "https://sbcceng.co.th").pathname);
      routes.add(route === "/" ? "/" : `${route.replace(/\/+$/, "")}/`);
    }
  }
  const exportedFiles = await readdir(sourceRoot, { recursive: true });
  for (const relative of exportedFiles) {
    if (
      relative.startsWith("sbcc-astro/") ||
      relative.includes("/node_modules/") ||
      !relative.endsWith("index.html")
    ) continue;
    const file = join(sourceRoot, relative);
    routes.add(routeFromFile(file));
  }
  return [...routes]
    .map((route) => ({
      route,
      file: route === "/" ? join(sourceRoot, "index.html") : join(sourceRoot, route, "index.html"),
    }))
    .filter(({ file }) => existsSync(file));
}

function redirectTargetFor(route) {
  const exact = redirects.find(([from]) => from === route);
  if (exact) return exact[1];
  for (const [prefix, target] of redirectPrefixes) {
    if (route.startsWith(prefix)) return target;
  }
  return null;
}

async function extractPage(route, file) {
  const html = await readFile(file, "utf8");
  const $ = load(html);
  const title = clean($("title").first().text()).replace(/\s*[|–-]\s*SBCC.*$/i, "");
  const description = clean($('meta[name="description"]').attr("content"));
  const canonical = $("link[rel='canonical']").attr("href") || route;
  const $main = $("#main-content").first().length ? $("#main-content").first() : $(".entry-content").first();

  $main
    .find("script, style, noscript, form, nav, header, footer, .et_pb_menu, .et_pb_social_media_follow, .deftform, .et_pb_code")
    .remove();

  const blocks = [];
  const seen = new Set();
  $main.find("h1,h2,h3,h4,p,li,blockquote,th,td").each((_, element) => {
    const tag = element.tagName.toLowerCase();
    const text = clean($(element).text());
    if ($(element).closest(".et_pb_portfolio,.et_pb_filterable_portfolio,.et_pb_blog,.et_pb_gallery,.pagination,.nav-links").length) return;
    if (
      text.length < 2 ||
      text.length > 900 ||
      seen.has(text) ||
      /^(หน้าแรก|สินค้า|บริการ|ผลงาน|บทความ|ติดต่อเรา|ขอใบเสนอราคา|ติดต่อฝ่ายขาย|ติดต่อฝ่ายดูแลลูกค้า|พูดคุยผ่าน Line|All)$/i.test(text) ||
      /^(Office|Hotline|Fax|Email|Line)\s*:/i.test(text)
    ) return;
    seen.add(text);
    blocks.push({ tag, text });
  });

  const internalLinks = new Set();
  $main.find("a[href]").each((_, element) => {
    const href = $(element).attr("href");
    try {
      const parsed = new URL(href, "https://sbcceng.co.th");
      if (parsed.hostname === "sbcceng.co.th" || !parsed.hostname) {
        const path = decodeURIComponent(parsed.pathname);
        if (path.startsWith("/") && !path.startsWith("/wp-")) internalLinks.add(path);
      }
    } catch {}
  });

  const images = [];
  const imageSources = new Set();
  for (const element of $main.find("img").toArray()) {
    const raw = $(element).attr("data-src") || $(element).attr("data-lazy-src") || $(element).attr("src");
    const sourcePath = localPathFromImage(raw);
    if (!sourcePath || imageSources.has(sourcePath)) continue;
    imageSources.add(sourcePath);
    const migrated = await copyImage(sourcePath);
    if (migrated) {
      images.push({
        src: migrated,
        alt: clean($(element).attr("alt")) || title,
      });
    }
    if (images.length >= 8) break;
  }

  const firstHeading = blocks.find((block) => block.tag === "h1")?.text;
  const fallbackHeading = blocks.find((block) => /^h[2-4]$/.test(block.tag))?.text;
  const heading = firstHeading || fallbackHeading || title;
  const body = blocks.filter((block) => block.text !== heading);

  return {
    path: route,
    slug: route.replace(/^\/|\/$/g, ""),
    type: route.startsWith("/products/") ? "product"
      : route.startsWith("/services/") ? "service"
      : route.startsWith("/project/") ? "project"
      : ["การใช้งานพุกเคมี", "ตารางพุกเคมี", "พุกตะกั่ว"].some((part) => route.includes(part)) ? "article"
      : "page",
    title,
    heading,
    description: description || clean(body.find((block) => block.tag === "p")?.text).slice(0, 155),
    canonical,
    blocks: body,
    images,
    internalLinks: [...internalLinks],
    sourceFile: file.slice(sourceRoot.length + 1),
  };
}

await mkdir(migrationDir, { recursive: true });
await mkdir(assetOutput, { recursive: true });

const discovered = await discoverHtmlFiles();
const pages = [];
for (const { route, file } of discovered) {
  if (retainedRoutes.has(route) || redirectTargetFor(route)) continue;
  pages.push(await extractPage(route, file));
}

const inventoryRows = [
  ["old_url", "action", "new_url", "type", "title", "blocks", "images", "source_file"],
];
for (const { route, file } of discovered) {
  const redirect = redirectTargetFor(route);
  const page = pages.find((item) => item.path === route);
  inventoryRows.push([
    route,
    redirect ? "redirect" : retainedRoutes.has(route) ? "handcrafted" : "migrated",
    redirect || route,
    page?.type || "",
    page?.title || "",
    page?.blocks.length || "",
    page?.images.length || "",
    file.slice(sourceRoot.length + 1),
  ]);
}

for (const { route } of discovered) {
  const target = redirectTargetFor(route);
  if (target && !redirects.some(([from]) => from === route)) {
    redirects.push([route, target, 301, "Consolidate legacy taxonomy or utility route"]);
  }
}

const redirectCsv = [
  ["old_url", "new_url", "status", "reason"],
  ...redirects,
].map((row) => row.map(csv).join(",")).join("\n");

const netlifyRedirects = redirects
  .map(([from, to, status]) => `${encodeURI(from)} ${encodeURI(to)} ${status}`)
  .join("\n");

await writeFile(outputData, `${JSON.stringify(pages, null, 2)}\n`);
await writeFile(join(migrationDir, "content-inventory.csv"), `${inventoryRows.map((row) => row.map(csv).join(",")).join("\n")}\n`);
await writeFile(join(migrationDir, "redirects.csv"), `${redirectCsv}\n`);
await writeFile(join(projectRoot, "public/_redirects"), `${netlifyRedirects}\n`);

const assetCount = (await Promise.all(
  pages.flatMap((page) => page.images.map(async (image) => {
    try { return (await stat(join(projectRoot, "public", image.src))).size; } catch { return 0; }
  })),
)).length;

console.log(JSON.stringify({
  discovered: discovered.length,
  handcrafted: discovered.filter(({ route }) => retainedRoutes.has(route)).length,
  migrated: pages.length,
  redirects: redirects.length,
  referencedAssets: assetCount,
}, null, 2));
