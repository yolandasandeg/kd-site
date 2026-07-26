import { createClient } from "@sanity/client";
import { config as loadEnv } from "dotenv";

loadEnv({ path: ".env.local" });

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_TOKEN;

if (!projectId || !token) {
  console.error(
    "Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_TOKEN in .env.local"
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-01-01",
  token,
  useCdn: false,
});

const slug = (current) => ({ _type: "slug", current });

// ---------- Collections ----------

const products = [
  { name: "Bin Cosechero 22 kg", code: "BC-22", size: "600 x 400 x 220 mm", material: "PP/PEHD", category: "agricola", brand: "kdpack", productType: "Bins y contenedores", description: "Bin cosechero diseñado para la recolección de frutas y hortalizas, con resistencia estructural para soportar múltiples ciclos de uso en campo.", features: ["Apilable", "Uso alimentario", "Ventilado"] },
  { name: "Caja Agrícola 15 kg", code: "CA-15", size: "600 x 400 x 150 mm", material: "PP/PEHD", category: "agricola", brand: "kdpack", productType: "Cajas y bandejas", description: "Caja liviana para cosecha y transporte de productos agrícolas, con ventilación optimizada para preservar la frescura.", features: ["Apilable", "Ventilado", "Uso alimentario"] },
  { name: "Caja Industrial 50 L", code: "CI-50", size: "600 x 400 x 300 mm", material: "PP/PEHD", category: "almacenaje", brand: "kdpack", productType: "Cajas y bandejas", description: "Contenedor de alta resistencia para almacenaje y transporte de insumos industriales, apto para líneas de producción intensivas.", features: ["Apilable", "Reforzado", "Con tapa"] },
  { name: "Pallet Plástico 1200x1000", code: "PP-1210", size: "1200 x 1000 x 150 mm", material: "PP/PEAD", category: "pallets", brand: "kdpack", productType: "Pallets", description: "Pallet plástico estándar para logística y almacenaje, higiénico y de larga vida útil, compatible con racks y grúas horquilla.", features: ["Reforzado", "Uso alimentario"] },
  { name: "Bin 1000 L", code: "BIN-1000", size: "1200 x 1000 x 760 mm", material: "PEHD", category: "almacenaje", brand: "kdpack", productType: "Contenedores grandes", description: "Bin de gran capacidad para almacenaje y transporte de grandes volúmenes, con estructura reforzada para uso intensivo.", features: ["Apilable", "Reforzado"] },
  { name: "Caja Ventilada 20 kg", code: "CV-20", size: "600 x 400 x 200 mm", material: "PP/PEHD", category: "agricola", brand: "kdpack", productType: "Cajas y bandejas", description: "Caja con ventilación lateral para transporte de frutas y hortalizas, favorece la circulación de aire y reduce la humedad.", features: ["Apilable", "Ventilado", "Uso alimentario"] },
  { name: "Bin Pesquero 80 L", code: "BP-80", size: "800 x 600 x 260 mm", material: "PEHD", category: "pesca", brand: "kdpack", productType: "Bins y contenedores", description: "Contenedor diseñado para la industria pesquera, resistente a la humedad y de fácil limpieza para condiciones exigentes.", features: ["Con tapa", "Uso alimentario"] },
  { name: "Caja Forestal 30 kg", code: "CF-30", size: "600 x 400 x 320 mm", material: "PP/PEHD", category: "forestal", brand: "kdpack", productType: "Cajas y bandejas", description: "Caja de alta resistencia para viveros y transporte de plantas, pensada para operaciones forestales exigentes.", features: ["Apilable", "Reforzado"] },
  { name: "Pallet Rackeable", code: "PP-R1208", size: "1200 x 800 x 160 mm", material: "PP/PEAD", category: "pallets", brand: "kdpack", productType: "Pallets", description: "Pallet rackeable para almacenaje en altura, con nervaduras reforzadas para soportar cargas elevadas en bodega.", features: ["Reforzado"] },
  { name: "Contenedor 660 L", code: "CN-660", size: "1200 x 1000 x 580 mm", material: "PEHD", category: "almacenaje", brand: "kdpack", productType: "Contenedores grandes", description: "Contenedor de gran volumen para almacenaje industrial, apilable y compatible con sistemas de manipulación mecanizada.", features: ["Apilable", "Reforzado"] },
  { name: "Bandeja Apilable", code: "BA-05", size: "600 x 400 x 70 mm", material: "PP", category: "cajas-cosecheras", brand: "kdpack", productType: "Cajas y bandejas", description: "Bandeja liviana y apilable para cosecha de berries y productos delicados, minimiza el daño mecánico durante el transporte.", features: ["Apilable", "Uso alimentario"] },
  { name: "Caja para Hielo 120 L", code: "CH-120", size: "800 x 600 x 420 mm", material: "PEHD", category: "pesca", brand: "kdpack", productType: "Otros", description: "Caja aislante para transporte de productos con hielo, resistente a la humedad y de fácil limpieza para la industria pesquera.", features: ["Con tapa", "Uso alimentario"] },
  { name: "Panel Encofrado KP 120", code: "KP-120", size: "1200 x 600 x 75 mm", material: "PP/ABS", category: "encofrados", brand: "konstruplast", productType: "Encofrados plásticos", description: "Panel modular de encofrado plástico para muros, losas y columnas, con alta resistencia mecánica y reutilización prolongada.", features: ["Reforzado", "Apilable"] },
  { name: "Panel Encofrado KP 60", code: "KP-60", size: "600 x 600 x 75 mm", material: "PP/ABS", category: "encofrados", brand: "konstruplast", productType: "Encofrados plásticos", description: "Panel modular de menor formato para ajustes y remates en sistemas de encofrado plástico.", features: ["Reforzado", "Apilable"] },
  { name: "Separador Cono 25/30", code: "SC-25/30", size: "25 - 30 mm", material: "PP", category: "separadores", brand: "konstruplast", productType: "Separadores y distanciadores", description: "Separador cónico que garantiza el recubrimiento estructural según norma en elementos de hormigón armado.", features: ["Reforzado"] },
  { name: "Tapa de Seguridad 20/32", code: "TS-20/32", size: "20 - 32 mm", material: "PP", category: "tapas", brand: "konstruplast", productType: "Tapas de seguridad", description: "Tapa de protección para fierros expuestos en obra, reduce riesgos de accidentes según normativa de seguridad laboral.", features: ["Uso alimentario"] },
  { name: "Caja Eléctrica KP", code: "CE-KP", size: "100 x 100 x 50 mm", material: "PP", category: "terminaciones", brand: "konstruplast", productType: "Elementos de terminación", description: "Elemento de terminación para instalaciones eléctricas e hidráulicas embebidas en hormigón.", features: ["Con tapa"] },
  { name: "Alivianante KP 25", code: "ALV-KP25", size: "500 x 500 x 250 mm", material: "PP", category: "alivianantes", brand: "konstruplast", productType: "Alivianantes plásticos", description: "Alivianante plástico para losas, reduce el peso propio de la estructura y optimiza el uso de hormigón.", features: ["Apilable"] },
];

