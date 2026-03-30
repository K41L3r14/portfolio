"use client";

import Image from "next/image";
import { FormEvent, useState } from "react";

const inquiryTypes = [
  "Web App Development",
  "Landing Page",
  "UI/UX Refresh",
  "API and Backend",
  "Maintenance and Support",
  "Fullstack Development",
  "Other",
];

const contactMethods = [
  {
    label: "Email",
    value: "henrriquezkatia7@gmail.com",
    href: "mailto:henrriquezkatia7@gmail.com",
    icon: "/gmail.png",
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/katia-henrriquez-0783302a9",
    href: "https://www.linkedin.com/in/katia-henrriquez-0783302a9/",
    icon: "/linkedin.png",
  },
  {
    label: "GitHub",
    value: "github.com/K41L3r14",
    href: "https://github.com/K41L3r14",
    icon: "/github.png",
  },
];

const initialFormValues = {
  name: "",
  email: "",
  inquiryType: "",
  message: "",
};

export default function ContactMePage() {
  const [formValues, setFormValues] = useState(initialFormValues);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setIsSubmitting(true);
    setFeedback(null);

    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as
          | { error?: string }
          | null;
        throw new Error(data?.error || "Unable to submit inquiry.");
      }

      setFormValues(initialFormValues);
      setFeedback("Inquiry submitted. I will get back to you shortly.");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unable to submit inquiry.";
      setFeedback(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="w-full max-w-6xl space-y-8">
      <h2 className="font-serif text-4xl text-[#e0584f] sm:text-5xl">
        Lets Work together!
      </h2>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(220px,0.42fr)]">
        <div className="rounded-3xl border border-[#2d2926] bg-[#f7f3ec]/60 p-4 sm:p-6">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid gap-3 sm:grid-cols-2">
              <input
                type="text"
                name="name"
                value={formValues.name}
                onChange={(event) =>
                  setFormValues((current) => ({
                    ...current,
                    name: event.target.value,
                  }))
                }
                placeholder="NAME"
                required
                className="w-full rounded-xl border border-[#2d2926] bg-transparent px-4 py-3 text-xs uppercase tracking-[0.3em] outline-none placeholder:text-[#3b332b]/70 focus:border-[#e0584f]"
              />
              <input
                type="email"
                name="email"
                value={formValues.email}
                onChange={(event) =>
                  setFormValues((current) => ({
                    ...current,
                    email: event.target.value,
                  }))
                }
                placeholder="YOUR EMAIL"
                required
                className="w-full rounded-xl border border-[#2d2926] bg-transparent px-4 py-3 text-xs uppercase tracking-[0.3em] outline-none placeholder:text-[#3b332b]/70 focus:border-[#e0584f]"
              />
            </div>

            <select
              name="inquiryType"
              value={formValues.inquiryType}
              onChange={(event) =>
                setFormValues((current) => ({
                  ...current,
                  inquiryType: event.target.value,
                }))
              }
              required
              className="w-full rounded-xl border border-[#2d2926] bg-transparent px-4 py-3 text-xs uppercase tracking-[0.3em] text-[#1f1b17] outline-none focus:border-[#e0584f]"
            >
              <option value="" disabled>
                INQUIRIES
              </option>
              {inquiryTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>

            <textarea
              name="message"
              value={formValues.message}
              onChange={(event) =>
                setFormValues((current) => ({
                  ...current,
                  message: event.target.value,
                }))
              }
              placeholder="YOUR MESSAGE"
              rows={7}
              required
              className="w-full resize-none rounded-xl border border-[#2d2926] bg-transparent px-4 py-3 text-xs uppercase tracking-[0.3em] outline-none placeholder:text-[#3b332b]/70 focus:border-[#e0584f]"
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex w-full items-center justify-center rounded-full bg-[#1f1b17] px-6 py-3 text-xs font-semibold uppercase tracking-[0.35em] text-[#f7f3ec] transition-colors hover:bg-[#e0584f] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>

            {feedback ? (
              <p className="text-xs uppercase tracking-[0.2em] text-[#3b332b]">
                {feedback}
              </p>
            ) : null}
          </form>
        </div>

        <aside className="rounded-3xl border border-[#2d2926] bg-[#f7f3ec]/60 p-5 sm:p-6">
          <p className="mb-6 text-xs uppercase tracking-[0.35em] text-[#3b332b]">
            Get in Touch
          </p>
          <div className="space-y-5">
            {contactMethods.map((method) => (
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
                  <p className="text-xs uppercase tracking-[0.3em] text-[#1f1b17]">
                    {method.label}
                  </p>
                  <p className="text-sm leading-snug text-[#3b332b]">
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
