import { defineField, defineType } from "sanity";

export const proyectosPage = defineType({
  name: "proyectosPage",
  title: "Página: Proyectos",
  type: "document",
  groups: [
    { name: "hero", title: "Hero" },
    { name: "featured", title: "Casos destacados" },
    { name: "logos", title: "Logos de clientes" },
    { name: "stats", title: "Estadísticas" },
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
    defineField({
      name: "heroBadges",
      title: "Badges",
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

    defineField({ name: "featuredEyebrow", title: "Eyebrow", type: "string", group: "featured" }),
    defineField({ name: "featuredTitle", title: "Título", type: "string", group: "featured" }),

    defineField({ name: "logosEyebrow", title: "Eyebrow", type: "string", group: "logos" }),
    defineField({ name: "logosTitle", title: "Título", type: "string", group: "logos" }),
    defineField({ name: "logosBoxText", title: "Texto del recuadro", type: "text", rows: 3, group: "logos" }),

    defineField({
      name: "stats",
      title: "Estadísticas",
      type: "array",
      of: [{ type: "statItem" }],
      group: "stats",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Página: Proyectos" };
    },
  },
});
