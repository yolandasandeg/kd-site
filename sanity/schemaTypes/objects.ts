import { defineField, defineType } from "sanity";

export const ICON_OPTIONS = [
  "leaf",
  "shield",
  "shield-plus",
  "shield-alert",
  "recycle",
  "globe",
  "cog",
  "truck",
  "building",
  "building-2",
  "fish",
  "star",
  "trees",
  "warehouse",
  "layers",
  "factory",
  "wrench",
  "award",
  "clock",
  "sparkles",
  "thumbs-up",
  "handshake",
  "rocket",
  "users",
  "boxes",
  "layout-panel-left",
  "spline",
  "square-stack",
  "package",
  "calendar",
  "map-pin",
  "message-circle",
  "mail",
  "search",
];

export const titlePart = defineType({
  name: "titlePart",
  title: "Fragmento de título",
  type: "object",
  fields: [
    defineField({ name: "text", title: "Texto", type: "string" }),
    defineField({
      name: "highlight",
      title: "Resaltar en verde",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: { title: "text", highlight: "highlight" },
    prepare({ title, highlight }) {
      return { title: highlight ? `${title} (verde)` : title };
    },
  },
});

export const ctaButton = defineType({
  name: "ctaButton",
  title: "Botón",
  type: "object",
  fields: [
    defineField({ name: "label", title: "Texto del botón", type: "string" }),
    defineField({ name: "href", title: "Link (URL o ruta interna)", type: "string" }),
  ],
});

export const badgeItem = defineType({
  name: "badgeItem",
  title: "Badge de confianza",
  type: "object",
  fields: [
    defineField({
      name: "icon",
      title: "Ícono",
      type: "string",
      options: { list: ICON_OPTIONS },
    }),
    defineField({ name: "label", title: "Texto", type: "string" }),
    defineField({
      name: "description",
      title: "Explicación (tooltip al pasar el mouse)",
      type: "text",
      rows: 2,
    }),
  ],
  preview: { select: { title: "label", subtitle: "icon" } },
});

export const industryTile = defineType({
  name: "industryTile",
  title: "Industria (con foto)",
  type: "object",
  fields: [
    defineField({ name: "name", title: "Nombre", type: "string" }),
    defineField({
      name: "href",
      title: "Enlace",
      type: "string",
      description: "Ej: /productos?categoria=agricola, /industrias/construccion, /cotiza-tu-proyecto",
    }),
    defineField({
      name: "icon",
      title: "Ícono",
      type: "string",
      options: { list: ICON_OPTIONS },
    }),
    defineField({
      name: "image",
      title: "Foto",
      type: "image",
      options: { hotspot: true },
    }),
  ],
  preview: { select: { title: "name", subtitle: "href", media: "image" } },
});

export const featureItem = defineType({
  name: "featureItem",
  title: "Ítem de característica",
  type: "object",
  fields: [
    defineField({
      name: "icon",
      title: "Ícono",
      type: "string",
      options: { list: ICON_OPTIONS },
    }),
    defineField({ name: "title", title: "Título", type: "string" }),
    defineField({ name: "description", title: "Descripción", type: "text", rows: 2 }),
  ],
  preview: { select: { title: "title", subtitle: "description" } },
});

export const statItem = defineType({
  name: "statItem",
  title: "Estadística",
  type: "object",
  fields: [
    defineField({
      name: "icon",
      title: "Ícono",
      type: "string",
      options: { list: ICON_OPTIONS },
    }),
    defineField({ name: "value", title: "Valor (ej: +13 años)", type: "string" }),
    defineField({ name: "label", title: "Etiqueta", type: "string" }),
  ],
  preview: { select: { title: "value", subtitle: "label" } },
});

export const specItem = defineType({
  name: "specItem",
  title: "Especificación técnica",
  type: "object",
  fields: [
    defineField({ name: "label", title: "Nombre de la especificación", type: "string" }),
    defineField({ name: "value", title: "Valor", type: "string" }),
  ],
  preview: { select: { title: "label", subtitle: "value" } },
});

export const timelineItem = defineType({
  name: "timelineItem",
  title: "Hito de historia",
  type: "object",
  fields: [
    defineField({ name: "year", title: "Año", type: "string" }),
    defineField({ name: "title", title: "Título", type: "string" }),
    defineField({ name: "description", title: "Descripción", type: "text", rows: 2 }),
  ],
  preview: { select: { title: "year", subtitle: "title" } },
});

export const testimonialItem = defineType({
  name: "testimonialItem",
  title: "Testimonio",
  type: "object",
  fields: [
    defineField({ name: "quote", title: "Cita", type: "text", rows: 3 }),
    defineField({ name: "author", title: "Nombre", type: "string" }),
    defineField({ name: "role", title: "Cargo", type: "string" }),
    defineField({ name: "company", title: "Empresa", type: "string" }),
    defineField({ name: "photo", title: "Foto (opcional)", type: "image" }),
  ],
  preview: { select: { title: "author", subtitle: "company" } },
});

export const teamMemberItem = defineType({
  name: "teamMemberItem",
  title: "Miembro del equipo",
  type: "object",
  fields: [
    defineField({ name: "name", title: "Nombre", type: "string" }),
    defineField({ name: "role", title: "Cargo", type: "string" }),
    defineField({ name: "photo", title: "Foto", type: "image", options: { hotspot: true } }),
  ],
  preview: { select: { title: "name", subtitle: "role", media: "photo" } },
});

export const productDocument = defineType({
  name: "productDocument",
  title: "Documento (PDF)",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Nombre del botón",
      description: "Ej: Ficha técnica, Certificado de calidad, Guía de uso.",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "file",
      title: "Archivo PDF",
      type: "file",
      options: { accept: ".pdf" },
      validation: (r) => r.required(),
    }),
  ],
  preview: { select: { title: "label" } },
});

export const workingWayItem = defineType({
  name: "workingWayItem",
  title: "Ítem de manera de trabajar",
  type: "object",
  fields: [
    defineField({
      name: "icon",
      title: "Ícono",
      type: "string",
      options: { list: ICON_OPTIONS },
    }),
    defineField({ name: "title", title: "Título", type: "string" }),
    defineField({ name: "description", title: "Descripción", type: "text", rows: 2 }),
    defineField({ name: "image", title: "Imagen", type: "image", options: { hotspot: true } }),
  ],
  preview: { select: { title: "title", media: "image" } },
});
