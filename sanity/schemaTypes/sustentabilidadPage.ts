import { defineField, defineType } from "sanity";

export const sustentabilidadPage = defineType({
  name: "sustentabilidadPage",
  title: "Página: Sustentabilidad",
  type: "document",
  groups: [
    { name: "hero", title: "Hero" },
    { name: "pillars", title: "Pilares" },
    { name: "impact", title: "Datos de impacto" },
    { name: "recycling", title: "Materia prima reciclada" },
    { name: "certificate", title: "Certificado energía renovable" },
    { name: "cta", title: "CTA final" },
  ],
  fields: [
    defineField({ name: "heroEyebrow", title: "Eyebrow", type: "string", group: "hero" }),
    defineField({
      name: "heroTitleParts",
      title: "Título (por líneas)",
      type: "array",
      of: [{ type: "titlePart" }],
      group: "hero",
    }),
    defineField({ name: "heroSubtitle", title: "Subtítulo", type: "text", rows: 2, group: "hero" }),
    defineField({ name: "heroImage", title: "Imagen del hero", type: "image", group: "hero" }),
    defineField({
      name: "heroOverlayOpacity",
      title: "Oscurecer imagen de fondo (%)",
      description: "0 = imagen sin oscurecer, 100 = como está más oscura. Recomendado: 40-60.",
      type: "number",
      validation: (r) => r.min(0).max(100),
      initialValue: 55,
      group: "hero",
    }),

    defineField({ name: "pillarsEyebrow", title: "Eyebrow", type: "string", group: "pillars" }),
    defineField({ name: "pillarsTitle", title: "Título", type: "string", group: "pillars" }),
    defineField({
      name: "pillarsItems",
      title: "Tarjetas",
      type: "array",
      of: [{ type: "featureItem" }],
      group: "pillars",
    }),
    defineField({
      name: "sealsTitle",
      title: "Texto sobre los sellos (opcional)",
      type: "string",
      group: "pillars",
    }),
    defineField({
      name: "seals",
      title: "Sellos y certificaciones",
      type: "array",
      of: [{ type: "badgeItem" }],
      group: "pillars",
    }),

    defineField({ name: "impactEyebrow", title: "Eyebrow", type: "string", group: "impact" }),
    defineField({ name: "impactTitle", title: "Título", type: "string", group: "impact" }),
    defineField({
      name: "impactStats",
      title: "Datos duros",
      description: "Ej: \"68%\" con etiqueta \"de productos con material reciclado\".",
      type: "array",
      of: [{ type: "statItem" }],
      group: "impact",
    }),

    defineField({ name: "recyclingEyebrow", title: "Eyebrow", type: "string", group: "recycling" }),
    defineField({ name: "recyclingTitle", title: "Título", type: "string", group: "recycling" }),
    defineField({ name: "recyclingText", title: "Texto", type: "text", rows: 3, group: "recycling" }),
    defineField({
      name: "recyclingPartner",
      title: "Socio de reciclaje (ej: CE Maipo)",
      type: "string",
      group: "recycling",
    }),
    defineField({
      name: "recyclingImages",
      title: "Fotos reales de uso de materia prima reciclada",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
      group: "recycling",
    }),

    defineField({ name: "certificateTitle", title: "Título", type: "string", group: "certificate" }),
    defineField({ name: "certificateIssuer", title: "Emitido por", type: "string", group: "certificate" }),
    defineField({
      name: "certificateFacts",
      title: "Datos del certificado",
      description: "Un dato por línea, ej: \"Periodo: Enero 2025 - Diciembre 2025\".",
      type: "array",
      of: [{ type: "string" }],
      group: "certificate",
    }),
    defineField({
      name: "certificateFile",
      title: "Archivo del certificado (PDF)",
      type: "file",
      group: "certificate",
    }),

    defineField({ name: "ctaEyebrow", title: "Eyebrow", type: "string", group: "cta" }),
    defineField({ name: "ctaTitle", title: "Título", type: "string", group: "cta" }),
  ],
  preview: {
    prepare() {
      return { title: "Página: Sustentabilidad" };
    },
  },
});
