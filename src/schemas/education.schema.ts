import { Schema } from "mongoose";

export interface IEducation {
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

export const educationSchema = new Schema<IEducation>(
  {
    degree: {
      en: { type: String, required: true },
      fr: { type: String, required: true },
    },
    status: {
      type: String,
      enum: ["Ongoing", "Completed"],
      required: true,
    },
    institution: {
      en: { type: String, required: true },
      fr: { type: String, required: true },
    },
    location: {
      en: String,
      fr: String,
    },
    year: String,
    courses: {
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
