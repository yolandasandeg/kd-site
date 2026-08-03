import { defineField, defineType } from "sanity";

export const homePage = defineType({
  name: "homePage",
  title: "Página: Home (KD Pack)",
  type: "document",
  groups: [
    { name: "hero", title: "Hero" },
    { name: "logos", title: "Logos de clientes" },
    { name: "products", title: "Productos destacados" },
    { name: "industries", title: "Industrias" },
    { name: "why", title: "Por qué elegirnos" },
    { name: "projects", title: "Proyectos" },
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
      description: "0 = imagen sin oscurecer, 100 = como está más oscura. Recomendado: 40-60.",
      type: "number",
      validation: (r) => r.min(0).max(100),
      initialValue: 55,
      group: "hero",
    }),

    defineField({ name: "whyEyebrow", title: "Eyebrow", type: "string", group: "why" }),
    defineField({ name: "whyTitle", title: "Título", type: "string", group: "why" }),
    defineField({
      name: "whyItems",
      title: "Tarjetas",
      type: "array",
      of: [{ type: "featureItem" }],
      group: "why",
    }),
    defineField({
      name: "whySealsTitle",
      title: "Texto sobre los sellos (opcional)",
      type: "string",
      group: "why",
    }),
    defineField({
      name: "whySeals",
      title: "Sellos y certificaciones",
      description: "Franja de sellos/certificaciones que va debajo de las tarjetas (ISO 9001, SERVIU, DICTUC, etc).",
      type: "array",
      of: [{ type: "badgeItem" }],
      group: "why",
    }),

    defineField({ name: "productsEyebrow", title: "Eyebrow", type: "string", group: "products" }),
    defineField({ name: "productsTitle", title: "Título", type: "string", group: "products" }),
    defineField({
      name: "featuredProducts",
      title: "Productos a mostrar",
      description: "Elige los productos que aparecen en el carrusel de la home. Si lo dejas vacío, se muestra una selección automática.",
      type: "array",
      of: [{ type: "reference", to: [{ type: "product" }] }],
      group: "products",
    }),

    defineField({ name: "industriesEyebrow", title: "Eyebrow", type: "string", group: "industries" }),
    defineField({ name: "industriesTitle", title: "Título", type: "string", group: "industries" }),
    defineField({
      name: "industriesItems",
      title: "Industrias",
      type: "array",
      of: [{ type: "industryTile" }],
      group: "industries",
    }),

    defineField({ name: "projectsEyebrow", title: "Eyebrow", type: "string", group: "projects" }),
    defineField({ name: "projectsTitle", title: "Título", type: "string", group: "projects" }),
    defineField({ name: "projectsSubtitle", title: "Subtítulo", type: "text", rows: 2, group: "projects" }),

    defineField({ name: "ctaEyebrow", title: "Eyebrow", type: "string", group: "cta" }),
    defineField({ name: "ctaTitle", title: "Título", type: "string", group: "cta" }),

    defineField({ name: "logosTitle", title: "Texto sobre los logos", type: "string", group: "logos" }),
  ],
  preview: {
    prepare() {
      return { title: "Página: Home (KD Pack)" };
    },
  },
});
