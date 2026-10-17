import { describe, expect, it } from "vitest";
import { plannedProfessionalRequest as requirements } from "./professional-requests";

describe("planned professional session requests", () => {
  it("requires at least 7 days of advance notice", () => {
    expect(requirements.minimumNoticeDays).toBe(7);
  });
  it("does not require a credit card", () => {
    expect(requirements.creditCardRequired).toBe(false);
  });
  it("requires email or contact details", () => {
    expect(requirements.contactRequired).toBe(true);
  });
  it("requires a date", () => {
    expect(requirements.dateRequired).toBe(true);
  });
  it("makes the time optional", () => {
    expect(requirements.timeRequired).toBe(false);
  });
  it("requires an in-person or online format", () => {
    expect(requirements.formatRequired).toBe(true);
    expect(requirements.formats).toEqual(["In person", "Online"]);
  });
  it("requires the number of participants", () => {
    expect(requirements.participantCountRequired).toBe(true);
  });
});