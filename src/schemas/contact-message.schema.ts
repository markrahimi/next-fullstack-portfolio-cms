import { Schema } from "mongoose";

export interface IContactMessage {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: "unread" | "read" | "archived";
  createdAt: Date;
  updatedAt: Date;
}

export const contactMessageSchema = new Schema<IContactMessage>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["unread", "read", "archived"],
      default: "unread",
    },
  },
  {
    timestamps: true,
  }
);
