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

// Master spreadsheet rows (from "Maestra Productos.xlsx"), transcribed once.
const MASTER = [
  { code: "ACU008K2", name: "Caja Anidable Apilable Fondo Cerrado/Cuerpo Cerrado", brand: "kdpack", categoria: "Acuícola", material: "PEAD (virgen o reciclado)", size: "625 x 444 x 226 mm", volumen: "46", unidades: "100" },
  { code: "ACU009K2", name: "Caja Anidable Apilable Fondo Ventilado/Cuerpo Ventilado", brand: "kdpack", categoria: "Acuícola", material: "PEAD (virgen o reciclado)", size: "625 x 444 x 226 mm", volumen: "46", unidades: "100" },
  { code: "ACU010K2", name: "Caja Anidable Apilable Fondo Cerrado/Cuerpo Ventilado", brand: "kdpack", categoria: "Acuícola", material: "PEAD (virgen o reciclado)", size: "625 x 444 x 226 mm", volumen: "46", unidades: "100" },
  { code: "ESP004", name: "Bandeja Nippon", brand: "kdpack", categoria: "Acuícola", material: "PEAD", size: "326 x 227 x 52 mm", volumen: "2,6", unidades: "1000" },
  { code: "ESP005", name: "Bandeja Multiusom Erizo", brand: "kdpack", categoria: "Acuícola", material: "PEAD", size: "358 x 270 x 50 mm", volumen: "3,4", unidades: "1000" },
  { code: "ESP011", name: "Pote Erizo 1500 Cc", brand: "kdpack", categoria: "Acuícola", material: "PEAD", size: "214 x 148 x 66 mm", volumen: "1,6", unidades: "1000" },
  { code: "AG001", name: "Bandeja Berries", brand: "kdpack", categoria: "Agrícola", material: "PEAD", size: "454 x 344 x 62 mm", volumen: "7", unidades: "344" },
  { code: "AG004K2", name: "Bandeja Cosechera Arándanos", brand: "kdpack", categoria: "Agrícola", material: "PEAD", size: "500 x 300 x 67 mm", volumen: "9", unidades: "344" },
  { code: "AG009K2", name: "Caja Smartp Pick Pro", brand: "kdpack", categoria: "Agrícola", material: "PEAD", size: "300 x 200 x 193 mm", volumen: "10", unidades: "240" },
  { code: "AG010", name: "Caja Smartp Pick 4X", brand: "kdpack", categoria: "Agrícola", material: "PP", size: "285 x 185 x 155 mm", volumen: "8", unidades: "1000" },
  { code: "AG012", name: "Caja Multiuso Ventilada 30x20x12", brand: "kdpack", categoria: "Agrícola", material: "PP", size: "300 x 196 x 120 mm", volumen: "6", unidades: "400" },
  { code: "AG021", name: "Cosechera 3/4", brand: "kdpack", categoria: "Agrícola", material: "PEAD (virgen o reciclado)", size: "600 x 400 x 190 mm", volumen: "38", unidades: "80" },
  { code: "AG021K2", name: "Cosechera 3/4 K2", brand: "kdpack", categoria: "Agrícola", material: "PEAD (virgen o reciclado)", size: "600 x 400 x 190 mm", volumen: "38", unidades: "80" },
  { code: "AG025TUBFL", name: "Caja Expo 150 500x300x150 Tubular Fondo Liviano", brand: "kdpack", categoria: "Agrícola", material: "PP", size: "500 x 300 x 150 mm", volumen: "19", unidades: "144" },
  { code: "AG025TUBFP", name: "Caja Expo 150 500x300x150 Tubular Fondo Pesado", brand: "kdpack", categoria: "Agrícola", material: "PP", size: "500 x 300 x 150 mm", volumen: "19", unidades: "144" },
  { code: "AG026", name: "Caja Frutera", brand: "kdpack", categoria: "Agrícola", material: "PEAD (virgen o reciclado)", size: "600 x 400 x 215 mm", volumen: "44", unidades: "70" },
  { code: "AG029", name: "Caja Expo Arandanos 500x300x63", brand: "kdpack", categoria: "Agrícola", material: "PP", size: "500 x 300 x 63 mm", volumen: "9", unidades: "352" },
  { code: "AG029K3", name: "Caja Expo Arandanos 500x300x63 K3", brand: "kdpack", categoria: "Agrícola", material: "PP", size: "500 x 300 x 63 mm", volumen: "9", unidades: "352" },
  { code: "AG029K4", name: "Caja Expo Arandanos 500x300x63 K4", brand: "kdpack", categoria: "Agrícola", material: "PP", size: "500 x 300 x 63 mm", volumen: "9", unidades: "352" },
  { code: "AG029K6", name: "Caja Expo Arandanos 500x300x63 K6", brand: "kdpack", categoria: "Agrícola", material: "PP", size: "500 x 300 x 63 mm", volumen: "9", unidades: "352" },
  { code: "AG032K2", name: "Caja Expo Uva 500x400x117 K2", brand: "kdpack", categoria: "Agrícola", material: "PP", size: "500 x 400 x 117 mm", volumen: "22", unidades: "138" },
  { code: "AG032K3", name: "Caja Expo Uva 500x400x117 K3", brand: "kdpack", categoria: "Agrícola", material: "PP", size: "500 x 400 x 117 mm", volumen: "22", unidades: "138" },
  { code: "AG033TUB", name: "Caja 500x300x141 Tubular", brand: "kdpack", categoria: "Agrícola", material: "PP", size: "500 x 300 x 140 mm", volumen: "19", unidades: "152" },
  { code: "AG034IQF", name: "IQF Baja Cosecha Mecanizada", brand: "kdpack", categoria: "Agrícola", material: "PEAD", size: "600 x 400 x 60 mm", volumen: "14", unidades: "225" },
  { code: "AG035", name: "Caja Frutilla", brand: "kdpack", categoria: "Agrícola", material: "PEAD", size: "500 x 300 x 110 mm", volumen: "9", unidades: "200" },
  { code: "AG035IQF", name: "Caja Frutilla IQF", brand: "kdpack", categoria: "Agrícola", material: "PEAD", size: "600 x 400 x 100 mm", volumen: "22", unidades: "140" },
  { code: "AG035IQFFV", name: "Caja Frutilla IQF Fondo Ventilada", brand: "kdpack", categoria: "Agrícola", material: "PEAD", size: "600 x 400 x 100 mm", volumen: "22", unidades: "140" },
  { code: "AG040K1", name: "Caja Tomate Molde K1", brand: "kdpack", categoria: "Agrícola", material: "PEAD (virgen o reciclado)", size: "470 x 340 x 270 mm", volumen: "41", unidades: "128" },
  { code: "AG040K2", name: "Caja Tomate Molde K2", brand: "kdpack", categoria: "Agrícola", material: "PEAD (virgen o reciclado)", size: "470 x 340 x 270 mm", volumen: "41", unidades: "128" },
  { code: "AG040K3", name: "Caja Tomate Molde K3", brand: "kdpack", categoria: "Agrícola", material: "PEAD (virgen o reciclado)", size: "470 x 340 x 270 mm", volumen: "41", unidades: "128" },
  { code: "AG040K4", name: "Caja Tomate Molde K4", brand: "kdpack", categoria: "Agrícola", material: "PEAD (virgen o reciclado)", size: "470 x 340 x 270 mm", volumen: "41", unidades: "128" },
  { code: "AG040K5", name: "Caja Tomate Molde K5", brand: "kdpack", categoria: "Agrícola", material: "PEAD (virgen o reciclado)", size: "470 x 340 x 270 mm", volumen: "41", unidades: "128" },
  { code: "AG060K2", name: "Llenador 10 Cav Usa K2", brand: "kdpack", categoria: "Agrícola", material: "PEAD", size: "500 x 300 x 120 mm", volumen: "No aplica", unidades: "100" },
  { code: "AG061", name: "Llenador 16 Cav Brasil", brand: "kdpack", categoria: "Agrícola", material: "PEAD", size: "600 x 400 x 100 mm", volumen: "No aplica", unidades: "100" },
  { code: "AG062", name: "Caja Tote Fondo Ondulado New", brand: "kdpack", categoria: "Agrícola", material: "PEAD", size: "508 x 277 x 195 mm", volumen: "22", unidades: "140" },
  { code: "AG062-1", name: "Caja Tote Fondo Ondulado", brand: "kdpack", categoria: "Agrícola", material: "PEAD", size: "508 x 277 x 195 mm", volumen: "22", unidades: "140" },
  { code: "AG062K2", name: "Caja Tote Fondo Ondulado K2", brand: "kdpack", categoria: "Agrícola", material: "PEAD", size: "508 x 277 x 195 mm", volumen: "22", unidades: "140" },
  { code: "AG050", name: "Caja Cosechera 10 Kilos", brand: "kdpack", categoria: "Agrícola", material: "PEAD", size: "508 x 277 x 195 mm", volumen: "22", unidades: "140" },
  { code: "ESP061", name: "Dren Cono 42 Ton", brand: "konstruplast", categoria: "Construcción", material: "PP", size: "800 x 400 x 630 mm", volumen: "No aplica", unidades: "96" },
  { code: "ESP061NEG", name: "Dren Cono 32 Ton", brand: "konstruplast", categoria: "Construcción", material: "PP", size: "800 x 400 x 630 mm", volumen: "No aplica", unidades: "96" },
  { code: "ESP061L", name: "Dren Cono 26 Ton", brand: "konstruplast", categoria: "Construcción", material: "PP", size: "800 x 400 x 630 mm", volumen: "No aplica", unidades: "96" },
  { code: "ESP061T", name: "Dren Cono Titan", brand: "konstruplast", categoria: "Construcción", material: "PP", size: "800 x 400 x 630 mm", volumen: "No aplica", unidades: "96" },
  { code: "ESP062K2", name: "Tapa Lateral Dren K2", brand: "konstruplast", categoria: "Construcción", material: "PP", size: "400 x 630 mm", volumen: "No aplica", unidades: "600" },
  { code: "ESP080", name: "Camara Electrica B60 60X60H60", brand: "konstruplast", categoria: "Construcción", material: "PP", size: "700 x 700 x 627 mm", volumen: "216", unidades: "15" },
  { code: "ESP081", name: "Camara Electrica C60 40X40H60", brand: "konstruplast", categoria: "Construcción", material: "PP", size: "500 x 500 x 627 mm", volumen: "96", unidades: "40" },
  { code: "ESP082", name: "Camara Electrica B20 60X60H80", brand: "konstruplast", categoria: "Construcción", material: "PP", size: "700 x 700 x 853 mm", volumen: "288", unidades: "15" },
  { code: "ESP083", name: "Camara Electrica C20 40X40H80", brand: "konstruplast", categoria: "Construcción", material: "PP", size: "500 x 500 x 853 mm", volumen: "128", unidades: "40" },
  { code: "ESP045K2", name: "Caja Logistica K2", brand: "kdpack", categoria: "Especificos", material: "PP", size: "548 x 398 x 310 mm", volumen: "52", unidades: "80" },
  { code: "ESP046", name: "Caja Soprole Doble", brand: "kdpack", categoria: "Especificos", material: "PP", size: "403 x 403 x 112 mm", volumen: "17", unidades: "225" },
  { code: "ESP047", name: "Caja Soprole Simple", brand: "kdpack", categoria: "Especificos", material: "PP", size: "403 x 403 x 102 mm", volumen: "15", unidades: "225" },
  { code: "ESP048", name: "Caja Soprole Mini", brand: "kdpack", categoria: "Especificos", material: "PP", size: "403 x 403 x 85 mm", volumen: "12", unidades: "225" },
  { code: "AG023", name: "Traversa Wenco", brand: "kdpack", categoria: "Especificos", material: "PP", size: "1215 x 130 x 136 mm", volumen: "No aplica", unidades: "100" },
  { code: "AG024", name: "Traversa Upc", brand: "kdpack", categoria: "Especificos", material: "PEAD", size: "1220 x 132.5 x 129.5 mm", volumen: "No aplica", unidades: "100" },
  { code: "AG037", name: "Traversa Kdpack", brand: "kdpack", categoria: "Especificos", material: "PEAD", size: "1220 x 123 x 130 mm", volumen: "No aplica", unidades: "100" },
  { code: "BINS100", name: "Bins Ventilado", brand: "kdpack", categoria: "Especificos", material: "PEAD", size: "1220 x 1220 x 77 mm", volumen: "835", unidades: "1" },
  { code: "BINS200", name: "Bins Cerrado", brand: "kdpack", categoria: "Especificos", material: "PEAD", size: "1220 x 1220 x 77 mm", volumen: "835", unidades: "1" },
  { code: "AG028", name: "Macetero 25 LTS", brand: "kdpack", categoria: "Forestal", material: "PP", size: "Díametro 405 x 325 mm", volumen: "25", unidades: "300" },
  { code: "FR008", name: "Tubete 65 Cc", brand: "kdpack", categoria: "Forestal", material: "PP", size: "No aplica", volumen: "65 cm3", unidades: "No aplica" },
  { code: "FR009", name: "Tubete 140 Cc", brand: "kdpack", categoria: "Forestal", material: "PP", size: "No aplica", volumen: "140 cm3", unidades: "No aplica" },
  { code: "FR014", name: "Caja Almaciguera 88 Tubetes", brand: "kdpack", categoria: "Forestal", material: "PP", size: "560 x 410 x 160 mm", volumen: null, unidades: "156" },
  { code: "FR021", name: "Caja Almaciguera 96 Tubetes", brand: "kdpack", categoria: "Forestal", material: "PP", size: "600 x 360 x 115 mm", volumen: "No aplica", unidades: "156" },
  { code: "FR020K2", name: "Bandeja Ellepot", brand: "kdpack", categoria: "Forestal", material: "PP", size: "562 x 410 x 110 mm", volumen: "No aplica", unidades: "156" },
  { code: "FR024", name: "Caja Plantación", brand: "kdpack", categoria: "Forestal", material: "PEAD", size: "552 x 268 x 355 mm", volumen: "47", unidades: "200" },
  { code: "FR017B", name: "Kit Caja Almaciguera 96 Unidades", brand: "kdpack", categoria: "Forestal", material: "PP", size: "560 x 410 x 160 mm", volumen: "No aplica", unidades: "156" },
  { code: "FR017K", name: "Kit Caja Almaciguera 88 Unidades", brand: "kdpack", categoria: "Forestal", material: "PP", size: "600 x 360 x 115 mm", volumen: "No aplica", unidades: "156" },
];

