import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/constants";

// El Studio y las rutas internas no aportan nada en buscadores.
const DISALLOW = ["/studio", "/studio/", "/api/"];

/**
 * Crawlers de motores generativos (GEO). Los listamos explícitamente —aunque
 * la regla "*" ya los permitiría— para dejar la decisión documentada y para
 * que quede claro cuál habría que bloquear si algún día se quiere revertir.
 *
 * Cada empresa separa el bot que ENTRENA modelos del que INDEXA para citar en
 * respuestas. Para KD Pack conviene permitir ambos: el catálogo es material
 * comercial que queremos que se cite, no contenido de pago.
 */
const AI_CRAWLERS = [
  // OpenAI — ChatGPT
  "GPTBot", // entrenamiento
  "OAI-SearchBot", // indexación para búsqueda
  "ChatGPT-User", // navegación iniciada por el usuario
  // Anthropic — Claude
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  // Google — Gemini / AI Overviews
  "Google-Extended",
  // Perplexity
  "PerplexityBot",
  "Perplexity-User",
  // Apple Intelligence
  "Applebot-Extended",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: DISALLOW },
      ...AI_CRAWLERS.map((userAgent) => ({
        userAgent,
        allow: "/",
        disallow: DISALLOW,
      })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
