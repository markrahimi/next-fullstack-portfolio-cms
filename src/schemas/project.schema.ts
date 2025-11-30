import { Schema } from "mongoose";

export interface IProject {
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

export const projectSchema = new Schema<IProject>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    title: {
      en: { type: String, required: true },
      fr: { type: String, required: true },
    },
    subtitle: {
      en: { type: String, required: true },
      fr: { type: String, required: true },
    },
    description: {
      en: { type: String, required: true },
      fr: { type: String, required: true },
    },
    longDescription: {
      en: { type: String, required: true },
      fr: { type: String, required: true },
    },
    image: {
      type: String,
      required: true,
    },
    tags: [String],
    github: String,
    demo: String,
    date: String,
    category: String,
    color: String,
    features: {
      en: [String],
      fr: [String],
    },
    challenges: [
      {
        problem: {
          en: String,
          fr: String,
        },
        solution: {
          en: String,
          fr: String,
        },
      },
    ],
    techStack: {
      en: Schema.Types.Mixed,
      fr: Schema.Types.Mixed,
    },
    metrics: [
      {
        label: {
          en: String,
          fr: String,
        },
        value: String,
      },
    ],
    published: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);
