// src/lib/sanity.ts
import { createClient } from "@sanity/client";

export const sanityClient = createClient({
  projectId: "drtq636z",
  dataset: "production",
  apiVersion: "2024-03-15",
  useCdn: true,
});
