export interface AboutData {
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
