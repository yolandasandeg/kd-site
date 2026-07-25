import { defineField, defineType } from "sanity";

export const client = defineType({
  name: "client",
  title: "Cliente / Logo",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Nombre", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "brand",
      title: "Aparece en",
      type: "string",
      options: {
        list: [
          { title: "KD Pack", value: "kdpack" },
          { title: "Konstruplast", value: "konstruplast" },
          { title: "Ambas", value: "both" },
        ],
      },
      initialValue: "kdpack",
    }),
    defineField({ name: "logo", title: "Logo (opcional)", type: "image" }),
    defineField({ name: "order", title: "Orden", type: "number" }),
  ],
  orderings: [
    { title: "Orden manual", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
  ],
  preview: { select: { title: "name", media: "logo" } },
});
