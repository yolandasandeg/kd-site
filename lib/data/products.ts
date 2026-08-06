export type Brand = "kdpack" | "konstruplast";

export interface ProductDocument {
  label: string;
  file?: { asset?: { url?: string; originalFilename?: string } };
}

export interface Product {
  slug: string;
  name: string;
  code: string;
  size: string;
  material: string;
  category: string;
  brand: Brand;
  description: string;
  productType: string;
  features: string[];
  imageColor: string;
  documents?: ProductDocument[];
}

export const productCategories: { slug: string; label: string }[] = [
  { slug: "agricola", label: "Agrícola" },
  { slug: "cajas-expo", label: "Cajas expo" },
  { slug: "cajas-cosecheras", label: "Cajas cosecheras" },
  { slug: "forestal", label: "Forestal" },
  { slug: "almacenaje", label: "Almacenaje" },
  { slug: "pallets", label: "Pallets" },
  { slug: "pesca", label: "Pesca" },
  { slug: "acuicola", label: "Acuícola" },
  { slug: "especificos", label: "Específicos" },
  { slug: "encofrados", label: "Encofrados" },
  { slug: "separadores", label: "Separadores" },
  { slug: "tapas", label: "Tapas" },
  { slug: "terminaciones", label: "Terminaciones" },
  { slug: "alivianantes", label: "Alivianantes" },
  { slug: "drenaje", label: "Drenaje" },
];

// Which brand each product category belongs to, so a bare "?categoria=" link
// (e.g. from the footer) can resolve the right brand-scoped catalog without
// also needing an explicit "?marca=" param.
export const categoryBrand: Record<string, Brand> = {
  agricola: "kdpack",
  "cajas-expo": "kdpack",
  "cajas-cosecheras": "kdpack",
  forestal: "kdpack",
  almacenaje: "kdpack",
  pallets: "kdpack",
  pesca: "kdpack",
  acuicola: "kdpack",
  especificos: "kdpack",
  encofrados: "kdpack",
  separadores: "kdpack",
  tapas: "kdpack",
  terminaciones: "kdpack",
  alivianantes: "kdpack",
  drenaje: "kdpack",
  pasos: "kdpack",
};

export const productTypes = [
  "Bins y contenedores",
  "Cajas y bandejas",
  "Pallets",
  "Soluciones plegables",
  "Contenedores grandes",
  "Otros",
];

export const productCharacteristics = [
  "Apilable",
  "Plegable",
  "Con tapa",
  "Reforzado",
  "Ventilado",
  "Uso alimentario",
];

export const productMaterials = ["HDPE", "PP", "PP/PEHD"];

