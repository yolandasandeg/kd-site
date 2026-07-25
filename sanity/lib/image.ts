import { createImageUrlBuilder } from "@sanity/image-url";
import type { Image } from "sanity";

import { dataset, projectId } from "../env";

const builder = createImageUrlBuilder({
  projectId: projectId || "placeholder",
  dataset: dataset || "production",
});

export function urlFor(source: Image) {
  return builder.image(source);
}

export type SanityImageRef = { asset?: { _ref?: string; _id?: string } } | null | undefined;

export function resolveImageSrc(
  image: SanityImageRef,
  fallbackColor: string,
  size = "800x600",
  fg = "ffffff"
) {
  if (image?.asset?._ref) {
    return urlFor(image as Image).width(1600).auto("format").url();
  }
  return `https://placehold.co/${size}/${fallbackColor}/${fg}.png?text=+`;
}
