import { cleanEnv, str, url } from "envalid";

export const env = cleanEnv(process.env, {
  SANITY_API_READ_TOKEN: str(),
  PUBLIC_SANITY_PROJECT_ID: str(),
  PUBLIC_SANITY_DATASET: str(),
  PUBLIC_SANITY_API_VERSION: str(),
  PUBLIC_SANITY_STUDIO_URL: url(),
});
