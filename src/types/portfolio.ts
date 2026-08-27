export interface SocialLink {
  name: string;
  url: string;
  icon: string;
  label: string;
  highlight?: boolean;
}

export interface ProfileData {
  name: string;
  title: string;
  roleSubtitle: string;
  email: string;
  phone: string;
  location: string;
  bio: string[];
  secondaryText: string[];
  primaryTechStack: string[];
  resumeUrl: string;
  status: {
    availableForOpportunities: boolean;
    currentOrg: string;
    currentRole: string;
    currentEducation: string;
  };
  socialLinks: SocialLink[];
  stats: Array<{
    label: string;
    value: string;
    description: string;
  }>;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  isCurrent: boolean;
  category?: 'software-engineering' | 'web-mobile' | 'it-support';
  promotedToNext?: string;
  promotionBadge?: string;
  summary: string;
  responsibilities: string[];
  technologies: string[];
  impactNotes?: string[];
}

export interface ArchitectureNode {
  title: string;
  tech: string;
  description: string;
}

export interface CaseStudy {
  projectOverview: string;
  theProblem: string[];
  requirements: string[];
  myRole: string;
  solution: string;
  systemArchitecture: {
    summary: string;
    tiers: {
      frontend: string[];
      backend: string[];
      database: string[];
      infrastructure: string[];
      security: string[];
    };
  };
  majorFeatures: {
    title: string;
    description: string;
    bullets?: string[];
  }[];
  technologiesUsed: {
    category: string;
    items: string[];
  }[];
  challenges: string[];
  solutionsImplemented: string[];
  securityConsiderations: string[];
  screenshots: {
    title: string;
    caption: string;
    src: string;
    type?: 'desktop' | 'mobile' | 'diagram';
  }[];
  resultsImpact: string[];
  futureImprovements: string[];
}

export type ProjectCategory = 
  | 'All'
  | 'School Platforms' 
  | 'Financial Systems' 
  | 'Identity & Security' 
  | 'Enterprise & CRUD' 
  | 'Mobile Applications';

export interface ProjectItem {
  id: string;
  title: string;
  shortTitle: string;
  tagline: string;
  category: 'School Platforms' | 'Financial Systems' | 'Identity & Security' | 'Enterprise & CRUD' | 'Mobile Applications' | 'School Management' | 'Financial Platform' | 'Student & Parent' | 'Administration';
  categoryGroup: 'School Platforms' | 'Financial Systems' | 'Identity & Security' | 'Enterprise & CRUD' | 'Mobile Applications';
  role: string;
  featured: boolean;
  demoUrl?: string;
  githubUrl?: string;
  isPrivateRepo?: boolean;
  mockupImage?: string;
  mockupPlaceholder: {
    accentColor: string;
    badgeText: string;
    previewCode?: string;
    summaryHeadline: string;
  };
  overview: string;
  problem: string;
  solution: string;
  majorFeatures: string[];
  technologies: string[];
  systemImpact: string;
  caseStudy: CaseStudy;
}

export interface SkillItem {
  name: string;
  highlight?: boolean;
  context?: string;
}

export interface SkillCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  skills: SkillItem[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  status: 'Ongoing' | 'Completed';
  location: string;
  description: string;
  highlights: string[];
}

export interface CertificationItem {
  title: string;
  issuer: string;
  credentialCode?: string;
  year?: string;
  description: string;
  badgeType: string;
}

export interface LearningTopic {
  title: string;
  category: string;
  description: string;
  connection: string;
}
