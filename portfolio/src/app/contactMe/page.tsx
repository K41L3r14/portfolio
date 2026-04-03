"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const inquiryTypes = [
  "Web App Development",
  "Landing Page",
  "UI/UX Refresh",
  "API and Backend",
  "Maintenance and Support",
  "Fullstack Development",
  "Other"
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

export default function ContactMePage() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const sectionElement = sectionRef.current;

    if (!sectionElement) {
      return;
    }

    const scrollRoot = sectionElement.closest("main");
    const observerRoot =
      scrollRoot instanceof Element ? scrollRoot : null;

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

  return (
    <div ref={sectionRef} className="w-full max-w-6xl space-y-8">
      <h2 className="title-font text-4xl text-[#c94841] sm:text-5xl">
        Lets Work together!
      </h2>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(220px,0.42fr)]">
        <div
          className={`contact-panel-left rounded-3xl border border-[#2d2926] bg-[#f7f3ec] p-4 sm:p-6 ${
            isVisible ? "is-visible" : ""
          }`}
        >
          <form className="space-y-4">
            <div className="grid gap-3 sm:grid-cols-2">
              <input
                type="text"
                name="name"
                placeholder="NAME"
                className="w-full rounded-xl border border-[#2d2926] bg-transparent px-4 py-3 text-xs uppercase tracking-[0.3em] outline-none placeholder:text-[#3b332b]/70 focus:border-[#e0584f]"
              />
              <input
                type="email"
                name="email"
                placeholder="YOUR EMAIL"
                className="w-full rounded-xl border border-[#2d2926] bg-transparent px-4 py-3 text-xs uppercase tracking-[0.3em] outline-none placeholder:text-[#3b332b]/70 focus:border-[#e0584f]"
              />
            </div>

            <select
              name="inquiryType"
              defaultValue=""
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
              placeholder="YOUR MESSAGE"
              rows={7}
              className="w-full resize-none rounded-xl border border-[#2d2926] bg-transparent px-4 py-3 text-xs uppercase tracking-[0.3em] outline-none placeholder:text-[#3b332b]/70 focus:border-[#e0584f]"
            />

            <a
              href="mailto:henrriquezkatia7@gmail.com?subject=Portfolio%20Inquiry"
              className="inline-flex w-full items-center justify-center rounded-full bg-[#1f1b17] px-6 py-3 text-xs font-semibold uppercase tracking-[0.35em] text-[#f7f3ec] transition-colors hover:bg-[#e0584f]"
            >
              Send Message
            </a>
          </form>
        </div>

        <aside
          className={`contact-panel-right rounded-3xl border border-[#2d2926] bg-[#f7f3ec] p-5 sm:p-6 ${
            isVisible ? "is-visible" : ""
          }`}
        >
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
