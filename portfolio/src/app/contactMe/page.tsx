const contactLinks = [
  {
    href: "mailto:henrriquezkatia7@gmail.com",
    label: "henrriquezkatia7@gmail.com",
  },
  {
    href: "https://www.linkedin.com/in/katia-henrriquez-0783302a9/",
    label: "LinkedIn",
  },
];

export default function ContactMePage() {
  return (
    <div className="w-full max-w-3xl space-y-6 text-center">
      <h2 className="text-3xl font-bold sm:text-4xl">Let&apos;s Connect</h2>
      <p className="text-base leading-relaxed sm:text-lg">
        Have an opportunity, idea, or question? Reach out anytime and I&apos;ll
        get back to you soon. Email is the fastest way to contact me, but I&apos;m
        also active on LinkedIn.
      </p>
      <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
        {contactLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            target={link.href.startsWith("http") ? "_blank" : undefined}
            rel={link.href.startsWith("http") ? "noreferrer" : undefined}
            className="w-full rounded-full border border-[#1b475D] px-6 py-3 text-sm font-semibold tracking-wide text-[#1b475D] transition hover:bg-[#1b475D] hover:text-white sm:w-auto"
          >
            {link.label}
          </a>
        ))}
      </div>
    </div>
  );
}
