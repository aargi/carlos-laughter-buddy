// Pure scheduling helpers (no I/O). ISO weekdays: 1 = Monday … 7 = Sunday.

export type Schedule = { timezone: string; days: number[]; time: string };

export function isValidTimezone(tz: string): boolean {
  try {
    new Intl.DateTimeFormat("en-US", { timeZone: tz });
    return true;
  } catch {
    return false;
  }
}

export function parseTime(time: string): { h: number; m: number } | null {
  const m = /^([01]\d|2[0-3]):([0-5]\d)$/.exec(time);
  return m ? { h: Number(m[1]), m: Number(m[2]) } : null;
}

function parts(ts: number, tz: string) {
  const f = new Intl.DateTimeFormat("en-US", {
    timeZone: tz, hourCycle: "h23", year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit", second: "2-digit", weekday: "short",
  });
  const p: Record<string, string> = {};
  for (const x of f.formatToParts(new Date(ts))) p[x.type] = x.value;
  const wd = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].indexOf(p['weekday']!) + 1;
  return { y: +p['year']!, mo: +p['month']!, d: +p['day']!, h: +p['hour']!, mi: +p['minute']!, s: +p['second']!, wd };
}

/** Offset (ms) of tz at instant ts: local wall clock minus UTC. */
export function tzOffset(ts: number, tz: string): number {
  const p = parts(ts, tz);
  return Date.UTC(p.y, p.mo - 1, p.d, p.h, p.mi, p.s) - Math.floor(ts / 1000) * 1000;
}

/** UTC instant for a local wall-clock time in tz (DST gaps roll forward). */
export function zonedToUtc(y: number, mo: number, d: number, h: number, mi: number, tz: string): number {
  const guess = Date.UTC(y, mo - 1, d, h, mi);
  let t = guess - tzOffset(guess, tz);
  t = guess - tzOffset(t, tz);
  return t;
}

/**
 * Scheduled slot instants in (now - windowMs, now]. The scheduler inserts these with
 * ON CONFLICT DO NOTHING, so each slot is posted at most once even if runs overlap.
 */
export function dueSlots(s: Schedule, now: Date, windowMs = 60 * 60 * 1000): Date[] {
  const t = parseTime(s.time);
  if (!t || !isValidTimezone(s.timezone)) return [];
  const out: Date[] = [];
  const nowMs = now.getTime();
  for (const back of [0, 1]) {
    const day = parts(nowMs - back * 86400000, s.timezone);
    if (!s.days.includes(day.wd)) continue;
    const slot = zonedToUtc(day.y, day.mo, day.d, t.h, t.m, s.timezone);
    if (slot <= nowMs && slot > nowMs - windowMs) out.push(new Date(slot));
  }
  return out;
}

/** Next upcoming slot after `now` (for display). */
export function nextSlot(s: Schedule, now: Date): Date | null {
  const t = parseTime(s.time);
  if (!t || !isValidTimezone(s.timezone) || s.days.length === 0) return null;
  for (let i = 0; i < 8; i++) {
    const day = parts(now.getTime() + i * 86400000, s.timezone);
    if (!s.days.includes(day.wd)) continue;
    const slot = zonedToUtc(day.y, day.mo, day.d, t.h, t.m, s.timezone);
    if (slot > now.getTime()) return new Date(slot);
  }
  return null;
}
