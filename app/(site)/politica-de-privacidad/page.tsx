import type { Metadata } from "next";
import Link from "next/link";

import { getContactInfo } from "@/sanity/lib/queries";
import { LegalPage } from "@/components/sections/LegalPage";

export const metadata: Metadata = {
  title: "Política de privacidad",
  description:
    "Cómo KD Pack S.A. recolecta, usa y protege los datos personales que entregas a través de este sitio web.",
  alternates: { canonical: "/politica-de-privacidad" },
  robots: { index: true, follow: true },
};

export default async function PoliticaDePrivacidadPage() {
  const contact = await getContactInfo();

  return (
    <LegalPage
      eyebrow="Legal"
      title="Política de privacidad"
      updatedAt="Última actualización: febrero de 2026"
    >
      <p>
        En <strong>KD Pack S.A.</strong> (en adelante, &ldquo;KD Pack&rdquo;) respetamos tu
        privacidad. Esta política explica qué datos personales recolectamos a través de
        este sitio web, con qué finalidad los usamos y qué derechos tienes sobre ellos,
        conforme a la Ley N° 19.628 sobre Protección de la Vida Privada y a la Ley N°
        21.719 que regula la protección y el tratamiento de datos personales en Chile.
      </p>

      <h2>1. Quién es el responsable de tus datos</h2>
      <p>
        El responsable del tratamiento es KD Pack S.A., con domicilio en {contact.address}.
        Para cualquier consulta sobre esta política puedes escribirnos a{" "}
        <a href={`mailto:${contact.email}`}>{contact.email}</a> o llamarnos al{" "}
        <a href={contact.phoneHref}>{contact.phone}</a>.
      </p>

      <h2>2. Qué datos recolectamos</h2>
      <p>Recolectamos únicamente los datos que tú nos entregas voluntariamente:</p>
      <ul>
        <li>
          <strong>Formulario de contacto:</strong> nombre, empresa, correo electrónico,
          teléfono, industria y el mensaje que nos escribes.
        </li>
        <li>
          <strong>Formulario de cotización:</strong> nombre, empresa, correo electrónico,
          teléfono, industria, tipo de proyecto, descripción del requerimiento y, si lo
          adjuntas, un archivo con antecedentes técnicos.
        </li>
        <li>
          <strong>Datos técnicos de navegación:</strong> información anónima y agregada
          sobre cómo se usa el sitio (páginas visitadas, tipo de dispositivo, país). No
          usamos esta información para identificarte personalmente.
        </li>
      </ul>
      <p>
        No recolectamos datos sensibles ni información de menores de edad. Este sitio no
        procesa pagos ni solicita datos bancarios o de tarjetas.
      </p>

      <h2>3. Para qué usamos tus datos</h2>
      <ul>
        <li>Responder tus consultas y elaborar la cotización que solicitas.</li>
        <li>Contactarte para dar seguimiento comercial a tu requerimiento.</li>
        <li>Mejorar el contenido y el funcionamiento del sitio web.</li>
        <li>Cumplir obligaciones legales que nos sean aplicables.</li>
      </ul>
      <p>
        <strong>No enviamos publicidad masiva no solicitada</strong> y no usamos tus datos
        para fines distintos de los aquí descritos sin tu autorización previa.
      </p>

      <h2>4. Con quién compartimos tus datos</h2>
      <p>
        <strong>No vendemos ni cedemos tus datos personales a terceros.</strong> Solo los
        comparten internamente los equipos de KD Pack que necesitan conocerlos para
        atender tu solicitud (principalmente Ventas), y los proveedores tecnológicos que
        nos permiten operar el sitio:
      </p>
      <ul>
        <li>
          <strong>Vercel Inc.</strong> — alojamiento del sitio web.
        </li>
        <li>
          <strong>Sanity.io</strong> — gestión del contenido publicado.
        </li>
        <li>
          <strong>Resend</strong> — envío de los correos generados por los formularios.
        </li>
      </ul>
      <p>
        Estos proveedores actúan como encargados del tratamiento y solo pueden usar los
        datos para prestarnos el servicio contratado.
      </p>

      <h2>5. Por cuánto tiempo los conservamos</h2>
      <p>
        Conservamos los datos de contacto y cotización mientras exista una relación
        comercial vigente o potencial, y hasta por un máximo de 5 años desde el último
        contacto, salvo que nos pidas eliminarlos antes o que una obligación legal exija
        un plazo distinto.
      </p>

      <h2>6. Tus derechos</h2>
      <p>
        Puedes ejercer en cualquier momento y de forma gratuita tus derechos de{" "}
        <strong>acceso, rectificación, cancelación y oposición</strong> respecto de tus
        datos personales. Para hacerlo, escríbenos a{" "}
        <a href={`mailto:${contact.email}`}>{contact.email}</a> indicando tu nombre
        completo y la solicitud concreta. Responderemos dentro de los plazos que establece
        la ley.
      </p>

      <h2>7. Seguridad</h2>
      <p>
        Aplicamos medidas técnicas y organizativas razonables para proteger tus datos:
        conexión cifrada (HTTPS) en todo el sitio, acceso restringido a la información de
        contacto y control de credenciales de los sistemas que la almacenan. Ningún sistema
        es completamente infalible, pero trabajamos para reducir los riesgos al mínimo.
      </p>

      <h2>8. Cookies</h2>
      <p>
        Este sitio usa únicamente cookies técnicas necesarias para su funcionamiento y
        mediciones de audiencia anónimas y agregadas. No usamos cookies de publicidad ni
        de seguimiento entre sitios. Puedes bloquear o eliminar las cookies desde la
        configuración de tu navegador sin que ello impida navegar por el sitio.
      </p>

      <h2>9. Cambios a esta política</h2>
      <p>
        Podemos actualizar esta política para reflejar cambios legales o en nuestros
        procesos. La versión vigente será siempre la publicada en esta página, con su
        fecha de última actualización indicada arriba.
      </p>

      <h2>10. Contacto</h2>
      <p>
        Si tienes dudas sobre esta política o sobre el tratamiento de tus datos,
        escríbenos a <a href={`mailto:${contact.email}`}>{contact.email}</a>. También
        puedes revisar nuestros{" "}
        <Link href="/terminos-y-condiciones">términos y condiciones</Link>.
      </p>
    </LegalPage>
  );
}
