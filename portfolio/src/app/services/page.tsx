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
    </div>
  );
}
