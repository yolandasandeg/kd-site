import type { Metadata } from "next";

import { IndustryPageTemplate, type IndustryPageDoc } from "@/components/sections/IndustryPageTemplate";
import { getClients, getPageDoc, getProducts, getProjects } from "@/sanity/lib/queries";

export const metadata: Metadata = {
  title: "Pesca | Soluciones plásticas KD Pack para pesca y acuicultura",
  description:
    "Cajas y contenedores plásticos resistentes a la humedad para la industria pesquera y acuícola.",
  alternates: { canonical: "/industrias/pesca" },
  openGraph: {
    title: "Pesca | Soluciones plásticas KD Pack para pesca y acuicultura",
    description:
      "Packaging plástico reutilizable diseñado para las condiciones exigentes de pesca y acuicultura.",
    url: "/industrias/pesca",
  },
};

const pescaCategories = ["pesca", "acuicola"];
const pescaProjectSlugs = ["copefrut-pesquera"];

const applicationsByCategory: Record<string, { name: string; description: string; icon: string }> = {
  pesca: {
    name: "Cajas y contenedores pesqueros",
    description: "Resistentes a la humedad y de fácil limpieza para condiciones exigentes.",
    icon: "fish",
  },
  acuicola: {
    name: "Soluciones acuícolas",
    description: "Contenedores diseñados para operaciones de acuicultura.",
    icon: "waves",
  },
};

export default async function PescaPage() {
  const [doc, products, projects, clients] = await Promise.all([
    getPageDoc<IndustryPageDoc>("pescaPage"),
    getProducts(),
    getProjects(),
    getClients(),
  ]);

  const applicationItems = pescaCategories.map((slug) => ({
    slug,
    ...applicationsByCategory[slug],
    href: `/productos?categoria=${slug}`,
    productsHref: `/productos?categoria=${slug}`,
    imageColor: "2563a8",
  }));

  const featuredProducts = products
    .filter((p) => pescaCategories.includes(p.category))
    .slice(0, 6);

  const featuredProjects = projects.filter((p) => pescaProjectSlugs.includes(p.slug));

  const kdPackClients = clients.filter((c) => c.brand === "kdpack" || c.brand === "both");

  return (
    <IndustryPageTemplate
      doc={doc ?? undefined}
      defaults={{
        heroEyebrow: "Pesca",
        heroTitleParts: [
          { text: "Soluciones plásticas" },
          { text: "para pesca y" },
          { text: "acuicultura.", highlight: true },
        ],
        heroSubtitle:
          "Cajas y contenedores diseñados por KD Pack para resistir la humedad y las exigencias de la industria pesquera y acuícola.",
        heroPrimaryCta: { label: "Ver productos", href: "/productos?industria=Pesca" },
        heroSecondaryCta: { label: "Cotizar proyecto", href: "/cotiza-tu-proyecto" },
        heroBadges: [
          { icon: "fish", label: "Resistente a la humedad" },
          { icon: "sparkles", label: "Fácil limpieza" },
          { icon: "leaf", label: "Uso alimentario" },
          { icon: "truck", label: "Despacho a todo Chile" },
        ],
        heroImageBg: "2563a8",
        heroImageAlt: "Contenedores plásticos KD Pack para la industria pesquera",
        applicationsEyebrow: "Soluciones para cada etapa",
        applicationsTitle: "Pensadas para condiciones de humedad exigentes.",
        productsHref: "/productos?industria=Pesca",
        productsEyebrow: "Productos destacados",
        productsTitle: "Diseñados para resistir humedad y uso intensivo.",
        whyEyebrow: "¿Por qué KD Pack para pesca?",
        whyTitle: "Un aliado que entiende las exigencias de la industria.",
        whyItems: [
          { icon: "warehouse", title: "Continuidad de suministro", description: "Fabricamos en Paine con stock permanente para reposición rápida en planta o muelle." },
          { icon: "shield-plus", title: "Durabilidad comprobada", description: "Diseñados para resistir humedad, sal y ciclos intensivos de manejo." },
          { icon: "sparkles", title: "Fácil higienización", description: "Superficies lisas y de fácil limpieza para cumplir estándares sanitarios." },
          { icon: "cog", title: "Desarrollo a medida", description: "Adaptamos formatos a las necesidades específicas de tu operación pesquera o acuícola." },
        ],
        projectsEyebrow: "Proyectos que nos mueven",
        projectsTitle: "Acompañamos operaciones pesqueras y acuícolas.",
        ctaEyebrow: "¿Tienes un proyecto en mente?",
        ctaTitle: "Hablemos de la solución ideal para tu operación.",
        logosTitle: "Empresas que confían en nuestras soluciones",
      }}
      applicationItems={applicationItems}
      featuredProducts={featuredProducts}
      featuredProjects={featuredProjects}
      clients={kdPackClients}
    />
  );
}
