import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Configuración del sitio",
  type: "document",
  fields: [
    defineField({
      name: "logo",
      title: "Logo",
      description: "Logo principal (PNG con fondo transparente). Se usa en el footer del sitio.",
      type: "image",
    }),
    defineField({
      name: "headerLogo",
      title: "Logo del header",
      description: "Ícono que se muestra en el menú de navegación (arriba del sitio). Si lo dejas vacío, se usa el Logo principal.",
      type: "image",
    }),
    defineField({
      name: "favicon",
      title: "Favicon",
      description: "Ícono que aparece en la pestaña del navegador. Sube una imagen cuadrada (idealmente 512x512).",
      type: "image",
    }),
    defineField({
      name: "kdpackLogo",
      title: "Logo KD Pack (menú)",
      description: "Logo de KD Pack (PNG con fondo transparente) que se muestra en el menú de navegación.",
      type: "image",
    }),
    defineField({
      name: "konstruplastLogo",
      title: "Logo Konstruplast (menú)",
      description: "Logo de Konstruplast (PNG con fondo transparente) que se muestra en el menú de navegación.",
      type: "image",
    }),
    defineField({
      name: "navLinks",
      title: "Enlaces del menú",
      description: "Arrastra los elementos para reordenarlos. Elimina uno para quitarlo del menú.",
      type: "array",
      of: [
        {
          type: "object",
          name: "navLink",
          fields: [
            defineField({ name: "label", title: "Texto", type: "string", validation: (r) => r.required() }),
            defineField({
              name: "href",
              title: "Enlace",
              type: "string",
              validation: (r) => r.required(),
              description: "Ej: / , /productos, /industrias, /nosotros, /proyectos, /contacto, /konstruplast",
            }),
          ],
          preview: { select: { title: "label", subtitle: "href" } },
        },
      ],
    }),
    defineField({ name: "address", title: "Dirección", type: "string" }),
    defineField({ name: "phone", title: "Teléfono (texto mostrado)", type: "string" }),
    defineField({ name: "phoneHref", title: "Teléfono (link tel:, solo números con +)", type: "string" }),
    defineField({ name: "email", title: "Correo", type: "string" }),
    defineField({ name: "hours", title: "Horario de atención", type: "string" }),
    defineField({ name: "coverage", title: "Cobertura", type: "string" }),
    defineField({ name: "mapEmbedSrc", title: "URL de Google Maps embed", type: "url" }),
    defineField({ name: "whatsappNumber", title: "WhatsApp (solo números, con código país)", type: "string" }),
    defineField({ name: "whatsappMessage", title: "Mensaje predefinido de WhatsApp", type: "string" }),
    defineField({ name: "linkedinUrl", title: "URL LinkedIn", type: "url" }),
    defineField({ name: "instagramUrl", title: "URL Instagram", type: "url" }),
  ],
  preview: {
    prepare() {
      return { title: "Configuración del sitio" };
    },
  },
});
