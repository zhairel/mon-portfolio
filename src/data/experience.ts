import { ExperienceItem } from '../types/portfolio';

export const experienceData: ExperienceItem[] = [
  {
    id: "software-engineer-amis",
    role: "Software Engineer",
    company: "Al Munawwara Islamic School (AMIS)",
    location: "Davao City, Philippines",
    period: "Aug 2026 – Present",
    isCurrent: true,
    category: "software-engineering",
    summary: "Leading software engineering, backend/database architecture, API integrations, security, and production deployments across core school management platforms.",
    responsibilities: [
      "Engineer and maintain production Laravel systems across enrollment, family payments, student/parent services, administration, and digital identity.",
      "Designed and developed the AMIS Family Payment System (AFPS), including multi-child billing, SOA and receipt workflows, payment allocation, finance verification, and role-based access.",
      "Drive backend and database architecture, API/integration design, production deployments, debugging, performance optimization, backups, and system security.",
      "Continue modernization of AMIS platforms with Microsoft 365, Microsoft Entra ID, Microsoft Graph API, OAuth/SSO, email, and verification workflows."
    ],
    technologies: [
      "Laravel",
      "PHP",
      "JavaScript",
      "MySQL",
      "MariaDB",
      "Microsoft Graph API",
      "Microsoft Entra ID",
      "OAuth / SSO",
      "RESTful APIs",
      "Linux Server",
      "cPanel",
      "Cloudflare"
    ],
    impactNotes: [
      "Architected the flagship AMIS Family Payment System (AFPS) consolidating multi-sibling accounts into unified financial ledgers.",
      "Unified campus auth and directory workflows with Microsoft 365 & Microsoft Graph API integration.",
      "Maintained 99.9% uptime for mission-critical institutional portals during peak seasonal enrollment and payment windows."
    ]
  },
  {
    id: "it-staff-laravel-amis",
    role: "IT Staff / Full-Stack Laravel Developer",
    company: "Al Munawwara Islamic School (AMIS)",
    location: "Davao City, Philippines",
    period: "May 2026 – Aug 2026",
    isCurrent: false,
    category: "software-engineering",
    promotedToNext: "Promoted to Software Engineer — Aug 2026",
    promotionBadge: "Promoted to Software Engineer — Aug 2026",
    summary: "Delivered responsive, database-driven web platforms and provided comprehensive IT infrastructure and technical operations support across all school departments.",
    responsibilities: [
      "Developed and maintained the AMIS Online Enrollment System (AES), Student Portal, Teacher Portal, Learning Management System (LMS), Admin Dashboard, and Digital ID Verification Portal.",
      "Built responsive, database-driven features using Laravel, PHP, JavaScript, MySQL/MariaDB, Bootstrap, and Tailwind CSS; performed bug fixes, testing, and data maintenance.",
      "Provided day-to-day IT support for school operations, including hardware/software troubleshooting, system setup, and basic network support."
    ],
    technologies: [
      "Laravel",
      "PHP",
      "JavaScript",
      "MySQL",
      "MariaDB",
      "Bootstrap",
      "Tailwind CSS",
      "Hardware Diagnostics",
      "Network Infrastructure"
    ],
    impactNotes: [
      "Digitized manual registrar paperwork into the online enrollment portal processing hundreds of applications seamlessly.",
      "Recognized for exceptional engineering and operational excellence, resulting in promotion to Software Engineer."
    ]
  },
  {
    id: "web-dev-sir-prince",
    role: "Web Developer / IT Support",
    company: "Sir Prince Global Manpower Services Inc.",
    location: "Pasay City, Philippines",
    period: "Jan 2026 – Apr 2026",
    isCurrent: false,
    category: "web-mobile",
    summary: "Engineered and maintained corporate web applications using modern JavaScript frontend frameworks and Node.js while handling hardware and network infrastructure.",
    responsibilities: [
      "Developed and maintained the corporate website using React, Vue, HTML, CSS, JavaScript, and Node.js.",
      "Created responsive interfaces, improved website performance, and provided hardware/software/network technical support.",
      "Collaborated with corporate stakeholders to ensure fast load times, accessibility, and high operational reliability."
    ],
    technologies: [
      "React",
      "Vue.js",
      "Node.js",
      "JavaScript",
      "HTML5",
      "CSS3",
      "Network Troubleshooting",
      "System Support"
    ],
    impactNotes: [
      "Modernized corporate website UI components and improved site speed and responsiveness.",
      "Maintained reliable IT support ensuring zero operational disruption for recruitment staff."
    ]
  },
  {
    id: "web-dev-first-personnel",
    role: "Web Developer / IT Support",
    company: "First Personnel Services Inc.",
    location: "Pasay City, Philippines",
    period: "Jan 2026 – Apr 2026",
    isCurrent: false,
    category: "web-mobile",
    summary: "Developed internal employee management CRUD systems, database-driven features, and resolved application and hardware issues.",
    responsibilities: [
      "Developed employee management CRUD systems and database-driven features for internal web applications.",
      "Coordinated system improvements with staff and resolved application, hardware, and software issues.",
      "Ensured data consistency, reliable record lookups, and secure employee database operations."
    ],
    technologies: [
      "JavaScript",
      "PHP",
      "MySQL",
      "HTML5",
      "CSS3",
      "CRUD Architecture",
      "IT Support"
    ],
    impactNotes: [
      "Streamlined employee record updates and administrative lookups through custom CRUD tools.",
      "Resolved hardware and network bottlenecks for office personnel."
    ]
  },
  {
    id: "web-dev-hrselect",
    role: "Web Developer / IT Support",
    company: "HRSelect Inc.",
    location: "Pasay City, Philippines",
    period: "Jan 2026 – Apr 2026",
    isCurrent: false,
    category: "web-mobile",
    summary: "Developed and maintained corporate web platforms and internal employee database systems with performance improvements and daily technical support.",
    responsibilities: [
      "Developed and maintained the corporate website and internal employee database systems.",
      "Implemented features, testing, debugging, performance improvements, and day-to-day IT support.",
      "Optimized database queries and user interaction flows for enhanced staff productivity."
    ],
    technologies: [
      "JavaScript",
      "Node.js",
      "MySQL",
      "HTML/CSS",
      "Performance Optimization",
      "Database Systems"
    ],
    impactNotes: [
      "Enhanced database query speeds and user interface responsiveness for human resource managers.",
      "Ensured proactive maintenance of workstations and office network connectivity."
    ]
  },
  {
    id: "freelance-gocode",
    role: "Freelance Web & Mobile Developer",
    company: "goCode",
    location: "Remote / Project-Based",
    period: "Sep 2025 – Nov 2025",
    isCurrent: false,
    category: "web-mobile",
    summary: "Assisted in building a cross-platform Flutter quiz mobile application integrated with Google Firebase realtime services.",
    responsibilities: [
      "Assisted in developing a Flutter-based quiz application integrated with Firebase.",
      "Implemented authentication, scoring, leaderboards, question management, database integration, testing, and debugging.",
      "Optimized client-side state management for smooth 60fps quiz interactions and instant leaderboard updates."
    ],
    technologies: [
      "Flutter",
      "Dart",
      "Firebase Auth",
      "Cloud Firestore",
      "Realtime Database",
      "Mobile UI/UX",
      "State Management"
    ],
    impactNotes: [
      "Delivered real-time multiplayer scoring and leaderboard synchronization using Firebase backend.",
      "Built clean, modular Dart code components with high test coverage and cross-platform fidelity."
    ]
  },
  {
    id: "it-intern-davao-capitol",
    role: "IT Intern (On-the-Job Training)",
    company: "Davao del Norte Provincial Capitol",
    location: "Tagum, Davao del Norte",
    period: "Jul 2023 – Aug 2023",
    isCurrent: false,
    category: "it-support",
    summary: "Developed a CRUD-based Staff Information System using Angular & RESTful APIs, while conducting government office IT maintenance and support.",
    responsibilities: [
      "Developed a CRUD-based Staff Information System using Angular, TypeScript, Bootstrap, and RESTful APIs.",
      "Integrated frontend components with backend APIs and performed computer maintenance, software installation, system setup, and technical support.",
      "Assisted government IT personnel in network configuration, hardware diagnostics, and staff workstation rollouts."
    ],
    technologies: [
      "Angular",
      "TypeScript",
      "Bootstrap",
      "RESTful APIs",
      "Computer Maintenance",
      "OS Installation",
      "Technical Support"
    ],
    impactNotes: [
      "Engineered an efficient Staff Information System interface reducing administrative record lookup times.",
      "Maintained and serviced dozens of provincial government workstations with zero data loss."
    ]
  }
];
