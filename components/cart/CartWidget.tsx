"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Minus, Plus, Trash2, MessageCircle, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useCart } from "@/components/cart/CartContext";

function buildWhatsAppMessage(
  items: { name: string; code: string; quantity: number }[]
) {
  const lines = items.map(
    (i) => `- ${i.name} (${i.code}) x${i.quantity}`
  );
  return `Hola, quiero cotizar los siguientes productos:\n\n${lines.join(
    "\n"
  )}\n\n¡Gracias!`;
}

interface CartWidgetProps {
  whatsappNumber: string;
}

export function CartWidget({ whatsappNumber }: CartWidgetProps) {
  const { items, totalCount, removeItem, setQuantity } = useCart();
  const [open, setOpen] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  if (!mounted || totalCount === 0) return null;

  const whatsappHref = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    buildWhatsAppMessage(items)
  )}`;

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <button
        onClick={() => setOpen(true)}
        aria-label="Ver cotización"
        className="fixed bottom-5 right-24 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-kd-black text-white shadow-lg transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-kd-black"
      >
        <ShoppingCart className="h-6 w-6" />
        <span className="absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-kd-green px-1 text-xs font-semibold text-white">
          {totalCount}
        </span>
      </button>

      <SheetContent side="right" className="w-[90%] sm:max-w-md flex flex-col">
        <SheetHeader>
          <SheetTitle>Tu cotización ({totalCount})</SheetTitle>
        </SheetHeader>

        <div className="mt-4 flex-1 overflow-y-auto space-y-4">
          {items.map((item) => (
            <div key={item.slug} className="flex gap-3 border-b border-kd-border pb-4">
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-kd-surface-alt">
                <Image src={item.imageSrc} alt={item.name} fill className="object-cover" sizes="64px" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-kd-text-primary truncate">{item.name}</p>
                <p className="text-xs text-kd-text-secondary">{item.code}</p>
                <div className="mt-2 flex items-center gap-2">
                  <button
                    aria-label="Restar"
                    onClick={() => setQuantity(item.slug, item.quantity - 1)}
                    className="flex h-7 w-7 items-center justify-center rounded-md border border-kd-border hover:bg-kd-surface-alt"
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </button>
                  <span className="w-6 text-center text-sm font-medium">{item.quantity}</span>
                  <button
                    aria-label="Sumar"
                    onClick={() => setQuantity(item.slug, item.quantity + 1)}
                    className="flex h-7 w-7 items-center justify-center rounded-md border border-kd-border hover:bg-kd-surface-alt"
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
              <button
                aria-label="Quitar producto"
                onClick={() => removeItem(item.slug)}
                className="shrink-0 text-kd-text-secondary hover:text-red-600"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>

        <div className="mt-auto pt-4 space-y-2.5">
          <Button asChild className="w-full bg-[#25D366] hover:bg-[#1fb958]">
            <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="h-4 w-4" />
              Enviar por WhatsApp
            </a>
          </Button>
          <Button asChild variant="outline" className="w-full" onClick={() => setOpen(false)}>
            <Link href="/cotiza-tu-proyecto">
              Ir al formulario de cotización
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
