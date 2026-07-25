export interface SolutionCategory {
  slug: string;
  name: string;
  href: string;
  icon: "leaf" | "cog" | "truck" | "building" | "fish" | "star";
  imageColor: string;
}

export const solutionCategories: SolutionCategory[] = [
  {
    slug: "agricola",
    name: "Agrícola",
    href: "/productos?categoria=agricola",
    icon: "leaf",
    imageColor: "2d5a3f",
  },
  {
    slug: "industrial",
    name: "Industrial",
    href: "/productos?categoria=almacenaje",
    icon: "cog",
    imageColor: "141414",
  },
  {
    slug: "logistica",
    name: "Logística",
    href: "/productos?categoria=pallets",
    icon: "truck",
    imageColor: "1f2937",
  },
  {
    slug: "construccion",
    name: "Construcción",
    href: "/konstruplast",
    icon: "building",
    imageColor: "3f3f3a",
  },
  {
    slug: "pesquera",
    name: "Pesquera",
    href: "/productos?categoria=pesca",
    icon: "fish",
    imageColor: "1c3f5c",
  },
  {
    slug: "especiales",
    name: "Productos especiales",
    href: "/productos",
    icon: "star",
    imageColor: "141414",
  },
];
