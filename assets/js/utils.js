// Pure helpers shared by main.js and the test suite.
// Keep this file dependency-free — no DOM, no globals.

export function slugify(s) {
  return String(s).toLowerCase().trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);
}

export function readingTime(text) {
  const words = String(text || "").trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

export function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  }[c]));
}

export function escapeAttr(s) { return escapeHtml(s); }

export function byDateDesc(a, b) {
  return (b.date || "").localeCompare(a.date || "");
}

export function routeFromPath(pathname) {
  const p = pathname || "/";
  return p === "" ? "/" : p;
}