const projects = [
  { title: "Cajas cosecheras para exportación de berries", client: "Garces Fruit", brand: "kdpack", industry: "Agrícola", description: "Desarrollo de bins cosecheros de alta resistencia que aseguran calidad y protección del producto durante toda la cadena." },
  { title: "Optimización de almacenamiento con bins logísticos", client: "Frusan", brand: "kdpack", industry: "Logística", description: "Implementación de contenedores y pallets plásticos que mejoran la eficiencia, seguridad y espacio de almacenamiento." },
  { title: "Encofrados plásticos para obras de gran escala", client: "Constructora Almagro", brand: "konstruplast", industry: "Construcción", description: "Sistemas modulares reutilizables que aceleran los tiempos de obra y reducen costos." },
  { title: "Cajas plásticas para la industria pesquera", client: "Copefrut", brand: "kdpack", industry: "Pesquera", description: "Soluciones diseñadas para condiciones extremas, resistentes a la humedad y fáciles de limpiar." },
  { title: "Contenedores para líneas de producción", client: "Talley", brand: "kdpack", industry: "Industrial", description: "Cajas y contenedores plásticos diseñados para flujos automáticos y uso intensivo en la industria." },
  { title: "Edificio Residencial Santiago, Chile", client: "Edificio Residencial Santiago, Chile", brand: "konstruplast", industry: "Edificación", description: "Suministro integral de encofrados y separadores plásticos para un proyecto residencial de gran altura." },
  { title: "Planta Industrial Antofagasta, Chile", client: "Planta Industrial Antofagasta, Chile", brand: "konstruplast", industry: "Obra industrial", description: "Acompañamiento técnico y suministro de soluciones plásticas para una planta industrial en el norte de Chile." },
  { title: "Mejoramiento Infraestructura Valparaíso, Chile", client: "Mejoramiento Infraestructura Valparaíso, Chile", brand: "konstruplast", industry: "Obra pública", description: "Provisión de alivianantes y elementos de terminación para un proyecto de infraestructura pública." },
];

