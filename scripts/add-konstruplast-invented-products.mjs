import { createClient } from "@sanity/client";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

const MATERIAL_DEFAULT = "PP";
const BRAND = "konstruplast";

// Placeholder products for Konstruplast (no real photos yet -- explicitly
// requested by the user to fill out the catalog until real data/photos exist).
const PRODUCTS = [
  { code: "KP-120", name: "Panel Encofrado KP 120", size: "1200 x 600 x 75 mm", material: "PP/ABS", category: "encofrados", productType: "Otros", description: "Panel de encofrado plástico modular de alta resistencia para muros y losas.", features: ["Reforzado"], order: 300 },
  { code: "KP-60", name: "Panel Encofrado KP 60", size: "600 x 600 x 75 mm", material: "PP/ABS", category: "encofrados", productType: "Otros", description: "Panel de encofrado plástico modular, formato compacto para espacios reducidos.", features: ["Reforzado"], order: 301 },
  { code: "SC-25/30", name: "Separador Cono 25/30", size: "25 - 30 mm", material: "PP", category: "separadores", productType: "Otros", description: "Separador cónico para asegurar el recubrimiento correcto del hormigón.", features: ["Reforzado"], order: 302 },
  { code: "TS-20/32", name: "Tapa de Seguridad 20-32", size: "20 - 32 mm", material: "PP", category: "tapas", productType: "Otros", description: "Tapa de seguridad para protección de fierros y puntas en obra.", features: [], order: 303 },
  { code: "CE-KP", name: "Caja Eléctrica KP", size: "100 x 100 x 50 mm", material: "PP", category: "terminaciones", productType: "Otros", description: "Caja eléctrica embutida para instalaciones en muros y losas.", features: [], order: 304 },
  { code: "ALV-KP25", name: "Alivianante KP 25", size: "500 x 500 x 250 mm", material: "PP", category: "alivianantes", productType: "Otros", description: "Alivianante plástico para losas, reduce peso propio y consumo de hormigón.", features: ["Reforzado"], order: 305 },
];

function slugify(code) {
  return code.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

async function main() {
  for (const p of PRODUCTS) {
    const slug = slugify(p.code);
    const doc = {
      _id: `product-${slug}`,
      _type: "product",
      name: p.name,
      code: p.code,
      slug: { _type: "slug", current: slug },
      size: p.size,
      material: p.material || MATERIAL_DEFAULT,
      category: p.category,
      brand: BRAND,
      productType: p.productType,
      description: p.description,
      features: p.features,
      order: p.order,
    };
    await client.createOrReplace(doc);
    console.log("creado:", p.code, p.name);
  }
  console.log(`Listo: ${PRODUCTS.length} productos de Konstruplast agregados (sin foto, con placeholder).`);
}

main().catch((err) => { console.error(err); process.exit(1); });
