import mongoose, { Model } from "mongoose";
import { IContactMessage, contactMessageSchema } from "@/schemas/contact-message.schema";

const ContactMessage = (mongoose.models.ContactMessage as Model<IContactMessage>) || mongoose.model<IContactMessage>("ContactMessage", contactMessageSchema);

export type { IContactMessage };
export default ContactMessage;
