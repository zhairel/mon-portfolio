import { SkillCategory } from '../types/portfolio';

export const skillCategoriesData: SkillCategory[] = [
  {
    id: "backend",
    name: "Backend Engineering",
    description: "Production Laravel systems, robust RESTful APIs, database transactions, server logic, and enterprise integrations.",
    icon: "server",
    skills: [
      { name: "Laravel", highlight: true, context: "Primary production framework for institutional platforms (AFPS, AES, Portals)" },
      { name: "PHP", highlight: true, context: "Core language for enterprise systems, MVC architecture & security" },
      { name: "RESTful API Development", highlight: true, context: "Stateful/stateless endpoints, authentication, and integration contracts" },
      { name: "API Integration", highlight: true, context: "Third-party APIs, webhooks, payment flows, and directory sync" },
      { name: "Node.js", highlight: false, context: "Event-driven runtime, scripts, and microservice backends" },
      { name: "Express.js", highlight: false, context: "Lightweight web services and REST endpoints" }
    ]
  },
  {
    id: "frontend",
    name: "Frontend Development",
    description: "Responsive, accessible user interfaces built with modern component frameworks, Tailwind CSS, and standard web technologies.",
    icon: "code",
    skills: [
      { name: "HTML", highlight: true, context: "Semantic, accessible document structure & web standards" },
      { name: "CSS", highlight: true, context: "Modern layouts, Flexbox, CSS Grid & custom styling systems" },
      { name: "JavaScript", highlight: true, context: "Modern ES6+ scripting, asynchronous DOM manipulation & APIs" },
      { name: "TypeScript", highlight: true, context: "Type-safe architectures, interfaces, and maintainable frontend logic" },
      { name: "Tailwind CSS", highlight: true, context: "Utility-first modern design systems & responsive interfaces" },
      { name: "Bootstrap", highlight: true, context: "Rapid responsive layouts for institutional dashboards & portals" },
      { name: "React", highlight: true, context: "Component-driven single page applications & modern UI workflows" },
      { name: "Vue.js", highlight: false, context: "Progressive web interfaces and reactive data dashboards" },
      { name: "Angular", highlight: false, context: "Structured enterprise frontend architectures & CRUD systems" },
      { name: "GSAP", highlight: true, context: "High-performance interactive animations & scroll-triggered storytelling" }
    ]
  },
  {
    id: "mobile-databases",
    name: "Mobile & Databases",
    description: "Cross-platform mobile applications, relational schemas, ACID compliance, query optimization, and NoSQL databases.",
    icon: "database",
    skills: [
      { name: "MySQL", highlight: true, context: "Core relational engine for mission-critical institutional databases" },
      { name: "MariaDB", highlight: true, context: "High-performance production transactional storage" },
      { name: "Database Design", highlight: true, context: "Relational modeling (3NF), indexing, foreign keys & ACID atomicity" },
      { name: "Flutter (Dart)", highlight: true, context: "Cross-platform mobile applications with state management & Firebase" },
      { name: "React Native", highlight: false, context: "Cross-platform JavaScript mobile application development" },
      { name: "PostgreSQL", highlight: false, context: "Advanced relational database management & complex indexing" },
      { name: "MongoDB", highlight: false, context: "NoSQL document storage & schema flexibility" },
      { name: "Firebase", highlight: true, context: "Realtime database, Cloud Firestore, authentication & cloud sync" }
    ]
  },
  {
    id: "integrations-ai",
    name: "Integrations & AI",
    description: "Enterprise cloud directory integrations, Microsoft 365, Single Sign-On, and modern AI-assisted engineering.",
    icon: "sparkles",
    skills: [
      { name: "Microsoft 365", highlight: true, context: "Institutional account administration, mail & productivity services" },
      { name: "Microsoft Entra ID", highlight: true, context: "Cloud identity, directory management, and user security" },
      { name: "Microsoft Graph API", highlight: true, context: "Automated student account provisioning & directory sync" },
      { name: "OAuth / SSO", highlight: true, context: "Single Sign-On protocols and secure token authentication" },
      { name: "Google Authentication", highlight: false, context: "OAuth2 identity verification and Google sign-in workflows" },
      { name: "SMTP", highlight: true, context: "Automated email notifications, transactional alerts & slips" },
      { name: "AI Integration", highlight: true, context: "Integrating intelligent services and machine learning APIs into platforms" },
      { name: "AI-Assisted Development", highlight: true, context: "Accelerated scaffolding, refactoring, testing & code optimization" },
      { name: "Prompt Engineering", highlight: true, context: "Structured prompt design, zero-shot and few-shot formatting" },
      { name: "OpenAI API", highlight: true, context: "LLM API integration for document assistance & text generation" },
      { name: "AI Chatbot Development", highlight: true, context: "Conversational assistants for admissions & operational inquiries" }
    ]
  },
  {
    id: "tools-deployment",
    name: "Tools & Deployment",
    description: "Version control, hosting management, web servers, CDNs, local development environments, and UI/UX design tools.",
    icon: "layers",
    skills: [
      { name: "Git", highlight: true, context: "Version control, branching strategies, and collaborative codebases" },
      { name: "GitHub", highlight: true, context: "Repository hosting, code reviews, and project management" },
      { name: "cPanel", highlight: true, context: "Domain routing, DNS records, email setup & production server control" },
      { name: "Apache", highlight: true, context: "Web server configuration, virtual hosts, rewrite rules & SSL" },
      { name: "Cloudflare", highlight: true, context: "DNS management, SSL/TLS termination, caching & DDoS mitigation" },
      { name: "Linux", highlight: true, context: "Ubuntu / Debian server administration, SSH, cron jobs & permissions" },
      { name: "Windows", highlight: false, context: "Local environment setup, administration & enterprise tooling" },
      { name: "XAMPP", highlight: false, context: "Local PHP/MySQL development environment" },
      { name: "Laragon", highlight: true, context: "High-speed local development environment for Laravel & PHP" },
      { name: "Figma", highlight: true, context: "UI/UX wireframing, component design & interactive prototyping" },
      { name: "Canva", highlight: false, context: "Graphic design, visual assets, and marketing collateral" },
      { name: "UI/UX Design", highlight: true, context: "User-centered interface design, information architecture & usability" }
    ]
  },
  {
    id: "it-support",
    name: "IT Operations & Support",
    description: "Hands-on hardware troubleshooting, networking, system configuration, performance optimization, and institutional data security.",
    icon: "shield",
    skills: [
      { name: "Hardware/Software Troubleshooting", highlight: true, context: "Diagnostics and rapid resolution for workstations, servers & peripherals" },
      { name: "Basic Networking", highlight: true, context: "LAN setup, router/switch configuration, Wi-Fi access points & IP routing" },
      { name: "Computer Maintenance", highlight: true, context: "Preventive maintenance, hardware upgrades, diagnostics & lab setups" },
      { name: "System Setup & OS Installation", highlight: true, context: "Deploying Linux and Windows operating systems across facilities" },
      { name: "Debugging", highlight: true, context: "Systematic root-cause diagnosis across codebases, databases & servers" },
      { name: "Performance Optimization", highlight: true, context: "Database query tuning, caching, indexing, and asset minification" },
      { name: "Database Backup", highlight: true, context: "Automated SQL dumps, replication, and disaster recovery strategies" },
      { name: "System Security", highlight: true, context: "RBAC security policies, audit logging, input sanitization & data protection" }
    ]
  }
];
