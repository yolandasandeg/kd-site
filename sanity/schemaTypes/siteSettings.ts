import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Configuración del sitio",
  type: "document",
  fields: [
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
