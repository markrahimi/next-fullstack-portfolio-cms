// Public-facing localized education
export interface Education {
  degree: string;
  status: "Ongoing" | "Completed";
  institution: string;
  location: string;
  year: string;
  courses: string[];
  color: string;
}

// Database education model (for admin pages)
export interface EducationDB {
  _id: string;
  degree: {
    en: string;
    fr: string;
  };
  status: "Ongoing" | "Completed";
  institution: {
    en: string;
    fr: string;
  };
  location: {
    en: string;
    fr: string;
  };
  year: string;
  courses: {
    en: string[];
    fr: string[];
  };
  color: string;
  order: number;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}
