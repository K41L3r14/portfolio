"use client";

import { useState, type FormEvent } from "react";

import type { Locale } from "@/i18n/config";
import type { ContactCopy } from "@/i18n/translations";

type ContactMePageProps = { copy: ContactCopy; locale: Locale };

const methodMarks: Record<string, string> = { Email: "@", Correo: "@", LinkedIn: "in", GitHub: "⌘" };

export default function ContactMePage({ copy, locale }: ContactMePageProps) {
  const isSpanish = locale === "es";
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitMessage(null);
    setIsSubmitting(true);
    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      inquiryType: String(formData.get("inquiryType") ?? ""),
      message: String(formData.get("message") ?? ""),
    };

    try {
      const response = await fetch("/api/inquiries", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const result = (await response.json().catch(() => null)) as { error?: string } | null;
      if (!response.ok) throw new Error(result?.error ?? copy.errorMessage);
      form.reset();
      setSubmitMessage({ type: "success", text: copy.successMessage });
    } catch (error) {
      setSubmitMessage({ type: "error", text: error instanceof Error ? error.message : copy.errorMessage });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contactMe" className="bg-[#faf9fc] py-20 sm:py-28">
      <div className="site-shell">
        <p className="eyebrow">{isSpanish ? "Consulta" : "Inquire"}</p>
        <h2 className="title-font mt-3 text-4xl sm:text-5xl">{isSpanish ? "Trabajemos juntos" : "Let’s work together"}</h2>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:gap-20">
          <form onSubmit={handleSubmit} className="grid gap-5 sm:grid-cols-2">
            <label className="grid gap-2 text-xs font-semibold text-[#181525]">
              {isSpanish ? "Nombre" : "Name"}
              <input name="name" required placeholder={copy.namePlaceholder} className="rounded-xl border border-[#ded9e8] bg-[#f1eff6]/70 px-4 py-3.5 text-sm font-normal outline-none transition placeholder:text-[#736e82]/55 focus:border-[#B46781] focus:bg-white" />
            </label>
            <label className="grid gap-2 text-xs font-semibold text-[#181525]">
              Email
              <input type="email" name="email" required placeholder={copy.emailPlaceholder} className="rounded-xl border border-[#ded9e8] bg-[#f1eff6]/70 px-4 py-3.5 text-sm font-normal outline-none transition placeholder:text-[#736e82]/55 focus:border-[#B46781] focus:bg-white" />
            </label>
            <label className="grid gap-2 text-xs font-semibold text-[#181525] sm:col-span-2">
              {isSpanish ? "Tipo de consulta" : "Inquiry type"}
              <select name="inquiryType" required defaultValue="" className="rounded-xl border border-[#ded9e8] bg-[#f1eff6]/70 px-4 py-3.5 text-sm font-normal text-[#736e82] outline-none transition focus:border-[#B46781] focus:bg-white">
                <option value="" disabled>{copy.inquiryPlaceholder}</option>
                {copy.inquiryTypes.map((type) => <option key={type} value={type}>{type}</option>)}
              </select>
            </label>
            <label className="grid gap-2 text-xs font-semibold text-[#181525] sm:col-span-2">
              {isSpanish ? "Mensaje" : "Message"}
              <textarea name="message" required rows={6} placeholder={copy.messagePlaceholder} className="resize-none rounded-xl border border-[#ded9e8] bg-[#f1eff6]/70 px-4 py-3.5 text-sm font-normal outline-none transition placeholder:text-[#736e82]/55 focus:border-[#B46781] focus:bg-white" />
            </label>
            <div className="sm:col-span-2">
              <button type="submit" disabled={isSubmitting} className="brand-focus-ring rounded-full bg-[#B46781] px-6 py-3 text-xs font-semibold text-white transition hover:bg-[#413B6C] disabled:cursor-not-allowed disabled:opacity-60">{isSubmitting ? copy.sendingMessageLabel : copy.sendMessageLabel}</button>
              {submitMessage && <p className={`mt-4 text-sm ${submitMessage.type === "success" ? "text-[#413B6C]" : "text-red-700"}`}>{submitMessage.text}</p>}
            </div>
          </form>

          <aside className="h-fit rounded-3xl bg-[#080b16] p-7 text-white sm:p-9">
            <h3 className="title-font text-3xl">{copy.getInTouchLabel}</h3>
            <div className="mt-7 space-y-6">
              {copy.contactMethods.map((method) => (
                <a key={method.label} href={method.href} target={method.href.startsWith("http") ? "_blank" : undefined} rel={method.href.startsWith("http") ? "noreferrer" : undefined} className="brand-focus-ring group flex items-center gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#413B6C]/30 text-xs font-bold text-[#B46781] transition group-hover:bg-[#B46781] group-hover:text-white">{methodMarks[method.label] ?? "↗"}</span>
                  <span className="min-w-0">
                    <span className="block text-[0.58rem] font-bold uppercase tracking-[0.15em] text-white/35">{method.label}</span>
                    <span className="mt-1 block break-all text-xs text-white/75 sm:text-sm">{method.value}</span>
                  </span>
                </a>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
