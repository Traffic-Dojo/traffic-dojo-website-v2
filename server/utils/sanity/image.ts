import urlBuilder from "@sanity/image-url";
import { sanityClient } from "./client";

export const sanityImageBuilder = urlBuilder(sanityClient);
