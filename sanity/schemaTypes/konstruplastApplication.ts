import { defineField, defineType } from "sanity";
import { ICON_OPTIONS } from "./objects";

export const konstruplastApplication = defineType({
  name: "konstruplastApplication",
  title: "Aplicación de Construcción",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Nombre", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "name" } }),
    defineField({ name: "description", title: "Descripción", type: "text", rows: 2 }),
    defineField({ name: "icon", title: "Ícono", type: "string", options: { list: ICON_OPTIONS } }),
    defineField({ name: "order", title: "Orden", type: "number" }),
  ],
  orderings: [
    { title: "Orden manual", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
  ],
  preview: { select: { title: "name" } },
});
