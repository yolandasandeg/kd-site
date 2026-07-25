import { defineField, defineType } from "sanity";

export const cotizaPage = defineType({
  name: "cotizaPage",
  title: "Página: Cotiza tu proyecto",
  type: "document",
  groups: [
    { name: "hero", title: "Hero" },
    { name: "sidebar", title: "Recuadro lateral" },
    { name: "why", title: "Por qué cotizar" },
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

    defineField({ name: "sidebarBoxTitle", title: "Título del recuadro", type: "string", group: "sidebar" }),
    defineField({ name: "sidebarBoxText", title: "Texto del recuadro", type: "text", rows: 2, group: "sidebar" }),

    defineField({ name: "whyEyebrow", title: "Eyebrow", type: "string", group: "why" }),
    defineField({
      name: "whyItems",
      title: "Ítems",
      type: "array",
      of: [{ type: "featureItem" }],
      group: "why",
    }),

    defineField({ name: "ctaEyebrow", title: "Eyebrow", type: "string", group: "cta" }),
    defineField({ name: "ctaTitle", title: "Título", type: "string", group: "cta" }),
  ],
  preview: {
    prepare() {
      return { title: "Página: Cotiza tu proyecto" };
    },
  },
});
