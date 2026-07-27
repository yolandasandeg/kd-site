import Image from "next/image";
import type { Image as SanityImage } from "sanity";

import type { Client } from "@/lib/data/clients";
import { urlFor, type SanityImageRef } from "@/sanity/lib/image";

interface LogoStripProps {
  title?: string;
  clients: (Client & { logo?: SanityImageRef })[];
}

export function LogoStrip({
  title = "Empresas de múltiples industrias confían en nuestras soluciones",
  clients,
}: LogoStripProps) {
  return (
    <section className="bg-kd-surface-alt py-10">
      <div className="container">
        <p className="text-center eyebrow font-semibold">{title}</p>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
          {clients.map((client) =>
            client.logo?.asset?._ref ? (
              <div
                key={client.name}
                className="relative h-10 w-28 sm:h-12 sm:w-32 grayscale opacity-70 transition-all duration-300 hover:grayscale-0 hover:opacity-100"
              >
                <Image
                  src={urlFor(client.logo as SanityImage).height(96).fit("max").auto("format").url()}
                  alt={client.name}
                  fill
                  className="object-contain"
                  sizes="128px"
                />
              </div>
            ) : (
              <span
                key={client.name}
                className="text-base sm:text-lg font-bold uppercase tracking-wide text-kd-text-secondary/70 grayscale"
              >
                {client.name}
              </span>
            )
          )}
        </div>
      </div>
    </section>
  );
}
