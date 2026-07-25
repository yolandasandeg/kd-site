export type Brand = "kdpack" | "konstruplast";

export interface Project {
  slug: string;
  brand: Brand;
  industry: string;
  client: string;
  title: string;
  description: string;
  imageColor: string;
}

export const projects: Project[] = [
  {
    slug: "garces-fruit-berries",
    brand: "kdpack",
    industry: "Agrícola",
    client: "Garces Fruit",
    title: "Cajas cosecheras para exportación de berries",
    description:
      "Desarrollo de bins cosecheros de alta resistencia que aseguran calidad y protección del producto durante toda la cadena.",
    imageColor: "2d5a3f",
  },
  {
    slug: "frusan-logistica",
    brand: "kdpack",
    industry: "Logística",
    client: "Frusan",
    title: "Optimización de almacenamiento con bins logísticos",
    description:
      "Implementación de contenedores y pallets plásticos que mejoran la eficiencia, seguridad y espacio de almacenamiento.",
    imageColor: "1f2937",
  },
  {
    slug: "almagro-encofrados",
    brand: "konstruplast",
    industry: "Construcción",
    client: "Constructora Almagro",
    title: "Encofrados plásticos para obras de gran escala",
    description:
      "Sistemas modulares reutilizables que aceleran los tiempos de obra y reducen costos.",
    imageColor: "3f3f3a",
  },
  {
    slug: "copefrut-pesquera",
    brand: "kdpack",
    industry: "Pesquera",
    client: "Copefrut",
    title: "Cajas plásticas para la industria pesquera",
    description:
      "Soluciones diseñadas para condiciones extremas, resistentes a la humedad y fáciles de limpiar.",
    imageColor: "1c3f5c",
  },
  {
    slug: "talley-industrial",
    brand: "kdpack",
    industry: "Industrial",
    client: "Talley",
    title: "Contenedores para líneas de producción",
    description:
      "Cajas y contenedores plásticos diseñados para flujos automáticos y uso intensivo en la industria.",
    imageColor: "141414",
  },
  {
    slug: "edificio-residencial-santiago",
    brand: "konstruplast",
    industry: "Edificación",
    client: "Edificio Residencial Santiago, Chile",
    title: "Edificio Residencial Santiago, Chile",
    description:
      "Suministro integral de encofrados y separadores plásticos para un proyecto residencial de gran altura.",
    imageColor: "3f3f3a",
  },
  {
    slug: "planta-industrial-antofagasta",
    brand: "konstruplast",
    industry: "Obra industrial",
    client: "Planta Industrial Antofagasta, Chile",
    title: "Planta Industrial Antofagasta, Chile",
    description:
      "Acompañamiento técnico y suministro de soluciones plásticas para una planta industrial en el norte de Chile.",
    imageColor: "141414",
  },
  {
    slug: "mejoramiento-infraestructura-valparaiso",
    brand: "konstruplast",
    industry: "Obra pública",
    client: "Mejoramiento Infraestructura Valparaíso, Chile",
    title: "Mejoramiento Infraestructura Valparaíso, Chile",
    description:
      "Provisión de alivianantes y elementos de terminación para un proyecto de infraestructura pública.",
    imageColor: "1c3f5c",
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function getProjectsByBrand(brand: Brand) {
  return projects.filter((p) => p.brand === brand);
}
