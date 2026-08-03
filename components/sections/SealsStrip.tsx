import { Icon } from "@/components/icon-map";

export interface SealItem {
  icon: string;
  label: string;
}

interface SealsStripProps {
  title?: string;
  items: SealItem[];
}

export function SealsStrip({ title, items }: SealsStripProps) {
  if (!items.length) return null;

  return (
    <div className="container mt-12 pt-10 border-t border-kd-border">
      {title && (
        <p className="text-center text-xs font-semibold uppercase tracking-wide text-kd-text-secondary">
          {title}
        </p>
      )}
      <div className={`flex flex-wrap items-center justify-center gap-4 ${title ? "mt-5" : ""}`}>
        {items.map((item) => (
          <div
            key={item.label}
            className="flex items-center gap-3 rounded-full border border-kd-border bg-white px-6 py-3.5 shadow-sm"
          >
            <Icon name={item.icon} className="h-7 w-7 text-kd-green shrink-0" />
            <span className="text-base font-semibold text-kd-text-primary">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
