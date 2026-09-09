import type { Locale } from "@/i18n/config";
import type { ServicesCopy } from "@/i18n/translations";

type ServicesPageProps = { copy: ServicesCopy; locale: Locale };

const skillGroups = [
  { title: "Web Development", skills: ["React", "Next.js", "TypeScript", "Tailwind CSS"] },
  { title: "Backend Development", skills: ["Node.js", "Express.js", "Python", "C#/.NET"] },
  { title: "Databases & Cloud", skills: ["MySQL", "Supabase", "PostgreSQL"] },
  { title: "Development & Testing", skills: ["Git", "GitLab", "Jest", "JUnit"] },
];

const serviceIcons = ["‹›", "✦", "▤", "▦"];

export default function ServicesPage({ copy, locale }: ServicesPageProps) {
  const isSpanish = locale === "es";
  const localizedSkillGroups = skillGroups.map((group, index) => ({
    ...group,
    title: isSpanish
      ? ["Desarrollo Web", "Desarrollo Backend", "Bases de Datos y Nube", "Desarrollo y Pruebas"][index]
      : group.title,
  }));

  return (
    <section id="services">
      <div className="bg-[#080b16] py-20 text-white sm:py-28">
        <div className="site-shell">
          <div className="text-center">
            <p className="eyebrow">{isSpanish ? "Experiencia" : "Expertise"}</p>
            <h2 className="title-font mt-3 text-4xl sm:text-5xl">{copy.skillStackTitle}</h2>
            <p className="mx-auto mt-4 max-w-2xl text-base italic leading-7 text-white/75">{copy.skillStackDescription}</p>
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {localizedSkillGroups.map((group) => (
              <article key={group.title} className="rounded-2xl border border-[#413B6C]/25 bg-[#101426] p-6">
                <h3 className="title-font text-xl text-[#B46781]">{group.title}</h3>
                <p className="mt-4 text-sm leading-7 text-white/75">{group.skills.join(" · ")}</p>
              </article>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-[#f1eff6] py-20 sm:py-28">
        <div className="site-shell">
          <p className="eyebrow">{isSpanish ? "Capacidades" : "Capabilities"}</p>
          <h2 className="title-font mt-3 text-4xl sm:text-5xl">{isSpanish ? "Lo que ofrezco" : "What I offer"}</h2>
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {copy.services.map((service, index) => (
              <article key={service.title} className="group min-h-56 rounded-2xl border border-[#ded9e8] bg-white p-7 shadow-[0_12px_35px_rgba(44,35,70,0.05)] transition duration-300 hover:-translate-y-1 hover:border-[#B46781]/45 hover:shadow-[0_18px_45px_rgba(65,59,108,0.11)]">
                <div className="flex items-start justify-between gap-5">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f1eff6] text-sm font-bold text-[#413B6C]">{serviceIcons[index]}</span>
                  <span className="title-font text-2xl text-[#B46781]">{service.priority}</span>
                </div>
                <h3 className="mt-7 text-xl font-bold leading-snug text-[#181525] sm:text-2xl">{service.title}</h3>
                <p className="mt-3 text-sm leading-6 text-[#736e82]">{service.description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
