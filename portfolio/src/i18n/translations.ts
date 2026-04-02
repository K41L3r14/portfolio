import type { Locale } from "./config";

export type NavLinkCopy = {
  href: string;
  label: string;
};

export type SocialLinkCopy = {
  href: string;
  icon: string;
  label: string;
};

export type HeroCopy = {
  photoTag: string;
  role: string;
  line1: string;
  line2: string;
  intro: string;
  emailCta: string;
  resumeCta: string;
};

export type AboutImageCopy = {
  src: string;
  alt: string;
};

export type AboutCopy = {
  images: AboutImageCopy[];
  title: string;
  paragraphs: string[];
};

export type ServiceItemCopy = {
  priority: string;
  title: string;
  description: string;
};

export type ServicesCopy = {
  skillStackTitle: string;
  servicesTitle: string;
  services: ServiceItemCopy[];
};

export type ProjectCopy = {
  title: string;
  stack: string;
  summary: string;
  technologies: string[];
  video?: string;
  slideshow?: string[];
};

export type OtherProjectCopy = {
  title: string;
  summary: string;
  skills: string[];
  video?: string;
  slideshow?: string[];
};

export type ProjectsCopy = {
  sectionTitle: string;
  hoverHint: string;
  technologiesLabel: string;
  prevLabel: string;
  nextLabel: string;
  videoFallback: string;
  obserraSlideAlt: string;
  otherSectionTitle: string;
  otherSectionDescription: string;
  otherProjectDotAria: string;
  projects: ProjectCopy[];
  otherProjects: OtherProjectCopy[];
};

export type ContactMethodCopy = {
  label: string;
  value: string;
  href: string;
  icon: string;
};

export type ContactCopy = {
  title: string;
  namePlaceholder: string;
  emailPlaceholder: string;
  inquiryPlaceholder: string;
  messagePlaceholder: string;
  inquiryTypes: string[];
  sendMessageLabel: string;
  sendingMessageLabel: string;
  successMessage: string;
  errorMessage: string;
  getInTouchLabel: string;
  mailtoSubject: string;
  contactMethods: ContactMethodCopy[];
};

export type LanguageSwitcherCopy = {
  label: string;
  english: string;
  spanish: string;
};

export type PortfolioTranslation = {
  metadata: {
    title: string;
    description: string;
  };
  headerName: string;
  navLinks: NavLinkCopy[];
  socialLinks: SocialLinkCopy[];
  languageSwitcher: LanguageSwitcherCopy;
  hero: HeroCopy;
  about: AboutCopy;
  services: ServicesCopy;
  projects: ProjectsCopy;
  contact: ContactCopy;
};

const obserraSlides = [
  "/Obserra-photos/WelcomeObserraPage.png",
  "/Obserra-photos/ManageAllAccountsAndRolesAdminRole.png",
  "/Obserra-photos/ViewPendingTasksForAuditAdminRole.png",
  "/Obserra-photos/AuditorRole.png",
  "/Obserra-photos/AuditIntakeCoordinatorRole.png",
  "/Obserra-photos/TasksAssigningCoordinatorRole.png",
  "/Obserra-photos/ViewControlsAndTasksCoordinatorRole.png",
  "/Obserra-photos/ProgressOnTasksContributorRole.png",
];

const diarySlides = [
  "/diary-photos/image (26).png",
  "/diary-photos/image (27).png",
  "/diary-photos/image (28).png",
  "/diary-photos/image (30).png",
];

const auditAiSlides = [
  "/AuditAI-photos/Screenshot 2026-04-02 125950.png",
  "/AuditAI-photos/Screenshot 2026-04-02 130005.png",
  "/AuditAI-photos/Screenshot 2026-04-02 132953.png",
  "/AuditAI-photos/Screenshot 2026-04-02 133138.png",
  "/AuditAI-photos/Screenshot 2026-04-02 133157.png",
];

