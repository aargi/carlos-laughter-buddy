import { z } from "zod";

const requiredText = (max: number) => z.string().trim().min(1, "This field is required.").max(max, `Use no more than ${max} characters.`);
export const professionalApplicationSchema = z.object({
  name: requiredText(100),
  email: z.string().trim().email("Enter a valid email address.").max(254).transform((value) => value.toLowerCase()),
  city: requiredText(100),
  country: requiredText(100),
  languages: requiredText(200),
  professionalRole: z.enum(["teacher", "leader", "other"], { errorMap: () => ({ message: "Choose your professional role." }) }),
  certificationYear: z.preprocess((value) => value === "" || value === undefined ? null : value, z.coerce.number().int().min(1900).max(9999).nullable()),
  sessionFormats: z.array(z.enum(["online", "in_person"])).min(1, "Choose at least one session format.").max(2).refine((values) => new Set(values).size === values.length),
  professionalUrl: z.string().trim().max(500).refine((value) => {
    if (!value) return true;
    try { const url = new URL(value); return ["http:", "https:"].includes(url.protocol) && !url.username && !url.password; } catch { return false; }
  }, "Enter a full http:// or https:// website address, or leave it blank."),
});

export type ProfessionalApplication = z.infer<typeof professionalApplicationSchema>;