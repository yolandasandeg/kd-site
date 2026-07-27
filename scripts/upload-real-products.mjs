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
const BRAND = "kdpack";

// Real KD Pack catalog, scraped from https://kdpack.cl (cajas-cosecheras, cajas-expo,
// accesorios, forestal, almacenaje, pesca). Site has no live "pallets" page today.
const PRODUCTS = [
  // --- Cajas cosecheras ---
  { code: "AG-062", name: "Caja Tote", size: "510 x 275 x 195 mm", category: "cajas-cosecheras", productType: "Cajas y bandejas", description: "Caja tote de fondo ondulado, apta para la cosecha y transporte de fruta.", features: ["Apilable", "Uso alimentario"], img: "https://kdpack.cl/wp-content/uploads/2021/05/AG-062.jpg" },
  { code: "AG-018MP", name: "Caja Cerecera con Manilla Plástica", size: "Consultar ficha técnica", category: "cajas-cosecheras", productType: "Cajas y bandejas", description: "Caja cerecera de fondo ondulado con tote de manilla plástica, para cosecha y transporte de cerezas.", features: ["Apilable", "Uso alimentario"], img: "https://kdpack.cl/wp-content/uploads/2020/11/ag-018mp-1.jpg" },
  { code: "AG-018MM", name: "Caja Cerecera Fondo Ondulado", size: "Consultar ficha técnica", category: "cajas-cosecheras", productType: "Cajas y bandejas", description: "Caja indicada para la cosecha y transporte de carozos y cerezas.", features: ["Apilable", "Uso alimentario"], img: "https://kdpack.cl/wp-content/uploads/2020/11/unnamed.jpg" },
  { code: "AG-009", name: "Caja Smartpick Pro", size: "Consultar ficha técnica", category: "cajas-cosecheras", productType: "Cajas y bandejas", description: "Caja especialmente diseñada para la cosecha y transporte de cerezas.", features: ["Apilable", "Uso alimentario"], img: "https://kdpack.cl/wp-content/uploads/2020/11/AG-009.jpg" },
  { code: "AG-012", name: "Caja Multiuso Ventilada", size: "6,1 litros", category: "cajas-cosecheras", productType: "Cajas y bandejas", description: "Caja de 6,1 litros para el transporte y cosecha de hortalizas.", features: ["Apilable", "Ventilado", "Uso alimentario"], img: "https://kdpack.cl/wp-content/uploads/2020/11/AG-012.jpg" },
  { code: "AG-010", name: "Caja Smartpick 4x", size: "Consultar ficha técnica", category: "cajas-cosecheras", productType: "Cajas y bandejas", description: "Indicada para la cosecha, transporte de cerezas y control de calidad de la fruta.", features: ["Apilable", "Uso alimentario"], img: "https://kdpack.cl/wp-content/uploads/2020/11/AG-010.jpg" },
  { code: "AG-001", name: "Bandeja Arándanos", size: "Consultar ficha técnica", category: "cajas-cosecheras", productType: "Cajas y bandejas", description: "Caja especialmente diseñada para la cosecha y transporte de arándanos.", features: ["Apilable", "Uso alimentario"], img: "https://kdpack.cl/wp-content/uploads/2020/11/AG-001.jpg" },
  { code: "AG-004K2", name: "Bandeja Arándanos K2", size: "Consultar ficha técnica", category: "cajas-cosecheras", productType: "Cajas y bandejas", description: "Caja especialmente diseñada para la cosecha y transporte de arándanos.", features: ["Apilable", "Uso alimentario"], img: "https://kdpack.cl/wp-content/uploads/2020/11/AG-004K2.jpg" },
  { code: "AG-035", name: "Caja Frutillera", size: "Consultar ficha técnica", category: "cajas-cosecheras", productType: "Cajas y bandejas", description: "Caja especialmente indicada para la cosecha y transporte de frutillas.", features: ["Apilable", "Uso alimentario"], img: "https://kdpack.cl/wp-content/uploads/2020/11/AG-035-1.jpg" },
  { code: "AG-021", name: "Caja Multiuso Cosechera 3/4", size: "Consultar ficha técnica", category: "cajas-cosecheras", productType: "Cajas y bandejas", description: "Caja indicada para la cosecha y transporte.", features: ["Apilable", "Uso alimentario"], img: "https://kdpack.cl/wp-content/uploads/2021/01/AG021.png" },
  { code: "AG-026", name: "Caja Frutera", size: "44 litros", category: "cajas-cosecheras", productType: "Cajas y bandejas", description: "Caja de 44 litros para el transporte y cosecha de fruta.", features: ["Apilable", "Uso alimentario"], img: "https://kdpack.cl/wp-content/uploads/2020/11/AG-026.jpg" },
  { code: "AG-040", name: "Caja Torito", size: "Consultar ficha técnica", category: "cajas-cosecheras", productType: "Cajas y bandejas", description: "Caja indicada para la cosecha y transporte de tomates.", features: ["Apilable", "Uso alimentario"], img: "https://kdpack.cl/wp-content/uploads/2020/11/AG-040.jpg" },
  { code: "AG-060", name: "Llenador Cereza 10 Bolsas USA", size: "10 cavidades", category: "cajas-cosecheras", productType: "Otros", description: "Contenedor de 10 cavidades especialmente diseñado para el llenado de cerezas.", features: ["Uso alimentario"], img: "https://kdpack.cl/wp-content/uploads/2020/11/AG-060-1.jpg" },
  { code: "AG-061", name: "Llenador Cereza 16 Bolsas Brasil", size: "16 cavidades", category: "cajas-cosecheras", productType: "Otros", description: "Contenedor de 16 cavidades especialmente diseñado para el llenado de cerezas.", features: ["Uso alimentario"], img: "https://kdpack.cl/wp-content/uploads/2020/11/AG-061.jpg" },
  { code: "BINS-001", name: "Bin Ventilado", size: "1220 x 1220 x 770 mm", category: "cajas-cosecheras", productType: "Bins y contenedores", description: "Producto apto para contacto con alimentos, medidas exteriores 1220 x 1220 x 770 mm.", features: ["Apilable", "Ventilado", "Uso alimentario"], img: "https://kdpack.cl/wp-content/uploads/2021/04/2-img.jpg" },
  { code: "BINS-002", name: "Bin Cerrado", size: "1220 x 1220 x 770 mm", category: "cajas-cosecheras", productType: "Bins y contenedores", description: "Producto apto para contacto con alimentos, medidas exteriores 1220 x 1220 x 770 mm.", features: ["Apilable", "Con tapa", "Uso alimentario"], img: "https://kdpack.cl/wp-content/uploads/2021/04/1-img.jpg" },

  // --- Cajas Expo (agrícola) ---
  { code: "AG-025K3", name: "Caja Expo Monoblock", size: "500 x 300 x 150 mm", category: "agricola", productType: "Cajas y bandejas", description: "Caja especialmente indicada para la cosecha y transporte de frutas de exportación.", features: ["Apilable", "Uso alimentario"], img: "https://kdpack.cl/wp-content/uploads/2020/11/kdpack.jpg" },
  { code: "AG-025-TUB", name: "Caja Expo Tubular", size: "500 x 300 x 150 mm", category: "agricola", productType: "Cajas y bandejas", description: "Caja de 19 litros para cosecha y transporte de frutos.", features: ["Apilable", "Uso alimentario"], img: "https://kdpack.cl/wp-content/uploads/2022/03/1-kdpack.jpg" },
  { code: "AG-029", name: "Caja Expo Granel Arándanos", size: "9 litros", category: "agricola", productType: "Cajas y bandejas", description: "Caja de 9 litros especialmente indicada para la cosecha y transporte de berries.", features: ["Apilable", "Uso alimentario"], img: "https://kdpack.cl/wp-content/uploads/2021/05/ag-029.jpg" },
  { code: "AG-029-K3", name: "Caja Expo Berries K2", size: "500 x 300 x 63 mm", category: "agricola", productType: "Cajas y bandejas", description: "Caja especialmente indicada para cosecha y transporte de berries.", features: ["Apilable", "Uso alimentario"], img: "https://kdpack.cl/wp-content/uploads/2021/06/ag.jpg" },
  { code: "AG-031", name: "Caja Expo Monoblock", size: "600 x 400 x 117 mm", category: "agricola", productType: "Cajas y bandejas", description: "Caja especialmente indicada para la cosecha y transporte de frutas de exportación.", features: ["Apilable", "Uso alimentario"], img: "https://kdpack.cl/wp-content/uploads/2020/11/AG-025-1-1.jpg" },
  { code: "AG-032", name: "Caja Expo Monoblock", size: "500 x 400 x 117 mm", category: "agricola", productType: "Cajas y bandejas", description: "Caja especialmente indicada para la cosecha y transporte de frutas de exportación.", features: ["Apilable", "Uso alimentario"], img: "https://kdpack.cl/wp-content/uploads/2021/05/ag-032.jpg" },
  { code: "AG-033", name: "Caja Expo Monoblock", size: "500 x 300 x 141 mm", category: "agricola", productType: "Cajas y bandejas", description: "Caja especialmente indicada para la cosecha y transporte de frutas de exportación.", features: ["Apilable", "Uso alimentario"], img: "https://kdpack.cl/wp-content/uploads/2021/05/ag-033.jpg" },

  // --- Accesorios (agrícola) ---
  { code: "AG-023", name: "Traversa W", size: "Consultar ficha técnica", category: "agricola", productType: "Otros", description: "Traversa W para bins, de alta resistencia a la fricción y el desgaste.", features: ["Reforzado"], img: "https://kdpack.cl/wp-content/uploads/2020/11/AG-023.jpg" },
  { code: "AG-024", name: "Traversa U", size: "Consultar ficha técnica", category: "agricola", productType: "Otros", description: "Traversa U para bins, de alta resistencia a la fricción y el desgaste.", features: ["Reforzado"], img: "https://kdpack.cl/wp-content/uploads/2020/11/AG-023-1.jpg" },
  { code: "AG-036", name: "Traversa WK2", size: "Consultar ficha técnica", category: "agricola", productType: "Otros", description: "Traversa WK2 para bins, de alta resistencia a la fricción y el desgaste, con tapas inferiores.", features: ["Reforzado"], img: "https://kdpack.cl/wp-content/uploads/2020/11/AG-036.jpg" },

  // --- Forestal ---
  { code: "FR-017K", name: "Tubete Almaciguero", size: "560 x 410 x 160 mm", category: "forestal", productType: "Cajas y bandejas", description: "Almaciguero de 88 cavidades, para producción de plantas forestales.", features: ["Apilable"], img: "https://kdpack.cl/wp-content/uploads/2021/05/FR-014-.jpg" },
  { code: "FR-017B", name: "Tubete Almaciguero", size: "600 x 360 x 115 mm", category: "forestal", productType: "Cajas y bandejas", description: "Almaciguero de 96 cavidades, para producción de plantas forestales.", features: ["Apilable"], img: "https://kdpack.cl/wp-content/uploads/2021/05/1-img.jpg" },
  { code: "FR-020K2", name: "Bandeja Células para Plantas", size: "565 x 415 x 100 mm", category: "forestal", productType: "Cajas y bandejas", description: "Porta Ellepot apilable y anidable, de 88 cavidades.", features: ["Apilable"], img: "https://kdpack.cl/wp-content/uploads/2020/11/FR-020K2.jpg" },
  { code: "AG-028", name: "Macetero de 25 Litros", size: "25 litros", category: "forestal", productType: "Otros", description: "Macetero especial para plantación de arándanos, reduce el consumo de agua.", features: [], img: "https://kdpack.cl/wp-content/uploads/2020/11/ag-028.jpg" },
  { code: "FR-024", name: "Caja Plantación", size: "Consultar ficha técnica", category: "forestal", productType: "Cajas y bandejas", description: "Caja para cultivo de plantas y almácigos.", features: ["Apilable"], img: "https://kdpack.cl/wp-content/uploads/2020/11/FR-24.jpg" },

  // --- Almacenaje ---
  { code: "ACU-008", name: "Caja Multiuso Anidable y Apilable Cerrada", size: "46 litros", category: "almacenaje", productType: "Cajas y bandejas", description: "Caja de 46 litros para vendimia y transporte a bodega.", features: ["Apilable", "Con tapa", "Uso alimentario"], img: "https://kdpack.cl/wp-content/uploads/2020/11/ACU-008-1.jpg" },

  // --- Pesca ---
  { code: "ESP-004", name: "Bandeja Nippon", size: "Consultar ficha técnica", category: "pesca", productType: "Cajas y bandejas", description: "Contenedor multiuso para mariscos y crustáceos.", features: ["Uso alimentario"], img: "https://kdpack.cl/wp-content/uploads/2020/11/ESP-004-1.jpg" },
  { code: "ESP-005", name: "Bandeja Multiuso", size: "Consultar ficha técnica", category: "pesca", productType: "Cajas y bandejas", description: "Caja liviana multiuso.", features: ["Uso alimentario"], img: "https://kdpack.cl/wp-content/uploads/2020/11/ESP-005-1.jpg" },
  { code: "ESP-011", name: "Pote Erizo", size: "Consultar ficha técnica", category: "pesca", productType: "Cajas y bandejas", description: "Contenedor multiuso para mariscos, sellado de forma hermética.", features: ["Con tapa", "Uso alimentario"], img: "https://kdpack.cl/wp-content/uploads/2020/11/ESP-011.jpg" },
  { code: "ACU-009", name: "Caja Multiuso Anidable y Apilable", size: "46 litros", category: "pesca", productType: "Cajas y bandejas", description: "Caja de 46 litros para faenas pesqueras, anidable y apilable.", features: ["Apilable", "Ventilado", "Uso alimentario"], img: "https://kdpack.cl/wp-content/uploads/2020/11/ACU-009a.jpg" },
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
      order: 100 + i,
    };

    await client.createOrReplace(doc);
  }

  console.log(`Listo: ${PRODUCTS.length} productos reales subidos y conectados en Sanity.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
