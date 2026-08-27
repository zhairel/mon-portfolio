import { ProjectItem } from '../types/portfolio';

export const projectsData: ProjectItem[] = [
  {
    id: "amis-family-payment-system",
    title: "AMIS Family Payment System (AFPS)",
    shortTitle: "AFPS Billing",
    tagline: "Family-centered multi-sibling tuition billing, automated SOA, and finance verification platform",
    category: "Financial Systems",
    categoryGroup: "Financial Systems",
    role: "Software Engineer / Lead Full-Stack Developer",
    featured: true,
    demoUrl: undefined,
    githubUrl: undefined,
    isPrivateRepo: true,
    mockupPlaceholder: {
      accentColor: "#10B981",
      badgeText: "Core Financial Platform",
      previewCode: `// AFPS Family Payment Allocation Engine
class PaymentAllocationService {
  public function allocateFamilyPayment(FamilyAccount $family, float $amount, PaymentProof $proof): OfficialReceipt {
    return DB::transaction(function () use ($family, $amount, $proof) {
      $unpaidBalances = $family->students()->with('unpaidInvoices')->get();
      $receipt = $this->distributeAcrossTuitionAndFees($unpaidBalances, $amount);
      $this->ledger->recordCreditBalanceIfOverpaid($family, $receipt->surplus);
      AuditLog::record('PAYMENT_ALLOCATED', $family->id);
      return $receipt;
    });
  }
}`,
      summaryHeadline: "Unified Multi-Child Accounts & Finance Verification Ledger"
    },
    overview: "The AMIS Family Payment System (AFPS) is a specialized school billing and payment management platform designed and developed to solve complex multi-sibling household tuition structures, monthly balance tracking, partial/overpayment allocations, and finance approvals.",
    problem: "Parents with multiple enrolled children previously had to make separate payments, track distinct invoice numbers, and queue at the cashier multiple times. The accounting department faced difficulties reconciling mixed bank deposits, tracking discounts, managing previous school year balances, and calculating credit surpluses.",
    solution: "Designed and engineered an integrated financial web platform featuring unified household accounts, automated Statement of Account (SOA) generation, multi-child payment allocation algorithms (handling tuition, monthly fees, prior balances, and surplus credits), digital payment proof upload, cashier verification workflows, and instant official receipt generation.",
    majorFeatures: [
      "Multi-child billing consolidated under unified guardian accounts",
      "Automated Statement of Account (SOA) tracking & instant PDF exports",
      "Intelligent partial and overpayment allocation waterfall logic",
      "Proof-of-payment review & multi-stage finance approval queue",
      "Digital Official Receipt (OR) and family payment receipt generation",
      "Role-based access control for cashiers, finance officers, and auditors",
      "Immutable transaction ledger with full audit trails and timestamping",
      "Daily cashier drawer balancing & end-of-day reconciliation reports",
      "Parent self-service portal with realtime balance and payment history"
    ],
    technologies: [
      "Laravel",
      "PHP",
      "JavaScript",
      "MySQL",
      "MariaDB",
      "Finance & Payment Workflows",
      "RESTful APIs",
      "Tailwind CSS",
      "DomPDF",
      "Linux Server"
    ],
    systemImpact: "Revolutionized institutional finance operations by cutting parent cashier transaction times by 75%, eliminating manual spreadsheet reconciliation errors, and providing complete financial transparency.",
    caseStudy: {
      projectOverview: "The AMIS Family Payment System (AFPS) was architected to modernize the complete tuition billing and collection lifecycle for Al Munawwara Islamic School, managing millions in tuition receivables across diverse grade levels.",
      theProblem: [
        "Parents with multiple siblings received fragmented billing notices and made lump-sum payments that were difficult to divide accurately.",
        "Managing previous academic year balances alongside current monthly installment fees produced recurring billing discrepancies.",
        "Manual cashier slip issuance and offline receipt filing caused slow turnaround times during peak examination payment windows.",
        "Finance officers lacked real-time visibility into overall collection efficiency and aging accounts."
      ],
      requirements: [
        "A hierarchical schema linking parent accounts to multiple student profiles with aggregate and individual ledgers.",
        "Deterministic payment allocation logic clearing overdue arrears first, then monthly tuition, then miscellaneous fees.",
        "Secure parent upload portal for digital bank transfer slips, GCash/e-wallet receipts, and transaction references.",
        "Finance verification queue with one-click approvals, rejection with explanatory notes, and receipt dispatch.",
        "Automated generation of printable official receipts and Statements of Account.",
        "Strict immutability of transaction history to satisfy external financial audits."
      ],
      myRole: "Served as Software Engineer / Full-Stack Developer: authored database schema, coded payment distribution algorithms, developed finance review interfaces, built PDF generation templates, and deployed the production system on Linux/cPanel.",
      solution: "Engineered a robust Laravel financial service architecture enforcing ACID transactional atomicity. Modeled double-entry ledger structures preventing destructive updates and requiring formal adjustment entries.",
      systemArchitecture: {
        summary: "Double-entry inspired financial architecture with deterministic allocation rules, transactional atomicity, and role-gated finance verification queues.",
        tiers: {
          frontend: ["Cashier desk interface with quick keyboard shortcuts & barcode lookup", "Parent payment portal with live balance widgets", "Print-ready responsive SOA and Receipt viewers"],
          backend: ["Laravel PHP Application Core with PaymentAllocationService", "DomPDF receipt generation service with school branding & security stamps", "Event & listener pipeline updating student clearance flags upon receipt creation"],
          database: ["MySQL / MariaDB with Decimal monetary precision and strict Foreign Key constraints", "Immutable LedgerEntries, Invoices, Payments, Receipts, and FamilyCredit tables", "Indexed family lookup and invoice status columns"],
          infrastructure: ["Linux / Apache environment with automated daily offsite SQL database backups", "Secure storage for bank slip attachments with tokenized access"],
          security: ["Granular RBAC for Cashier, Finance Head, and Auditor roles", "CSRF and tampering protection on all balance adjustments", "Complete historical audit logs with user IDs and IP addresses"]
        }
      },
      majorFeatures: [
        {
          title: "Consolidated Family Billing",
          description: "Allows parents to view the total family tuition obligation at a glance, with itemized drill-downs per child.",
          bullets: ["One-click household Statement of Account (SOA)", "Individual sibling ledger breakdowns", "Clear fee categorization"]
        },
        {
          title: "Smart Payment Distribution Algorithm",
          description: "Systematically applies lump-sum payments across multiple children according to institutional priority policies.",
          bullets: ["Clears oldest prior balances first", "Allocates across tuition installments evenly or by user preference", "Automatically carries forward surplus as credit balances"]
        },
        {
          title: "Finance Verification & Clearance Desk",
          description: "Streamlined dashboard for cashiers to verify bank slips, match transaction reference numbers, and approve with digital OR creation.",
          bullets: ["Side-by-side slip and account comparison", "Instant digital OR issuance", "Automated student financial clearance"]
        }
      ],
      technologiesUsed: [
        {
          category: "Backend Framework",
          items: ["Laravel", "PHP 8.x", "Service Layer Pattern", "Transaction Atomicity"]
        },
        {
          category: "Database & Logic",
          items: ["MySQL", "MariaDB", "Relational Integrity", "Fixed-Point Decimal Math"]
        },
        {
          category: "Frontend UI",
          items: ["JavaScript", "Tailwind CSS", "Bootstrap", "Interactive Dashboards"]
        },
        {
          category: "Integrations & Tools",
          items: ["DomPDF Receipt Engine", "REST APIs", "Linux Server", "Git Version Control"]
        }
      ],
      challenges: [
        "Preventing rounding errors and race conditions when multiple cashiers processed payments for the same household.",
        "Handling complex discount schedules (sibling discounts, scholarships, early bird incentives) alongside partial deposits."
      ],
      solutionsImplemented: [
        "Implemented database pessimistic row locking during payment execution and standardized all monetary math to integer cents.",
        "Designed a flexible discount rules engine that applies percentages dynamically before computing net payable installments."
      ],
      securityConsiderations: [
        "Strict authorization policies ensuring cashiers cannot delete or alter completed payment records without supervisory override.",
        "Signed temporary URLs for parent bank slip images stored outside public web roots.",
        "Comprehensive audit logging for every payment approval, reversal, and fee adjustment."
      ],
      screenshots: [
        {
          title: "Cashier Payment Dashboard",
          caption: "Finance management interface showing verified transactions, pending approvals, and family ledgers.",
          src: "/assets/projects/amis-online-enrollment.png",
          type: "desktop"
        },
        {
          title: "Statement of Account (SOA)",
          caption: "Generated printable family SOA detailing sibling balances and payment histories.",
          src: "/assets/projects/amis-school-website.png",
          type: "desktop"
        }
      ],
      resultsImpact: [
        "Reduced parent waiting times at school cashier stations by over 75%.",
        "Achieved 100% financial audit accuracy with zero ledger balance discrepancies across thousands of transactions.",
        "Gave executive leadership realtime insight into tuition collections and outstanding receivables."
      ],
      futureImprovements: [
        "Direct integration with online payment gateways (GCash, Maya, QR Ph, and bank APIs).",
        "Automated SMS alerts dispatched to parents when payment proofs are approved or due dates approach."
      ]
    }
  },
  {
    id: "amis-online-enrollment-system",
    title: "AMIS Online Enrollment System (AES)",
    shortTitle: "AES Enrollment",
    tagline: "End-to-end digital admissions platform with document uploads, validation, duplicate checks, and Microsoft 365 integration",
    category: "School Platforms",
    categoryGroup: "School Platforms",
    role: "Full-Stack Laravel Developer / Software Engineer",
    featured: true,
    demoUrl: "https://aes.amis.edu.ph/",
    githubUrl: undefined,
    isPrivateRepo: true,
    mockupImage: "/assets/projects/amis-aes-wizard.png",
    mockupPlaceholder: {
      accentColor: "#00E5FF",
      badgeText: "Flagship Admissions Platform",
      previewCode: `// AES Enrollment Pipeline Handler
class EnrollmentApplicationController extends Controller {
  public function submit(EnrollmentRequest $request): JsonResponse {
    DB::beginTransaction();
    $student = Student::findOrCreateUnique($request->validated());
    $application = $this->pipeline->processDocuments($student, $request->documents);
    AuditLog::record('ENROLLMENT_SUBMITTED', $student->id);
    DB::commit();
    return response()->json(['status' => 'PENDING_APPROVAL', 'id' => $application->tracking_code]);
  }
}`,
      summaryHeadline: "End-to-End Online Admissions & Document Verification Workflow"
    },
    overview: "The AMIS Online Enrollment System (AES) is an end-to-end institutional admissions platform featuring online student applications, document uploads, validation and duplicate checks, approval workflows, role-based administration, and Microsoft 365-linked services.",
    problem: "Previous admissions relied heavily on paper forms and physical queues, resulting in lost documents, slow registrar verification, duplicated student profiles, and a lack of real-time status visibility for parents.",
    solution: "Developed a full-stack Laravel platform featuring a responsive multi-step online application wizard, client-side document validation, automated duplicate detection algorithms, multi-stage registrar approvals, and Microsoft 365 student account provisioning via Microsoft Graph API.",
    majorFeatures: [
      "Online student enrollment with multi-step progressive form wizard",
      "Digital document uploading for birth certificates, report cards, and credentials",
      "Heuristic duplicate student detection algorithms (LRN, full name, birthdate)",
      "Multi-stage approval pipeline across Registrar, Academic Placement, and Finance",
      "Microsoft 365 and Microsoft Graph API account provisioning integration",
      "Real-time application tracking with unique student reference codes",
      "Automated Certificate of Registration (COR) and PDF slip generation",
      "Role-based administrative dashboards with live applicant analytics"
    ],
    technologies: [
      "Laravel",
      "PHP",
      "JavaScript",
      "MySQL",
      "MariaDB",
      "Bootstrap",
      "Tailwind CSS",
      "Microsoft Graph API",
      "Microsoft 365",
      "RESTful APIs",
      "Linux / cPanel"
    ],
    systemImpact: "Digitized 100% of incoming school applications, reduced enrollment processing time by 85%, and eliminated duplicate master student records.",
    caseStudy: {
      projectOverview: "The AMIS Online Enrollment System (AES) serves as the primary digital gateway for all incoming new students, transferees, and returning learners at Al Munawwara Islamic School.",
      theProblem: [
        "Overwhelming physical queues at the school campus during annual admission weeks.",
        "Manual data entry led to frequent typographical errors and duplicate records in the master database.",
        "Parents had no mechanism to track application status without visiting the school.",
        "Registrar staff struggled to track missing document requirements across hundreds of applicants."
      ],
      requirements: [
        "A responsive mobile-friendly portal allowing parents to apply from home on any smartphone or computer.",
        "Strict input validation adhering to Philippine Department of Education learner standards.",
        "Secure document upload mechanism with thumbnail preview and format validation.",
        "Automated duplicate checks preventing duplicate student profile creation.",
        "Direct synchronization with Microsoft 365 student email accounts."
      ],
      myRole: "Served as Full-Stack Laravel Developer: designed database architecture, built multi-step application frontend, implemented backend approval queues, integrated Microsoft Graph API, and handled production deployment.",
      solution: "Engineered a scalable Laravel application backed by MySQL/MariaDB with modular services for document processing, duplicate validation, and automated PDF registration generation.",
      systemArchitecture: {
        summary: "Three-tier architecture with responsive frontend forms, service-oriented Laravel backend, and Microsoft Graph API cloud integration.",
        tiers: {
          frontend: ["Mobile-first multi-step form wizard with draft saving", "Client-side image compression and document validation", "Real-time application status tracker"],
          backend: ["Laravel PHP Backend with MVC & Service Layer Architecture", "Microsoft Graph API service provisioning student Microsoft 365 accounts", "Automated PDF generator producing official Certificates of Registration (COR)"],
          database: ["MySQL / MariaDB Relational Database with normalized student schemas", "Indexed LRN, tracking code, and applicant names for sub-millisecond retrieval"],
          infrastructure: ["Linux Web Server with cPanel hosting & Cloudflare SSL protection", "Secure non-public directory storage for uploaded student credentials"],
          security: ["CSRF and XSS protection on all endpoints", "Role-Based Access Control (RBAC) separating verifiers from approvers", "Audit logging on every status transition"]
        }
      },
      majorFeatures: [
        {
          title: "Multi-Step Online Application Wizard",
          description: "Step-by-step guidance for student personal data, educational history, guardian information, and document uploads.",
          bullets: ["Progress preservation", "Instant validation", "Mobile touch optimization"]
        },
        {
          title: "Registrar Document Verification Matrix",
          description: "Administrative workspace to review uploaded birth certificates and credentials with one-click approval or rejection with remarks.",
          bullets: ["In-browser image preview", "Instant status feedback", "Missing document flags"]
        },
        {
          title: "Microsoft 365 & Graph API Integration",
          description: "Automatically provisions school Microsoft 365 email accounts upon official enrollment clearance.",
          bullets: ["Automated user creation", "License assignment", "Credential distribution"]
        }
      ],
      technologiesUsed: [
        {
          category: "Framework & Backend",
          items: ["Laravel", "PHP 8.x", "Microsoft Graph API", "REST APIs"]
        },
        {
          category: "Database & Storage",
          items: ["MySQL", "MariaDB", "Normalized Relational Design", "Encrypted File Storage"]
        },
        {
          category: "Frontend UI",
          items: ["JavaScript (ES6+)", "Bootstrap", "Tailwind CSS", "AJAX Form Submission"]
        },
        {
          category: "Deployment & Cloud",
          items: ["Linux Server", "cPanel", "Cloudflare WAF", "Microsoft 365"]
        }
      ],
      challenges: [
        "Handling high traffic surges during registration deadlines without slowing server response times.",
        "Managing large camera uploads from mobile phones on slow cellular connections."
      ],
      solutionsImplemented: [
        "Optimized query caching and indexed database lookups.",
        "Implemented client-side image downscaling prior to upload submission."
      ],
      securityConsiderations: [
        "Rigorous MIME-type validation preventing malicious file execution.",
        "Protected student personally identifiable information (PII) with strict RBAC guards."
      ],
      screenshots: [
        {
          title: "Online Pre-Enrollment Multi-Step Wizard",
          caption: "Live 8-step online admissions wizard with dynamic grade level selection and shift preferences.",
          src: "/assets/projects/amis-aes-wizard.png",
          type: "desktop"
        },
        {
          title: "Applicant Portal Dashboard",
          caption: "Live dashboard greeting verified applicants with quick start, enrollment FAQs, and support links.",
          src: "/assets/projects/amis-aes-dashboard.png",
          type: "desktop"
        },
        {
          title: "Multi-Provider Sign-In & Authentication Portal",
          caption: "Clean institutional authentication interface supporting Google, Microsoft, Email, and WhatsApp sign-in.",
          src: "/assets/projects/amis-aes-login.png",
          type: "desktop"
        }
      ],
      resultsImpact: [
        "Cut enrollment processing turnaround time from 4 hours to under 15 minutes.",
        "Virtually eliminated duplicate master student records.",
        "Supported thousands of concurrent families smoothly during peak registration periods."
      ],
      futureImprovements: [
        "Automated OCR extraction from uploaded birth certificates.",
        "Direct SMS notifications for instant admission updates."
      ]
    }
  },
  {
    id: "amis-portals-suite",
    title: "AMIS Student, Teacher, LMS & Admin Portals",
    shortTitle: "AMIS Portals Suite",
    tagline: "Role-based school ecosystem for student records, learning workflows, teacher tools, administration, and Microsoft 365 integration",
    category: "School Platforms",
    categoryGroup: "School Platforms",
    role: "Full-Stack Software Engineer",
    featured: true,
    demoUrl: undefined,
    githubUrl: undefined,
    isPrivateRepo: true,
    mockupPlaceholder: {
      accentColor: "#8B5CF6",
      badgeText: "Integrated School Portals",
      previewCode: `// Multi-Role Unified Portal Dispatcher
class PortalGatewayController extends Controller {
  public function dashboard(Request $request): View {
    $user = $request->user();
    return match($user->role) {
      'student' => $this->renderStudentPortal($user),
      'teacher' => $this->renderTeacherLMS($user),
      'admin'   => $this->renderAdminCommandCenter($user),
      default   => abort(403)
    };
  }
}`,
      summaryHeadline: "Unified Role-Based Portals with Microsoft 365 Integration"
    },
    overview: "A comprehensive suite of role-based school portals built and enhanced for Al Munawwara Islamic School, encompassing Student, Teacher, Learning Management System (LMS), and Admin dashboards with Microsoft account integration.",
    problem: "Disconnected systems between faculty grade submissions, student schedule distribution, learning materials, and administrative record management created informational bottlenecks across the campus.",
    solution: "Engineered a centralized, responsive web platform providing role-tailored dashboards: student grade & schedule tracking, teacher grade encoding & attendance management, LMS coursework workflows, and executive administration analytics.",
    majorFeatures: [
      "Role-based portals with customized interfaces for Students, Teachers, and Administrators",
      "Teacher grade encoding, subject management, and attendance logging workflows",
      "LMS module for classroom announcements, learning materials, and assignment tracking",
      "Student academic gradebook, timetable viewer, and financial balance summaries",
      "Microsoft 365 & Microsoft Entra ID Single Sign-On (SSO) integration",
      "Executive administration dashboard with school-wide demographic and academic metrics",
      "Granular permission matrix with secure role-gated API endpoints"
    ],
    technologies: [
      "Laravel",
      "PHP",
      "JavaScript",
      "MySQL",
      "MariaDB",
      "Bootstrap",
      "Microsoft 365",
      "Microsoft Entra ID",
      "RESTful APIs",
      "Tailwind CSS"
    ],
    systemImpact: "Connected teachers, students, and administrators into one unified digital environment, accelerating grade reporting and campus communication.",
    caseStudy: {
      projectOverview: "The AMIS Portals Suite serves as the day-to-day academic and operational command center for the entire Al Munawwara Islamic School community.",
      theProblem: [
        "Teachers used disparate offline spreadsheets to record grades and attendance, leading to delays during quarterly grading periods.",
        "Students and parents had no real-time platform to view official grades, subject schedules, and teacher announcements.",
        "School administrators lacked centralized oversight of faculty submissions and institutional performance."
      ],
      requirements: [
        "Single sign-on using Microsoft 365 institutional accounts.",
        "Responsive, high-speed interface accessible on mobile phones, tablets, and desktops.",
        "Secure gradebook calculation adhering to DepEd grading formulas.",
        "Comprehensive admin audit trails for grade submissions and record edits."
      ],
      myRole: "Software Engineer / Full-Stack Developer: engineered backend APIs, implemented role-based middleware, designed responsive UI templates, and integrated Microsoft SSO.",
      solution: "Created a modular Laravel application leveraging database indexing, clean RESTful endpoints, and responsive Bootstrap/Tailwind layouts.",
      systemArchitecture: {
        summary: "Modular multi-role web architecture with Microsoft Entra OAuth2 authentication and role-based policy gates.",
        tiers: {
          frontend: ["Mobile-first responsive dashboards for Students, Teachers, and Admins", "Interactive grade calculation matrices and attendance sheets", "Dynamic announcement feed"],
          backend: ["Laravel PHP Backend with Policy Guards & Gate Middlewares", "Microsoft 365 OAuth SSO provider", "Background workers for report card generation"],
          database: ["MySQL / MariaDB database with normalized academic schemas (Classes, Enrollments, Grades, Attendance)"],
          infrastructure: ["Production Linux Server with Cloudflare SSL and scheduled backups"],
          security: ["Microsoft Entra ID authentication", "Strict role scoping and anti-tampering guards on grade inputs"]
        }
      },
      majorFeatures: [
        {
          title: "Teacher Gradebook & Attendance",
          description: "Fast spreadsheet-like web interface for teachers to input quarterly grades and track daily attendance.",
          bullets: ["Automated GPA calculation", "Submission lock and approval workflow", "Printable grading sheets"]
        },
        {
          title: "Student Academic Dashboard",
          description: "Provides students and parents with instant access to quarterly report cards, class schedules, and subject teachers.",
          bullets: ["Real-time grade releases", "Timetable calendar", "Teacher directories"]
        },
        {
          title: "Admin Command Center",
          description: "Administrative oversight over all faculty submissions, student rosters, and institutional operations.",
          bullets: ["Submission compliance tracking", "Data exports", "User management"]
        }
      ],
      technologiesUsed: [
        {
          category: "Backend Engine",
          items: ["Laravel", "PHP 8.x", "RESTful Architecture", "Policy Gates"]
        },
        {
          category: "Cloud & Identity",
          items: ["Microsoft 365", "Microsoft Entra ID", "OAuth 2.0 / SSO"]
        },
        {
          category: "Database & Frontend",
          items: ["MySQL", "MariaDB", "JavaScript", "Bootstrap", "Tailwind CSS"]
        }
      ],
      challenges: [
        "Ensuring instant page responsiveness for thousands of simultaneous student visits on grade release days.",
        "Mapping diverse DepEd grading formulas accurately across Kindergarten, Elementary, and Junior High school levels."
      ],
      solutionsImplemented: [
        "Implemented database query optimization, eager loading, and server-side caching.",
        "Built modular grading calculators with configurable weight percentages for written works, performance tasks, and quarterly assessments."
      ],
      securityConsiderations: [
        "Immutable grade history logs recording every score modification with teacher ID and timestamp.",
        "Strict permission gates preventing cross-student data access."
      ],
      screenshots: [
        {
          title: "Teacher Portal Gradebook View",
          caption: "Interactive grading sheet for instructors to encode quarterly scores.",
          src: "/assets/projects/amis-online-enrollment.png",
          type: "desktop"
        },
        {
          title: "Student Portal Overview",
          caption: "Student dashboard displaying academic progress and timetable.",
          src: "/assets/projects/amis-school-website.png",
          type: "desktop"
        }
      ],
      resultsImpact: [
        "Accelerated quarterly grade submission turnaround by 60%.",
        "Empowered thousands of students and parents with transparent academic insights.",
        "Established AMIS as an innovative leader in digital school operations."
      ],
      futureImprovements: [
        "Direct mobile push notifications for real-time exam and grade announcements.",
        "Interactive virtual classroom chat integration."
      ]
    }
  },
  {
    id: "amis-digital-id-portal",
    title: "AMIS Digital ID Verification Portal",
    shortTitle: "Digital ID Portal",
    tagline: "Responsive student verification and Digital ID access portal with record lookup, data validation, and mobile-friendly ID presentation",
    category: "Identity & Security",
    categoryGroup: "Identity & Security",
    role: "Full-Stack Laravel Developer",
    featured: true,
    demoUrl: undefined,
    githubUrl: undefined,
    isPrivateRepo: true,
    mockupPlaceholder: {
      accentColor: "#EC4899",
      badgeText: "Security & Verification",
      previewCode: `// QR Digital ID Verification Validator
class IDVerificationController extends Controller {
  public function verifyToken(string $token): JsonResponse {
    $payload = Crypt::decryptString($token);
    $student = Student::with('currentEnrollment')->where('uuid', $payload['id'])->first();
    if (!$student || !$student->isActive()) {
      return response()->json(['valid' => false, 'status' => 'INACTIVE_OR_INVALID'], 404);
    }
    AuditLog::record('ID_SCANNED', $student->id);
    return response()->json(['valid' => true, 'student' => new StudentIDResource($student)]);
  }
}`,
      summaryHeadline: "Instant QR Record Lookup & Mobile-Friendly Digital ID Presentation"
    },
    overview: "The AMIS Digital ID Verification Portal is a responsive student information verification and Digital ID platform built to provide instant record lookups, data validation, encrypted QR scanning, and mobile-friendly ID presentation.",
    problem: "Physical plastic ID cards could be lost, damaged, or delayed in manufacturing at the start of academic terms, creating bottlenecks at campus security gates and difficulties verifying active enrollment.",
    solution: "Engineered a secure web application featuring mobile-optimized digital student identity passes, dynamic QR code generation, real-time enrollment validation, and a high-speed scanner portal for campus security personnel.",
    majorFeatures: [
      "Mobile-friendly digital student ID presentation with school branding and photo",
      "Encrypted dynamic QR code linking to active enrollment status",
      "Instant record lookup and validation for security guards and staff",
      "Real-time student status verification (Enrolled, Valid, Inactive)",
      "Tamper-resistant visual badges with dynamic security pulse animations",
      "Offline-resilient digital ID card caching on mobile web browsers",
      "Security scan audit logging tracking verification timestamps"
    ],
    technologies: [
      "Laravel",
      "PHP",
      "JavaScript",
      "MySQL",
      "MariaDB",
      "Bootstrap",
      "QR Code Engine",
      "RESTful APIs"
    ],
    systemImpact: "Ensured uninterrupted campus identity verification and security checks, completely eliminating bottlenecks from lost or delayed physical cards.",
    caseStudy: {
      projectOverview: "The AMIS Digital ID Verification Portal provides an agile, fraud-resistant credential verification tool for students, parents, and campus security officers.",
      theProblem: [
        "Delays in physical plastic ID production left students without valid credentials during early school terms.",
        "Campus security lacked a rapid method to confirm whether a student was currently enrolled.",
        "Physical cards were prone to wear and loss."
      ],
      requirements: [
        "Mobile-optimized digital student card accessible from any smartphone browser.",
        "Cryptographically signed QR codes preventing tampering or duplication.",
        "Instant camera scanner for security staff without special hardware.",
        "Zero-latency record lookup."
      ],
      myRole: "Full-Stack Laravel Developer: developed QR tokenization, built mobile ID layout, engineered verification API endpoints, and optimized database queries.",
      solution: "Created a lightweight Laravel micro-portal utilizing signed cryptographic tokens and indexed MySQL lookups for sub-100ms response times.",
      systemArchitecture: {
        summary: "Cryptographic token verification architecture with mobile-first rendering and high-speed database lookups.",
        tiers: {
          frontend: ["Mobile wallet styled student ID card with holographic animation", "Browser-based QR scanner using device camera", "Verification status indicator"],
          backend: ["Laravel PHP verification service", "Token decryption and signature validation", "Audit event logger"],
          database: ["MySQL / MariaDB database with indexed UUID student lookups"],
          infrastructure: ["HTTPS with TLS 1.3 encryption on all verification endpoints"],
          security: ["Cryptographic signing", "Rate-limiting on verification lookups to prevent brute force scraping"]
        }
      },
      majorFeatures: [
        {
          title: "Digital Student Identity Pass",
          description: "High-fidelity digital ID card with student photo, grade level, LRN, and dynamic QR code.",
          bullets: ["Mobile wallet visual design", "Live enrollment indicator", "Emergency contact info"]
        },
        {
          title: "Campus Security Scanner",
          description: "Fast web-based scanner for security guards at campus gates to verify student validity in real time.",
          bullets: ["One-tap camera scan", "Instant profile modal", "Visual confirmation cues"]
        }
      ],
      technologiesUsed: [
        {
          category: "Framework & Backend",
          items: ["Laravel", "PHP 8.x", "Token Cryptography"]
        },
        {
          category: "Database & Frontend",
          items: ["MySQL", "MariaDB", "JavaScript", "Bootstrap", "HTML5/CSS3"]
        }
      ],
      challenges: [
        "Ensuring immediate verification response times on mobile data at campus gates."
      ],
      solutionsImplemented: [
        "Built lightweight JSON responses and indexed student lookup UUIDs for sub-100ms verification."
      ],
      securityConsiderations: [
        "Signed QR payloads preventing ID card spoofing.",
        "Rate-limiting to guard against automated scanning bots."
      ],
      screenshots: [
        {
          title: "Mobile Digital ID Card",
          caption: "Responsive student digital ID presentation viewable on smartphones.",
          src: "/assets/projects/amis-online-enrollment.png",
          type: "mobile"
        }
      ],
      resultsImpact: [
        "Enabled instantaneous verification of student identities at campus checkpoints.",
        "Saved thousands in physical re-carding costs for lost ID badges."
      ],
      futureImprovements: [
        "NFC-based tap verification.",
        "Integration with automated campus turnstile gates."
      ]
    }
  },
  {
    id: "staff-information-system",
    title: "Staff Information System",
    shortTitle: "Staff Information System",
    tagline: "CRUD-based employee information system and integrated Angular components with backend APIs for staff record management",
    category: "Enterprise & CRUD",
    categoryGroup: "Enterprise & CRUD",
    role: "Frontend & Full-Stack Developer",
    featured: false,
    demoUrl: undefined,
    githubUrl: undefined,
    isPrivateRepo: true,
    mockupPlaceholder: {
      accentColor: "#F59E0B",
      badgeText: "Enterprise CRUD System",
      previewCode: `// Angular Staff Record Component
@Component({
  selector: 'app-staff-directory',
  templateUrl: './staff-directory.component.html'
})
export class StaffDirectoryComponent implements OnInit {
  staffList$: Observable<StaffMember[]>;
  constructor(private staffService: StaffApiService) {}
  ngOnInit(): void {
    this.staffList$ = this.staffService.getStaffRecords();
  }
}`,
      summaryHeadline: "CRUD-Based Employee Management & RESTful API Integration"
    },
    overview: "A CRUD-based employee information system engineered using Angular, TypeScript, Bootstrap, and RESTful APIs to modernize employee record management, department assignments, and staff information lookups.",
    problem: "Government and organizational personnel records were managed through paper files and disparate spreadsheets, resulting in slow employee lookups, data inconsistency, and manual maintenance overhead.",
    solution: "Built a structured single-page application using Angular and TypeScript integrated with RESTful backend APIs, enabling HR and administrative personnel to create, read, update, filter, and manage staff records effortlessly.",
    majorFeatures: [
      "Full CRUD operations for employee personal and employment profiles",
      "Dynamic data tables with search, multi-field filtering, and sorting",
      "Department and role categorization with organizational hierarchy",
      "Form validation with real-time feedback and error handling",
      "RESTful API integration for asynchronous record syncing",
      "Responsive user interface built with Angular and Bootstrap"
    ],
    technologies: [
      "Angular",
      "TypeScript",
      "Bootstrap",
      "RESTful APIs",
      "JavaScript",
      "HTML5",
      "CSS3",
      "CRUD Architecture"
    ],
    systemImpact: "Significantly streamlined employee record indexing and retrieval, reducing staff lookup times and eliminating data entry redundancies.",
    caseStudy: {
      projectOverview: "The Staff Information System was developed to deliver an efficient, structured digital platform for managing staff records and administrative information.",
      theProblem: [
        "Manual tracking of employee assignments and contact records led to missing or outdated information.",
        "Lack of centralized search made finding employee profiles time-consuming."
      ],
      requirements: [
        "A responsive single-page application with fast search and filtering.",
        "Type-safe data modeling using TypeScript.",
        "Clean REST API integration."
      ],
      myRole: "Frontend & Full-Stack Developer: architected Angular components, designed TypeScript data models, integrated RESTful APIs, and built responsive Bootstrap UI.",
      solution: "Developed an Angular SPA with modular components, reactive services, and REST API communication.",
      systemArchitecture: {
        summary: "Angular Single Page Application communicating with RESTful backend services.",
        tiers: {
          frontend: ["Angular Component Architecture with TypeScript", "Bootstrap responsive UI with modal editors", "Reactive RxJS streams"],
          backend: ["RESTful API endpoints with structured JSON responses"],
          database: ["Relational employee database with department mappings"],
          infrastructure: ["Web server hosting with API gateway"],
          security: ["Input sanitization and API token validation"]
        }
      },
      majorFeatures: [
        {
          title: "Employee Directory & Filter Matrix",
          description: "Searchable table of all staff members with instant filtering by department, position, and status.",
          bullets: ["Instant multi-parameter search", "Pagination", "Sorting"]
        },
        {
          title: "Staff Profile Management",
          description: "Comprehensive CRUD modals for updating employment history, department assignments, and contact details.",
          bullets: ["Reactive Angular forms", "Field validation", "Async API saves"]
        }
      ],
      technologiesUsed: [
        {
          category: "Frontend Framework",
          items: ["Angular", "TypeScript", "RxJS", "Bootstrap"]
        },
        {
          category: "Architecture & Integration",
          items: ["RESTful APIs", "JSON", "CRUD Patterns"]
        }
      ],
      challenges: [
        "Ensuring smooth client-side filtering across extensive staff lists without performance degradation."
      ],
      solutionsImplemented: [
        "Implemented RxJS debounced search streams and optimized Angular change detection strategies."
      ],
      securityConsiderations: [
        "Form sanitization guarding against XSS.",
        "Role-based view restrictions on sensitive employee data."
      ],
      screenshots: [
        {
          title: "Staff Information Directory",
          caption: "Angular dashboard showing staff roster with department filters and actions.",
          src: "/assets/projects/amis-school-website.png",
          type: "desktop"
        }
      ],
      resultsImpact: [
        "Modernized staff record tracking with an intuitive, responsive interface.",
        "Cut employee lookup and update times by over 70%."
      ],
      futureImprovements: [
        "Automated attendance and leave management modules.",
        "Exportable government compliance PDF reports."
      ]
    }
  },
  {
    id: "flutter-quiz-application",
    title: "Flutter Quiz Application",
    shortTitle: "Flutter Quiz App",
    tagline: "Cross-platform mobile quiz application with Firebase authentication, realtime leaderboards, question management, and scoring",
    category: "Mobile Applications",
    categoryGroup: "Mobile Applications",
    role: "Freelance Mobile Developer",
    featured: false,
    demoUrl: undefined,
    githubUrl: undefined,
    isPrivateRepo: true,
    mockupPlaceholder: {
      accentColor: "#38BDF8",
      badgeText: "Cross-Platform Mobile App",
      previewCode: `// Flutter Firebase Realtime Scoring Engine
class QuizBloc extends Bloc<QuizEvent, QuizState> {
  final FirebaseFirestore _firestore;
  QuizBloc(this._firestore) : super(QuizInitial()) {
    on<SubmitAnswer>((event, emit) async {
      final isCorrect = event.selectedOption == event.question.correctIndex;
      final newScore = state.score + (isCorrect ? 10 : 0);
      await _firestore.collection('leaderboard').doc(event.userId).set({
        'score': newScore,
        'updatedAt': FieldValue.serverTimestamp()
      }, SetOptions(merge: true));
      emit(QuizUpdated(score: newScore));
    });
  }
}`,
      summaryHeadline: "Realtime Firebase Integration, Dynamic Question Banks & Leaderboards"
    },
    overview: "A high-performance cross-platform mobile quiz application built using Flutter and Dart, fully integrated with Google Firebase for realtime authentication, question bank management, live scoring, and global leaderboards.",
    problem: "Users needed an engaging, interactive mobile learning quiz experience that works seamlessly across Android and iOS with realtime multiplayer leaderboard tracking and offline capability.",
    solution: "Assisted in developing a sleek Flutter application featuring Firebase Auth, Cloud Firestore for dynamic question retrieval, client-side score computation, timer animations, and realtime leaderboard updates.",
    majorFeatures: [
      "Firebase Authentication (Email & Social Sign-In)",
      "Dynamic question bank categorized by subject and difficulty",
      "Realtime multiplayer leaderboard powered by Cloud Firestore",
      "Interactive timer-based scoring with streak multipliers",
      "Cross-platform 60fps animations on Android and iOS",
      "Offline caching for quiz questions with sync on reconnect"
    ],
    technologies: [
      "Flutter",
      "Dart",
      "Firebase",
      "Cloud Firestore",
      "Firebase Auth",
      "Mobile UI/UX",
      "State Management"
    ],
    systemImpact: "Delivered a responsive, engaging mobile quiz app with sub-second leaderboard updates and seamless cross-platform performance.",
    caseStudy: {
      projectOverview: "The Flutter Quiz Application was created to provide students and learners with an engaging gamified quiz environment with realtime progress tracking.",
      theProblem: [
        "Need for a unified cross-platform codebase that performs smoothly on low-end and high-end mobile devices.",
        "Real-time synchronization of player scores and rank leaderboards without high server latency."
      ],
      requirements: [
        "Flutter cross-platform application for Android and iOS.",
        "Cloud Firestore backend for instant leaderboard data synchronization.",
        "Clean, modern mobile user interface with smooth animations."
      ],
      myRole: "Freelance Mobile Developer at goCode: implemented user authentication, scoring algorithms, leaderboard logic, question management, database integration, testing, and debugging.",
      solution: "Engineered Flutter widgets with responsive state management, connecting to Cloud Firestore streams for realtime updates.",
      systemArchitecture: {
        summary: "Flutter mobile client connecting to Google Firebase cloud infrastructure.",
        tiers: {
          frontend: ["Flutter UI widgets with custom animations and tactile feedback", "State Management architecture", "Mobile-optimized dark/light quiz themes"],
          backend: ["Google Firebase Authentication", "Cloud Firestore Realtime NoSQL Database", "Firebase Cloud Storage"],
          database: ["Cloud Firestore Collections (Users, Questions, Categories, Leaderboards)"],
          infrastructure: ["Google Cloud Platform / Firebase Serverless Infrastructure"],
          security: ["Firebase Security Rules protecting user write operations on scores"]
        }
      },
      majorFeatures: [
        {
          title: "Real-time Global Leaderboard",
          description: "Live ranking board that updates player ranks instantaneously as quizzes are completed.",
          bullets: ["Live Firestore streams", "Weekly and all-time rankings", "User avatar badges"]
        },
        {
          title: "Gamified Quiz Engine",
          description: "Timer-based question flow with interactive feedback, streak bonuses, and explanation cards.",
          bullets: ["Smooth animations", "Sound and haptic feedback", "Detailed score summaries"]
        }
      ],
      technologiesUsed: [
        {
          category: "Mobile Framework",
          items: ["Flutter", "Dart", "Custom UI Components", "State Management"]
        },
        {
          category: "Backend & Cloud",
          items: ["Firebase Auth", "Cloud Firestore", "NoSQL Data Modeling"]
        }
      ],
      challenges: [
        "Preventing score tampering and optimizing Firestore read/write operations to minimize cost."
      ],
      solutionsImplemented: [
        "Implemented Firestore Security Rules and local query caching with batch writes."
      ],
      securityConsiderations: [
        "Firebase Security Rules validating data shapes and ensuring users only update their own leaderboard records."
      ],
      screenshots: [
        {
          title: "Flutter Quiz Gameplay View",
          caption: "Mobile quiz screen with timer countdown and interactive option selections.",
          src: "/assets/projects/amis-online-enrollment.png",
          type: "mobile"
        }
      ],
      resultsImpact: [
        "Delivered a fluid 60fps quiz experience on both Android and iOS devices.",
        "Achieved sub-second leaderboard score updates across concurrent player sessions."
      ],
      futureImprovements: [
        "Head-to-head live 1v1 multiplayer quiz battles.",
        "User-submitted custom community question packs."
      ]
    }
  }
];
