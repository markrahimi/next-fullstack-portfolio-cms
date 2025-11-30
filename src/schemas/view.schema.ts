import { Schema, Document } from "mongoose";

export interface IView extends Document {
  page: string;
  count: number;
  updatedAt: Date;
}

export const viewSchema = new Schema<IView>(
  {
    page: {
      type: String,
      required: true,
      unique: true,
    },
    count: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);
