import { defineField, defineType } from "sanity";

export const ubicacionPage = defineType({
  name: "ubicacionPage",
  title: "Página: Ubicación",
  type: "document",
  groups: [
    { name: "hero", title: "Hero" },
    { name: "location", title: "Ubicación" },
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

    defineField({ name: "locationEyebrow", title: "Eyebrow", type: "string", group: "location" }),
    defineField({ name: "locationTitle", title: "Título", type: "string", group: "location" }),
    defineField({ name: "locationText", title: "Texto", type: "text", rows: 3, group: "location" }),

    defineField({ name: "ctaEyebrow", title: "Eyebrow", type: "string", group: "cta" }),
    defineField({ name: "ctaTitle", title: "Título", type: "string", group: "cta" }),
  ],
  preview: {
    prepare() {
      return { title: "Página: Ubicación" };
    },
  },
});
