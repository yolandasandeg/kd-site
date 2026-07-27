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

const MATERIAL = "PP/PEHD";
const BRAND = "konstruplast";

// Real Konstruplast catalog, scraped from https://kdren.cl
const PRODUCTS = [
  {
    code: "CONODREN",
    name: "Conodren",
    size: "630 x 400 x 800 mm",
    category: "encofrados",
    productType: "Otros",
    description:
      "Sistema de conos plásticos para drenaje de aguas en fundaciones: la solución más eficiente para reemplazar el radier tradicional, reduciendo tiempo y costo de excavación.",
    features: ["Reforzado"],
    img: "https://kdren.cl/wp-content/uploads/2021/06/conodren.jpg",
  },
  {
    code: "KBOX-B",
    name: "Cámara KBox Tipo B",
    size: "700 x 700 mm exterior (600 x 600 mm interior), alturas 627/853 mm",
    category: "terminaciones",
    productType: "Otros",
    description:
      "Cámara subterránea para instalaciones eléctricas, homologada por la SEC.",
    features: [],
    img: "https://kdren.cl/wp-content/uploads/2025/07/kbox-1024x947.jpg",
  },
  {
    code: "KBOX-C",
    name: "Cámara KBox Tipo C",
    size: "500 x 500 mm exterior (400 x 400 mm interior), alturas 627/853 mm",
    category: "terminaciones",
    productType: "Otros",
    description:
      "Cámara subterránea para instalaciones eléctricas, homologada por la SEC.",
    features: [],
    img: "https://kdren.cl/wp-content/uploads/2025/07/kbox-1024x947.jpg",
  },
];

function slugify(code) {
  return code
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function uploadImage(url, filename) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`);
  const buffer = Buffer.from(await res.arrayBuffer());
  const asset = await client.assets.upload("image", buffer, { filename });
  return { _type: "image", asset: { _type: "reference", _ref: asset._id } };
}

async function main() {
  let i = 0;
  for (const p of PRODUCTS) {
    i += 1;
    const slug = slugify(p.code);
    const filename = `${slug}.jpg`;
    console.log(`[${i}/${PRODUCTS.length}] ${p.code} -> ${filename}`);

    const image = await uploadImage(p.img, filename);

    const doc = {
      _id: `product-${slug}`,
      _type: "product",
      name: p.name,
      code: p.code,
      slug: { _type: "slug", current: slug },
      size: p.size,
      material: MATERIAL,
      category: p.category,
      brand: BRAND,
      productType: p.productType,
      description: p.description,
      features: p.features,
      image,
      order: 200 + i,
    };

    await client.createOrReplace(doc);
  }

  console.log(`Listo: ${PRODUCTS.length} productos reales de Konstruplast subidos.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