// Manually reviewed matches: existing product code -> master code.
// Only pairs where the code family or name clearly refers to the same
// physical product; everything else in the master list becomes a new
// product instead of risking a wrong photo/spec pairing.
const MATCHES = {
  "AG-001": "AG001", "AG-004K2": "AG004K2", "AG-010": "AG010", "AG-012": "AG012",
  "AG-021": "AG021", "AG-023": "AG023", "AG-024": "AG024", "AG-026": "AG026",
  "AG-028": "AG028", "AG-029": "AG029", "AG-029-K3": "AG029K3", "AG-035": "AG035",
  "AG-061": "AG061", "AG-062": "AG062", "ESP-004": "ESP004", "ESP-005": "ESP005",
  "ESP-011": "ESP011", "FR-017B": "FR017B", "FR-017K": "FR017K", "FR-020K2": "FR020K2",
  "FR-024": "FR024",
  // Reviewed fuzzy matches (name/code family clearly the same item):
  "BINS-001": "BINS100", "BINS-002": "BINS200", "AG-009": "AG009K2",
  "AG-036": "AG037", "AG-025-TUB": "AG025TUBFP", "AG-060": "AG060K2",
  "ACU-008": "ACU008K2", "ACU-009": "ACU009K2",
};

// Fake placeholder Konstruplast products invented earlier (before real data
// existed) -- now superseded by real Construcción products in the master
// list, so they're removed rather than reconciled.
const DELETE_CODES = ["KP-120", "KP-60", "SC-25/30", "TS-20/32", "CE-KP", "ALV-KP25"];