const clients = [
  { name: "Garces Fruit", brand: "kdpack" },
  { name: "Copefrut", brand: "kdpack" },
  { name: "Frusan", brand: "kdpack" },
  { name: "Agro Sinergia", brand: "kdpack" },
  { name: "Talley", brand: "kdpack" },
  { name: "Vitro Vidrios", brand: "kdpack" },
  { name: "CCU", brand: "kdpack" },
  { name: "Hortifrut", brand: "kdpack" },
  { name: "Salfa", brand: "kdpack" },
  { name: "Sigro", brand: "kdpack" },
  { name: "EBCO", brand: "konstruplast" },
  { name: "Pilotes Terratest", brand: "konstruplast" },
  { name: "Constructora Almagro", brand: "konstruplast" },
  { name: "Vial y Vives", brand: "konstruplast" },
  { name: "Moller", brand: "konstruplast" },
];

const categories = [
  { name: "Agrícola", href: "/productos?categoria=agricola", icon: "leaf" },
  { name: "Industrial", href: "/productos?categoria=almacenaje", icon: "cog" },
  { name: "Logística", href: "/productos?categoria=pallets", icon: "truck" },
  { name: "Construcción", href: "/konstruplast", icon: "building" },
  { name: "Pesquera", href: "/productos?categoria=pesca", icon: "fish" },
  { name: "Productos especiales", href: "/productos", icon: "star" },
];

const industries = [
  { name: "Agrícola", description: "Soluciones diseñadas para la cosecha, transporte y almacenamiento de frutas, hortalizas y otros productos agrícolas.", href: "/productos?categoria=agricola", icon: "leaf" },
  { name: "Logística y Distribución", description: "Optimización de procesos logísticos con contenedores y pallets reutilizables que mejoran la eficiencia y reducen costos.", href: "/productos?categoria=pallets", icon: "truck" },
  { name: "Forestal", description: "Productos resistentes para viveros, transporte de plantas y operaciones forestales en condiciones exigentes.", href: "/productos?categoria=forestal", icon: "trees" },
  { name: "Almacenaje Industrial", description: "Contenedores y bins de alta resistencia para el almacenamiento seguro y organizado en la industria.", href: "/productos?categoria=almacenaje", icon: "warehouse" },
  { name: "Pallets y Bases", description: "Pallets plásticos reutilizables, higiénicos y de larga vida útil para todo tipo de operaciones industriales.", href: "/productos?categoria=pallets", icon: "layers" },
  { name: "Pesquera", description: "Cajas y contenedores plásticos diseñados para la industria pesquera, resistentes a la humedad y fáciles de limpiar.", href: "/productos?categoria=pesca", icon: "fish" },
];

const konstruplastApplications = [
  { name: "Encofrados plásticos", description: "Sistemas modulares para muros, losas y columnas.", icon: "layout-panel-left" },
  { name: "Separadores y distanciadores", description: "Garantizan el recubrimiento estructural según norma.", icon: "spline" },
  { name: "Tapas de seguridad", description: "Protección para fierros expuestos.", icon: "shield" },
  { name: "Elementos de terminación", description: "Soluciones para remates, juntas y bordes.", icon: "square-stack" },
  { name: "Pasos y canalizaciones", description: "Elementos para instalaciones eléctricas e hidráulicas.", icon: "wrench" },
  { name: "Alivianantes plásticos", description: "Reducción de peso propio y optimización estructural.", icon: "package" },
];

