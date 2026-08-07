import { NextResponse } from "next/server";
import { Resend } from "resend";

import { sanityFetch } from "@/sanity/lib/client";
import {
  DEFAULT_LEAD_RECIPIENTS,
  LEAD_FROM,
  normalizeRecipients,
  type LeadKind,
} from "@/lib/leads";

// Los leads nunca deben cachearse ni prerenderizarse.
export const dynamic = "force-dynamic";

interface LeadPayload {
  kind?: string;
  fields?: Record<string, unknown>;
}

const LABELS: Record<string, string> = {
  name: "Nombre",
  company: "Empresa",
  email: "Correo",
  phone: "Teléfono",
  industry: "Industria",
  message: "Mensaje",
  products: "Productos de interés",
  quantity: "Cantidad estimada",
  deadline: "Plazo requerido",
  fileName: "Archivo adjunto",
};

const SUBJECTS: Record<LeadKind, string> = {
  quote: "Nueva solicitud de cotización",
  contact: "Nuevo mensaje de contacto",
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function renderRows(fields: Record<string, unknown>) {
  return Object.entries(fields)
    .filter(([, v]) => v !== undefined && v !== null && String(v).trim() !== "")
    .map(([key, value]) => {
      const label = LABELS[key] ?? key;
      const text = escapeHtml(String(value)).replace(/\n/g, "<br>");
      return `<tr>
        <td style="padding:8px 12px;background:#f6f6f6;font-weight:600;vertical-align:top;white-space:nowrap">${escapeHtml(label)}</td>
        <td style="padding:8px 12px">${text}</td>
      </tr>`;
    })
    .join("");
}

export async function POST(request: Request) {
  let payload: LeadPayload;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Solicitud inválida." }, { status: 400 });
  }

  const kind: LeadKind = payload.kind === "quote" ? "quote" : "contact";
  const fields = payload.fields ?? {};

  // Validación mínima en el servidor: sin correo de contacto el lead es inútil.
  const replyTo = String(fields.email ?? "").trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(replyTo)) {
    return NextResponse.json(
      { error: "Necesitamos un correo válido para responderte." },
      { status: 400 }
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // Falla ruidosa a propósito: es preferible que el usuario vea un error y
    // use el correo/WhatsApp directo, a que crea que su lead se envió.
    console.error(
      "[leads] RESEND_API_KEY no está configurada — el lead NO se envió:",
      JSON.stringify({ kind, fields })
    );
    return NextResponse.json(
      { error: "El envío no está configurado. Escríbenos directamente por correo o WhatsApp." },
      { status: 503 }
    );
  }

  // Los destinatarios se editan en Sanity; si están vacíos usamos el default.
  const settings = await sanityFetch<{
    quoteEmails?: string[];
    contactEmails?: string[];
  } | null>(`*[_type == "siteSettings"][0]{quoteEmails, contactEmails}`, {}, null);

  const fromSanity = kind === "quote" ? settings?.quoteEmails : settings?.contactEmails;
  const fromEnv = kind === "quote" ? process.env.LEADS_QUOTE_EMAILS : process.env.LEADS_CONTACT_EMAILS;
  const to = normalizeRecipients(
    fromSanity?.length ? fromSanity : fromEnv,
    DEFAULT_LEAD_RECIPIENTS[kind]
  );

  const subjectName = String(fields.name ?? "").trim();
  const subjectCompany = String(fields.company ?? "").trim();
  const subject = [SUBJECTS[kind], subjectCompany || subjectName]
    .filter(Boolean)
    .join(" — ");

  const html = `<div style="font-family:system-ui,-apple-system,Segoe UI,sans-serif;color:#141414">
  <h2 style="margin:0 0 4px">${escapeHtml(SUBJECTS[kind])}</h2>
  <p style="margin:0 0 16px;color:#666;font-size:13px">Enviado desde el sitio web de KD Pack.</p>
  <table style="border-collapse:collapse;font-size:14px;width:100%;max-width:560px">${renderRows(fields)}</table>
  <p style="margin:20px 0 0;color:#666;font-size:12px">Responde este correo para contactar directamente a ${escapeHtml(replyTo)}.</p>
</div>`;

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: LEAD_FROM,
      to,
      replyTo,
      subject,
      html,
    });

    if (error) {
      console.error("[leads] Resend rechazó el envío:", error, JSON.stringify({ kind, fields }));
      return NextResponse.json(
        { error: "No pudimos enviar tu mensaje. Inténtalo de nuevo o escríbenos por WhatsApp." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[leads] Error inesperado:", err, JSON.stringify({ kind, fields }));
    return NextResponse.json(
      { error: "No pudimos enviar tu mensaje. Inténtalo de nuevo o escríbenos por WhatsApp." },
      { status: 500 }
    );
  }
}
