import { defineField, defineType } from "sanity";

export const contactoPage = defineType({
  name: "contactoPage",
  title: "Página: Contacto",
  type: "document",
  groups: [
    { name: "hero", title: "Hero" },
    { name: "location", title: "Ubicación" },
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

    defineField({ name: "locationEyebrow", title: "Eyebrow", type: "string", group: "location" }),
    defineField({ name: "locationTitle", title: "Título", type: "string", group: "location" }),
    defineField({ name: "locationText", title: "Texto", type: "text", rows: 2, group: "location" }),
  ],
  preview: {
    prepare() {
      return { title: "Página: Contacto" };
    },
  },
});
