import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/constants";
import { getProducts, getProjects } from "@/sanity/lib/queries";

// Se regenera cada hora para que los productos nuevos de Sanity entren al
// sitemap sin necesidad de redeploy.
export const revalidate = 3600;

const STATIC_ROUTES: {
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
}[] = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/productos", priority: 0.9, changeFrequency: "weekly" },
  { path: "/industrias", priority: 0.8, changeFrequency: "monthly" },
  { path: "/industrias/agricola", priority: 0.8, changeFrequency: "monthly" },
  { path: "/industrias/construccion", priority: 0.8, changeFrequency: "monthly" },
  { path: "/industrias/logistica", priority: 0.8, changeFrequency: "monthly" },
  { path: "/industrias/forestal", priority: 0.8, changeFrequency: "monthly" },
  { path: "/industrias/pesca", priority: 0.8, changeFrequency: "monthly" },
  { path: "/nosotros", priority: 0.7, changeFrequency: "monthly" },
  { path: "/sustentabilidad", priority: 0.7, changeFrequency: "monthly" },
  { path: "/proyectos", priority: 0.6, changeFrequency: "monthly" },
  { path: "/cotiza-tu-proyecto", priority: 0.9, changeFrequency: "monthly" },
  { path: "/contacto", priority: 0.7, changeFrequency: "monthly" },
  { path: "/ubicacion", priority: 0.5, changeFrequency: "yearly" },
  { path: "/politica-de-privacidad", priority: 0.2, changeFrequency: "yearly" },
  { path: "/terminos-y-condiciones", priority: 0.2, changeFrequency: "yearly" },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  // Si Sanity no responde, preferimos publicar el sitemap con las rutas
  // estáticas antes que romper /sitemap.xml por completo.
  let dynamicEntries: MetadataRoute.Sitemap = [];
  try {
    const [products, projects] = await Promise.all([getProducts(), getProjects()]);

    dynamicEntries = [
      ...products.map((p) => ({
        url: `${SITE_URL}/productos/${p.slug}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.8,
      })),
      ...projects.map((p) => ({
        url: `${SITE_URL}/proyectos/${p.slug}`,
        lastModified: now,
        changeFrequency: "yearly" as const,
        priority: 0.5,
      })),
    ];
  } catch (error) {
    console.error("[sitemap] No se pudieron cargar productos/proyectos:", error);
  }

  return [...staticEntries, ...dynamicEntries];
}