// ---------- Site settings ----------

const siteSettings = {
  _id: "siteSettings",
  _type: "siteSettings",
  address: "Camino Padre Hurtado 16.301, Paine, Región Metropolitana, Chile",
  phone: "+56 2 2824 9870",
  phoneHref: "tel:+56228249870",
  email: "hola@kdpack.cl",
  hours: "Lunes a viernes de 8:30 a 18:00 hrs.",
  coverage: "Envíos a todo Chile y presencia en LATAM y el mundo.",
  mapEmbedSrc: "https://www.google.com/maps?q=Camino+Padre+Hurtado+16301,+Paine,+Chile&output=embed",
  whatsappNumber: "56228249870",
  whatsappMessage: "Hola, quiero cotizar un proyecto con KD Pack.",
  linkedinUrl: "https://linkedin.com",
  instagramUrl: "https://instagram.com",
};

// ---------- Page singletons ----------

const homePage = {
  _id: "homePage",
  _type: "homePage",
  heroEyebrow: "KD Pack",
  heroTitleParts: [
    { _key: "t1", text: "Packaging plástico" },
    { _key: "t2", text: "para industrias que" },
    { _key: "t3", text: "no pueden detenerse.", highlight: true },
  ],
  heroSubtitle: "Contenedores, bins, pallets y soluciones plásticas para agricultura, logística, industria y construcción.",
  heroPrimaryCta: { label: "Ver productos", href: "/productos" },
  heroSecondaryCta: { label: "Cotizar proyecto", href: "/cotiza-tu-proyecto" },
  heroBadges: [
    { _key: "b1", icon: "leaf", label: "100% energía renovable" },
    { _key: "b2", icon: "shield", label: "Materiales de alta durabilidad" },
    { _key: "b3", icon: "recycle", label: "Soluciones sostenibles" },
    { _key: "b4", icon: "globe", label: "Presencia en LATAM y el mundo" },
  ],
  categoryGridEyebrow: "¿Qué solución necesitas?",
  categoryGridTitle: "Encuentra el producto ideal para tu operación.",
  whyEyebrow: "¿Por qué elegir KD Pack?",
  whyTitle: "Un aliado que entiende tu operación y responde cuando más importa.",
  whyItems: [
    { _key: "w1", icon: "globe", title: "Fabricación nacional", description: "Planta propia en Paine, Chile, con tecnología de última generación." },
    { _key: "w2", icon: "wrench", title: "Desarrollos a medida", description: "Creamos soluciones personalizadas según los desafíos de tu operación." },
    { _key: "w3", icon: "shield", title: "Calidad certificada", description: "Bajo estrictos estándares de calidad e inocuidad para mercados exigentes." },
    { _key: "w4", icon: "recycle", title: "Sostenibilidad real", description: "Productos reciclables que contribuyen a una industria más responsable." },
    { _key: "w5", icon: "clock", title: "Respuesta ágil", description: "Flexibilidad y rapidez para asegurar continuidad en tu cadena." },
  ],
  productsEyebrow: "Productos destacados",
  productsTitle: "Los más utilizados por nuestros clientes.",
  projectsEyebrow: "Proyectos que nos mueven",
  projectsTitle: "Soluciones que generan impacto real.",
  projectsSubtitle: "Acompañamos a empresas de múltiples industrias a optimizar sus operaciones con soluciones plásticas eficientes y sostenibles.",
  ctaEyebrow: "¿Tienes un proyecto en mente?",
  ctaTitle: "Hablemos y encontremos la solución ideal para tu operación.",
  logosTitle: "Empresas de múltiples industrias confían en nuestras soluciones",
};

