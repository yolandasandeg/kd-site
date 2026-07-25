import { createClient } from "@sanity/client";

import { apiVersion, dataset, projectId } from "../env";

export const sanityConfigured = Boolean(projectId && dataset);

export const client = createClient({
  projectId: projectId || "placeholder",
  dataset: dataset || "production",
  apiVersion,
  useCdn: true,
  perspective: "published",
});

export async function sanityFetch<T>(
  query: string,
  params: Record<string, unknown> = {},
  fallback: T
): Promise<T> {
  if (!sanityConfigured) return fallback;
  try {
    const result = await client.fetch<T>(query, params, {
      next: { revalidate: 60 },
    });
    if (result === null || result === undefined) return fallback;
    if (Array.isArray(result) && result.length === 0) return fallback;
    return result;
  } catch (error) {
    console.error("Sanity fetch failed, using fallback content:", error);
    return fallback;
  }
}
