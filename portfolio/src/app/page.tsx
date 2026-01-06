import Image from "next/image";

import AboutMeSection from "./aboutMe/page";
import ContactMePage from "./contactMe/page";
import ProjectsPage from "./projects/page";
import ServicesPage from "./services/page";

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
    <main className="min-h-screen bg-[#9bb5bd] text-slate-900">
      <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-24 flex-col items-center justify-center gap-8 bg-[#1b475D] px-4 py-10 text-white shadow-2xl">
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
              width={56}
              height={56}
              className="object-contain brightness-125 drop-shadow-lg"
            />
          </a>
        ))}
      </aside>

      <div className="flex flex-col lg:pl-28 ">
        <div className="flex justify-center gap-6 bg-[#1b475D] py-4 text-white lg:hidden">
          {socialLinks.map((link) => (
            <a
              key={`mobile-${link.label}`}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              aria-label={link.label}
              className="transition-transform hover:scale-110"
            >
              <Image
                src={link.icon}
                alt={link.label}
                width={44}
                height={44}
                className="object-contain brightness-125 drop-shadow-lg"
              />
            </a>
          ))}
        </div>

        <section className="min-h-screen bg-[#9bb5bd] px-4 py-16">
          <div className="mx-auto flex w-full max-w-5xl flex-col-reverse items-center justify-between gap-10 lg:flex-row">
            <div className="flex flex-col items-center gap-6 text-center lg:items-start lg:text-left">
              <div className="chat chat-start">
                <div className="chat-bubble hero-chat-bubble text-4xl font-mono font-bold leading-tight text-[#2f1c3a] shadow-lg sm:text-5xl lg:text-6xl">
                  Hi, I&apos;m <br /> Katia Henrriquez
                </div>
              </div>
              <div className="chat chat-start">
                  <div className="chat-bubble bg-white text-base leading-relaxed text-[#2f1c3a] sm:text-lg">
                  Software engineer, lifelong learner, and builder of reliable
                  digital experiences.
                </div>
              </div>

              <div className="relative h-48 w-48 sm:h-56 sm:w-56 md:h-64 md:w-64">
                <Image
                  src="/profile.png"
                  alt="Profile"
                  fill
                  sizes="(min-width: 1024px) 16rem, (min-width: 640px) 14rem, 12rem"
                  className="rounded-full border-4 border-white/50 object-cover shadow-xl"
                  priority
                />
              </div>
            </div>

            <div className="max-w-xl text-center lg:text-left">
              <p className="notebook text-base leading-relaxed text-[#2f1c3a] sm:text-lg">
                I&apos;m a passionate, curiosity-driven software engineer who
                loves tackling tough problems and crafting fun, memorable
                solutions that bring products to life. I enjoy working across
                the stack with a focus on resilient backend systems and
                polished, human-friendly interfaces.
              </p>
            </div>
          </div>
        </section>

        <section
          id="aboutMe"
          className="min-h-screen  bg-[#9bb5bd] px-4 py-16 text-Black"
        >
          <div className="mx-auto flex w-full max-w-4xl items-center justify-center text-center lg:text-left">
            <AboutMeSection />
          </div>
        </section>

        <section
          id="services"
          className="min-h-screen  bg-[#9bb5bd] px-4 py-16 text-[#2f1c3a]"
        >
          <div className="mx-auto flex w-full max-w-4xl items-center justify-center">
            <ServicesPage />
          </div>
        </section>

        <section
          id="projects"
          className="min-h-screen  bg-[#9bb5bd] px-4 py-16 text-[#2f1c3a]"
        >
          <div className="mx-auto flex w-full max-w-4xl items-center justify-center">
            <ProjectsPage />
          </div>
        </section>

        <section
          id="contactMe"
          className="min-h-screen bg-[#9bb5bd] px-4 py-16 text-[#2f1c3a]"
        >
          <div className="mx-auto flex w-full max-w-4xl items-center justify-center">
            <ContactMePage />
          </div>
        </section>
      </div>
    </main>
  );
}
