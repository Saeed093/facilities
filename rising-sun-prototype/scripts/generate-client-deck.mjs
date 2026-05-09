/**
 * Captures all prototype screens and writes:
 *   client-deck/Rising-Sun-Prototype-All-Screens.pdf
 *   client-deck/Rising-Sun-Prototype-All-Screens.pptx
 *
 * Usage: npm run generate:deck
 * Requires: npm run build (done automatically), Playwright Chromium
 */

import { chromium } from "playwright";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import PptxGenJS from "pptxgenjs";
import { mkdir, readFile, rm, writeFile } from "fs/promises";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { execSync, spawn } from "child_process";

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, "..");
const outDir = join(projectRoot, "client-deck");
const tmpDir = join(outDir, ".tmp-screens");
const baseUrl = "http://127.0.0.1:3100";
const startPort = 3100;

/** @type {{ path: string, title: string, layout: 'mobile' | 'desktop' }[]} */
const ROUTES = [
  { path: "/", title: "Landing — Choose Member App or Admin", layout: "desktop" },
  { path: "/member/login", title: "Member — Login", layout: "mobile" },
  { path: "/member/register", title: "Member — Registration", layout: "mobile" },
  { path: "/member/application", title: "Member — Membership Application", layout: "mobile" },
  { path: "/member/status", title: "Member — Application Status", layout: "mobile" },
  { path: "/member/home", title: "Member — Home", layout: "mobile" },
  { path: "/member/id-card", title: "Member — Digital Membership ID", layout: "mobile" },
  { path: "/member/facilities", title: "Member — Facilities List", layout: "mobile" },
  {
    path: "/member/facilities/gym",
    title: "Member — Facility Detail (Gym)",
    layout: "mobile",
  },
  { path: "/member/book", title: "Member — Book Facility", layout: "mobile" },
  { path: "/member/bookings", title: "Member — My Bookings", layout: "mobile" },
  { path: "/member/payments", title: "Member — Payments & Dues", layout: "mobile" },
  {
    path: "/member/payment-proof",
    title: "Member — Upload Payment Proof",
    layout: "mobile",
  },
  { path: "/member/notifications", title: "Member — Notifications", layout: "mobile" },
  { path: "/member/complaints", title: "Member — Complaint / Feedback", layout: "mobile" },
  { path: "/member/profile", title: "Member — Profile", layout: "mobile" },
  { path: "/admin/login", title: "Admin — Login", layout: "desktop" },
  { path: "/admin/dashboard", title: "Admin — Dashboard Home", layout: "desktop" },
  {
    path: "/admin/applications",
    title: "Admin — Applications Management",
    layout: "desktop",
  },
  { path: "/admin/members", title: "Admin — Members Management", layout: "desktop" },
  {
    path: "/admin/members/RS-MEM-0245",
    title: "Admin — Member Detail",
    layout: "desktop",
  },
  {
    path: "/admin/facilities",
    title: "Admin — Facility Management",
    layout: "desktop",
  },
  { path: "/admin/bookings", title: "Admin — Booking Management", layout: "desktop" },
  { path: "/admin/calendar", title: "Admin — Booking Calendar", layout: "desktop" },
  { path: "/admin/payments", title: "Admin — Payment Management", layout: "desktop" },
  { path: "/admin/check-in", title: "Admin — Member Check-In", layout: "desktop" },
  { path: "/admin/reports", title: "Admin — Reports", layout: "desktop" },
  {
    path: "/admin/complaints",
    title: "Admin — Complaints Management",
    layout: "desktop",
  },
  {
    path: "/admin/notifications",
    title: "Admin — Notifications Management",
    layout: "desktop",
  },
  { path: "/admin/staff", title: "Admin — Staff & Roles", layout: "desktop" },
  { path: "/admin/settings", title: "Admin — Settings", layout: "desktop" },
];