const konstruplastPage = {
  _id: "konstruplastPage",
  _type: "konstruplastPage",
  heroEyebrow: "Konstruplast",
  heroTitleParts: [
    { _key: "t1", text: "Soluciones plásticas" },
    { _key: "t2", text: "para construcción" },
    { _key: "t3", text: "más eficiente y robusta.", highlight: true },
  ],
  heroSubtitle: "Elementos plásticos diseñados para optimizar procesos constructivos, mejorar la seguridad y aumentar la durabilidad de cada proyecto.",
  heroPrimaryCta: { label: "Ver productos", href: "/productos?categoria=encofrados" },
  heroSecondaryCta: { label: "Cotizar proyecto", href: "/cotiza-tu-proyecto" },
  heroBadges: [
    { _key: "b1", icon: "shield", label: "Alta resistencia y durabilidad" },
    { _key: "b2", icon: "recycle", label: "Material 100% reciclable" },
    { _key: "b3", icon: "clock", label: "Optimiza tiempos y costos" },
    { _key: "b4", icon: "truck", label: "Despacho a todo Chile y LATAM" },
  ],
  applicationsEyebrow: "Soluciones para cada etapa",
  applicationsTitle: "Aplicaciones que impulsan cada construcción.",
  productsEyebrow: "Productos destacados",
  productsTitle: "Diseñados para rendimiento y durabilidad.",
  whyEyebrow: "¿Por qué Konstruplast?",
  whyTitle: "Innovación que construye resultados concretos.",
  whyItems: [
    { _key: "w1", icon: "shield", title: "Resistencia", description: "Productos de alta resistencia mecánica y química." },
    { _key: "w2", icon: "award", title: "Durabilidad", description: "Materiales diseñados para una vida útil prolongada." },
    { _key: "w3", icon: "clock", title: "Eficiencia", description: "Agilizan procesos constructivos y reducen costos." },
    { _key: "w4", icon: "recycle", title: "Sostenibilidad", description: "Plásticos reciclables que aportan a la construcción sostenible." },
    { _key: "w5", icon: "users", title: "Asesoría técnica", description: "Acompañamiento en el diseño y ejecución de tu proyecto." },
  ],
  projectsEyebrow: "Proyectos destacados",
  projectsTitle: "Acompañamos obras que construyen el futuro.",
  ctaEyebrow: "¿Tienes un proyecto en mente?",
  ctaTitle: "Hablemos y encontremos la solución ideal para tu obra.",
  logosTitle: "Empresas que confían en nuestras soluciones",
};

const productosPage = {
  _id: "productosPage",
  _type: "productosPage",
  heroEyebrow: "Productos",
  heroTitleParts: [
    { _key: "t1", text: "Soluciones plásticas" },
    { _key: "t2", text: "para cada necesidad.", highlight: true },
  ],
  heroSubtitle: "Más de 150 productos diseñados para optimizar procesos, proteger tus productos y asegurar la eficiencia de tu operación.",
  searchPlaceholder: "Buscar producto, código o categoría...",
  bottomItems: [
    { _key: "i1", icon: "globe", title: "Fabricación nacional", description: "Planta propia en Paine, Chile." },
    { _key: "i2", icon: "clock", title: "Material reciclable", description: "Comprometidos con el medio ambiente." },
    { _key: "i3", icon: "truck", title: "Entrega rápida", description: "Cobertura en todo Chile y LATAM." },
    { _key: "i4", icon: "users", title: "Asesoría experta", description: "Te ayudamos a elegir la mejor solución." },
  ],
  ctaEyebrow: "¿No encuentras lo que necesitas?",
  ctaTitle: "Desarrollamos soluciones a medida para tu operación.",
};