function slugify(code) {
  return code.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

function newProductCategory(m) {
  if (m.categoria === "Acuícola") return "acuicola";
  if (m.categoria === "Agrícola") return "agricola";
  if (m.categoria === "Forestal") return "forestal";
  if (m.categoria === "Especificos") return "especificos";
  if (m.categoria === "Construcción") {
    if (m.name.startsWith("Camara Electrica")) return "terminaciones";
    return "drenaje";
  }
  return "especificos";
}

function productType(m) {
  const n = m.name.toLowerCase();
  if (n.includes("caja") || n.includes("bandeja") || n.includes("pote")) return "Cajas y bandejas";
  if (n.includes("bins")) return "Contenedores grandes";
  return "Otros";
}

async function run() {
  const current = await client.fetch(
    `*[_type == "product"]{_id, code, name, category, order}`
  );
  const byCode = new Map(current.map((p) => [p.code, p]));
  const maxOrder = Math.max(0, ...current.map((p) => p.order || 0));

  // 1. Update matched products (preserve photo, slug, category; refresh specs).
  const masterByCode = new Map(MASTER.map((m) => [m.code, m]));
  let updated = 0;
  for (const [existingCode, masterCode] of Object.entries(MATCHES)) {
    const existing = byCode.get(existingCode);
    const m = masterByCode.get(masterCode);
    if (!existing || !m) {
      console.warn("⚠ skip, not found:", existingCode, masterCode);
      continue;
    }
    await client
      .patch(existing._id)
      .set({
        code: m.code,
        name: m.name,
        material: m.material,
        size: m.size,
        volumeLiters: String(m.volumen ?? ""),
        unitsPerPallet: String(m.unidades ?? ""),
        recyclable: true,
        reusable: true,
      })
      .commit();
    updated++;
  }
  console.log(`✔ ${updated} productos existentes actualizados (foto y categoría preservadas)`);

  // 2. Delete fake Konstruplast placeholders.
  const toDelete = current.filter((p) => DELETE_CODES.includes(p.code));
  for (const p of toDelete) {
    await client.delete(p._id);
  }
  console.log(`✔ ${toDelete.length} productos ficticios de Konstruplast eliminados (reemplazados por reales)`);

  // 3. Create genuinely new products (no existing match, no photo yet).
  const matchedMasterCodes = new Set(Object.values(MATCHES));
  const newRows = MASTER.filter((m) => !matchedMasterCodes.has(m.code));
  let order = maxOrder + 1;
  let created = 0;
  for (const m of newRows) {
    const slug = slugify(m.code);
    const exists = await client.fetch(`*[_type == "product" && slug.current == $slug][0]{_id}`, { slug });
    if (exists) {
      console.warn("⚠ slug ya existe, se omite:", slug);
      continue;
    }
    await client.create({
      _type: "product",
      name: m.name,
      slug: { _type: "slug", current: slug },
      code: m.code,
      brand: m.brand,
      category: newProductCategory(m),
      productType: productType(m),
      size: m.size,
      material: m.material,
      volumeLiters: String(m.volumen ?? ""),
      unitsPerPallet: String(m.unidades ?? ""),
      recyclable: true,
      reusable: true,
      order: order++,
    });
    created++;
  }
  console.log(`✔ ${created} productos nuevos creados desde el maestro`);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
