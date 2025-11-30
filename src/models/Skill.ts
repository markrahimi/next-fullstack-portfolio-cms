import mongoose, { Model } from "mongoose";
import { ISkill, skillSchema } from "@/schemas/skill.schema";

const Skill = (mongoose.models.Skill as Model<ISkill>) || mongoose.model<ISkill>("Skill", skillSchema);

export type { ISkill };
export default Skill;
