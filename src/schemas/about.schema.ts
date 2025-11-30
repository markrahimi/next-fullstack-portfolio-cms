import { Schema, Document } from "mongoose";

export interface IAbout extends Document {
  title: { en: string; fr: string };
  professionalSummary: { en: string; fr: string };
  description: { en: string; fr: string }; // paragraph 1
  description2: { en: string; fr: string }; // paragraph 2
  description3: { en: string; fr: string }; // paragraph 3
  whatIDo: { en: string; fr: string }; // "What I Do" section title
  whatIDoList: { en: string[]; fr: string[] }; // list of what you do
  stats: {
    experience: { label: { en: string; fr: string }; value: string };
    projects: { label: { en: string; fr: string }; value: string };
    technologies: { label: { en: string; fr: string }; value: string };
    location: { label: { en: string; fr: string }; value: { en: string; fr: string } };
  };
}

export const aboutSchema = new Schema<IAbout>(
  {
    title: {
      en: { type: String, required: true, default: "About Me" },
      fr: { type: String, required: true, default: "À Propos" },
    },
    professionalSummary: {
      en: { type: String, required: true, default: "Professional Summary" },
      fr: { type: String, required: true, default: "Résumé Professionnel" },
    },
    description: {
      en: { type: String, required: true },
      fr: { type: String, required: true },
    },
    description2: {
      en: { type: String, required: true },
      fr: { type: String, required: true },
    },
    description3: {
      en: { type: String, required: true },
      fr: { type: String, required: true },
    },
    whatIDo: {
      en: { type: String, required: true, default: "What I Do" },
      fr: { type: String, required: true, default: "Ce Que Je Fais" },
    },
    whatIDoList: {
      en: { type: [String], required: true },
      fr: { type: [String], required: true },
    },
    stats: {
      experience: {
        label: {
          en: { type: String, required: true },
          fr: { type: String, required: true },
        },
        value: { type: String, required: true },
      },
      projects: {
        label: {
          en: { type: String, required: true },
          fr: { type: String, required: true },
        },
        value: { type: String, required: true },
      },
      technologies: {
        label: {
          en: { type: String, required: true },
          fr: { type: String, required: true },
        },
        value: { type: String, required: true },
      },
      location: {
        label: {
          en: { type: String, required: true },
          fr: { type: String, required: true },
        },
        value: {
          en: { type: String, required: true },
          fr: { type: String, required: true },
        },
      },
    },
  },
  {
    timestamps: true,
  }
);
