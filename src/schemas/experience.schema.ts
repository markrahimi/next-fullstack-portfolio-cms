import { Schema } from "mongoose";

export interface IExperience {
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

export const experienceSchema = new Schema<IExperience>(
  {
    company: {
      en: { type: String, required: true },
      fr: { type: String, required: true },
    },
    role: {
      en: { type: String, required: true },
      fr: { type: String, required: true },
    },
    type: {
      en: String,
      fr: String,
    },
    duration: {
      en: String,
      fr: String,
    },
    location: {
      en: String,
      fr: String,
    },
    description: {
      en: String,
      fr: String,
    },
    achievements: {
      en: [String],
      fr: [String],
    },
    color: String,
    order: {
      type: Number,
      default: 0,
    },
    published: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);