export const translations: Record<Locale, PortfolioTranslation> = {
  en: {
    metadata: {
      title: "Katia's Portfolio",
      description: "Personal portfolio website built with Next.js and Tailwind CSS.",
    },
    headerName: "Katia Henrriquez",
    navLinks: [
      { href: "#home", label: "Home" },
      { href: "#aboutMe", label: "About me" },
      { href: "#services", label: "Services" },
      { href: "#projects", label: "Projects" },
      { href: "#contactMe", label: "Contact me" },
    ],
    socialLinks: [
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
    ],
    languageSwitcher: {
      label: "Language",
      english: "English",
      spanish: "Spanish",
    },
    hero: {
      photoTag: "#NiceToMeetYou",
      role: "Software engineer",
      line1: "Hello There!",
      line2: "I Am Katia Henrriquez.",
      intro:
        "I'm a curiosity-driven developer who enjoys learning new technologies and solving real problems. I like building reliable full-stack applications and taking on challenges that help me grow.",
      emailCta: "Email me",
      resumeCta: "Resume",
    },
    about: {
      images: [
        { src: "/aboutMe1.jpeg", alt: "Katia in nature" },
        { src: "/aboutMe2.jpeg", alt: "Katia walking outdoors" },
        { src: "/aboutMe3.jpeg", alt: "Katia portrait" },
      ],
      title: "I am an Independent Software Developer",
      paragraphs: [
        "I enjoy collaborating on projects that solve real problems and create meaningful experiences. My full-stack work includes reliable backend systems and polished, user-friendly interfaces. I am always looking for ways to grow and learn new technologies.",
        "Outside of coding, I enjoy time with family and friends, drawing, and learning languages. Spanish is my first language, I learned English at 13, and I am currently teaching myself Japanese. I also love game design because it combines art and software development.",
      ],
    },
    services: {
      skillStackTitle: "My Skill Stack",
      servicesTitle: "My Services",
      services: [
        {
          priority: "01",
          title: "Full-Stack Web Development",
          description:
            "Build responsive web apps with Next.js, React, TypeScript, Node.js, and MySQL/Supabase.",
        },
        {
          priority: "02",
          title: "AI Feature Integration",
          description:
            "Add AI-powered workflows (chatbots, document parsing, semantic search) using OpenAI/LLM APIs.",
        },
        {
          priority: "03",
          title: "Backend API Development",
          description:
            "Design and build with Node.js and Express, plus auth, validation, and role-based access.",
        },
        {
          priority: "04",
          title: "UI Prototyping and Frontend Polish",
          description:
            "Create fast, interactive prototypes and polished interfaces that are accessible, mobile-friendly, and ready for real users.",
        },
      ],
    },
    projects: {
      sectionTitle: "Projects I've Worked On",
      hoverHint: "Hover card to expand details",
      technologiesLabel: "Technologies",
      prevLabel: "Prev",
      nextLabel: "Next",
      videoFallback: "Your browser does not support the video tag.",
      obserraSlideAlt: "Obserra slide",
      otherSectionTitle: "Other Projects I've Worked On",
      otherSectionDescription:
        "No live demos for these yet, but these projects reflect my technical skills and hands-on experience.",
      otherProjectDotAria: "Go to",
      projects: [
        {
          title: "Obserra",
          stack: "Audit Management Platform",
          summary:
            'AI-powered audit workflow platform with four roles: Coordinator, Contributor, Auditor, and Admin. Coordinators ingest audits, upload audit files, assign controls and tasks to contributors, complete tasks themselves when needed, and review/approve contributor work. Contributors complete assigned tasks and improve submissions based on coordinator feedback. Auditors track what has been completed and which teams are working each audit. Admins manage all accounts and approve tags submitted during audit intake. OpenAI API integration automatically detects controls and tasks from spreadsheets using intent keywords such as "provide" and "submit," making the system resilient to varied spreadsheet formats.',
          technologies: [
            "Next.js",
            "TypeScript",
            "Supabase",
            "Tailwind CSS",
            "OpenAI API",
            "Role-Based Access",
            "Workflow UI",
          ],
          slideshow: obserraSlides,
        },
        {
          title: "Buckle Chatbot",
          stack: "Conversational Interface",
          summary:
            'Conversational shopping assistant powered by Buckle inventory data and enriched metadata. To improve recommendation quality, we used the Anthropic API to process 50,000+ product images and generate tags across four categories: when to wear, color, descriptors, and aesthetic. The pipeline generated 10 tags per category (40 tags per item), then embedded those tags to power a RAG retrieval flow that returns the top 20 closest products for each user request. This enabled semantic search instead of strict keyword search, so customers can ask prompts like "Can you give me floral wear for a night out?" and still get relevant results. The approach improved discoverability by surfacing inventory beyond the first few keyword matches.',
          technologies: [
            "Python",
            "JavaScript",
            "Anthropic API",
            "LLMs",
            "Embeddings",
            "RAG Pipeline",
            "Semantic Search",
          ],
          video: "/videos/chatbot-Buckle.mp4",
        },
        {
          title: "Ripple Effects",
          stack: "Educational Simulation Game",
          summary:
            "Ripple Effects is an immersive simulation game set in fantasy town Aquaville that teaches water management through strategic policy and resource decisions. I designed and implemented two minigames: a Ranch game where cows approach three water troughs at different speeds based on mood, affecting consumption, and players must set an explicit water budget and meet difficulty-based herd targets (easy/medium/hard); and a Field Watering game where players place sensors and apply water only to zones with low moisture and lower crop quality. I also designed a portion of the visual assets used in the game.",
          technologies: [
            "Unity",
            "C#",
            "Game Design",
            "Simulation Systems",
            "UI/UX Design",
            "Asset Design",
          ],
          video: "/videos/Ripple-Effects.mp4",
        },
      ],
      otherProjects: [
        {
          title: "Personal Diary - Full-Stack Journaling Application",
          summary:
            "Privacy-first full-stack journaling app for creating, editing, and tracking daily reflections in a calendar-based interface. Users can manage entries with full CRUD operations, track mood/weather/food habits, and securely authenticate with Firebase Authentication. I contributed to backend and frontend development, designed the MySQL schema (users and entries with foreign keys), implemented CRUD APIs and UI flows, and supported testing/documentation. The app demonstrates end-to-end architecture with Express APIs, structured JSON entry data, and scalable planning for future features like offline support, multi-device sync, and rich media notes.",
          skills: [
            "React",
            "Express.js",
            "TypeScript",
            "MySQL",
            "Firebase Authentication",
            "Tailwind CSS",
            "CRUD APIs",
            "JSON Data Modeling",
            "Database Schema Design",
            "Testing and Documentation",
          ],
          slideshow: diarySlides,
        },
        {
          title: "AuditAI: AI-Powered Vulnerability Scanner",
          summary:
            "Full-stack AI security tool that scans open-source code for vulnerabilities and helps developers judge how trustworthy model findings are. The system analyzes code with multiple models (OpenAI, Claude, and CodeBERT), then returns severity levels, confidence scores, highlighted lines, and suggested fixes. It supports import/export for analysis workflows, validates model outputs with Zod schemas, and uses fixture-based testing across scenarios like XSS, eval injection, and redirect vulnerabilities. We also measured precision, recall, F1, and TP/FP/FN to compare models and reduce false positives and hallucinated results.",
          skills: [
            "Next.js",
            "React",
            "TypeScript",
            "Next.js APIs",
            "OpenAI API",
            "Claude API",
            "CodeBERT",
            "Zod Validation",
            "Prompt Engineering",
            "Model Evaluation Metrics",
          ],
          video: "/videos/Full-AuditAI demo.mp4",
          slideshow: auditAiSlides,
        },
        {
          title: "Zulip Open-Source Contribution - Moderation and Engagement Features",
          summary:
            "Contributed to the Zulip open-source team chat platform by developing features that improve topic organization, moderation, and user engagement. Built an Upvote system that helps users highlight and track important discussions, and implemented a Topic Lock (read-only) feature that allows admins and moderators to control conversations and protect important topics. Worked across the Django backend, JavaScript frontend, and UI templates, including adding models, event handlers, and authorization checks. Also supported testing and developer documentation to make the features reliable and easier for future contributors to understand.",
          skills: [
            "Python (Django)",
            "JavaScript",
            "MVC Architecture",
            "Open-Source Collaboration",
            "Testing and Debugging",
            "Technical Documentation",
            "Scrum Development Process",
          ],
        },
      ],
    },
    contact: {
      title: "Lets Work together!",
      namePlaceholder: "NAME",
      emailPlaceholder: "YOUR EMAIL",
      inquiryPlaceholder: "INQUIRIES",
      messagePlaceholder: "YOUR MESSAGE",
      inquiryTypes: [
        "Web App Development",
        "Landing Page",
        "UI/UX Refresh",
        "API and Backend",
        "Maintenance and Support",
        "Fullstack Development",
        "Other",
      ],
      sendMessageLabel: "Send Message",
      sendingMessageLabel: "Sending...",
      successMessage: "Thanks. Your inquiry was sent successfully.",
      errorMessage: "Could not send your inquiry right now. Please try again.",
      getInTouchLabel: "Get in Touch",
      mailtoSubject: "Portfolio Inquiry",
      contactMethods: [
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
      ],
    },
  },
  es: {
    metadata: {
      title: "Portafolio de Katia",
      description: "Portafolio personal creado con Next.js y Tailwind CSS.",
    },
    headerName: "Katia Henrriquez",
    navLinks: [
      { href: "#home", label: "Inicio" },
      { href: "#aboutMe", label: "Sobre mi" },
      { href: "#services", label: "Servicios" },
      { href: "#projects", label: "Proyectos" },
      { href: "#contactMe", label: "Contacto" },
    ],
    socialLinks: [
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
        label: "Correo",
      },
    ],
    languageSwitcher: {
      label: "Idioma",
      english: "Ingles",
      spanish: "Espanol",
    },
    hero: {
      photoTag: "#MuchoGusto",
      role: "Ingeniera de software",
      line1: "Hola!",
      line2: "Soy Katia Henrriquez.",
      intro:
        "Soy una desarrolladora impulsada por la curiosidad, me gusta aprender nuevas tecnologias y resolver problemas reales. Disfruto crear aplicaciones full-stack confiables y enfrentar retos que me ayuden a crecer.",
      emailCta: "Escribeme",
      resumeCta: "Curriculum",
    },
    about: {
      images: [
        { src: "/aboutMe1.jpeg", alt: "Katia en la naturaleza" },
        { src: "/aboutMe2.jpeg", alt: "Katia caminando al aire libre" },
        { src: "/aboutMe3.jpeg", alt: "Retrato de Katia" },
      ],
      title: "Soy una Desarrolladora de Software Independiente",
      paragraphs: [
        "Disfruto colaborar en proyectos que resuelven problemas reales y crean experiencias con impacto. Mi trabajo full-stack incluye sistemas backend confiables e interfaces pulidas y faciles de usar. Siempre busco crecer y aprender nuevas tecnologias.",
        "Fuera del codigo, disfruto pasar tiempo con familia y amigos, dibujar y aprender idiomas. El espanol es mi primer idioma, aprendi ingles a los 13 anos y actualmente estudio japones por mi cuenta. Tambien me encanta el diseno de juegos porque combina arte y desarrollo de software.",
      ],
    },
    services: {
      skillStackTitle: "Mi Stack de Habilidades",
      servicesTitle: "Mis Servicios",
      services: [
        {
          priority: "01",
          title: "Desarrollo Web Full-Stack",
          description:
            "Construyo aplicaciones web responsivas con Next.js, React, TypeScript, Node.js y MySQL/Supabase.",
        },
        {
          priority: "02",
          title: "Integracion de Funciones con IA",
          description:
            "Integro flujos con IA (chatbots, procesamiento de documentos, busqueda semantica) usando APIs de OpenAI y otros LLMs.",
        },
        {
          priority: "03",
          title: "Desarrollo de APIs Backend",
          description:
            "Diseno y desarrollo APIs con Node.js y Express, incluyendo autenticacion, validacion y control de acceso por roles.",
        },
        {
          priority: "04",
          title: "Prototipado UI y Pulido Frontend",
          description:
            "Creo prototipos rapidos e interfaces pulidas, accesibles y adaptadas a mobile, listas para usuarios reales.",
        },
      ],
    },
    projects: {
      sectionTitle: "Proyectos en los que he trabajado",
      hoverHint: "Pasa el cursor para ver mas detalles",
      technologiesLabel: "Tecnologias",
      prevLabel: "Anterior",
      nextLabel: "Siguiente",
      videoFallback: "Tu navegador no soporta la etiqueta de video.",
      obserraSlideAlt: "Diapositiva de Obserra",
      otherSectionTitle: "Otros proyectos en los que he trabajado",
      otherSectionDescription:
        "Todavia no tienen demo en vivo, pero reflejan mis habilidades tecnicas y experiencia practica.",
      otherProjectDotAria: "Ir a",
      projects: [
        {
          title: "Obserra",
          stack: "Plataforma de Gestion de Auditorias",
          summary:
            'Plataforma de flujo de auditorias impulsada por IA con cuatro roles: Coordinador, Contribuidor, Auditor y Admin. Los coordinadores registran auditorias, cargan archivos, asignan controles y tareas, completan tareas cuando es necesario y aprueban el trabajo de contribucion. Los contribuidores completan tareas asignadas y mejoran entregables segun feedback. Los auditores monitorean avances y equipos por auditoria. Los admins gestionan cuentas y aprueban etiquetas durante el intake. La integracion con OpenAI detecta automaticamente controles y tareas en hojas de calculo con palabras de intencion como "provide" y "submit", haciendo el sistema resistente a formatos variados.',
          technologies: [
            "Next.js",
            "TypeScript",
            "Supabase",
            "Tailwind CSS",
            "OpenAI API",
            "Acceso por Roles",
            "Workflow UI",
          ],
          slideshow: obserraSlides,
        },
        {
          title: "Buckle Chatbot",
          stack: "Interfaz Conversacional",
          summary:
            'Asistente conversacional de compras impulsado por datos de inventario de Buckle y metadatos enriquecidos. Para mejorar recomendaciones, usamos la API de Anthropic para procesar mas de 50,000 imagenes y generar etiquetas en cuatro categorias: ocasion de uso, color, descriptores y estetica. El pipeline genero 10 etiquetas por categoria (40 por producto) y luego las embebio para un flujo RAG que retorna los 20 productos mas cercanos por consulta. Esto permitio busqueda semantica en lugar de busqueda estricta por palabras clave, por ejemplo con prompts como "Can you give me floral wear for a night out?" y aun asi obtener resultados relevantes.',
          technologies: [
            "Python",
            "JavaScript",
            "Anthropic API",
            "LLMs",
            "Embeddings",
            "RAG Pipeline",
            "Busqueda Semantica",
          ],
          video: "/videos/chatbot-Buckle.mp4",
        },
        {
          title: "Ripple Effects",
          stack: "Juego de Simulacion Educativa",
          summary:
            "Ripple Effects es un juego de simulacion inmersivo ubicado en el pueblo de fantasia Aquaville, donde se aprende gestion de agua mediante decisiones de politica y recursos. Disene e implemente dos minijuegos: Ranch, donde vacas se acercan a tres bebederos a distintas velocidades segun su estado, afectando consumo y obligando al jugador a definir un presupuesto de agua y metas por dificultad; y Field Watering, donde el jugador coloca sensores y aplica agua solo en zonas con baja humedad y menor calidad de cultivo. Tambien disene parte de los recursos visuales del juego.",
          technologies: [
            "Unity",
            "C#",
            "Diseno de Juegos",
            "Sistemas de Simulacion",
            "UI/UX Design",
            "Diseno de Assets",
          ],
          video: "/videos/Ripple-Effects.mp4",
        },
      ],
      otherProjects: [
        {
          title: "Personal Diary - Aplicacion Full-Stack de Journaling",
          summary:
            "Aplicacion full-stack de journaling centrada en privacidad para crear, editar y rastrear reflexiones diarias en una interfaz tipo calendario. Usuarios gestionan entradas con CRUD completo, registran habitos como estado de animo, clima y comida, y se autentican de forma segura con Firebase Authentication. Contribui en backend y frontend, disene el esquema MySQL (usuarios y entradas con llaves foraneas), implemente APIs CRUD y flujos UI, y apoye pruebas y documentacion.",
          skills: [
            "React",
            "Express.js",
            "TypeScript",
            "MySQL",
            "Firebase Authentication",
            "Tailwind CSS",
            "CRUD APIs",
            "JSON Data Modeling",
            "Diseno de Esquema de Base de Datos",
            "Pruebas y Documentacion",
          ],
          slideshow: diarySlides,
        },
        {
          title: "AuditAI: Escaner de Vulnerabilidades con IA",
          summary:
            "Herramienta full-stack de seguridad con IA que analiza codigo open-source para detectar vulnerabilidades y ayudar a evaluar que tan confiables son los hallazgos. El sistema usa multiples modelos (OpenAI, Claude y CodeBERT), y devuelve severidad, puntajes de confianza, lineas destacadas y sugerencias de correccion. Soporta importacion/exportacion para flujos de analisis, valida salidas con esquemas Zod y utiliza pruebas basadas en fixtures para escenarios como XSS, inyeccion con eval y redirecciones vulnerables.",
          skills: [
            "Next.js",
            "React",
            "TypeScript",
            "Next.js APIs",
            "OpenAI API",
            "Claude API",
            "CodeBERT",
            "Zod Validation",
            "Prompt Engineering",
            "Metricas de Evaluacion de Modelos",
          ],
          video: "/videos/Full-AuditAI demo.mp4",
          slideshow: auditAiSlides,
        },
        {
          title: "Contribucion Open Source en Zulip - Moderacion y Engagement",
          summary:
            "Contribui en la plataforma open-source de chat Zulip desarrollando funciones para mejorar organizacion de temas, moderacion y participacion de usuarios. Implemente un sistema de votos para destacar conversaciones importantes y una funcion de bloqueo de temas (solo lectura) para admins y moderadores. Trabaje en backend Django, frontend JavaScript y templates UI, incluyendo modelos, handlers de eventos y controles de autorizacion. Tambien apoye pruebas y documentacion tecnica.",
          skills: [
            "Python (Django)",
            "JavaScript",
            "Arquitectura MVC",
            "Colaboracion Open Source",
            "Testing and Debugging",
            "Documentacion Tecnica",
            "Proceso Scrum",
          ],
        },
      ],
    },
    contact: {
      title: "Trabajemos juntos",
      namePlaceholder: "NOMBRE",
      emailPlaceholder: "TU CORREO",
      inquiryPlaceholder: "CONSULTAS",
      messagePlaceholder: "TU MENSAJE",
      inquiryTypes: [
        "Desarrollo de Aplicaciones Web",
        "Landing Page",
        "Rediseno UI/UX",
        "API y Backend",
        "Mantenimiento y Soporte",
        "Desarrollo Fullstack",
        "Otro",
      ],
      sendMessageLabel: "Enviar Mensaje",
      sendingMessageLabel: "Enviando...",
      successMessage: "Gracias. Tu consulta fue enviada correctamente.",
      errorMessage: "No se pudo enviar tu consulta ahora. Intenta de nuevo.",
      getInTouchLabel: "Hablemos",
      mailtoSubject: "Consulta del Portafolio",
      contactMethods: [
        {
          label: "Correo",
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
      ],
    },
  },
};

export function getTranslation(locale: Locale): PortfolioTranslation {
  return translations[locale];
}
