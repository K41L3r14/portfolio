const services = [
  {
    title: "Frontend Engineering",
    description:
      "Responsive React and Next.js experiences that feel great on any device, powered by modern CSS and accessible design patterns.",
  },
  {
    title: "Backend APIs",
    description:
      "RESTful and event-driven services with clear contracts, solid validation, and thoughtful monitoring for smooth operations.",
  },
  {
    title: "UI Prototyping",
    description:
      "Fast interactive prototypes that turn product ideas into actionable flows teams can iterate on quickly.",
  },
  {
    title: "Developer Experience",
    description:
      "Tooling, documentation, and automation that keep projects maintainable and help teams collaborate without friction.",
  },
];

const skillGroups = [
  {
    label: "Frontend",
    skills: [
      "HTML",
      "CSS",
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "Tailwind CSS",
    ],
  },
  {
    label: "Backend",
    skills: ["Node.js", "Express", "REST APIs", "PostgreSQL", "MongoDB"],
  },
  {
    label: "Tools",
    skills: ["Git", "GitHub", "VS Code", "Postman", "Figma"],
  },
  {
    label: "Practices",
    skills: ["Responsive Design", "Accessibility", "Testing", "CI/CD"],
  },
];

export default function ServicesPage() {
  return (
    <div className="w-full max-w-5xl space-y-8 text-center lg:text-left">
      <h2 className="text-3xl font-bold sm:text-4xl">Services</h2>
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

      <section className="space-y-5 rounded-2xl bg-white/70 p-6 shadow-lg">
        <h3 className="text-2xl font-semibold text-[#2f1c3a] sm:text-3xl">
          Skills
        </h3>
        <p className="text-sm leading-relaxed text-[#3b332b] sm:text-base">
          Technologies I use to design, build, and ship production-ready
          products.
        </p>
        <div className="grid gap-5 sm:grid-cols-2">
          {skillGroups.map((group) => (
            <div key={group.label} className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#1b475D]">
                {group.label}
              </p>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-[#d3c8b6] bg-[#f0ebe3] px-3 py-1 text-xs uppercase tracking-[0.12em] text-[#3b332b]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
