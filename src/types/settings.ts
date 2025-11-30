export interface Settings {
  fullName: string;
  profileImage: string;
  resumeUrl: string;
  heroGreeting: { en: string; fr: string };
  heroTitle: { en: string; fr: string };
  heroSubtitle: { en: string; fr: string };
  socialLinks: {
    github: string;
    linkedin: string;
    twitter: string;
    instagram: string;
  };
  email: string;
  heroBadges?: string[];
  customHeadScripts?: string;
  customBodyScripts?: string;
  footerText?: { en: string; fr: string };
  copyrightText?: { en: string; fr: string };
  location?: { en: string; fr: string };
}
