import type { Metadata } from "next";

import { IndustryPageTemplate, type IndustryPageDoc } from "@/components/sections/IndustryPageTemplate";
import { getClients, getPageDoc, getProducts, getProjects } from "@/sanity/lib/queries";

export const metadata: Metadata = {
  title: "Forestal | Soluciones plásticas KD Pack para viveros y forestación",
  description:
    "Cajas y contenedores plásticos resistentes para viveros, transporte de plantas y operaciones forestales.",
  alternates: { canonical: "/industrias/forestal" },
  openGraph: {
    title: "Forestal | Soluciones plásticas KD Pack para viveros y forestación",
    description:
      "Packaging plástico reutilizable diseñado para las condiciones exigentes de la operación forestal.",
    url: "/industrias/forestal",
  },
};

const forestalCategories = ["forestal"];
const forestalProjectSlugs: string[] = [];

const applicationsByCategory: Record<string, { name: string; description: string; icon: string }> = {
  forestal: {
    name: "Cajas y contenedores forestales",
    description: "Alta resistencia para viveros y transporte de plantas en terreno.",
    icon: "trees",
  },
};

export default async function ForestalPage() {
  const [doc, products, projects, clients] = await Promise.all([
    getPageDoc<IndustryPageDoc>("forestalPage"),
    getProducts(),
    getProjects(),
    getClients(),
  ]);

  const applicationItems = forestalCategories.map((slug) => ({
    slug,
    ...applicationsByCategory[slug],
    href: `/productos?categoria=${slug}`,
    productsHref: `/productos?categoria=${slug}`,
    imageColor: "3d5c3a",
  }));

  const featuredProducts = products
    .filter((p) => forestalCategories.includes(p.category))
    .slice(0, 6);

  const featuredProjects = projects.filter((p) => forestalProjectSlugs.includes(p.slug));

  const kdPackClients = clients.filter((c) => c.brand === "kdpack" || c.brand === "both");

  return (
    <IndustryPageTemplate
      doc={doc ?? undefined}
      defaults={{
        heroEyebrow: "Forestal",
        heroTitleParts: [
          { text: "Soluciones plásticas" },
          { text: "para viveros y" },
          { text: "operaciones forestales.", highlight: true },
        ],
        heroSubtitle:
          "Cajas y contenedores diseñados por KD Pack para resistir las condiciones exigentes de viveros y transporte de plantas.",
        heroPrimaryCta: { label: "Ver productos", href: "/productos?industria=Forestal" },
        heroSecondaryCta: { label: "Cotizar proyecto", href: "/cotiza-tu-proyecto" },
        heroBadges: [
          { icon: "trees", label: "Alta resistencia en terreno" },
          { icon: "shield", label: "Resistente a la intemperie" },
          { icon: "boxes", label: "Stock permanente" },
          { icon: "truck", label: "Despacho a todo Chile" },
        ],
        heroImageBg: "3d5c3a",
        heroImageAlt: "Cajas plásticas KD Pack para vivero forestal",
        applicationsEyebrow: "Soluciones para cada etapa",
        applicationsTitle: "Pensadas para el uso intensivo en terreno.",
        productsHref: "/productos?industria=Forestal",
        productsEyebrow: "Productos destacados",
        productsTitle: "Diseñados para resistir sol, polvo y manejo constante.",
        whyEyebrow: "¿Por qué KD Pack para forestal?",
        whyTitle: "Un aliado que entiende las exigencias del terreno.",
        whyItems: [
          { icon: "warehouse", title: "Continuidad de suministro", description: "Fabricamos en Paine con stock permanente para reposición rápida en vivero." },
          { icon: "shield-plus", title: "Durabilidad comprobada", description: "Diseñadas para sol, polvo y ciclos intensivos de manejo en terreno." },
          { icon: "sparkles", title: "Materiales resistentes", description: "Plásticos de alta resistencia mecánica validados para uso forestal exigente." },
          { icon: "cog", title: "Desarrollo a medida", description: "Adaptamos formatos a las necesidades específicas de tu vivero u operación." },
        ],
        projectsEyebrow: "Proyectos que nos mueven",
        projectsTitle: "Acompañamos operaciones forestales en todo Chile.",
        ctaEyebrow: "¿Tienes un proyecto en mente?",
        ctaTitle: "Hablemos de la solución ideal para tu vivero u operación.",
        logosTitle: "Empresas que confían en nuestras soluciones",
      }}
      applicationItems={applicationItems}
      featuredProducts={featuredProducts}
      featuredProjects={featuredProjects}
      clients={kdPackClients}
    />
  );
}
