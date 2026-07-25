import { defineField, defineType } from "sanity";

export const productosPage = defineType({
  name: "productosPage",
  title: "Página: Productos",
  type: "document",
  groups: [
    { name: "hero", title: "Hero" },
    { name: "bottom", title: "Sección inferior" },
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
    defineField({ name: "searchPlaceholder", title: "Placeholder del buscador", type: "string", group: "hero" }),

    defineField({
      name: "bottomItems",
      title: "Ítems (Fabricación nacional, etc.)",
      type: "array",
      of: [{ type: "featureItem" }],
      group: "bottom",
    }),

    defineField({ name: "ctaEyebrow", title: "Eyebrow", type: "string", group: "cta" }),
    defineField({ name: "ctaTitle", title: "Título", type: "string", group: "cta" }),
  ],
  preview: {
    prepare() {
      return { title: "Página: Productos" };
    },
  },
});