const industriasPage = {
  _id: "industriasPage",
  _type: "industriasPage",
  heroEyebrow: "Industrias",
  heroTitleParts: [
    { _key: "t1", text: "Soluciones plásticas" },
    { _key: "t2", text: "para industrias que" },
    { _key: "t3", text: "mueven a Chile y al mundo.", highlight: true },
  ],
  heroSubtitle: "En KD Pack desarrollamos y fabricamos soluciones de packaging reutilizable que se adaptan a los desafíos específicos de cada industria.",
  gridEyebrow: "Industrias que impulsamos",
  gridTitle: "Diseñamos soluciones para cada desafío.",
  gridSubtitle: "Nuestra experiencia y tecnología nos permiten ofrecer productos que mejoran la eficiencia, protegen los productos y cuidan el medio ambiente.",
  benefitsEyebrow: "Por qué elegir nuestras soluciones",
  benefitsTitle: "Beneficios que generan impacto real en tu operación.",
  benefitsItems: [
    { _key: "b1", icon: "shield", title: "Durabilidad y resistencia", description: "Productos de alta calidad que garantizan una larga vida útil." },
    { _key: "b2", icon: "recycle", title: "Sostenibilidad", description: "Materiales reciclables y reutilizables que cuidan el planeta." },
    { _key: "b3", icon: "clock", title: "Eficiencia y ahorro", description: "Optimización de procesos y reducción de costos operacionales." },
    { _key: "b4", icon: "sparkles", title: "Higiene y seguridad", description: "Fáciles de limpiar y diseñados para cumplir los más altos estándares." },
    { _key: "b5", icon: "thumbs-up", title: "Asesoría especializada", description: "Acompañamiento experto para encontrar la solución ideal para tu industria." },
  ],
  ctaEyebrow: "¿Tienes un proyecto en mente?",
  ctaTitle: "Hablemos de cómo podemos impulsar tu industria con soluciones plásticas inteligentes y sostenibles.",
  logosTitle: "Empresas que confían en nuestras soluciones",
};

const nosotrosPage = {
  _id: "nosotrosPage",
  _type: "nosotrosPage",
  heroEyebrow: "Nosotros",
  heroTitleParts: [
    { _key: "t1", text: "Diseñamos y producimos" },
    { _key: "t2", text: "soluciones que" },
    { _key: "t3", text: "impulsan a las industrias.", highlight: true },
  ],
  heroSubtitle: "En KD Plus desarrollamos y fabricamos soluciones plásticas de alto rendimiento para sectores que exigen calidad, continuidad y confianza.",
  heroCtaLabel: "Conoce nuestra historia",
  stats: [
    { _key: "s1", icon: "calendar", value: "+13 años", label: "de experiencia" },
    { _key: "s2", icon: "factory", value: "Planta propia", label: "en Paine, Chile" },
    { _key: "s3", icon: "users", value: "+200", label: "clientes en LATAM" },
    { _key: "s4", icon: "boxes", value: "+150", label: "productos desarrollados" },
    { _key: "s5", icon: "globe", value: "Presencia", label: "en LATAM y el mundo" },
  ],
  historiaEyebrow: "Nuestra historia",
  historiaTitle: "Crecimos escuchando a las industrias.",
  historiaParagraphs: [
    "KD Pack nació en 2011 con el propósito de entregar soluciones de packaging plástico que realmente respondieran a las necesidades de la industria agrícola.",
    "Con el tiempo, y escuchando nuevos desafíos, dimos vida a Konstruplast en 2019, ampliando nuestro alcance al sector de la construcción.",
    "Hoy, como KD Plus, somos un grupo sólido, con tecnología, experiencia y un equipo comprometido con diseñar y fabricar productos que hacen más eficientes y sostenibles las operaciones de nuestros clientes.",
  ],
  valoresEyebrow: "Nuestros valores",
  valoresTitle: "Lo que nos mueve cada día.",
  valoresItems: [
    { _key: "v1", icon: "sparkles", title: "Innovación", description: "Buscamos nuevas formas de resolver desafíos con soluciones eficientes y sostenibles." },
    { _key: "v2", icon: "shield", title: "Calidad", description: "Cumplimos altos estándares en cada proceso para asegurar productos confiables y duraderos." },
    { _key: "v3", icon: "handshake", title: "Compromiso", description: "Nos involucramos con cada cliente como un verdadero socio estratégico." },
    { _key: "v4", icon: "recycle", title: "Sostenibilidad", description: "Promovemos el uso responsable de materiales y procesos que cuidan el entorno." },
    { _key: "v5", icon: "thumbs-up", title: "Confianza", description: "Construimos relaciones de largo plazo basadas en la transparencia y el cumplimiento." },
  ],
  workingWaysEyebrow: "Nuestra manera de trabajar",
  workingWaysTitle: "Tecnología y personas que marcan la diferencia.",
  workingWaysItems: [
    { _key: "ww1", icon: "cog", title: "Tecnología de última generación", description: "Equipos de automatización que garantizan precisión y eficiencia." },
    { _key: "ww2", icon: "package", title: "Producción flexible", description: "Nos adaptamos a tus volúmenes y requerimientos específicos." },
    { _key: "ww3", icon: "users", title: "Equipo especializado", description: "Personas comprometidas que entienden tu industria y sus desafíos." },
    { _key: "ww4", icon: "shield", title: "Materiales de calidad", description: "Utilizamos materias primas seleccionadas para asegurar alto rendimiento." },
    { _key: "ww5", icon: "truck", title: "Logística eficiente", description: "Entregamos a tiempo, en todo Chile y LATAM." },
  ],
  certificationsEyebrow: "Certificaciones",
  certificationsTitle: "Estándares que respaldan nuestra calidad.",
  certifications: ["ISO 9001:2015", "HACCP", "BRCGS", "SMETA", "100% Reciclable"],
  certificationsText: "Trabajamos bajo estrictos estándares de calidad e inocuidad que respaldan nuestros procesos y productos.",
  ctaEyebrow: "¿Tienes dudas?",
  ctaTitle: "Hablemos y encontremos la solución ideal para tu operación.",
};

