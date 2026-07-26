import { defineLocations, type PresentationPluginOptions } from "sanity/presentation";

const singletonLocations: Record<string, { title: string; href: string }> = {
  homePage: { title: "Home (KD Pack)", href: "/" },
  konstruplastPage: { title: "Konstruplast", href: "/konstruplast" },
  productosPage: { title: "Productos", href: "/productos" },
  industriasPage: { title: "Industrias", href: "/industrias" },
  nosotrosPage: { title: "Nosotros", href: "/nosotros" },
  proyectosPage: { title: "Proyectos", href: "/proyectos" },
  contactoPage: { title: "Contacto", href: "/contacto" },
  cotizaPage: { title: "Cotiza tu proyecto", href: "/cotiza-tu-proyecto" },
};

export const resolve: PresentationPluginOptions["resolve"] = {
  locations: {
    ...Object.fromEntries(
      Object.entries(singletonLocations).map(([type, { title, href }]) => [
        type,
        defineLocations({
          select: {},
          resolve: () => ({
            locations: [{ title, href }],
          }),
        }),
      ])
    ),
    product: defineLocations({
      select: { name: "name", slug: "slug.current" },
      resolve: (doc) => ({
        locations: [
          {
            title: doc?.name || "Producto sin nombre",
            href: `/productos/${doc?.slug}`,
          },
          { title: "Catálogo de productos", href: "/productos" },
        ],
      }),
    }),
    project: defineLocations({
      select: { title: "title", slug: "slug.current" },
      resolve: (doc) => ({
        locations: [
          {
            title: doc?.title || "Proyecto sin título",
            href: `/proyectos/${doc?.slug}`,
          },
          { title: "Todos los proyectos", href: "/proyectos" },
        ],
      }),
    }),
  },
};
