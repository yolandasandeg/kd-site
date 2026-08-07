import type { Metadata } from "next";
import Link from "next/link";

import { getContactInfo } from "@/sanity/lib/queries";
import { LegalPage } from "@/components/sections/LegalPage";

export const metadata: Metadata = {
  title: "Términos y condiciones",
  description:
    "Condiciones de uso del sitio web de KD Pack S.A., alcance de la información publicada y propiedad intelectual.",
  alternates: { canonical: "/terminos-y-condiciones" },
  robots: { index: true, follow: true },
};

export default async function TerminosYCondicionesPage() {
  const contact = await getContactInfo();

  return (
    <LegalPage
      eyebrow="Legal"
      title="Términos y condiciones"
      updatedAt="Última actualización: febrero de 2026"
    >
      <p>
        Estos términos regulan el uso del sitio web de <strong>KD Pack S.A.</strong> (en
        adelante, &ldquo;KD Pack&rdquo;). Al navegar por este sitio aceptas las condiciones
        descritas a continuación. Si no estás de acuerdo con ellas, te pedimos no utilizarlo.
      </p>

      <h2>1. Identificación</h2>
      <p>
        Este sitio es operado por KD Pack S.A., empresa chilena dedicada al diseño,
        ingeniería y fabricación de productos plásticos inyectados, con domicilio en{" "}
        {contact.address}. Contacto: <a href={`mailto:${contact.email}`}>{contact.email}</a>{" "}
        — <a href={contact.phoneHref}>{contact.phone}</a>.
      </p>

      <h2>2. Uso del sitio</h2>
      <p>
        Este sitio tiene una finalidad informativa y comercial: dar a conocer nuestros
        productos y permitir que nos contactes o solicites una cotización. Te comprometes a
        usarlo de buena fe y a no realizar acciones que puedan dañarlo, sobrecargarlo o
        impedir su normal funcionamiento, incluyendo la extracción automatizada masiva de
        contenido sin nuestra autorización previa por escrito.
      </p>

      <h2>3. Información de productos y cotizaciones</h2>
      <p>
        Las fichas técnicas, medidas, materiales, imágenes y descripciones publicadas son
        <strong> referenciales</strong> y pueden variar por mejoras de diseño, cambios de
        materia prima o requerimientos productivos. Las imágenes pueden no representar
        exactamente el producto final.
      </p>
      <p>
        <strong>
          El envío de un formulario de cotización no constituye una oferta ni genera una
          relación contractual.
        </strong>{" "}
        Es una solicitud de información. Toda venta queda sujeta a una cotización formal
        emitida por KD Pack, con precios, plazos, condiciones de pago y disponibilidad de
        stock vigentes al momento de su emisión.
      </p>

      <h2>4. Propiedad intelectual</h2>
      <p>
        Todos los contenidos de este sitio —incluyendo la marca KD Pack, el logotipo, los
        textos, fotografías, diseños de producto, fichas técnicas, documentos descargables
        y el diseño del sitio— son de propiedad de KD Pack S.A. o se usan bajo licencia, y
        están protegidos por la Ley N° 17.336 sobre Propiedad Intelectual y la Ley N° 19.039
        sobre Propiedad Industrial.
      </p>
      <p>
        Queda <strong>prohibida su reproducción, copia, distribución, modificación o uso
        comercial</strong>, total o parcial, sin autorización previa y por escrito de KD Pack.
        Se permite únicamente la visualización y la descarga de documentos técnicos para uso
        interno del usuario.
      </p>

      <h2>5. Enlaces a sitios de terceros</h2>
      <p>
        Este sitio puede contener enlaces a sitios externos (por ejemplo, redes sociales o
        WhatsApp). KD Pack no controla ni se responsabiliza por el contenido, las políticas
        de privacidad ni las prácticas de esos sitios.
      </p>

      <h2>6. Disponibilidad y limitación de responsabilidad</h2>
      <p>
        Procuramos que el sitio esté disponible de forma continua, pero no garantizamos que
        esté libre de interrupciones, errores o indisponibilidades por mantenimiento o causas
        de fuerza mayor. KD Pack no será responsable por daños indirectos derivados del uso o
        de la imposibilidad de uso de este sitio, ni por decisiones tomadas exclusivamente
        sobre la base de la información referencial aquí publicada.
      </p>

      <h2>7. Protección de datos personales</h2>
      <p>
        El tratamiento de los datos que nos entregas a través de los formularios se rige por
        nuestra <Link href="/politica-de-privacidad">política de privacidad</Link>, que forma
        parte integrante de estos términos.
      </p>

      <h2>8. Modificaciones</h2>
      <p>
        KD Pack puede actualizar estos términos en cualquier momento. La versión vigente será
        siempre la publicada en esta página, con su fecha de última actualización indicada
        arriba.
      </p>

      <h2>9. Legislación aplicable y jurisdicción</h2>
      <p>
        Estos términos se rigen por las leyes de la República de Chile. Cualquier controversia
        derivada de su interpretación o aplicación será sometida a la competencia de los
        tribunales ordinarios de justicia con asiento en Santiago de Chile.
      </p>

      <h2>10. Contacto</h2>
      <p>
        Para consultas sobre estos términos, escríbenos a{" "}
        <a href={`mailto:${contact.email}`}>{contact.email}</a>.
      </p>
    </LegalPage>
  );
}