const proyectosPage = {
  _id: "proyectosPage",
  _type: "proyectosPage",
  heroEyebrow: "Proyectos que generan impacto",
  heroTitleParts: [
    { _key: "t1", text: "Soluciones plásticas" },
    { _key: "t2", text: "que impulsan industrias" },
    { _key: "t3", text: "y construyen futuro.", highlight: true },
  ],
  heroSubtitle: "Cada proyecto es el resultado de escuchar, entender y desarrollar la solución exacta que nuestros clientes necesitan para que su operación nunca se detenga.",
  heroBadges: [
    { _key: "b1", icon: "wrench", label: "Soluciones a medida" },
    { _key: "b2", icon: "globe", label: "Producción confiable" },
    { _key: "b3", icon: "clock", label: "Entrega oportuna" },
    { _key: "b4", icon: "handshake", label: "Acompañamiento continuo" },
  ],
  featuredEyebrow: "Casos destacados",
  featuredTitle: "Proyectos reales, resultados que marcan la diferencia.",
  logosEyebrow: "Empresas que confían en nosotros",
  logosTitle: "Trabajamos junto a líderes de múltiples industrias.",
  logosBoxText: "Más de 200 empresas en Chile y LATAM confían en KD Pack y Konstruplast para desarrollar soluciones plásticas que responden a los desafíos reales de cada operación.",
  stats: [
    { _key: "s1", value: "+13 años", label: "de experiencia" },
    { _key: "s2", value: "+150", label: "productos desarrollados" },
    { _key: "s3", value: "+200", label: "clientes en LATAM" },
    { _key: "s4", value: "+10 países", label: "con presencia" },
    { _key: "s5", value: "100%", label: "material reciclable" },
  ],
};

const contactoPage = {
  _id: "contactoPage",
  _type: "contactoPage",
  heroEyebrow: "Contacto",
  heroTitleParts: [
    { _key: "t1", text: "Hablemos de tu" },
    { _key: "t2", text: "próximo proyecto.", highlight: true },
  ],
  heroSubtitle: "Cuéntanos qué necesitas y nuestro equipo te responderá a la brevedad con la mejor solución para tu operación.",
  locationEyebrow: "Nuestra ubicación",
  locationTitle: "Planta propia en Paine, Región Metropolitana.",
  locationText: "Contamos con instalaciones propias equipadas con tecnología de última generación para asegurar calidad, capacidad y continuidad.",
};

