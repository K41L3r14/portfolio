import Image from "next/image";

const services = [
  {
    title: "Full-Stack Web Development",
    description:
      "Build responsive web apps with Next.js, React, TypeScript, Node.js, and MySQL/Supabase.",
  },
  {
    title: "AI Feature Integration",
    description:
      "Add AI-powered workflows (chatbots, document parsing, semantic search) using OpenAI/LLM APIs.",
  },
  {
    title: "Backend API Development",
    description:
      "Design and build with Node.js and Express, plus auth, validation, and role-based access.",
  },
  {
    title: "UI Prototyping and Frontend Polish",
    description:
      "Create fast, interactive prototypes and polished interfaces that are accessible, mobile-friendly, and ready for real users.",
  },
];

const technologies = [
  { name: "Python", icon: "https://cdn.simpleicons.org/python/3776AB" },
  { name: "Java", icon: "https://cdn.simpleicons.org/openjdk/ED8B00" },
  { name: "JavaScript", icon: "https://cdn.simpleicons.org/javascript/F7DF1E" },
  { name: "HTML5", icon: "https://cdn.simpleicons.org/html5/E34F26" },
  { name: "CSS3", icon: "https://cdn.simpleicons.org/css/1572B6" },
  { name: "MySQL", icon: "https://cdn.simpleicons.org/mysql/4479A1" },
  { name: "C#", icon: "https://cdn.simpleicons.org/dotnet/512BD4" },
  { name: "Node.js", icon: "https://cdn.simpleicons.org/nodedotjs/5FA04E" },
  { name: "Express.js", icon: "https://cdn.simpleicons.org/express/222222" },
  { name: "React", icon: "https://cdn.simpleicons.org/react/61DAFB" },
  { name: "TypeScript", icon: "https://cdn.simpleicons.org/typescript/3178C6" },
  { name: "Next.js", icon: "https://cdn.simpleicons.org/nextdotjs/111111" },
  { name: "Tailwind CSS", icon: "https://cdn.simpleicons.org/tailwindcss/06B6D4" },
  { name: "Jest", icon: "https://cdn.simpleicons.org/jest/C21325" },
  { name: "JUnit", icon: "https://cdn.simpleicons.org/junit5/25A162" },
  { name: "Unity", icon: "https://cdn.simpleicons.org/unity/000000" },
  { name: "Databricks", icon: "https://cdn.simpleicons.org/databricks/FF3621" },
  { name: "Supabase", icon: "https://cdn.simpleicons.org/supabase/3ECF8E" },
  { name: "OpenWeather API", icon: "/openWeather.png" },
  { name: "GitLab", icon: "https://cdn.simpleicons.org/gitlab/FC6D26" },
  { name: "Git", icon: "https://cdn.simpleicons.org/git/F05032" },
  { name: "Linux VM", icon: "https://cdn.simpleicons.org/linux/FCC624" },
];

const loopedTechnologies = [...technologies, ...technologies];

export default function ServicesPage() {
  return (
    <div className="w-full max-w-5xl space-y-8 text-center lg:text-left">
      <section className="space-y-5">
        <h3 className="font-serif text-3xl text-[#e0584f] sm:text-4xl">
          My skills
        </h3>
        <div className="relative overflow-hidden rounded-xl border border-[#d3c8b6] bg-[#f5f2ec] px-2 py-3">
          <div className="skills-icon-banner-track">
            {loopedTechnologies.map((technology, index) => (
              <div
                key={`${technology.name}-${index}`}
                className="mx-1.5 flex shrink-0 items-center gap-2 rounded-full bg-white/95 px-3 py-2 text-left shadow-sm ring-1 ring-[#d8cfbf]"
              >
                <Image
                  src={technology.icon}
                  alt={`${technology.name} logo`}
                  width={20}
                  height={20}
                  unoptimized
                  className="h-5 w-5"
                />
                <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#3b332b] sm:text-xs">
                  {technology.name}
                </span>
              </div>
            ))}
          </div>
        </div>
        <h2 className="font-serif text-4xl text-[#e0584f] sm:text-5xl">
          What I offer...
        </h2>
      </section>

      <ul className="grid gap-6 sm:grid-cols-2">
        {services.map((service) => (
          <li
            key={service.title}
            className="rounded-2xl bg-white/70 p-6 text-sm leading-relaxed text-[#1f1f1f] shadow-lg sm:text-base"
          >
            <h3 className="text-xl font-semibold text-[#2f1c3a]">
              {service.title}
            </h3>
            <p className="mt-2">{service.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
