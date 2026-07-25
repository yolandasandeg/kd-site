import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { projects as staticProjects } from "@/lib/data/projects";
import { getProjects } from "@/sanity/lib/queries";
import { resolveImageSrc } from "@/sanity/lib/image";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return staticProjects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const projects = await getProjects();
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};

  return {
    title: project.title,
    description: project.description,
    alternates: { canonical: `/proyectos/${project.slug}` },
    openGraph: {
      title: `${project.title} | KD Plus`,
      description: project.description,
      url: `/proyectos/${project.slug}`,
    },
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const projects = await getProjects();
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  const related = projects
    .filter((p) => p.slug !== project.slug && p.brand === project.brand)
    .slice(0, 3);

  const brandLabel = project.brand === "kdpack" ? "KD Pack" : "Konstruplast";
  const brandHref = project.brand === "kdpack" ? "/" : "/konstruplast";

  return (
    <>
      <section className="border-b border-kd-border bg-white">
        <div className="container py-4">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-kd-text-secondary">
            <Link href="/" className="hover:text-kd-green">
              Inicio
            </Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/proyectos" className="hover:text-kd-green">
              Proyectos
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-kd-text-primary">{project.title}</span>
          </nav>
        </div>
      </section>

      <section className="py-10 lg:py-14">
        <div className="container grid lg:grid-cols-2 gap-10 lg:gap-14">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
            <Image
              src={resolveImageSrc(project.image, project.imageColor, "900x680")}
              alt={project.title}
              fill
              priority
              className="object-cover"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="eyebrow font-semibold">{project.industry}</span>
              <span className="text-kd-text-secondary">·</span>
              <Link
                href={brandHref}
                className="text-xs font-semibold uppercase tracking-wide text-kd-text-secondary hover:text-kd-green"
              >
                {brandLabel}
              </Link>
            </div>
            <h1 className="mt-2 text-h1-mobile lg:text-h2-desktop text-kd-text-primary">
              {project.title}
            </h1>
            <p className="mt-1 text-sm font-semibold uppercase tracking-wide text-kd-text-secondary">
              {project.client}
            </p>

            <p className="mt-5 text-sm sm:text-base text-kd-text-secondary leading-relaxed">
              {project.description}
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Button asChild size="lg">
                <Link href="/cotiza-tu-proyecto">
                  Cotizar un proyecto similar
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/proyectos">Ver más proyectos</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="py-14 lg:py-16 bg-kd-surface-alt">
          <div className="container">
            <div className="border-l-2 border-kd-green pl-4">
              <p className="eyebrow font-semibold">Más casos de éxito</p>
              <h2 className="mt-1.5 text-h2-mobile lg:text-h2-desktop text-kd-text-primary">
                Proyectos relacionados.
              </h2>
            </div>
            <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((p) => (
                <ProjectCard key={p.slug} project={p} variant="light" />
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBanner />
    </>
  );
}
