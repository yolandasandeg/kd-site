import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import type { Project } from "@/lib/data/projects";
import { Icon } from "@/components/icon-map";
import { resolveImageSrc, type SanityImageRef } from "@/sanity/lib/image";

const industryIcon: Record<string, string> = {
  Agrícola: "leaf",
  Logística: "truck",
  Construcción: "building",
  Pesquera: "fish",
  Industrial: "cog",
  Edificación: "building-2",
  "Obra industrial": "factory",
  "Obra pública": "warehouse",
};

interface ProjectCardProps {
  project: Project & { image?: SanityImageRef };
  variant?: "dark" | "light";
}

export function ProjectCard({ project, variant = "light" }: ProjectCardProps) {
  const icon = industryIcon[project.industry] ?? "star";

  if (variant === "dark") {
    return (
      <div className="group">
        <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
          <Image
            src={resolveImageSrc(project.image, project.imageColor, "560x420")}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(min-width: 1024px) 30vw, 100vw"
          />
          <div className="absolute top-3 left-3 eyebrow bg-black/40 backdrop-blur px-2.5 py-1 rounded-full !text-white">
            {project.industry}
          </div>
        </div>
        <h3 className="mt-4 text-base font-semibold text-white">
          {project.title}
        </h3>
        <Link
          href={`/proyectos/${project.slug}`}
          className="mt-1.5 inline-flex items-center gap-1.5 text-sm font-semibold text-kd-green hover:text-white transition-colors"
        >
          Ver proyecto
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    );
  }

  return (
    <Link
      href={`/proyectos/${project.slug}`}
      className="group flex flex-col rounded-xl border border-kd-border bg-white overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={resolveImageSrc(project.image, project.imageColor, "560x420")}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(min-width: 1024px) 20vw, (min-width: 640px) 45vw, 100vw"
        />
        <div className="absolute bottom-3 left-3 flex h-9 w-9 items-center justify-center rounded-full bg-kd-green">
          <Icon name={icon} className="h-4.5 w-4.5 text-white" />
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="eyebrow font-semibold">{project.industry}</p>
        <h3 className="mt-1.5 text-base font-semibold text-kd-text-primary">
          {project.title}
        </h3>
        <p className="mt-1.5 text-sm text-kd-text-secondary leading-relaxed flex-1">
          {project.description}
        </p>
        <p className="mt-4 text-sm font-semibold text-kd-text-primary uppercase tracking-wide">
          {project.client}
        </p>
      </div>
    </Link>
  );
}
