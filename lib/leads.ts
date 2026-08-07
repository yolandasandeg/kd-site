/**
 * Destinatarios de los formularios del sitio.
 *
 * Ambos formularios admiten VARIOS destinatarios. El orden de prioridad es:
 * Sanity (siteSettings) > variable de entorno > estos defaults. Así se puede
 * cambiar desde el Studio sin tocar código ni hacer redeploy.
 */
export const DEFAULT_LEAD_RECIPIENTS = {
  /** Cotizaciones -> Ventas */
  quote: ["purzua@kdpack.cl"],
  /** Contacto general -> Secretaría */
  contact: ["secretaria@kdpack.cl"],
} as const;

export type LeadKind = keyof typeof DEFAULT_LEAD_RECIPIENTS;

/** Remitente. Debe pertenecer a un dominio verificado en Resend. */
export const LEAD_FROM =
  process.env.LEADS_FROM_EMAIL || "KD Pack Web <web@kdpack.cl>";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Normaliza una lista de correos venida de Sanity, env o defaults. */
export function normalizeRecipients(
  value: unknown,
  fallback: readonly string[]
): string[] {
  const raw = Array.isArray(value)
    ? value
    : typeof value === "string"
      ? value.split(/[,;]/)
      : [];

  const cleaned = raw
    .map((v) => String(v).trim())
    .filter((v) => EMAIL_RE.test(v));

  // Dedup preservando el orden en que los escribió el editor.
  const unique = Array.from(new Set(cleaned));
  return unique.length > 0 ? unique : [...fallback];
}
