import { Challenge } from "./challenge";
import { Metric } from "./metric";

// Public-facing localized project
export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  github: string;
  demo: string;
  date: string;
  category: string;
  color: string;
}

export interface ProjectDetail extends Project {
  subtitle: string;
  longDescription: string;
  features: string[];
  challenges: Challenge[];
  techStack: Record<string, string[]>;
  metrics: Metric[];
}

// Database project model (for admin pages)
export interface ProjectDB {
  _id: string;
  id: string;
  title: {
    en: string;
    fr: string;
  };
  subtitle: {
    en: string;
    fr: string;
  };
  description: {
    en: string;
    fr: string;
  };
  longDescription: {
    en: string;
    fr: string;
  };
  image: string;
  tags: string[];
  github: string;
  demo: string;
  date: string;
  category: string;
  color: string;
  features: {
    en: string[];
    fr: string[];
  };
  challenges: {
    problem: {
      en: string;
      fr: string;
    };
    solution: {
      en: string;
      fr: string;
    };
  }[];
  techStack: {
    en: Record<string, string[]>;
    fr: Record<string, string[]>;
  };
  metrics: {
    label: {
      en: string;
      fr: string;
    };
    value: string;
  }[];
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}
