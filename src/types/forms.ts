// Form data types for admin pages

export interface SkillFormData {
  title: { en: string; fr: string };
  skills: string[];
  color: string;
  order: number;
  published: boolean;
}

export interface ExperienceFormData {
  company: { en: string; fr: string };
  role: { en: string; fr: string };
  position: { en: string; fr: string };
  type: { en: string; fr: string };
  duration: { en: string; fr: string };
  location: { en: string; fr: string };
  description: { en: string; fr: string };
  achievements: { en: string[]; fr: string[] };
  startDate: string;
  endDate?: string;
  current: boolean;
  color: string;
  order: number;
  published: boolean;
}

export interface BlogFormData {
  id: number;
  title: { en: string; fr: string };
  excerpt: { en: string; fr: string };
  content: { en: string; fr: string };
  image: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  color: string;
  featured: boolean;
  published: boolean;
  order: number;
}

export interface ProjectFormData {
  id: string;
  title: { en: string; fr: string };
  subtitle: { en: string; fr: string };
  description: { en: string; fr: string };
  longDescription: { en: string; fr: string };
  image: string;
  category: string;
  tags: string[];
  github: string;
  demo: string;
  date: string;
  color: string;
  features: { en: string[]; fr: string[] };
  featured: boolean;
  published: boolean;
  order: number;
}

export interface EducationFormData {
  degree: { en: string; fr: string };
  institution: { en: string; fr: string };
  location: { en: string; fr: string };
  year: string;
  courses: { en: string[]; fr: string[] };
  status: string;
  color: string;
  order: number;
  published: boolean;
}

export interface AboutFormData {
  title: { en: string; fr: string };
  professionalSummary: { en: string; fr: string };
  description: { en: string; fr: string };
  description2: { en: string; fr: string };
  description3: { en: string; fr: string };
  whatIDo: { en: string; fr: string };
  whatIDoList: { en: string[]; fr: string[] };
  stats: {
    experience: { label: { en: string; fr: string }; value: string };
    projects: { label: { en: string; fr: string }; value: string };
    technologies: { label: { en: string; fr: string }; value: string };
    location: { label: { en: string; fr: string }; value: { en: string; fr: string } };
  };
}

export interface SettingsFormData {
  siteName?: { en: string; fr: string };
  siteDescription?: { en: string; fr: string };
  fullName: string;
  role: { en: string; fr: string };
  logo: string;
  profileImage: string;
  resumeUrl: string;
  email: string;
  phone: string;
  location?: { en: string; fr: string };
  address?: { en: string; fr: string };
  heroGreeting: { en: string; fr: string };
  heroTitle: { en: string; fr: string };
  heroSubtitle: { en: string; fr: string };
  socialLinks: {
    github: string;
    linkedin: string;
    twitter: string;
    instagram: string;
    facebook: string;
    youtube: string;
  };
  heroBadges?: string[];
  footerText?: { en: string; fr: string };
  copyrightText?: { en: string; fr: string };
  googleAnalyticsId?: string;
  googleTagManagerId?: string;
  customHeadScripts?: string;
  customBodyScripts?: string;
}
