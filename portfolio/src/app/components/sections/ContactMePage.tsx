"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type FormEvent } from "react";

import type { ContactCopy } from "@/i18n/translations";

type ContactMePageProps = {
  copy: ContactCopy;
};

export default function ContactMePage({ copy }: ContactMePageProps) {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    const sectionElement = sectionRef.current;

    if (!sectionElement) {
      return;
    }

    const scrollRoot = sectionElement.closest("main");
    const observerRoot = scrollRoot instanceof Element ? scrollRoot : null;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        root: observerRoot,
        threshold: 0.35,
      }
    );

    observer.observe(sectionElement);

    return () => {
      observer.disconnect();
    };
  }, []);

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
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = (await response.json().catch(() => null)) as { error?: string } | null;

      if (!response.ok) {
        throw new Error(result?.error ?? copy.errorMessage);
      }

      form.reset();
      setSubmitMessage({ type: "success", text: copy.successMessage });
    } catch (error) {
      const text = error instanceof Error ? error.message : copy.errorMessage;
      setSubmitMessage({ type: "error", text });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div ref={sectionRef} className="w-full max-w-6xl space-y-8">
      <h2 className="title-font text-4xl text-[#ff5ca8] sm:text-5xl">
        {copy.title}
      </h2>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(220px,0.42fr)]">
        <div
          className={`contact-panel-left rounded-3xl border border-[#1a4a50] bg-[#e7f4f2] p-4 sm:p-6 ${
            isVisible ? "is-visible" : ""
          }`}
        >
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid gap-3 sm:grid-cols-2">
              <input
                type="text"
                name="name"
                required
                placeholder={copy.namePlaceholder}
                className="w-full rounded-xl border border-[#1a4a50] bg-transparent px-4 py-3 text-xs uppercase tracking-[0.3em] outline-none placeholder:text-[#1d555b]/70 focus:border-[#2d9f95]"
              />
              <input
                type="email"
                name="email"
                required
                placeholder={copy.emailPlaceholder}
                className="w-full rounded-xl border border-[#1a4a50] bg-transparent px-4 py-3 text-xs uppercase tracking-[0.3em] outline-none placeholder:text-[#1d555b]/70 focus:border-[#2d9f95]"
              />
            </div>

            <select
              name="inquiryType"
              defaultValue=""
              required
              className="w-full rounded-xl border border-[#1a4a50] bg-transparent px-4 py-3 text-xs uppercase tracking-[0.3em] text-[#10363b] outline-none focus:border-[#2d9f95]"
            >
              <option value="" disabled>
                {copy.inquiryPlaceholder}
              </option>
              {copy.inquiryTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>

            <textarea
              name="message"
              required
              placeholder={copy.messagePlaceholder}
              rows={7}
              className="w-full resize-none rounded-xl border border-[#1a4a50] bg-transparent px-4 py-3 text-xs uppercase tracking-[0.3em] outline-none placeholder:text-[#1d555b]/70 focus:border-[#2d9f95]"
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex w-full items-center justify-center rounded-full bg-[#10363b] px-6 py-3 text-xs font-semibold uppercase tracking-[0.35em] text-[#e7f4f2] transition-colors hover:bg-[#2d9f95] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? copy.sendingMessageLabel : copy.sendMessageLabel}
            </button>

            {submitMessage && (
              <p
                className={`text-xs uppercase tracking-[0.2em] ${
                  submitMessage.type === "success" ? "text-[#175f66]" : "text-[#1f7f78]"
                }`}
              >
                {submitMessage.text}
              </p>
            )}
          </form>
        </div>

        <aside
          className={`contact-panel-right rounded-3xl border border-[#1a4a50] bg-[#e7f4f2] p-5 sm:p-6 ${
            isVisible ? "is-visible" : ""
          }`}
        >
          <p className="mb-6 text-xs uppercase tracking-[0.35em] text-[#1d555b]">
            {copy.getInTouchLabel}
          </p>
          <div className="space-y-5">
            {copy.contactMethods.map((method) => (
              <a
                key={method.label}
                href={method.href}
                target={method.href.startsWith("http") ? "_blank" : undefined}
                rel={method.href.startsWith("http") ? "noreferrer" : undefined}
                className="group flex items-start gap-3"
              >
                <Image
                  src={method.icon}
                  alt={method.label}
                  width={18}
                  height={18}
                  className="mt-0.5 object-contain opacity-80 transition group-hover:opacity-100"
                />
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-[#10363b]">
                    {method.label}
                  </p>
                  <p className="text-sm leading-snug text-[#1d555b]">
                    {method.value}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
