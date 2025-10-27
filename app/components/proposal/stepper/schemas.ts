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
  name: z.string().min(1, "Enter your name"),
  email: z.string().email("Invalid email"),
  business: z.string().min(1, "Enter your business name"),
  website: z.string().url("Invalid website").optional(),
  phone: z.string().refine(
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
