import { Schema } from "mongoose";

export interface ISettings {
  _id: string;
  // Site Information
  siteName: {
    en: string;
    fr: string;
  };
  siteDescription: {
    en: string;
    fr: string;
  };

  // Personal Information
  fullName: string;
  role: {
    en: string;
    fr: string;
  };
  bio: {
    en: string;
    fr: string;
  };

  // Images
  logo: string;
  profileImage: string;
  favicon: string;

  // Contact Information
  email: string;
  phone: string;
  location: {
    en: string;
    fr: string;
  };
  address: {
    en: string;
    fr: string;
  };

  // Social Media Links
  socialLinks: {
    github: string;
    linkedin: string;
    twitter: string;
    instagram: string;
    facebook: string;
    youtube: string;
  };

  // Footer
  footerText: {
    en: string;
    fr: string;
  };
  copyrightText: {
    en: string;
    fr: string;
  };

  // Hero Section
  heroGreeting: {
    en: string;
    fr: string;
  };
  heroTitle: {
    en: string;
    fr: string;
  };
  heroSubtitle: {
    en: string;
    fr: string;
  };

  // Resume/CV
  resumeUrl: string;

  // SEO
  metaKeywords: {
    en: string[];
    fr: string[];
  };
  metaDescription: {
    en: string;
    fr: string;
  };

  // Analytics & Scripts
  googleAnalyticsId?: string;
  googleTagManagerId?: string;
  customHeadScripts?: string;
  customBodyScripts?: string;

  // Hero Floating Badges
  heroBadges?: string[];

  createdAt: Date;
  updatedAt: Date;
}

export const settingsSchema = new Schema<ISettings>(
  {
    siteName: {
      en: { type: String, default: "Mark Rahimi" },
      fr: { type: String, default: "Mark Rahimi" },
    },
    siteDescription: {
      en: { type: String, default: "Full-Stack Developer & Software Engineer" },
      fr: { type: String, default: "Développeur Full-Stack & Ingénieur Logiciel" },
    },
    fullName: {
      type: String,
      default: "Mark Rahimi",
    },
    role: {
      en: { type: String, default: "Full-Stack Developer" },
      fr: { type: String, default: "Développeur Full-Stack" },
    },
    bio: {
      en: { type: String, default: "" },
      fr: { type: String, default: "" },
    },
    logo: {
      type: String,
      default: "/logo.png",
    },
    profileImage: {
      type: String,
      default: "/profile.jpg",
    },
    favicon: {
      type: String,
      default: "/favicon.ico",
    },
    email: {
      type: String,
      default: "admin@markrahimi.com",
    },
    phone: {
      type: String,
      default: "",
    },
    location: {
      en: { type: String, default: "" },
      fr: { type: String, default: "" },
    },
    address: {
      en: { type: String, default: "" },
      fr: { type: String, default: "" },
    },
    socialLinks: {
      github: { type: String, default: "" },
      linkedin: { type: String, default: "" },
      twitter: { type: String, default: "" },
      instagram: { type: String, default: "" },
      facebook: { type: String, default: "" },
      youtube: { type: String, default: "" },
    },
    footerText: {
      en: { type: String, default: "Built with Next.js & TypeScript" },
      fr: { type: String, default: "Créé avec Next.js & TypeScript" },
    },
    copyrightText: {
      en: { type: String, default: "All rights reserved" },
      fr: { type: String, default: "Tous droits réservés" },
    },
    heroGreeting: {
      en: { type: String, default: "Welcome" },
      fr: { type: String, default: "Bienvenue" },
    },
    heroTitle: {
      en: { type: String, default: "I'm Mark Rahimi" },
      fr: { type: String, default: "Je suis Mark Rahimi" },
    },
    heroSubtitle: {
      en: { type: String, default: "Full-Stack Developer & Software Engineer" },
      fr: { type: String, default: "Développeur Full-Stack & Ingénieur Logiciel" },
    },
    resumeUrl: {
      type: String,
      default: "/cv.pdf",
    },
    metaKeywords: {
      en: [{ type: String }],
      fr: [{ type: String }],
    },
    metaDescription: {
      en: { type: String, default: "" },
      fr: { type: String, default: "" },
    },
    googleAnalyticsId: {
      type: String,
      default: "",
    },
    googleTagManagerId: {
      type: String,
      default: "",
    },
    customHeadScripts: {
      type: String,
      default: "",
    },
    customBodyScripts: {
      type: String,
      default: "",
    },
    heroBadges: {
      type: [String],
      default: ["Python", "FastAPI", "Next.js", "Django"],
    },
  },
  {
    timestamps: true,
  }
);
