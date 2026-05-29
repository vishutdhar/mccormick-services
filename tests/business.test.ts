import { describe, it, expect } from "vitest";
import {
  BUSINESS,
  formatTelHref,
  formatSmsHref,
  formatPhoneDisplay,
  groupedBusinessHours,
  PRIMARY_PHONE,
  SECONDARY_PHONE,
  SERVICES,
  SERVICE_AREA_CITIES,
} from "@/lib/business";

describe("business constants", () => {
  it("exposes the legal business name and owner", () => {
    expect(BUSINESS.name).toBe("McCormick Services");
    expect(BUSINESS.owner).toBe("Mike McCormick");
    expect(BUSINESS.areaServed).toMatch(/Macomb County/i);
    expect(BUSINESS.state).toBe("MI");
  });

  it("lists all four card services in display order", () => {
    expect(SERVICES.map((s) => s.title)).toEqual([
      "Power Washing",
      "Painting",
      "Lawn Care",
      "Fall Cleaning",
    ]);
    for (const s of SERVICES) {
      expect(s.slug).toMatch(/^[a-z0-9-]+$/);
      expect(s.description.length).toBeGreaterThan(10);
    }
  });

  it("formats US phone numbers to E.164 tel: hrefs", () => {
    expect(formatTelHref("586-909-0027")).toBe("tel:+15869090027");
    expect(formatTelHref("(586) 840-6888")).toBe("tel:+15868406888");
  });

  it("formats US phone numbers to sms: hrefs", () => {
    expect(formatSmsHref("586-840-6888")).toBe("sms:+15868406888");
    expect(formatSmsHref("(586) 909-0027")).toBe("sms:+15869090027");
  });

  it("formats US phone numbers for human display", () => {
    expect(formatPhoneDisplay("5869090027")).toBe("(586) 909-0027");
    expect(formatPhoneDisplay("586-909-0027")).toBe("(586) 909-0027");
  });

  it("exposes both phone numbers from the business card", () => {
    expect(PRIMARY_PHONE).toBe("586-909-0027");
    expect(SECONDARY_PHONE).toBe("586-840-6888");
  });

  it("includes a non-empty service area cities list", () => {
    expect(SERVICE_AREA_CITIES.length).toBeGreaterThanOrEqual(4);
    for (const city of SERVICE_AREA_CITIES) {
      expect(city).toMatch(/^[A-Z][A-Za-z. ]+$/);
    }
  });

  it("groups opening hours into human ranges with closed days marked", () => {
    // Spec: collapse runs of identical days, 12-hour display, any day absent
    // from BUSINESS.hours shows as "Closed". Current data = Mon–Fri 8–18,
    // Sat 9–15, no Sunday.
    expect(groupedBusinessHours()).toEqual([
      { days: "Mon–Fri", hours: "8 AM – 6 PM" },
      { days: "Sat", hours: "9 AM – 3 PM" },
      { days: "Sun", hours: "Closed" },
    ]);
  });
});
