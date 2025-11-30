import mongoose, { Model } from "mongoose";
import { IProject, projectSchema } from "@/schemas/project.schema";

const Project = (mongoose.models.Project as Model<IProject>) || mongoose.model<IProject>("Project", projectSchema);

export type { IProject };
export default Project;
