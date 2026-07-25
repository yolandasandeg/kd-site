import type { Client } from "@/lib/data/clients";

interface LogoStripProps {
  title?: string;
  clients: Client[];
}

export function LogoStrip({
  title = "Empresas de múltiples industrias confían en nuestras soluciones",
  clients,
}: LogoStripProps) {
  return (
    <section className="bg-kd-surface-alt py-10">
      <div className="container">
        <p className="text-center eyebrow font-semibold">{title}</p>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-x-10 gap-y-5">
          {clients.map((client) => (
            <span
              key={client.name}
              className="text-base sm:text-lg font-bold uppercase tracking-wide text-kd-text-secondary/70 grayscale"
            >
              {client.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
