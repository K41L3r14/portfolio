import Image from "next/image";

import AboutMeSection from "./aboutMe/page";
import ContactMePage from "./contactMe/page";
import ProjectsPage from "./projects/page";
import ServicesPage from "./services/page";

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#aboutMe", label: "About me" },
  { href: "#services", label: "Services" },
  { href: "#projects", label: "Projects" },
  { href: "#contactMe", label: "Contact me" },
];

const socialLinks = [
  {
    href: "https://github.com/K41L3r14",
    icon: "/github.png",
    label: "GitHub",
  },
  {
    href: "https://www.linkedin.com/in/katia-henrriquez-0783302a9/",
    icon: "/linkedin.png",
    label: "LinkedIn",
  },
  {
    href: "mailto:henrriquezkatia7@gmail.com",
    icon: "/gmail.png",
    label: "Email",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen h-screen snap-y snap-mandatory overflow-y-auto scroll-smooth bg-[#f7f3ec] text-[#1f1b17]">
      <header className="fixed left-0 right-0 top-0 z-30 bg-[#f7f3ec]/95">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-4 px-6 py-2 sm:flex-row sm:justify-between sm:px-8 sm:py-3 lg:px-10">
          <span className="text-xs uppercase tracking-[0.35em] text-[#3b332b]">
            Portfolio
          </span>
          <nav className="flex flex-wrap items-center justify-center text-[0.7rem] uppercase tracking-[0.35em] text-[#3b332b]">
            {navLinks.map((link, index) => (
              <span key={link.label} className="flex items-center">
                <a
                  href={link.href}
                  className="px-2 transition-colors hover:text-[#e0584f]"
                >
                  {link.label}
                </a>
                {index < navLinks.length - 1 && (
                  <span className="mx-2 h-3 w-px bg-[#3b332b]/60" />
                )}
              </span>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                aria-label={link.label}
                className="transition-transform hover:scale-110"
              >
                <Image
                  src={link.icon}
                  alt={link.label}
                  width={28}
                  height={28}
                  className="object-contain"
                />
              </a>
            ))}
          </div>
        </div>
      </header>

      <section
        id="home"
        className="min-h-screen snap-start px-4 py-16 flex items-center"
      >
        <div className="mx-auto grid w-full max-w-6xl items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
          <div className="space-y-8">
            <div className="relative w-full max-w-md overflow-hidden border border-[#d3c8b6] bg-white/70 p-3 shadow-sm">
              <div className="relative aspect-[4/5] w-full">
                <Image
                  src="/profile.png"
                  alt="Profile"
                  fill
                  sizes="(min-width: 1024px) 24rem, (min-width: 640px) 20rem, 16rem"
                  className="object-cover"
                  priority
                />
              </div>
            </div>
            <p className="text-xs uppercase tracking-[0.35em] text-[#3b332b]">
              Software engineer
            </p>
          </div>

          <div className="space-y-6">
            <h1 className="font-serif text-5xl leading-[0.95] text-[#e0584f] sm:text-6xl lg:text-7xl">
              Katia
              <br />
              Henrriquez
            </h1>
            <div className="pt-8 sm:pt-12">
              <p className="max-w-md text-sm leading-relaxed text-[#1f1b17] sm:text-base">
              I&apos;m a curiosity-driven software engineer who loves tackling
              tough problems and crafting memorable products. I build resilient
              backend systems and polished, human-friendly interfaces.
              </p>
            </div>
            <div className="mt-6 flex flex-wrap gap-4 sm:mt-8">
              <a
                href="mailto:henrriquezkatia7@gmail.com"
                className="inline-flex items-center justify-center border-2 border-[#1f1b17] px-6 py-2 text-[0.7rem] uppercase tracking-[0.35em] transition-colors hover:bg-[#1f1b17] hover:text-[#f7f3ec]"
              >
                Email me
              </a>
              <a
                href="/katia_s_Resume__Anonymous___update___Copy_.pdf"
                className="inline-flex items-center justify-center border-2 border-[#1f1b17] px-6 py-2 text-[0.7rem] uppercase tracking-[0.35em] transition-colors hover:bg-[#1f1b17] hover:text-[#f7f3ec]"
                target="_blank"
                rel="noreferrer"
              >
                Resume
              </a>
            </div>
          </div>
        </div>
      </section>

      <section
        id="aboutMe"
        className="min-h-screen snap-start bg-[#f7f3ec] px-4 py-16 text-[#1f1b17] flex items-center justify-center"
      >
        <div className="mx-auto flex w-full max-w-4xl items-center justify-center text-center lg:text-left">
          <AboutMeSection />
        </div>
      </section>

      <section
        id="services"
        className="min-h-screen snap-start bg-[#f7f3ec] px-4 py-16 text-[#1f1b17] flex items-center justify-center"
      >
        <div className="mx-auto flex w-full max-w-4xl items-center justify-center">
          <ServicesPage />
        </div>
      </section>

      <section
        id="projects"
        className="min-h-screen snap-start bg-[#f7f3ec] px-4 py-16 text-[#1f1b17] flex items-center justify-center"
      >
        <div className="mx-auto flex w-full max-w-4xl items-center justify-center">
          <ProjectsPage />
        </div>
      </section>

      <section
        id="contactMe"
        className="min-h-screen snap-start bg-[#f7f3ec] px-4 py-16 text-[#1f1b17] flex items-center justify-center"
      >
        <div className="mx-auto flex w-full max-w-4xl items-center justify-center">
          <ContactMePage />
        </div>
      </section>
    </main>
  );
}
