import type { StructureResolver } from "sanity/structure";

const singletonListItem = (S: Parameters<StructureResolver>[0], typeName: string, title: string) =>
  S.listItem()
    .title(title)
    .id(typeName)
    .child(S.document().schemaType(typeName).documentId(typeName));

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Contenido de KD Plus")
    .items([
      S.listItem()
        .title("Páginas")
        .child(
          S.list()
            .title("Páginas")
            .items([
              singletonListItem(S, "homePage", "Home (KD Pack)"),
              singletonListItem(S, "construccionPage", "Construcción"),
              singletonListItem(S, "productosPage", "Productos"),
              singletonListItem(S, "industriasPage", "Industrias"),
              singletonListItem(S, "nosotrosPage", "Nosotros"),
              singletonListItem(S, "proyectosPage", "Proyectos"),
              singletonListItem(S, "contactoPage", "Contacto"),
              singletonListItem(S, "cotizaPage", "Cotiza tu proyecto"),
            ])
        ),
      S.divider(),
      S.documentTypeListItem("product").title("Productos"),
      S.documentTypeListItem("project").title("Proyectos (casos de éxito)"),
      S.documentTypeListItem("client").title("Clientes / Logos"),
      S.documentTypeListItem("category").title("Categorías (Home)"),
      S.documentTypeListItem("industry").title("Industrias"),
      S.documentTypeListItem("konstruplastApplication").title("Aplicaciones de Construcción"),
      S.divider(),
      singletonListItem(S, "siteSettings", "Configuración del sitio"),
    ]);
