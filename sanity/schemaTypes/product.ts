import { defineField, defineType } from "sanity";

export const product = defineType({
  name: "product",
  title: "Producto",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Nombre", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      title: "Slug (URL)",
      type: "slug",
      options: { source: "name" },
      validation: (r) => r.required(),
    }),
    defineField({ name: "code", title: "Código", type: "string" }),
    defineField({
      name: "brand",
      title: "Marca",
      type: "string",
      options: { list: [{ title: "KD Pack", value: "kdpack" }, { title: "Konstruplast", value: "konstruplast" }] },
      initialValue: "kdpack",
    }),
    defineField({
      name: "category",
      title: "Categoría",
      type: "string",
      description: "Slug de categoría, ej: agricola, almacenaje, pallets, pesca, forestal, cajas-cosecheras, encofrados, separadores, tapas, terminaciones, alivianantes",
    }),
    defineField({ name: "productType", title: "Tipo de producto", type: "string" }),
    defineField({ name: "size", title: "Dimensiones", type: "string" }),
    defineField({ name: "material", title: "Material", type: "string" }),
    defineField({ name: "volumeLiters", title: "Volumen (litros)", type: "string" }),
    defineField({ name: "unitsPerPallet", title: "Unidades por pallet", type: "string" }),
    defineField({ name: "recyclable", title: "100% Reciclable", type: "boolean" }),
    defineField({ name: "reusable", title: "100% Reutilizable", type: "boolean" }),
    defineField({ name: "description", title: "Descripción", type: "text", rows: 3 }),
    defineField({
      name: "features",
      title: "Características",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: ["Apilable", "Plegable", "Con tapa", "Reforzado", "Ventilado", "Uso alimentario"],
      },
    }),
    defineField({ name: "image", title: "Imagen principal", type: "image", options: { hotspot: true } }),
    defineField({
      name: "gallery",
      title: "Fotos adicionales",
      description: "Sube más fotos del producto. Se muestran junto a la imagen principal en la ficha del producto.",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
    defineField({ name: "order", title: "Orden", type: "number" }),
  ],
  orderings: [
    { title: "Orden manual", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
  ],
  preview: {
    select: { title: "name", subtitle: "code", media: "image" },
  },
});
