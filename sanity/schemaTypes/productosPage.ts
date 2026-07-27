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
      name: "heroImage",
      title: "Imagen de fondo",
      description: "Opcional. Si no subes una, el fondo queda negro sólido como está ahora.",
      type: "image",
      group: "hero",
    }),
    defineField({
      name: "heroOverlayOpacity",
      title: "Oscurecer imagen de fondo (%)",
      description: "0 = imagen sin oscurecer, 100 = como está más oscura. Recomendado: 40-60.",
      type: "number",
      validation: (r) => r.min(0).max(100),
      initialValue: 55,
      group: "hero",
    }),

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
