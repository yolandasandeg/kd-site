import Image from "next/image";
import type { Image as SanityImage } from "sanity";

import type { Client } from "@/lib/data/clients";
import { urlFor, type SanityImageRef } from "@/sanity/lib/image";

interface LogoStripProps {
  title?: string;
  clients: (Client & { logo?: SanityImageRef })[];
}

function LogoItem({ client }: { client: Client & { logo?: SanityImageRef } }) {
  return client.logo?.asset?._ref ? (
    <div className="relative h-10 w-28 sm:h-12 sm:w-32 shrink-0 grayscale opacity-80 sm:opacity-70 transition-all duration-300 hover:grayscale-0 hover:opacity-100">
      <Image
        src={urlFor(client.logo as SanityImage).height(96).fit("max").auto("format").url()}
        alt={client.name}
        fill
        className="object-contain"
        sizes="128px"
      />
    </div>
  ) : (
    <span className="shrink-0 text-base sm:text-lg font-bold uppercase tracking-wide text-kd-text-secondary/70 grayscale">
      {client.name}
    </span>
  );
}

export function LogoStrip({
  title = "Empresas de múltiples industrias confían en nuestras soluciones",
  clients,
}: LogoStripProps) {
  if (!clients.length) return null;

  return (
    <section className="bg-kd-surface-alt py-10 overflow-hidden">
      <div className="container">
        <p className="text-center eyebrow font-semibold">{title}</p>
      </div>

      <div className="relative mt-7">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 sm:w-24 bg-gradient-to-r from-kd-surface-alt to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 sm:w-24 bg-gradient-to-l from-kd-surface-alt to-transparent" />

        <div className="flex w-max items-center gap-x-14 animate-marquee hover:[animation-play-state:paused]">
          {[...clients, ...clients].map((client, i) => (
            <LogoItem key={`${client.name}-${i}`} client={client} />
          ))}
        </div>
      </div>
    </section>
  );
}
