import { Schema, Document } from "mongoose";

export interface ICertificate extends Document {
  name: { en: string; fr: string };
  issuer: { en: string; fr: string };
  issueDate: string; // Format: "YYYY-MM"
  expiryDate?: string; // Optional, Format: "YYYY-MM"
  credentialID?: string;
  credentialURL?: string;
  description: { en: string; fr: string };
  order: number; // For sorting
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export const certificateSchema = new Schema<ICertificate>(
  {
    name: {
      en: { type: String, required: true },
      fr: { type: String, required: true },
    },
    issuer: {
      en: { type: String, required: true },
      fr: { type: String, required: true },
    },
    issueDate: {
      type: String,
      required: true,
    },
    expiryDate: {
      type: String,
      required: false,
    },
    credentialID: {
      type: String,
      required: false,
    },
    credentialURL: {
      type: String,
      required: false,
    },
    description: {
      en: { type: String, required: true },
      fr: { type: String, required: true },
    },
    order: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);
