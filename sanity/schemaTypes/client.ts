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
        list: [{ title: "KD Pack", value: "kdpack" }],
      },
      initialValue: "kdpack",
    }),
    defineField({
      name: "logo",
      title: "Logo (opcional)",
      description: "Sube un PNG con fondo transparente. Si no subes uno, se muestra el nombre en texto.",
      type: "image",
    }),
    defineField({ name: "order", title: "Orden", type: "number" }),
  ],
  orderings: [
    { title: "Orden manual", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
  ],
  preview: { select: { title: "name", media: "logo" } },
});
