export const PRIMARY_PHONE = "586-909-0027";
export const SECONDARY_PHONE = "586-840-6888";

export const BUSINESS = {
  name: "McCormick Services",
  owner: "Mike McCormick",
  tagline:
    "Power washing, painting, lawn care, and fall cleaning across Macomb County, Michigan.",
  areaServed: "Macomb County, Michigan",
  state: "MI",
  country: "US",
  priceRange: "$$",
  url: "https://mccormick-services.vercel.app",
  hours: [
    { day: "Monday", open: "08:00", close: "18:00" },
    { day: "Tuesday", open: "08:00", close: "18:00" },
    { day: "Wednesday", open: "08:00", close: "18:00" },
    { day: "Thursday", open: "08:00", close: "18:00" },
    { day: "Friday", open: "08:00", close: "18:00" },
    { day: "Saturday", open: "09:00", close: "15:00" },
  ],
} as const;

export const SERVICES = [
  {
    slug: "power-washing",
    title: "Power Washing",
    description:
      "Driveways, siding, decks, patios, and fences brought back to life.",
  },
  {
    slug: "painting",
    title: "Painting",
    description:
      "Interior and exterior painting with clean lines and tidy workspaces.",
  },
  {
    slug: "lawn-care",
    title: "Lawn Care",
    description:
      "Mowing, edging, trimming, and seasonal upkeep on a schedule that works for you.",
  },
  {
    slug: "fall-cleaning",
    title: "Fall Cleaning",
    description:
      "Leaf removal, gutter clearing, and yard prep before the snow flies.",
  },
] as const;

export const SERVICE_AREA_CITIES = [
  "Sterling Heights",
  "Warren",
  "Macomb Township",
  "Clinton Township",
  "Shelby Township",
  "Roseville",
  "Eastpointe",
  "St. Clair Shores",
] as const;

/**
 * Human-facing opening hours, grouped into ranges (e.g. "Mon–Fri" → "8 AM – 6 PM")
 * with any day missing from BUSINESS.hours shown as "Closed". Derived from the
 * same BUSINESS.hours that feeds the JSON-LD, so the visible hours can never
 * drift from the structured data. This is UX expectation-setting (when to call),
 * NOT an SEO signal — Google reads hours from the Business Profile, not the page.
 */
const WEEK = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
] as const;

const DAY_ABBR: Record<(typeof WEEK)[number], string> = {
  Monday: "Mon",
  Tuesday: "Tue",
  Wednesday: "Wed",
  Thursday: "Thu",
  Friday: "Fri",
  Saturday: "Sat",
  Sunday: "Sun",
};

function to12Hour(time: string): string {
  const [h, m] = time.split(":").map(Number);
  const period = h < 12 ? "AM" : "PM";
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return m === 0
    ? `${hour12} ${period}`
    : `${hour12}:${String(m).padStart(2, "0")} ${period}`;
}

export type HoursLine = { days: string; hours: string };

export function groupedBusinessHours(): HoursLine[] {
  const byDay = new Map<string, string>(
    BUSINESS.hours.map((h) => [
      h.day,
      `${to12Hour(h.open)} – ${to12Hour(h.close)}`,
    ]),
  );
  const valueFor = (day: (typeof WEEK)[number]) => byDay.get(day) ?? "Closed";

  const lines: HoursLine[] = [];
  let i = 0;
  while (i < WEEK.length) {
    const value = valueFor(WEEK[i]);
    let j = i;
    while (j + 1 < WEEK.length && valueFor(WEEK[j + 1]) === value) j++;
    const label =
      i === j
        ? DAY_ABBR[WEEK[i]]
        : `${DAY_ABBR[WEEK[i]]}–${DAY_ABBR[WEEK[j]]}`;
    lines.push({ days: label, hours: value });
    i = j + 1;
  }
  return lines;
}

const digitsOnly = (phone: string): string => phone.replace(/\D+/g, "");

export function formatTelHref(phone: string): string {
  const digits = digitsOnly(phone);
  if (digits.length === 10) return `tel:+1${digits}`;
  if (digits.length === 11 && digits.startsWith("1")) return `tel:+${digits}`;
  throw new Error(`formatTelHref: unsupported phone number: ${phone}`);
}

export function formatSmsHref(phone: string): string {
  const digits = digitsOnly(phone);
  if (digits.length === 10) return `sms:+1${digits}`;
  if (digits.length === 11 && digits.startsWith("1")) return `sms:+${digits}`;
  throw new Error(`formatSmsHref: unsupported phone number: ${phone}`);
}

export function formatPhoneDisplay(phone: string): string {
  const digits = digitsOnly(phone);
  const ten =
    digits.length === 11 && digits.startsWith("1") ? digits.slice(1) : digits;
  if (ten.length !== 10)
    throw new Error(
      `formatPhoneDisplay: expected 10 digits, got ${phone}`
    );
  return `(${ten.slice(0, 3)}) ${ten.slice(3, 6)}-${ten.slice(6)}`;
}
