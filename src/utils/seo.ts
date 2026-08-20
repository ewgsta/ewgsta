export interface BreadcrumbItem {
  name: string;
  path: string;
}

/** Truncates text to ~max chars, cutting at a word boundary and appending an ellipsis. */
export function truncate(text: string, max = 160): string {
  const clean = String(text ?? '').replace(/\s+/g, ' ').trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max);
  const lastSpace = cut.lastIndexOf(' ');
  const end = lastSpace > max * 0.6 ? lastSpace : max;
  return `${clean.slice(0, end).replace(/[,;:\s]+$/, '')}…`;
}

/** Strips markdown syntax from raw body text, leaving readable plain text. */
export function stripMarkdown(md: string): string {
  return String(md ?? '')
    .replace(/^---[\s\S]*?---/, '')
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`[^`]*`/g, '')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/^\s{0,3}#{1,6}\s+/gm, '')
    .replace(/^\s{0,3}>\s?/gm, '')
    .replace(/^\s*[-*+]\s+/gm, ' ')
    .replace(/^\s*\d+\.\s+/gm, ' ')
    .replace(/^\s*\|/gm, ' ')
    .replace(/\|\s*$/gm, ' ')
    .replace(/\|/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/** Generates a meta description from raw markdown body, falling back if empty. */
export function buildDescription(
  body: string | undefined | null,
  fallback = ''
): string {
  const text = stripMarkdown(body ?? '');
  return truncate(text, 160) || fallback;
}

/** Generates a description for listing pages from the item titles. */
export function listDescription(
  label: string,
  siteTitle: string,
  titles: string[] = []
): string {
  const names = titles.filter((t) => Boolean(t && t.trim())).slice(0, 4);
  if (names.length === 0) return truncate(`${label} by ${siteTitle}.`, 160);
  return truncate(`${label} — ${names.join(', ')}.`, 160);
}

/** Normalizes a Date or ISO string to an ISO timestamp string ('' if invalid). */
export function toISODate(date: Date | string | undefined | null): string {
  if (!date) return '';
  const d = date instanceof Date ? date : new Date(date);
  return isNaN(d.getTime()) ? '' : d.toISOString();
}
