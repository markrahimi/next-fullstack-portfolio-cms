export interface SkillCategory {
  title: string;
  skills: string[];
  color: string;
}

// Re-export Skill interface from model for admin pages
export interface Skill {
  _id: string;
  title: {
    en: string;
    fr: string;
  };
  skills: string[];
  color: string;
  order: number;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}
