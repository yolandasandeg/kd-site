import { defineField, defineType } from "sanity";

export const nosotrosPage = defineType({
  name: "nosotrosPage",
  title: "Página: Nosotros",
  type: "document",
  groups: [
    { name: "hero", title: "Hero" },
    { name: "stats", title: "Estadísticas" },
    { name: "historia", title: "Nuestra historia" },
    { name: "valores", title: "Valores" },
    { name: "workingWays", title: "Manera de trabajar" },
    { name: "certifications", title: "Certificaciones" },
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
    defineField({ name: "heroCtaLabel", title: "Texto del botón", type: "string", group: "hero" }),
    defineField({ name: "heroImage", title: "Imagen del hero", type: "image", group: "hero" }),

    defineField({
      name: "stats",
      title: "Estadísticas",
      type: "array",
      of: [{ type: "statItem" }],
      group: "stats",
    }),

    defineField({ name: "historiaEyebrow", title: "Eyebrow", type: "string", group: "historia" }),
    defineField({ name: "historiaTitle", title: "Título", type: "string", group: "historia" }),
    defineField({
      name: "historiaParagraphs",
      title: "Párrafos",
      type: "array",
      of: [{ type: "text", rows: 3 }],
      group: "historia",
    }),
    defineField({ name: "historiaImage", title: "Imagen", type: "image", group: "historia" }),

    defineField({ name: "valoresEyebrow", title: "Eyebrow", type: "string", group: "valores" }),
    defineField({ name: "valoresTitle", title: "Título", type: "string", group: "valores" }),
    defineField({
      name: "valoresItems",
      title: "Ítems",
      type: "array",
      of: [{ type: "featureItem" }],
      group: "valores",
    }),

    defineField({ name: "workingWaysEyebrow", title: "Eyebrow", type: "string", group: "workingWays" }),
    defineField({ name: "workingWaysTitle", title: "Título", type: "string", group: "workingWays" }),
    defineField({
      name: "workingWaysItems",
      title: "Ítems",
      type: "array",
      of: [{ type: "workingWayItem" }],
      group: "workingWays",
    }),

    defineField({ name: "certificationsEyebrow", title: "Eyebrow", type: "string", group: "certifications" }),
    defineField({ name: "certificationsTitle", title: "Título", type: "string", group: "certifications" }),
    defineField({
      name: "certifications",
      title: "Certificaciones (lista de nombres)",
      type: "array",
      of: [{ type: "string" }],
      group: "certifications",
    }),
    defineField({ name: "certificationsText", title: "Texto descriptivo", type: "text", rows: 2, group: "certifications" }),
    defineField({ name: "teamImage", title: "Imagen de equipo", type: "image", group: "certifications" }),

    defineField({ name: "ctaEyebrow", title: "Eyebrow", type: "string", group: "cta" }),
    defineField({ name: "ctaTitle", title: "Título", type: "string", group: "cta" }),
  ],
  preview: {
    prepare() {
      return { title: "Página: Nosotros" };
    },
  },
});
