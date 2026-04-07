import { z } from "zod";

// Step 1 — Assured & Owner
export const step1Schema = z.object({
  assuredName: z.string().min(1),
  assuredAddress: z.string().min(1),
  assuredCity: z.string().min(1),
  assuredCountry: z.string().min(1),
  uboName: z.string().min(1),
  uboDob: z.string().min(1),
  uboNationality: z.string().min(1),
  uboEmail: z.string().email(),
  uboPhone: z.string().min(1),
});

// Step 2 — The Vessel
export const step2Schema = z.object({
  vesselName: z.string().min(1),
  vesselType: z.enum(["motor", "sail"]),
  vesselBuilder: z.string().min(1),
  vesselYear: z.string().min(1),
  vesselFlag: z.string().min(1),
  vesselLength: z.string().min(1),
  vesselBeam: z.string().min(1),
  vesselTonnage: z.string().optional(),
  vesselIMO: z.string().optional(),
  vesselPortRegistry: z.string().optional(),
  vesselHomePort: z.string().min(1),
  vesselMaterial: z.string().min(1),
  vesselValue: z.string().min(1),
  vesselPassengers: z.string().optional(),
  vesselClass: z.string().optional(),
  vesselEngines: z.string().optional(),
});

// Step 3 — Use & Coverages
export const step3Schema = z.object({
  cruisingRange: z.string().min(1),
  cruisingOtherDetail: z.string().optional(),
  usageType: z.string().min(1),
  coverages: z.array(z.string()).min(1),
});

// Step 4 — Claims History
export const step4Schema = z.object({
  claimsHas: z.enum(["yes", "no"]),
  claimsDetail: z.string().optional(),
});

// Step 5 — Crew
export const step5Schema = z.object({
  crewPermanent: z.string().min(1),
  crewTemporary: z.string().optional(),
});

// Step 6 — Tenders & Financing
export const step6Schema = z.object({
  tendersDesc: z.string().optional(),
  financingType: z.enum(["own", "leased"]),
  financingBank: z.string().optional(),
});

// Step 7 — Documents & Declaration
export const step7Schema = z.object({
  declaration: z.literal(true),
  consent: z.literal(true),
});

export const yachtQuoteSchema = step1Schema
  .merge(step2Schema)
  .merge(step3Schema)
  .merge(step4Schema)
  .merge(step5Schema)
  .merge(step6Schema)
  .merge(step7Schema);

export type YachtQuoteData = z.infer<typeof yachtQuoteSchema>;
