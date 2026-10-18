import { describe, expect, it } from "vitest";
import { professionalApplicationSchema as schema } from "./professional-applications";

const application = { name: "Test facilitator", email: "teacher@example.com", city: "Barcelona", country: "Spain", languages: "English, Spanish", professionalRole: "teacher", certificationYear: "", sessionFormats: ["online"], professionalUrl: "" };

describe("professional directory applications", () => {
  for (const field of ["name", "email", "city", "country", "languages"]) {
    it(`requires ${field}`, () => expect(schema.safeParse({ ...application, [field]: "" }).success).toBe(false));
  }
  it("allows teacher, leader and other roles", () => {
    for (const role of ["teacher", "leader", "other"]) expect(schema.safeParse({ ...application, professionalRole: role }).success).toBe(true);
    expect(schema.safeParse({ ...application, professionalRole: "admin" }).success).toBe(false);
  });
  it("makes certification year optional", () => expect(schema.parse(application).certificationYear).toBeNull());
  it("accepts a certification year but not a fraction", () => {
    expect(schema.parse({ ...application, certificationYear: "2020" }).certificationYear).toBe(2020);
    expect(schema.safeParse({ ...application, certificationYear: 2020.5 }).success).toBe(false);
  });
  it("requires online or in-person session availability", () => {
    expect(schema.safeParse({ ...application, sessionFormats: [] }).success).toBe(false);
    expect(schema.safeParse({ ...application, sessionFormats: ["online", "in_person"] }).success).toBe(true);
    expect(schema.safeParse({ ...application, sessionFormats: ["unknown"] }).success).toBe(false);
  });
  it("makes a professional website optional and rejects unsafe links", () => {
    expect(schema.safeParse(application).success).toBe(true);
    expect(schema.safeParse({ ...application, professionalUrl: "https://example.com/profile" }).success).toBe(true);
    expect(schema.safeParse({ ...application, professionalUrl: "javascript:alert(1)" }).success).toBe(false);
  });
});