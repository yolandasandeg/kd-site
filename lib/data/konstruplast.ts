export interface KonstruplastApplication {
  slug: string;
  name: string;
  description: string;
  icon: "layout-panel-left" | "spline" | "shield" | "square-stack" | "wrench" | "package";
}

export const konstruplastApplications: KonstruplastApplication[] = [
  {
    slug: "encofrados",
    name: "Encofrados plásticos",
    description: "Sistemas modulares para muros, losas y columnas.",
    icon: "layout-panel-left",
  },
  {
    slug: "separadores",
    name: "Separadores y distanciadores",
    description: "Garantizan el recubrimiento estructural según norma.",
    icon: "spline",
  },
  {
    slug: "tapas",
    name: "Tapas de seguridad",
    description: "Protección para fierros expuestos.",
    icon: "shield",
  },
  {
    slug: "terminaciones",
    name: "Elementos de terminación",
    description: "Soluciones para remates, juntas y bordes.",
    icon: "square-stack",
  },
  {
    slug: "pasos",
    name: "Pasos y canalizaciones",
    description: "Elementos para instalaciones eléctricas e hidráulicas.",
    icon: "wrench",
  },
  {
    slug: "alivianantes",
    name: "Alivianantes plásticos",
    description: "Reducción de peso propio y optimización estructural.",
    icon: "package",
  },
];
