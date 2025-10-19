import { z } from "zod";

export const CurrentSituationSchema = z.object({
  situation: z.literal(["new", "working", "looking"]),
});

export const TargetMarketSchema = z.object({
  market: z.literal(["consumers", "business", "commerce", "other"]),
});

export const MarketingNeedsSchema = z.object({
  needs: z
    .array(
      z.literal([
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
    .nonempty(),
});

export const MarketingBudgetSchema = z.object({
  budget: z.literal([
    "1000",
    "1000-2000",
    "2000-5000",
    "5000-10000",
    "10000-25000",
    "25000+",
  ]),
});

export const BusinessInformationSchema = z.object({
  name: z.string().nonempty("Enter your name"),
  email: z.email("Invalid email"),
  business: z.string("Enter your business name"),
  website: z.url({
    protocol: /^https?$/,
    hostname: z.regexes.domain,
    error: "Invalid website",
  }),
  phone: z.url({
    protocol: /^https?$/,
    hostname: z.regexes.domain,
    error: "Invalid website",
  }),
  comment: z.string().optional().default(""),
  metrics: z.record(z.string(), z.string()).optional(),
});

export const SubscriptionFormSchema = z.object({
  email: z.email("Invalid email"),
});