function slugify(path) {
  return path.replace(/^\//, "").replace(/\//g, "_") || "root";
}

async function waitForServer(url, attempts = 90) {
  for (let i = 0; i < attempts; i++) {
    try {
      const res = await fetch(url, { signal: AbortSignal.timeout(2000) });
      if (res.ok || res.status === 404) return;
    } catch {
      /* retry */
    }
    await new Promise((r) => setTimeout(r, 1000));
  }
  throw new Error(`Server did not respond at ${url}`);
}

async function captureScreenshots() {
  await mkdir(tmpDir, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const shots = [];

  try {
    for (const route of ROUTES) {
      const viewport =
        route.layout === "mobile"
          ? { width: 430, height: 932 }
          : { width: 1440, height: 900 };

      const context = await browser.newContext({
        viewport,
        deviceScaleFactor: route.layout === "mobile" ? 2 : 1,
      });
      const page = await context.newPage();

      const url = `${baseUrl}${route.path}`;
      await page.goto(url, { waitUntil: "networkidle", timeout: 60000 });
      await new Promise((r) => setTimeout(r, 600));

      const fileSafe = slugify(route.path);
      const pngPath = join(tmpDir, `${fileSafe}.png`);

      await page.screenshot({
        path: pngPath,
        fullPage: true,
        type: "png",
      });

      shots.push({
        title: route.title,
        path: pngPath,
        layout: route.layout,
      });

      await context.close();
    }
  } finally {
    await browser.close();
  }

  return shots;
}

async function buildPdf(shots, pdfPath) {
  const pdfDoc = await PDFDocument.create();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  const coverW = 595;
  const coverH = 842;
  const cover = pdfDoc.addPage([coverW, coverH]);
  cover.drawText("Rising Sun", {
    x: 60,
    y: coverH - 120,
    size: 28,
    font: fontBold,
    color: rgb(0.043, 0.122, 0.227),
  });
  cover.drawText("Sports Facilities Management — Frontend prototype", {
    x: 60,
    y: coverH - 165,
    size: 14,
    font,
    color: rgb(0.15, 0.2, 0.28),
  });
  cover.drawText("Screen catalog for client review", {
    x: 60,
    y: coverH - 195,
    size: 11,
    font,
    color: rgb(0.35, 0.38, 0.42),
  });
  const dateStr = new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  cover.drawText(dateStr, {
    x: 60,
    y: coverH - 225,
    size: 10,
    font,
    color: rgb(0.45, 0.47, 0.5),
  });
  cover.drawText(`${shots.length} screens`, {
    x: 60,
    y: coverH - 255,
    size: 10,
    font,
    color: rgb(0.45, 0.47, 0.5),
  });

  const maxPageWidth = 595;
  const captionH = 26;

  for (const shot of shots) {
    const bytes = await readFile(shot.path);
    const img = await pdfDoc.embedPng(bytes);
    const scale = maxPageWidth / img.width;
    const w = img.width * scale;
    const h = img.height * scale;
    const page = pdfDoc.addPage([w, h + captionH]);
    page.drawImage(img, {
      x: 0,
      y: captionH,
      width: w,
      height: h,
    });
    page.drawText(shot.title, {
      x: 12,
      y: 10,
      size: 8,
      font,
      color: rgb(0.2, 0.22, 0.28),
    });
  }

  const pdfBytes = await pdfDoc.save();
  await writeFile(pdfPath, pdfBytes);
}

async function buildPptx(shots, pptxPath) {
  const pptx = new PptxGenJS();
  pptx.author = "Rising Sun Prototype";
  pptx.title = "Rising Sun — All screens";
  pptx.defineLayout({ name: "LAYOUT_16x9", width: 13.333, height: 7.5 });
  pptx.layout = "LAYOUT_16x9";

  const titleSlide = pptx.addSlide();
  titleSlide.background = { color: "F8FAFC" };
  titleSlide.addText("Rising Sun", {
    x: 0.8,
    y: 2.2,
    w: 11.7,
    h: 1.2,
    fontSize: 44,
    bold: true,
    color: "0B1F3A",
    align: "center",
  });
  titleSlide.addText("Sports Facilities Management — Frontend prototype", {
    x: 0.8,
    y: 3.5,
    w: 11.7,
    h: 0.6,
    fontSize: 18,
    color: "0E5F4F",
    align: "center",
  });
  titleSlide.addText("Screen catalog · " + new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }), {
    x: 0.8,
    y: 4.4,
    w: 11.7,
    h: 0.5,
    fontSize: 14,
    color: "64748B",
    align: "center",
  });

  for (const shot of shots) {
    const slide = pptx.addSlide();
    slide.background = { color: "FFFFFF" };
    slide.addText(shot.title, {
      x: 0.4,
      y: 0.15,
      w: 12.5,
      h: 0.45,
      fontSize: 13,
      bold: true,
      color: "0B1F3A",
    });
    slide.addImage({
      path: shot.path,
      x: 0.35,
      y: 0.65,
      w: 12.6,
      h: 6.55,
      sizing: { type: "contain", w: 12.6, h: 6.55 },
    });
  }

  await pptx.writeFile({ fileName: pptxPath });
}

async function main() {
  console.log("Building Next.js app…");
  execSync("npm run build", { cwd: projectRoot, stdio: "inherit" });

  await mkdir(outDir, { recursive: true });

  console.log(`Starting production server on port ${startPort}…`);
  const server = spawn(
    process.platform === "win32" ? "npx.cmd" : "npx",
    ["next", "start", "-p", String(startPort)],
    {
      cwd: projectRoot,
      shell: true,
      stdio: "ignore",
      detached: false,
    }
  );

  try {
    await waitForServer(`${baseUrl}/`);
    console.log("Capturing screenshots…");
    const shots = await captureScreenshots();

    const pdfPath = join(outDir, "Rising-Sun-Prototype-All-Screens.pdf");
    const pptxPath = join(outDir, "Rising-Sun-Prototype-All-Screens.pptx");

    console.log("Writing PDF…");
    await buildPdf(shots, pdfPath);

    console.log("Writing PowerPoint…");
    await buildPptx(shots, pptxPath);

    console.log("\nDone:");
    console.log(" ", pdfPath);
    console.log(" ", pptxPath);

    await rm(tmpDir, { recursive: true, force: true });
  } finally {
    server.kill("SIGTERM");
    await new Promise((r) => setTimeout(r, 1500));
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
