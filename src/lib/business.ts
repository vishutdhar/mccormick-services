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
