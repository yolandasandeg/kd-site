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

async function migrateBrand(type) {
  const docs = await client.fetch(`*[_type == $type && brand == "konstruplast"]{_id}`, { type });
  for (const d of docs) {
    await client.patch(d._id).set({ brand: "kdpack" }).commit();
  }
  console.log(`✔ ${docs.length} documentos "${type}" migrados de konstruplast a kdpack`);
}

async function run() {
  await migrateBrand("product");
  await migrateBrand("client");
  await migrateBrand("project");

  // Port the old Konstruplast page content into the new Construcción page,
  // reframed as a KD Pack industry vertical instead of a separate brand.
  const old = await client.fetch(`*[_id == "konstruplastPage"][0]`);
  if (old) {
    const {
      _id, _rev, _type, _createdAt, _updatedAt, _system,
      heroEyebrow, heroTitleParts, heroSubtitle, heroPrimaryCta, heroSecondaryCta,
      heroBadges, heroImage, heroOverlayOpacity, applicationsEyebrow, applicationsTitle,
      productsEyebrow, productsTitle, whyItems, projectsEyebrow, projectsTitle,
      ctaEyebrow, ctaTitle, logosTitle,
    } = old;

    await client.createOrReplace({
      _id: "construccionPage",
      _type: "construccionPage",
      heroEyebrow: "Construcción",
      heroTitleParts,
      heroSubtitle:
        "Elementos plásticos diseñados por KD Pack para optimizar procesos constructivos, mejorar la seguridad y aumentar la durabilidad de cada proyecto.",
      heroPrimaryCta: heroPrimaryCta?.href?.includes("marca=konstruplast")
        ? { ...heroPrimaryCta, href: "/productos?categoria=encofrados" }
        : heroPrimaryCta,
      heroSecondaryCta,
      heroBadges,
      heroImage,
      heroOverlayOpacity,
      applicationsEyebrow,
      applicationsTitle,
      productsEyebrow,
      productsTitle,
      whyEyebrow: "¿Por qué KD Pack para construcción?",
      whyTitle: "Innovación que construye resultados concretos.",
      whyItems,
      projectsEyebrow,
      projectsTitle,
      ctaEyebrow,
      ctaTitle,
      logosTitle,
    });
    console.log("✔ construccionPage creado a partir del contenido de konstruplastPage");

    await client.delete(_id);
    console.log("✔ konstruplastPage eliminado");
  } else {
    console.log("… no había konstruplastPage que migrar");
  }

  const staleDraft = await client.fetch(`*[_id == "drafts.konstruplastPage"][0]{_id}`);
  if (staleDraft?._id) {
    await client.delete(staleDraft._id);
    console.log("✔ drafts.konstruplastPage eliminado");
  }

  // Drop the now-unused Konstruplast logo asset reference from site settings.
  await client.patch("siteSettings").unset(["konstruplastLogo"]).commit();
  console.log("✔ siteSettings.konstruplastLogo removido");
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
