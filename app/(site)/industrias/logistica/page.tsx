import type { Metadata } from "next";

import { IndustryPageTemplate, type IndustryPageDoc } from "@/components/sections/IndustryPageTemplate";
import { getClients, getPageDoc, getProducts, getProjects } from "@/sanity/lib/queries";

export const metadata: Metadata = {
  title: "Logística | Soluciones plásticas KD Pack para almacenaje y distribución",
  description:
    "Bins, contenedores y pallets plásticos reutilizables para almacenaje, distribución y manejo de carga.",
  alternates: { canonical: "/industrias/logistica" },
  openGraph: {
    title: "Logística | Soluciones plásticas KD Pack para almacenaje y distribución",
    description:
      "Packaging plástico reutilizable que optimiza el almacenaje, la distribución y el manejo de carga.",
    url: "/industrias/logistica",
  },
};

const logisticaCategories = ["almacenaje", "pallets"];
const logisticaProjectSlugs = ["frusan-logistica"];

const applicationsByCategory: Record<string, { name: string; description: string; icon: string }> = {
  almacenaje: {
    name: "Contenedores de almacenaje",
    description: "Bins y contenedores de alta resistencia para bodega y planta.",
    icon: "warehouse",
  },
  pallets: {
    name: "Pallets plásticos",
    description: "Higiénicos, livianos y compatibles con racks y grúas horquilla.",
    icon: "layers",
  },
};

export default async function LogisticaPage() {
  const [doc, products, projects, clients] = await Promise.all([
    getPageDoc<IndustryPageDoc>("logisticaPage"),
    getProducts(),
    getProjects(),
    getClients(),
  ]);

  const applicationItems = logisticaCategories.map((slug) => ({
    slug,
    ...applicationsByCategory[slug],
    href: `/productos?categoria=${slug}`,
    productsHref: `/productos?categoria=${slug}`,
    imageColor: "1f2937",
  }));

  const featuredProducts = products
    .filter((p) => logisticaCategories.includes(p.category))
    .slice(0, 6);

  const featuredProjects = projects.filter((p) => logisticaProjectSlugs.includes(p.slug));

  const kdPackClients = clients.filter((c) => c.brand === "kdpack" || c.brand === "both");

  return (
    <IndustryPageTemplate
      doc={doc ?? undefined}
      defaults={{
        heroEyebrow: "Logística",
        heroTitleParts: [
          { text: "Soluciones plásticas" },
          { text: "que mueven tu" },
          { text: "cadena de suministro.", highlight: true },
        ],
        heroSubtitle:
          "Bins, contenedores y pallets diseñados por KD Pack para optimizar el almacenaje, la distribución y el manejo de carga.",
        heroPrimaryCta: { label: "Ver productos", href: "/productos?industria=Log%C3%ADstica" },
        heroSecondaryCta: { label: "Cotizar proyecto", href: "/cotiza-tu-proyecto" },
        heroBadges: [
          { icon: "layers", label: "Compatibles con racks y grúas" },
          { icon: "shield", label: "Higiénicos y livianos" },
          { icon: "boxes", label: "Alta rotación" },
          { icon: "truck", label: "Despacho a todo Chile y LATAM" },
        ],
        heroImageBg: "1f2937",
        heroImageAlt: "Pallets y contenedores plásticos KD Pack en bodega",
        applicationsEyebrow: "Soluciones para cada etapa",
        applicationsTitle: "Optimiza el flujo de tu operación logística.",
        productsHref: "/productos?industria=Log%C3%ADstica",
        productsEyebrow: "Productos destacados",
        productsTitle: "Diseñados para uso intensivo en bodega.",
        whyEyebrow: "¿Por qué KD Pack para logística?",
        whyTitle: "Un aliado que entiende tu operación de punta a punta.",
        whyItems: [
          { icon: "warehouse", title: "Continuidad de suministro", description: "Fabricamos en Paine con stock permanente para reposición rápida en tu operación." },
          { icon: "shield-plus", title: "Durabilidad comprobada", description: "Diseñados para ciclos intensivos de carga y manejo mecanizado, con menor recambio." },
          { icon: "sparkles", title: "Compatibilidad operacional", description: "Formatos compatibles con racks, grúas horquilla y sistemas de almacenaje estándar." },
          { icon: "cog", title: "Desarrollo a medida", description: "Adaptamos formatos y volúmenes a la operación específica de tu bodega o flota." },
        ],
        projectsEyebrow: "Proyectos que nos mueven",
        projectsTitle: "Acompañamos operaciones logísticas de alto flujo.",
        ctaEyebrow: "¿Tienes un proyecto en mente?",
        ctaTitle: "Hablemos de cómo optimizar tu cadena de suministro.",
        logosTitle: "Empresas logísticas que confían en nuestras soluciones",
      }}
      applicationItems={applicationItems}
      featuredProducts={featuredProducts}
      featuredProjects={featuredProjects}
      clients={kdPackClients}
    />
  );
}
