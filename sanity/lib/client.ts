import { createClient } from "@sanity/client";
import { draftMode } from "next/headers";

import { apiVersion, dataset, projectId } from "../env";

export const sanityConfigured = Boolean(projectId && dataset);

export const client = createClient({
  projectId: projectId || "placeholder",
  dataset: dataset || "production",
  apiVersion,
  useCdn: true,
  perspective: "published",
});

const token = process.env.SANITY_API_TOKEN;

const previewClient = token
  ? client.withConfig({
      token,
      useCdn: false,
      perspective: "previewDrafts",
    })
  : null;

export async function sanityFetch<T>(
  query: string,
  params: Record<string, unknown> = {},
  fallback: T
): Promise<T> {
  if (!sanityConfigured) return fallback;
  try {
    const isPreview = previewClient && draftMode().isEnabled;
    const activeClient = isPreview ? previewClient : client;
    const result = await activeClient.fetch<T>(
      query,
      params,
      isPreview
        ? { cache: "no-store" }
        : {
            next: { revalidate: 60 },
          }
    );
    if (result === null || result === undefined) return fallback;
    if (Array.isArray(result) && result.length === 0) return fallback;
    return result;
  } catch (error) {
    console.error("Sanity fetch failed, using fallback content:", error);
    return fallback;
  }
}