export const products: Product[] = [
  {
    slug: "bc-22",
    name: "Bin Cosechero 22 kg",
    code: "BC-22",
    size: "600 x 400 x 220 mm",
    material: "PP/PEHD",
    category: "agricola",
    brand: "kdpack",
    productType: "Bins y contenedores",
    description:
      "Bin cosechero diseñado para la recolección de frutas y hortalizas, con resistencia estructural para soportar múltiples ciclos de uso en campo.",
    features: ["Apilable", "Uso alimentario", "Ventilado"],
    imageColor: "1C7A43",
  },
  {
    slug: "ca-15",
    name: "Caja Agrícola 15 kg",
    code: "CA-15",
    size: "600 x 400 x 150 mm",
    material: "PP/PEHD",
    category: "agricola",
    brand: "kdpack",
    productType: "Cajas y bandejas",
    description:
      "Caja liviana para cosecha y transporte de productos agrícolas, con ventilación optimizada para preservar la frescura.",
    features: ["Apilable", "Ventilado", "Uso alimentario"],
    imageColor: "1C7A43",
  },
  {
    slug: "ci-50",
    name: "Caja Industrial 50 L",
    code: "CI-50",
    size: "600 x 400 x 300 mm",
    material: "PP/PEHD",
    category: "almacenaje",
    brand: "kdpack",
    productType: "Cajas y bandejas",
    description:
      "Contenedor de alta resistencia para almacenaje y transporte de insumos industriales, apto para líneas de producción intensivas.",
    features: ["Apilable", "Reforzado", "Con tapa"],
    imageColor: "141414",
  },
  {
    slug: "pp-1210",
    name: "Pallet Plástico 1200x1000",
    code: "PP-1210",
    size: "1200 x 1000 x 150 mm",
    material: "PP/PEAD",
    category: "pallets",
    brand: "kdpack",
    productType: "Pallets",
    description:
      "Pallet plástico estándar para logística y almacenaje, higiénico y de larga vida útil, compatible con racks y grúas horquilla.",
    features: ["Reforzado", "Uso alimentario"],
    imageColor: "141414",
  },
  {
    slug: "bin-1000",
    name: "Bin 1000 L",
    code: "BIN-1000",
    size: "1200 x 1000 x 760 mm",
    material: "PEHD",
    category: "almacenaje",
    brand: "kdpack",
    productType: "Contenedores grandes",
    description:
      "Bin de gran capacidad para almacenaje y transporte de grandes volúmenes, con estructura reforzada para uso intensivo.",
    features: ["Apilable", "Reforzado"],
    imageColor: "141414",
  },
  {
    slug: "cv-20",
    name: "Caja Ventilada 20 kg",
    code: "CV-20",
    size: "600 x 400 x 200 mm",
    material: "PP/PEHD",
    category: "agricola",
    brand: "kdpack",
    productType: "Cajas y bandejas",
    description:
      "Caja con ventilación lateral para transporte de frutas y hortalizas, favorece la circulación de aire y reduce la humedad.",
    features: ["Apilable", "Ventilado", "Uso alimentario"],
    imageColor: "1C7A43",
  },
  {
    slug: "bp-80",
    name: "Bin Pesquero 80 L",
    code: "BP-80",
    size: "800 x 600 x 260 mm",
    material: "PEHD",
    category: "pesca",
    brand: "kdpack",
    productType: "Bins y contenedores",
    description:
      "Contenedor diseñado para la industria pesquera, resistente a la humedad y de fácil limpieza para condiciones exigentes.",
    features: ["Con tapa", "Uso alimentario"],
    imageColor: "2563a8",
  },
  {
    slug: "cf-30",
    name: "Caja Forestal 30 kg",
    code: "CF-30",
    size: "600 x 400 x 320 mm",
    material: "PP/PEHD",
    category: "forestal",
    brand: "kdpack",
    productType: "Cajas y bandejas",
    description:
      "Caja de alta resistencia para viveros y transporte de plantas, pensada para operaciones forestales exigentes.",
    features: ["Apilable", "Reforzado"],
    imageColor: "3d5c3a",
  },
  {
    slug: "pp-r1208",
    name: "Pallet Rackeable",
    code: "PP-R1208",
    size: "1200 x 800 x 160 mm",
    material: "PP/PEAD",
    category: "pallets",
    brand: "kdpack",
    productType: "Pallets",
    description:
      "Pallet rackeable para almacenaje en altura, con nervaduras reforzadas para soportar cargas elevadas en bodega.",
    features: ["Reforzado"],
    imageColor: "141414",
  },
  {
    slug: "cn-660",
    name: "Contenedor 660 L",
    code: "CN-660",
    size: "1200 x 1000 x 580 mm",
    material: "PEHD",
    category: "almacenaje",
    brand: "kdpack",
    productType: "Contenedores grandes",
    description:
      "Contenedor de gran volumen para almacenaje industrial, apilable y compatible con sistemas de manipulación mecanizada.",
    features: ["Apilable", "Reforzado"],
    imageColor: "141414",
  },
  {
    slug: "ba-05",
    name: "Bandeja Apilable",
    code: "BA-05",
    size: "600 x 400 x 70 mm",
    material: "PP",
    category: "cajas-cosecheras",
    brand: "kdpack",
    productType: "Cajas y bandejas",
    description:
      "Bandeja liviana y apilable para cosecha de berries y productos delicados, minimiza el daño mecánico durante el transporte.",
    features: ["Apilable", "Uso alimentario"],
    imageColor: "1C7A43",
  },
  {
    slug: "ch-120",
    name: "Caja para Hielo 120 L",
    code: "CH-120",
    size: "800 x 600 x 420 mm",
    material: "PEHD",
    category: "pesca",
    brand: "kdpack",
    productType: "Otros",
    description:
      "Caja aislante para transporte de productos con hielo, resistente a la humedad y de fácil limpieza para la industria pesquera.",
    features: ["Con tapa", "Uso alimentario"],
    imageColor: "2563a8",
  },
  // Konstruplast
  {
    slug: "kp-120",
    name: "Panel Encofrado KP 120",
    code: "KP-120",
    size: "1200 x 600 x 75 mm",
    material: "PP/ABS",
    category: "encofrados",
    brand: "konstruplast",
    productType: "Encofrados plásticos",
    description:
      "Panel modular de encofrado plástico para muros, losas y columnas, con alta resistencia mecánica y reutilización prolongada.",
    features: ["Reforzado", "Apilable"],
    imageColor: "141414",
  },
  {
    slug: "kp-60",
    name: "Panel Encofrado KP 60",
    code: "KP-60",
    size: "600 x 600 x 75 mm",
    material: "PP/ABS",
    category: "encofrados",
    brand: "konstruplast",
    productType: "Encofrados plásticos",
    description:
      "Panel modular de menor formato para ajustes y remates en sistemas de encofrado plástico.",
    features: ["Reforzado", "Apilable"],
    imageColor: "141414",
  },
  {
    slug: "sc-25-30",
    name: "Separador Cono 25/30",
    code: "SC-25/30",
    size: "25 - 30 mm",
    material: "PP",
    category: "separadores",
    brand: "konstruplast",
    productType: "Separadores y distanciadores",
    description:
      "Separador cónico que garantiza el recubrimiento estructural según norma en elementos de hormigón armado.",
    features: ["Reforzado"],
    imageColor: "1C7A43",
  },
  {
    slug: "ts-20-32",
    name: "Tapa de Seguridad 20/32",
    code: "TS-20/32",
    size: "20 - 32 mm",
    material: "PP",
    category: "tapas",
    brand: "konstruplast",
    productType: "Tapas de seguridad",
    description:
      "Tapa de protección para fierros expuestos en obra, reduce riesgos de accidentes según normativa de seguridad laboral.",
    features: ["Uso alimentario"],
    imageColor: "1C7A43",
  },
  {
    slug: "ce-kp",
    name: "Caja Eléctrica KP",
    code: "CE-KP",
    size: "100 x 100 x 50 mm",
    material: "PP",
    category: "terminaciones",
    brand: "konstruplast",
    productType: "Elementos de terminación",
    description:
      "Elemento de terminación para instalaciones eléctricas e hidráulicas embebidas en hormigón.",
    features: ["Con tapa"],
    imageColor: "141414",
  },
  {
    slug: "alv-kp25",
    name: "Alivianante KP 25",
    code: "ALV-KP25",
    size: "500 x 500 x 250 mm",
    material: "PP",
    category: "alivianantes",
    brand: "konstruplast",
    productType: "Alivianantes plásticos",
    description:
      "Alivianante plástico para losas, reduce el peso propio de la estructura y optimiza el uso de hormigón.",
    features: ["Apilable"],
    imageColor: "141414",
  },
];

export function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getProductsByBrand(brand: Brand) {
  return products.filter((p) => p.brand === brand);
}

export function getRelatedProducts(product: Product, limit = 4) {
  return products
    .filter((p) => p.slug !== product.slug && p.category === product.category)
    .slice(0, limit);
}
