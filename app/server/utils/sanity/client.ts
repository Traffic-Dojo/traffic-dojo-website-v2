// src/lib/sanity.ts
import { createClient } from "@sanity/client";
import { env } from "../../../env";

export const sanityClient = createClient({
  projectId: env.PUBLIC_SANITY_PROJECT_ID,
  dataset: env.PUBLIC_SANITY_DATASET,
  apiVersion: env.PUBLIC_SANITY_API_VERSION,
  useCdn: true,
  stega: {
    studioUrl: env.PUBLIC_SANITY_STUDIO_URL,
  },
});
