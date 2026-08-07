import type { Metadata } from "next";

import { IndustryPageTemplate, type IndustryPageDoc } from "@/components/sections/IndustryPageTemplate";
import { getClients, getPageDoc, getProducts, getProjects } from "@/sanity/lib/queries";

export const metadata: Metadata = {
  title: "Agrícola | Soluciones plásticas KD Pack para el campo",
  description:
    "Cajas de exportación, cajas cosecheras y bins plásticos para cosecha, packing y transporte de frutas y hortalizas.",
  alternates: { canonical: "/industrias/agricola" },
  openGraph: {
    title: "Agrícola | Soluciones plásticas KD Pack para el campo",
    description:
      "Packaging plástico reutilizable diseñado para la cosecha, el packing y la exportación agrícola.",
    url: "/industrias/agricola",
  },
};

const agricolaCategories = ["cajas-expo", "cajas-cosecheras", "especificos"];
const agricolaProjectSlugs = ["garces-fruit-berries"];

const applicationsByCategory: Record<string, { name: string; description: string; icon: string }> = {
  "cajas-expo": {
    name: "Cajas de exportación",
    description: "Formatos normados para packing y exportación de fruta fresca.",
    icon: "package",
  },
  "cajas-cosecheras": {
    name: "Cajas cosecheras",
    description: "Livianas y apilables, pensadas para la cosecha en campo.",
    icon: "boxes",
  },
  especificos: {
    name: "Soluciones específicas",
    description: "Desarrollos a medida para necesidades particulares de cada predio.",
    icon: "wrench",
  },
};

export default async function AgricolaPage() {
  const [doc, products, projects, clients] = await Promise.all([
    getPageDoc<IndustryPageDoc>("agricolaPage"),
    getProducts(),
    getProjects(),
    getClients(),
  ]);

  const applicationItems = agricolaCategories.map((slug) => ({
    slug,
    ...applicationsByCategory[slug],
    href: `/productos?categoria=${slug}`,
    productsHref: `/productos?categoria=${slug}`,
    imageColor: "2d5a3f",
  }));

  const featuredProducts = products
    .filter((p) => agricolaCategories.includes(p.category))
    .slice(0, 6);

  const featuredProjects = projects.filter((p) => agricolaProjectSlugs.includes(p.slug));

  const kdPackClients = clients.filter((c) => c.brand === "kdpack" || c.brand === "both");

  return (
    <IndustryPageTemplate
      doc={doc ?? undefined}
      defaults={{
        heroEyebrow: "Agrícola",
        heroTitleParts: [
          { text: "Soluciones plásticas" },
          { text: "para el campo" },
          { text: "que rinde.", highlight: true },
        ],
        heroSubtitle:
          "Cajas de exportación, cajas cosecheras y bins diseñados por KD Pack para la cosecha, el packing y el transporte de fruta y hortalizas.",
        heroPrimaryCta: { label: "Ver productos", href: "/productos?industria=Agr%C3%ADcola" },
        heroSecondaryCta: { label: "Cotizar proyecto", href: "/cotiza-tu-proyecto" },
        heroBadges: [
          { icon: "leaf", label: "Uso alimentario certificado" },
          { icon: "shield", label: "Resistente a la intemperie" },
          { icon: "boxes", label: "Stock permanente" },
          { icon: "truck", label: "Despacho a todo Chile" },
        ],
        heroImageBg: "2d5a3f",
        heroImageAlt: "Cajas cosecheras KD Pack con fruta en planta agrícola",
        applicationsEyebrow: "Soluciones para cada etapa",
        applicationsTitle: "Del campo al packing, con la caja correcta.",
        productsHref: "/productos?industria=Agr%C3%ADcola",
        productsEyebrow: "Productos destacados",
        productsTitle: "Diseñados para resistir cosecha tras cosecha.",
        whyEyebrow: "¿Por qué KD Pack para el agro?",
        whyTitle: "Un aliado que entiende los tiempos de la cosecha.",
        whyItems: [
          { icon: "warehouse", title: "Continuidad de suministro", description: "Fabricamos en Paine con stock permanente, sin depender de la temporada de importación." },
          { icon: "shield-plus", title: "Durabilidad en terreno", description: "Diseñadas para sol, polvo y ciclos intensivos de cosecha, con menos recambio por temporada." },
          { icon: "sparkles", title: "Formatos normados", description: "Cajas de exportación bajo los formatos que exige cada mercado de destino." },
          { icon: "cog", title: "Desarrollo a medida", description: "Trabajamos contigo para adaptar formatos a variedades y volúmenes específicos." },
        ],
        projectsEyebrow: "Proyectos que nos mueven",
        projectsTitle: "Acompañamos temporadas completas de cosecha.",
        ctaEyebrow: "¿Tienes un proyecto en mente?",
        ctaTitle: "Hablemos de la solución ideal para tu próxima temporada.",
        logosTitle: "Empresas del agro que confían en nuestras soluciones",
      }}
      applicationItems={applicationItems}
      featuredProducts={featuredProducts}
      featuredProjects={featuredProjects}
      clients={kdPackClients}
    />
  );
}