const cotizaPage = {
  _id: "cotizaPage",
  _type: "cotizaPage",
  heroEyebrow: "Cotiza tu proyecto",
  heroTitleParts: [
    { _key: "t1", text: "Cuéntanos tu proyecto," },
    { _key: "t2", text: "te ayudamos a" },
    { _key: "t3", text: "encontrar la mejor solución.", highlight: true },
  ],
  heroSubtitle: "Completa el formulario y nuestro equipo se pondrá en contacto contigo a la brevedad para asesorarte.",
  sidebarBoxTitle: "¿Prefieres hablar con nosotros?",
  sidebarBoxText: "Nuestro equipo está listo para resolver tus dudas y guiarte.",
  whyEyebrow: "¿Por qué cotizar con KD Pack?",
  whyItems: [
    { _key: "w1", icon: "users", title: "Asesoría experta", description: "Te ayudamos a elegir la solución que mejor se adapta a tu operación." },
    { _key: "w2", icon: "award", title: "Productos de calidad", description: "Fabricados con materiales de alto estándar y gran resistencia." },
    { _key: "w3", icon: "wrench", title: "Soluciones a medida", description: "Diseñamos y fabricamos productos para necesidades específicas." },
    { _key: "w4", icon: "truck", title: "Entrega rápida", description: "Cobertura en todo Chile y LATAM con logística eficiente." },
    { _key: "w5", icon: "recycle", title: "Sostenibilidad", description: "Productos reciclables y procesos que cuidan el medio ambiente." },
  ],
  ctaEyebrow: "¿Tienes dudas?",
  ctaTitle: "Hablemos y encontremos la mejor solución para tu operación.",
};

function slugify(str) {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

async function run() {
  console.log("Seeding site settings and pages...");
  await client.createOrReplace(siteSettings);
  await client.createOrReplace(homePage);
  await client.createOrReplace(konstruplastPage);
  await client.createOrReplace(productosPage);
  await client.createOrReplace(industriasPage);
  await client.createOrReplace(nosotrosPage);
  await client.createOrReplace(proyectosPage);
  await client.createOrReplace(contactoPage);
  await client.createOrReplace(cotizaPage);

  console.log(`Seeding ${products.length} products...`);
  for (const p of products) {
    const id = `product-${slugify(p.code)}`;
    await client.createOrReplace({
      _id: id,
      _type: "product",
      ...p,
      slug: slug(slugify(p.name)),
      order: products.indexOf(p),
    });
  }

  console.log(`Seeding ${projects.length} projects...`);
  for (const p of projects) {
    const id = `project-${slugify(p.title)}`;
    await client.createOrReplace({
      _id: id,
      _type: "project",
      ...p,
      slug: slug(slugify(p.title)),
      order: projects.indexOf(p),
    });
  }

  console.log(`Seeding ${clients.length} clients...`);
  for (const c of clients) {
    const id = `client-${slugify(c.name)}-${c.brand}`;
    await client.createOrReplace({
      _id: id,
      _type: "client",
      ...c,
      order: clients.indexOf(c),
    });
  }

  console.log(`Seeding ${categories.length} categories...`);
  for (const c of categories) {
    const id = `category-${slugify(c.name)}`;
    await client.createOrReplace({
      _id: id,
      _type: "category",
      ...c,
      slug: slug(slugify(c.name)),
      order: categories.indexOf(c),
    });
  }

  console.log(`Seeding ${industries.length} industries...`);
  for (const i of industries) {
    const id = `industry-${slugify(i.name)}`;
    await client.createOrReplace({
      _id: id,
      _type: "industry",
      ...i,
      slug: slug(slugify(i.name)),
      order: industries.indexOf(i),
    });
  }

  console.log(`Seeding ${konstruplastApplications.length} Konstruplast applications...`);
  for (const a of konstruplastApplications) {
    const id = `konstruplast-app-${slugify(a.name)}`;
    await client.createOrReplace({
      _id: id,
      _type: "konstruplastApplication",
      ...a,
      slug: slug(slugify(a.name)),
      order: konstruplastApplications.indexOf(a),
    });
  }

  console.log("Done! All content seeded into Sanity.");
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
