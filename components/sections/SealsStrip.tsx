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
      <div className={`flex flex-wrap items-center justify-center gap-3 ${title ? "mt-5" : ""}`}>
        {items.map((item) => (
          <div
            key={item.label}
            className="flex items-center gap-2 rounded-full border border-kd-border bg-white px-4 py-2"
          >
            <Icon name={item.icon} className="h-4 w-4 text-kd-green shrink-0" />
            <span className="text-sm font-medium text-kd-text-primary">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
