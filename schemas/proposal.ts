import {
  CurrentSituationSchema,
  TargetMarketSchema,
  MarketingNeedsSchema,
  MarketingBudgetSchema,
  BusinessInformationSchema,
} from "../app/components/proposal/stepper/schemas";
import { z } from "zod";

export const ProposalSchema = z
  .object({})
  .merge(CurrentSituationSchema)
  .merge(TargetMarketSchema)
  .merge(MarketingNeedsSchema)
  .merge(MarketingBudgetSchema)
  .merge(BusinessInformationSchema);
