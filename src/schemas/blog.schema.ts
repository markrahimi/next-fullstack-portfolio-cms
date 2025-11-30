import { Schema } from "mongoose";

export interface IBlog {
  _id: string;
  id: number;
  title: {
    en: string;
    fr: string;
  };
  excerpt: {
    en: string;
    fr: string;
  };
  content: {
    en: string;
    fr: string;
  };
  image: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  color: string;
  featured: boolean;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export const blogSchema = new Schema<IBlog>(
  {
    id: {
      type: Number,
      required: true,
      unique: true,
    },
    title: {
      en: { type: String, required: true },
      fr: { type: String, required: true },
    },
    excerpt: {
      en: { type: String, required: true },
      fr: { type: String, required: true },
    },
    content: {
      en: { type: String, required: true },
      fr: { type: String, required: true },
    },
    image: {
      type: String,
      required: true,
    },
    date: String,
    readTime: String,
    category: String,
    tags: [String],
    color: String,
    featured: {
      type: Boolean,
      default: false,
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
