import { defineField, defineType } from "sanity";

export const industriasPage = defineType({
  name: "industriasPage",
  title: "Página: Industrias",
  type: "document",
  groups: [
    { name: "hero", title: "Hero" },
    { name: "grid", title: "Grid de industrias" },
    { name: "benefits", title: "Beneficios" },
    { name: "cta", title: "CTA final" },
    { name: "logos", title: "Logos de clientes" },
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

    defineField({ name: "gridEyebrow", title: "Eyebrow", type: "string", group: "grid" }),
    defineField({ name: "gridTitle", title: "Título", type: "string", group: "grid" }),
    defineField({ name: "gridSubtitle", title: "Subtítulo", type: "text", rows: 2, group: "grid" }),

    defineField({ name: "benefitsEyebrow", title: "Eyebrow", type: "string", group: "benefits" }),
    defineField({ name: "benefitsTitle", title: "Título", type: "string", group: "benefits" }),
    defineField({
      name: "benefitsItems",
      title: "Ítems",
      type: "array",
      of: [{ type: "featureItem" }],
      group: "benefits",
    }),

    defineField({ name: "ctaEyebrow", title: "Eyebrow", type: "string", group: "cta" }),
    defineField({ name: "ctaTitle", title: "Título", type: "string", group: "cta" }),

    defineField({ name: "logosTitle", title: "Texto sobre los logos", type: "string", group: "logos" }),
  ],
  preview: {
    prepare() {
      return { title: "Página: Industrias" };
    },
  },
});
