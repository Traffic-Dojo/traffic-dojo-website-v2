import { z } from "zod";
import parsePhoneNumber from "libphonenumber-js";

export const CurrentSituationSchema = z.object({
  situation: z.enum(["new", "working", "looking"]),
});

export const TargetMarketSchema = z.object({
  market: z.enum(["consumers", "business", "commerce", "other"]),
});

export const MarketingNeedsSchema = z.object({
  needs: z
    .array(
      z.enum([
        "website",
        "website+",
        "leads",
        "leads+",
        "refresh",
        "marketing partner",
        "SEO",
        "paid media partner",
        "social media partner",
      ]),
    )
    .min(1, "Please select at least one option"),
});

export const MarketingBudgetSchema = z.object({
  budget: z.enum([
    "1000",
    "1000-2000",
    "2000-5000",
    "5000-10000",
    "10000-25000",
    "25000+",
  ]),
});

export const BusinessInformationSchema = z.object({
  name: z.string().trim().min(1, "Enter your name").max(100),
  email: z.string().trim().email("Invalid email").max(254),
  business: z.string().trim().min(1, "Enter your business name").max(200),
  website: z.preprocess(
    (value) => {
      if (typeof value !== "string") return value;
      const trimmed = value.trim();
      if (!trimmed) return undefined;
      return /^[a-z][a-z0-9+.-]*:/i.test(trimmed) ? trimmed : `https://${trimmed}`;
    },
    z.string().max(2000).url("Invalid website").refine(
      (value) => {
        try { return ["https:", "http:"].includes(new URL(value).protocol); }
        catch { return false; }
      },
      "Enter an http or https website",
    ).optional(),
  ),
  comment: z.string().trim().max(4000).optional(),
  phone: z.string().max(40).refine(
    (value) => {
      const phoneNumber = parsePhoneNumber(value);

      if (!phoneNumber) {
        return false;
      }

      return phoneNumber.isValid();
    },
    {
      message: "Invalid phone number",
    },
  ),
});

export const ProposalSchema = z.object({})
  .merge(CurrentSituationSchema)
  .merge(TargetMarketSchema)
  .merge(MarketingNeedsSchema)
  .merge(MarketingBudgetSchema)
  .merge(BusinessInformationSchema);
