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

async function run() {
  // 1. Home page: hero copy, badges, why cards + seals, new industries section.
  await client
    .patch("homePage")
    .set({
      heroTitleParts: [
        { _key: "t1", text: "Soluciones plásticas" },
        { _key: "t2", text: "para industrias que" },
        { _key: "t3", text: "no pueden detenerse.", highlight: true },
      ],
      heroSubtitle:
        "Fabricamos en Chile para agricultura, acuicultura, forestal, construcción, logística y más.",
      heroBadges: [
        { _key: "badge1", _type: "badgeItem", icon: "award", label: "+15 años\nfabricando en Chile" },
        { _key: "badge2", _type: "badgeItem", icon: "boxes", label: "+4.500 toneladas al año" },
        { _key: "badge3", _type: "badgeItem", icon: "users", label: "+X clientes activos" },
        { _key: "badge4", _type: "badgeItem", icon: "leaf", label: "100% energía renovable" },
      ],
      whyItems: [
        {
          _key: "why1",
          _type: "featureItem",
          icon: "warehouse",
          title: "Continuidad de suministro",
          description:
            "Fabricamos en Paine con stock permanente: entrega y reposición rápida, sin depender de un contenedor en camino.",
        },
        {
          _key: "why2",
          _type: "featureItem",
          icon: "shield-plus",
          title: "Durabilidad comprobada en terreno",
          description:
            "Diseñados para el uso rudo real: sol, frío, golpes y ciclos intensivos de carga. Menos recambio y menor costo por año de uso.",
        },
        {
          _key: "why3",
          _type: "featureItem",
          icon: "sparkles",
          title: "Innovación en materiales y procesos",
          description:
            "Mejoramos continuamente diseños, materiales y procesos, validados por certificaciones técnicas independientes como DICTUC.",
        },
        {
          _key: "why4",
          _type: "featureItem",
          icon: "cog",
          title: "Desarrollo a medida",
          description:
            "Nuestro equipo de ingeniería trabaja con el tuyo para desarrollar la solución que tu operación necesita: desde el diseño hasta la producción en serie.",
        },
      ],
      whySeals: [
        { _key: "seal1", _type: "badgeItem", icon: "shield", label: "ISO 9001" },
        { _key: "seal2", _type: "badgeItem", icon: "building", label: "SERVIU" },
        { _key: "seal3", _type: "badgeItem", icon: "award", label: "DICTUC" },
        { _key: "seal4", _type: "badgeItem", icon: "leaf", label: "Energía renovable" },
        { _key: "seal5", _type: "badgeItem", icon: "recycle", label: "Materia prima reciclada" },
      ],
      industriesEyebrow: "Industrias",
      industriesTitle: "Soluciones especializadas para cada sector que impulsamos.",
      industriesItems: [
        { _key: "ind1", _type: "badgeItem", icon: "leaf", label: "Agricultura" },
        { _key: "ind2", _type: "badgeItem", icon: "fish", label: "Acuicultura" },
        { _key: "ind3", _type: "badgeItem", icon: "trees", label: "Forestal" },
        { _key: "ind4", _type: "badgeItem", icon: "building-2", label: "Construcción" },
        { _key: "ind5", _type: "badgeItem", icon: "truck", label: "Logística" },
        { _key: "ind6", _type: "badgeItem", icon: "star", label: "Proyectos especiales" },
      ],
    })
    .unset(["categoryGridEyebrow", "categoryGridTitle"])
    .commit({ autoGenerateArrayKeys: false })
    .then(() => console.log("✔ homePage actualizado"));

  // Remove any stray unpublished draft so Studio reflects this update directly
  // instead of showing older, unpublished edits shadowing the published doc.
  const staleDraft = await client.fetch(`*[_id == "drafts.homePage"][0]{_id}`);
  if (staleDraft?._id) {
    await client.delete(staleDraft._id);
    console.log("✔ drafts.homePage eliminado (draft obsoleto)");
  }

  // 2. Nav links: replace with the client's requested menu.
  await client
    .patch("siteSettings")
    .set({
      navLinks: [
        { _key: "nav1", _type: "navLink", label: "Industrias", href: "/industrias" },
        { _key: "nav2", _type: "navLink", label: "Productos", href: "/productos?marca=kdpack" },
        { _key: "nav3", _type: "navLink", label: "Nosotros", href: "/nosotros" },
        { _key: "nav4", _type: "navLink", label: "Sustentabilidad", href: "/sustentabilidad" },
        { _key: "nav5", _type: "navLink", label: "Ubicación", href: "/ubicacion" },
        { _key: "nav6", _type: "navLink", label: "Cotizar", href: "/cotiza-tu-proyecto" },
      ],
    })
    .commit()
    .then(() => console.log("✔ siteSettings.navLinks actualizado"));

  // 3. Sustentabilidad page: real RENOVA 2025 certificate data.
  const existingSust = await client.fetch(`*[_type == "sustentabilidadPage"][0]{_id}`);
  const sustDoc = {
    _type: "sustentabilidadPage",
    certificateTitle: "Certificado de Energía Renovable RENOVA 2025",
    certificateIssuer:
      "El Coordinador Eléctrico Nacional acredita, a través del Registro Nacional de Energías Renovables (RENOVA), que durante 2025 KD Pack SA consumió 6.565 MWh de energía eléctrica correspondiente a energía renovable generada e inyectada al Sistema Eléctrico Nacional de Chile.",
    certificateFacts: [
      "Energía renovable certificada: 100%",
      "Consumo total de energía: 6.564 MWh",
      "Factor de emisión: 0 tCO₂e / MWh",
      "Periodo: Enero 2025 - Diciembre 2025",
      "Suministrador de energía renovable: EMOAC SpA",
    ],
  };
  if (existingSust?._id) {
    await client.patch(existingSust._id).set(sustDoc).commit();
    console.log("✔ sustentabilidadPage actualizado:", existingSust._id);
  } else {
    const created = await client.create({ _id: "sustentabilidadPage", ...sustDoc });
    console.log("✔ sustentabilidadPage creado:", created._id);
  }

  // 4. Ubicación page: ensure a doc exists so it's editable in the Studio.
  const existingUbic = await client.fetch(`*[_type == "ubicacionPage"][0]{_id}`);
  if (!existingUbic?._id) {
    const created = await client.create({ _id: "ubicacionPage", _type: "ubicacionPage" });
    console.log("✔ ubicacionPage creado:", created._id);
  } else {
    console.log("✔ ubicacionPage ya existía:", existingUbic._id);
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
