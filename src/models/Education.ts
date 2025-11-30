import mongoose, { Model } from "mongoose";
import { IEducation, educationSchema } from "@/schemas/education.schema";

const Education = (mongoose.models.Education as Model<IEducation>) || mongoose.model<IEducation>("Education", educationSchema);

export type { IEducation };
export default Education;
