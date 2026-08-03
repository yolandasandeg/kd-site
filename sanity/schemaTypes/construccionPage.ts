import { defineField, defineType } from "sanity";

export const construccionPage = defineType({
  name: "construccionPage",
  title: "Página: Construcción (KD Pack)",
  type: "document",
  groups: [
    { name: "hero", title: "Hero" },
    { name: "applications", title: "Aplicaciones" },
    { name: "products", title: "Productos destacados" },
    { name: "why", title: "Por qué elegirnos" },
    { name: "projects", title: "Proyectos" },
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
    defineField({ name: "heroPrimaryCta", title: "Botón primario", type: "ctaButton", group: "hero" }),
    defineField({ name: "heroSecondaryCta", title: "Botón secundario", type: "ctaButton", group: "hero" }),
    defineField({
      name: "heroBadges",
      title: "Badges de confianza",
      type: "array",
      of: [{ type: "badgeItem" }],
      group: "hero",
    }),
    defineField({ name: "heroImage", title: "Imagen del hero", type: "image", group: "hero" }),
    defineField({
      name: "heroOverlayOpacity",
      title: "Oscurecer imagen de fondo (%)",
      type: "number",
      validation: (r) => r.min(0).max(100),
      initialValue: 55,
      group: "hero",
    }),

    defineField({ name: "applicationsEyebrow", title: "Eyebrow", type: "string", group: "applications" }),
    defineField({ name: "applicationsTitle", title: "Título", type: "string", group: "applications" }),

    defineField({ name: "productsEyebrow", title: "Eyebrow", type: "string", group: "products" }),
    defineField({ name: "productsTitle", title: "Título", type: "string", group: "products" }),

    defineField({ name: "whyEyebrow", title: "Eyebrow", type: "string", group: "why" }),
    defineField({ name: "whyTitle", title: "Título", type: "string", group: "why" }),
    defineField({
      name: "whyItems",
      title: "Ítems",
      type: "array",
      of: [{ type: "featureItem" }],
      group: "why",
    }),

    defineField({ name: "projectsEyebrow", title: "Eyebrow", type: "string", group: "projects" }),
    defineField({ name: "projectsTitle", title: "Título", type: "string", group: "projects" }),

    defineField({ name: "ctaEyebrow", title: "Eyebrow", type: "string", group: "cta" }),
    defineField({ name: "ctaTitle", title: "Título", type: "string", group: "cta" }),

    defineField({ name: "logosTitle", title: "Texto sobre los logos", type: "string", group: "logos" }),
  ],
  preview: {
    prepare() {
      return { title: "Página: Construcción (KD Pack)" };
    },
  },
});
