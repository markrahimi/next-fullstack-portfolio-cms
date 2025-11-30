// Public-facing localized experience
export interface Experience {
  company: string;
  role: string;
  type: string;
  duration: string;
  location: string;
  description: string;
  achievements: string[];
  color: string;
}

// Database experience model (for admin pages)
export interface ExperienceDB {
  _id: string;
  company: {
    en: string;
    fr: string;
  };
  role: {
    en: string;
    fr: string;
  };
  type: {
    en: string;
    fr: string;
  };
  duration: {
    en: string;
    fr: string;
  };
  location: {
    en: string;
    fr: string;
  };
  description: {
    en: string;
    fr: string;
  };
  achievements: {
    en: string[];
    fr: string[];
  };
  color: string;
  order: number;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}
