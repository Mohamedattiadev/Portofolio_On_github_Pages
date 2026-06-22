#!/usr/bin/env node
// Random-weekly journal publisher.
// Picks one unpublished post from posts/queue/, appends to assets/data/journal.json.
// Only runs if (a) this week has no published post yet, AND (b) current day/hour matches
// the deterministic random slot for this ISO week.
//
// Usage:
//   node scripts/publish-post.mjs            # respects schedule
//   node scripts/publish-post.mjs --force    # ignore schedule, publish now
//   node scripts/publish-post.mjs --dry-run  # show what it would do

import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const QUEUE_DIR     = path.join(ROOT, "posts", "queue");
const PUBLISHED_LOG = path.join(ROOT, "posts", "published.json");
const JOURNAL_FILE  = path.join(ROOT, "assets", "data", "journal.json");

const FORCE   = process.argv.includes("--force");
const DRY_RUN = process.argv.includes("--dry-run");

const now = new Date();
const isoWeek = getISOWeek(now);            // e.g. "2026-W26"
const log = readJSON(PUBLISHED_LOG);
log.weeks  ??= {};
log.slugs  ??= [];

// Already published this week?
if (!FORCE && log.weeks[isoWeek]) {
  console.log(`[skip] already published this week: ${log.weeks[isoWeek]}`);
  process.exit(0);
}

// Deterministic random slot per week (day-of-week + hour-of-day).
const slot = pickSlot(isoWeek);
if (!FORCE) {
  const dow = now.getUTCDay();              // 0=Sun..6=Sat
  const hr  = now.getUTCHours();
  if (dow !== slot.day || hr !== slot.hour) {
    console.log(`[skip] slot for ${isoWeek} = day ${slot.day} hour ${slot.hour} UTC. Now: day ${dow} hour ${hr}.`);
    process.exit(0);
  }
}

// Pick an unpublished post.
const queue = fs.readdirSync(QUEUE_DIR)
  .filter((f) => f.endsWith(".md"))
  .map((f) => parsePost(path.join(QUEUE_DIR, f)))
  .filter((p) => !log.slugs.includes(p.slug));

if (!queue.length) {
  console.log("[done] queue empty. Add more posts to posts/queue/ and they will publish next week.");
  process.exit(0);
}

const pickIdx = seededInt(isoWeek + ":pick", queue.length);
const picked = queue[pickIdx];
const dateStr = now.toISOString().slice(0, 10);

const entry = {
  id: `auto_${picked.slug}_${dateStr}`,
  title: picked.title,
  date: dateStr,
  body: picked.body,
  source: "auto",
};

console.log(`[pick] week ${isoWeek}: "${picked.title}" (${picked.slug})`);
if (DRY_RUN) { console.log("[dry-run] no files written."); process.exit(0); }

const journal = readJSON(JOURNAL_FILE);
journal.unshift(entry);
writeJSON(JOURNAL_FILE, journal);

log.weeks[isoWeek] = picked.slug;
log.slugs.push(picked.slug);
writeJSON(PUBLISHED_LOG, log);

console.log(`[ok] published "${picked.title}" → ${JOURNAL_FILE}`);

/* ---------- helpers ---------- */

function readJSON(p) {
  try { return JSON.parse(fs.readFileSync(p, "utf8")); }
  catch { return Array.isArray(p) ? [] : {}; }
}
function writeJSON(p, data) {
  fs.writeFileSync(p, JSON.stringify(data, null, 2) + "\n");
}
function parsePost(file) {
  const raw = fs.readFileSync(file, "utf8");
  const m = raw.match(/^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/);
  const meta = {};
  let body = raw;
  if (m) {
    body = m[2].trim();
    m[1].split("\n").forEach((line) => {
      const idx = line.indexOf(":");
      if (idx > 0) meta[line.slice(0, idx).trim()] = line.slice(idx + 1).trim();
    });
  }
  return {
    title: meta.title || path.basename(file, ".md"),
    slug:  meta.slug  || path.basename(file, ".md"),
    body,
  };
}
function getISOWeek(d) {
  const t = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
  const dn = t.getUTCDay() || 7;
  t.setUTCDate(t.getUTCDate() + 4 - dn);
  const yearStart = new Date(Date.UTC(t.getUTCFullYear(), 0, 1));
  const week = Math.ceil(((t - yearStart) / 86400000 + 1) / 7);
  return `${t.getUTCFullYear()}-W${String(week).padStart(2, "0")}`;
}
function seededInt(seed, mod) {
  const h = crypto.createHash("sha256").update(seed).digest();
  return h.readUInt32BE(0) % mod;
}
function pickSlot(seed) {
  return { day: seededInt(seed + ":day", 7), hour: seededInt(seed + ":hour", 24) };
}
