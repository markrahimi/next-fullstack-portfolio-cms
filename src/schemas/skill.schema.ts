import { Schema } from "mongoose";

export interface ISkill {
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

export const skillSchema = new Schema<ISkill>(
  {
    title: {
      en: { type: String, required: true },
      fr: { type: String, required: true },
    },
    skills: {
      type: [String],
      required: true,
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
