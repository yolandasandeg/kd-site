import { defineField, defineType } from "sanity";
import { ICON_OPTIONS } from "./objects";

export const category = defineType({
  name: "category",
  title: "Categoría (Home - ¿Qué solución necesitas?)",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Nombre", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "name" } }),
    defineField({ name: "href", title: "Link", type: "string" }),
    defineField({ name: "icon", title: "Ícono", type: "string", options: { list: ICON_OPTIONS } }),
    defineField({ name: "image", title: "Imagen", type: "image", options: { hotspot: true } }),
    defineField({
      name: "imageColor",
      title: "Color de respaldo (hexadecimal, sin #)",
      description: "Se usa solo si no hay una imagen subida. Ejemplo: 2d5a3f",
      type: "string",
    }),
    defineField({ name: "order", title: "Orden", type: "number" }),
  ],
  orderings: [
    { title: "Orden manual", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
  ],
  preview: { select: { title: "name", media: "image" } },
});
