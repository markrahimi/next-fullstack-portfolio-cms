import mongoose, { Model } from "mongoose";
import { IExperience, experienceSchema } from "@/schemas/experience.schema";

const Experience = (mongoose.models.Experience as Model<IExperience>) || mongoose.model<IExperience>("Experience", experienceSchema);

export type { IExperience };
export default Experience;
