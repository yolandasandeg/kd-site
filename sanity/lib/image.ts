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
  fallbackColor?: string,
  size = "800x600"
) {
  if (image?.asset?._ref) {
    return urlFor(image as Image).width(1600).auto("format").url();
  }
  const color = fallbackColor && /^[0-9a-fA-F]{3,8}$/.test(fallbackColor)
    ? fallbackColor
    : "1C7A43";
  // Show placehold.co's dimension label (e.g. "560 x 420") in white so it's
  // obvious which spots still need a real image uploaded in Sanity.
  // Note: placehold.co 404s if only a bg color is given without an fg color.
  return `https://placehold.co/${size}/${color}/FFFFFF.png`;
}
