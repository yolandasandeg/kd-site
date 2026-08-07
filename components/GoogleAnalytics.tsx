import Script from "next/script";

/**
 * Google Analytics 4. Solo se inyecta si existe NEXT_PUBLIC_GA_ID, así que el
 * sitio funciona igual mientras no se configure la cuenta.
 *
 * `anonymize_ip` mantiene la medición dentro de lo que permite la política de
 * privacidad del sitio (analítica agregada, sin identificar personas).
 */
export function GoogleAnalytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  if (!gaId) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}', { anonymize_ip: true });
        `}
      </Script>
    </>
  );
}
