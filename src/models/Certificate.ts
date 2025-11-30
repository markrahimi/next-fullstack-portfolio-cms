import mongoose, { models } from "mongoose";
import { ICertificate, certificateSchema } from "@/schemas/certificate.schema";

const Certificate = models.Certificate || mongoose.model<ICertificate>("Certificate", certificateSchema);

export type { ICertificate };
export default Certificate;
