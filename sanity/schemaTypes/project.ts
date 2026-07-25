import { defineField, defineType } from "sanity";

export const project = defineType({
  name: "project",
  title: "Proyecto",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Título", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      title: "Slug (URL)",
      type: "slug",
      options: { source: "title" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "brand",
      title: "Marca",
      type: "string",
      options: { list: [{ title: "KD Pack", value: "kdpack" }, { title: "Konstruplast", value: "konstruplast" }] },
      initialValue: "kdpack",
    }),
    defineField({ name: "industry", title: "Industria", type: "string" }),
    defineField({ name: "client", title: "Cliente", type: "string" }),
    defineField({ name: "description", title: "Descripción", type: "text", rows: 3 }),
    defineField({ name: "image", title: "Imagen", type: "image", options: { hotspot: true } }),
    defineField({ name: "featuredOnHome", title: "Destacar en Home / Konstruplast", type: "boolean", initialValue: false }),
    defineField({ name: "order", title: "Orden", type: "number" }),
  ],
  orderings: [
    { title: "Orden manual", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
  ],
  preview: { select: { title: "title", subtitle: "client", media: "image" } },
});
