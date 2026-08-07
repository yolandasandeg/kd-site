import { Hero, type HeroBadge, type HeroTitlePart } from "@/components/sections/Hero";
import { CategoryGrid, type CategoryGridItem } from "@/components/sections/CategoryGrid";
import { FeatureRow, type FeatureItem } from "@/components/sections/FeatureRow";
import { ProductCard } from "@/components/sections/ProductCard";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { LogoStrip } from "@/components/sections/LogoStrip";
import type { Product } from "@/lib/data/products";
import type { Project } from "@/lib/data/projects";
import type { Client } from "@/lib/data/clients";
import type { SanityImageRef } from "@/sanity/lib/image";

export interface IndustryPageDoc {
  heroEyebrow?: string;
  heroTitleParts?: HeroTitlePart[];
  heroSubtitle?: string;
  heroPrimaryCta?: { label?: string; href?: string };
  heroSecondaryCta?: { label?: string; href?: string };
  heroBadges?: HeroBadge[];
  heroImage?: SanityImageRef;
  heroOverlayOpacity?: number;
  applicationsEyebrow?: string;
  applicationsTitle?: string;
  productsEyebrow?: string;
  productsTitle?: string;
  whyEyebrow?: string;
  whyTitle?: string;
  whyItems?: FeatureItem[];
  projectsEyebrow?: string;
  projectsTitle?: string;
  ctaEyebrow?: string;
  ctaTitle?: string;
  logosTitle?: string;
}

export interface IndustryPageDefaults {
  heroEyebrow: string;
  heroTitleParts: HeroTitlePart[];
  heroSubtitle: string;
  heroPrimaryCta: { label: string; href: string };
  heroSecondaryCta: { label: string; href: string };
  heroBadges: HeroBadge[];
  heroImageBg: string;
  heroImageAlt: string;
  applicationsEyebrow: string;
  applicationsTitle: string;
  productsHref: string;
  productsEyebrow: string;
  productsTitle: string;
  whyEyebrow: string;
  whyTitle: string;
  whyItems: FeatureItem[];
  projectsEyebrow: string;
  projectsTitle: string;
  ctaEyebrow: string;
  ctaTitle: string;
  logosTitle: string;
}

interface IndustryPageTemplateProps {
  doc?: IndustryPageDoc;
  defaults: IndustryPageDefaults;
  applicationItems: CategoryGridItem[];
  featuredProducts: (Product & { image?: SanityImageRef })[];
  featuredProjects: (Project & { image?: SanityImageRef })[];
  clients: Client[];
}

export function IndustryPageTemplate({
  doc,
  defaults,
  applicationItems,
  featuredProducts,
  featuredProjects,
  clients,
}: IndustryPageTemplateProps) {
  return (
    <>
      <Hero
        variant="dark"
        layout="full"
        eyebrow={doc?.heroEyebrow || defaults.heroEyebrow}
        titleParts={doc?.heroTitleParts?.length ? doc.heroTitleParts : defaults.heroTitleParts}
        subtitle={doc?.heroSubtitle || defaults.heroSubtitle}
        primaryCta={{
          label: doc?.heroPrimaryCta?.label || defaults.heroPrimaryCta.label,
          href: doc?.heroPrimaryCta?.href || defaults.heroPrimaryCta.href,
        }}
        secondaryCta={{
          label: doc?.heroSecondaryCta?.label || defaults.heroSecondaryCta.label,
          href: doc?.heroSecondaryCta?.href || defaults.heroSecondaryCta.href,
        }}
        badges={doc?.heroBadges?.length ? doc.heroBadges : defaults.heroBadges}
        imageAlt={defaults.heroImageAlt}
        imageBg={defaults.heroImageBg}
        image={doc?.heroImage}
        overlayOpacity={doc?.heroOverlayOpacity}
      />

      {applicationItems.length > 0 && (
        <CategoryGrid
          eyebrow={doc?.applicationsEyebrow || defaults.applicationsEyebrow}
          title={doc?.applicationsTitle || defaults.applicationsTitle}
          viewAllHref={defaults.productsHref}
          viewAllLabel="Ver todas las soluciones"
          items={applicationItems}
          variant="detailed"
        />
      )}

      {featuredProducts.length > 0 && (
        <section className="py-16 lg:py-20 bg-kd-surface-alt">
          <div className="container">
            <div className="flex items-end justify-between gap-4 flex-wrap">
              <div className="border-l-2 border-kd-green pl-4">
                <p className="eyebrow font-semibold">
                  {doc?.productsEyebrow || defaults.productsEyebrow}
                </p>
                <h2 className="mt-1.5 text-h2-mobile lg:text-h2-desktop text-kd-text-primary">
                  {doc?.productsTitle || defaults.productsTitle}
                </h2>
              </div>
              <a
                href={defaults.productsHref}
                className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-kd-green hover:text-kd-green-dark"
              >
                Ver todos los productos
              </a>
            </div>

            <div className="mt-9 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5">
              {featuredProducts.map((product) => (
                <ProductCard key={product.slug} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      <FeatureRow
        eyebrow={doc?.whyEyebrow || defaults.whyEyebrow}
        title={doc?.whyTitle || defaults.whyTitle}
        background="white"
        items={doc?.whyItems?.length ? doc.whyItems : defaults.whyItems}
      />

      {featuredProjects.length > 0 && (
        <section className="py-16 lg:py-20 bg-white">
          <div className="container">
            <div className="flex items-end justify-between gap-4 flex-wrap">
              <div className="border-l-2 border-kd-green pl-4 max-w-xl">
                <p className="eyebrow font-semibold">
                  {doc?.projectsEyebrow || defaults.projectsEyebrow}
                </p>
                <h2 className="mt-1.5 text-h2-mobile lg:text-h2-desktop text-kd-text-primary">
                  {doc?.projectsTitle || defaults.projectsTitle}
                </h2>
              </div>
              <a
                href="/proyectos"
                className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-kd-green hover:text-kd-green-dark"
              >
                Ver todos los proyectos
              </a>
            </div>

            <div className="mt-9 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProjects.map((project) => (
                <ProjectCard key={project.slug} project={project} variant="light" />
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBanner
        eyebrow={doc?.ctaEyebrow || defaults.ctaEyebrow}
        title={doc?.ctaTitle || defaults.ctaTitle}
      />
      <LogoStrip
        title={doc?.logosTitle || defaults.logosTitle}
        clients={clients}
      />
    </>
  );
}
